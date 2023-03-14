import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() AllBody: CreateStudentDto) {
    return this.studentsService.create(AllBody);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    return await this.studentsService.findOne(id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: any, @Body() Student: UpdateStudentDto) {
    let student = this.studentsService.update(id, Student);
    return student;
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    this.studentsService.remove(id);
    return 'Student is removed';
  }
}
