import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('signup')
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginAuthDto, response);
  }
}
