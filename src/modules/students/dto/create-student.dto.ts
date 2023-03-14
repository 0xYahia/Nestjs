import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'minLength < 3' })
  name: string;
  @IsNumber()
  @Min(20, { message: 'age < 20' })
  @Max(40, { message: 'age > 40' })
  age: number;
  coursesIDS: number[];
  constructor(name: string, age: number, coursesIDS: number[]) {}
}
