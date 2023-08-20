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
import * as bcrypt from 'bcryptjs';
import { RefreshRequestDto } from './dto/refresh-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOneBy({ login: authDto.login });
    if (!user) {
      throw new ForbiddenException();
    }
    const isSamePassword = await bcrypt.compare(
      authDto.password,
      user?.password,
    );
    if (!isSamePassword) {
      throw new ForbiddenException();
    }
    return await this.GenerateTokens(user);
  }

  async refresh(refreshDto: RefreshRequestDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException();
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshDto.refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (error) {
      throw new ForbiddenException();
    }
    const user = await this.usersRepository.findOneBy({
      id: payload['sub'],
    });

    if (!user) {
      throw new ForbiddenException();
    }
    return await this.GenerateTokens(user);
  }

  private async GenerateTokens(user: User) {
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

    user.refreshToken = token;
    user.tokenExpirationDate = new Date(
      decodedToken['exp'] * 1000,
    ).toISOString();
    user.version = user.version + 1;
    user.updatedAt = new Date().toISOString();

    await this.usersRepository.update(user.id, user);

    return token;
  }
}
