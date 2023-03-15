import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegSchema } from './reg.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reg', schema: RegSchema }]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
