import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data-access/entities/user.entity';
import { Repository } from 'typeorm';
import {
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.reponse.dto';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/data-access/entities/refreshToken.entity';
import { RefreshRequestDto } from './dto/refresh-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOneBy({ login: authDto.login });
    const isSamePassword = await bcrypt.compare(
      authDto.password,
      user?.password,
    );
    if (!isSamePassword) {
      throw new ForbiddenException();
    }
    const token = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    const decodedToken = this.jwtService.decode(token);
    return {
      accessToken: token,
      expiresIn: Math.ceil(+decodedToken['exp'] - Date.now() / 1000),
      tokenType: 'Bearer',
      refreshToken,
    };
  }

  async refresh(refreshDto: RefreshRequestDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      );
      const refreshTokenDb = await this.refreshTokenRepository.findOneBy({
        token: refreshDto.refreshToken,
      });
      if (!refreshTokenDb) {
        throw new ForbiddenException();
      }
      const user = await this.usersRepository.findOneBy({
        refreshTokenId: refreshTokenDb.id,
      });
      if (!user) {
        throw new ForbiddenException();
      }
      await this.refreshTokenRepository.delete(refreshTokenDb.id);
      const token = await this.createAccessToken(user);
      const refreshToken = await this.createRefreshToken(user);
      const decodedToken = this.jwtService.decode(token);
      return {
        accessToken: token,
        expiresIn: Math.ceil(+decodedToken['exp'] - Date.now() / 1000),
        tokenType: 'Bearer',
        refreshToken,
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  private async createAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.login };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    return token;
  }

  private async createRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.login };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    const decodedToken = this.jwtService.decode(token);
    const refreshToken = {
      expirationDate: new Date(+decodedToken['exp'] * 1000).toISOString(),
      token,
    };
    const result = await this.refreshTokenRepository.insert(refreshToken);

    this.addRefreshToken(user, result.raw[0].id);
    return token;
  }

  public async addRefreshToken(user: User, tokenId: string): Promise<void> {
    user.refreshTokenId = tokenId;
    user.version = user.version + 1;
    user.updatedAt = new Date().toISOString();
    await this.usersRepository.update(user.id, user);
  }
}
