import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/local')
  async login(@Req() req, @Body() login: LoginDto) {
    const user = await this.authService.validateUser(
      login.username,
      login.password,
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Post('login/jwt')
  async loginToken(@Body() login: LoginDto) {
    const user = await this.authService.validateUser(
      login.username,
      login.password,
    );
    if (user) {
      return this.authService.login(user);
    }
    return new UnauthorizedException();
  }
}
