import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data-access/entities/user.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.reponse.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    const payload = { sub: user.id, username: user.login };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      expires_in: 123,
      token_type: 'Bearer',
    };
  }
}
