import { PartialType } from '@nestjs/mapped-types';
import { SignUpAuthDto } from './signUp-auth.dto';

export class UpdateAuthDto extends PartialType(SignUpAuthDto) {}
