import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { Public } from './public.decorator';
import { RefreshRequestDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() authDto: AuthDto) {
    return this.usersService.create(authDto);
  }

  @Public()
  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Public()
  @Post('/refresh')
  async refresh(@Body() refreshDto: RefreshRequestDto) {
    return this.authService.refresh(refreshDto);
  }
}
