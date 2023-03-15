import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { IAuth } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Reg') private regModel: Model<IAuth>,
    private jwtService: JwtService,
  ) {}

  private async findOneByEmail(email: string) {
    let user = await this.regModel.findOne({ email: email });
    return user;
  }

  async signUp(signUpAuthDto: SignUpAuthDto) {
    let user = await this.findOneByEmail(signUpAuthDto.email);
    if (user) return { message: 'User Already Exist' };

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(signUpAuthDto.password, salt);
    signUpAuthDto.password = hashPassword;

    let newUser = new this.regModel(signUpAuthDto);
    await newUser.save();
    return { message: 'Created Successfullt', data: newUser };
  }

  async login(loginAuthDto: LoginAuthDto, res: Response) {
    let user = await this.findOneByEmail(loginAuthDto.email);
    if (!user) return { message: 'nvalid Email Or Password' };
    let check = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!check) return { message: 'nvalid Email Or Password' };

    let myJwt = await this.jwtService.signAsync(
      { name: user.name, isAdmin: user.isAdmin },
      { secret: 'secret' },
    );
    res.header('x-auth-token', myJwt);
    res.cookie('x-auth-token', myJwt, { httpOnly: true });
    return { message: 'Logged-In Successfully', myJwt };
  }
}
