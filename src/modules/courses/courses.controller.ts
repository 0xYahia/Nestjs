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
import { Role } from '../auth/enum.auth';
import { Roles } from '../auth/roles.decorator';
// import { CreateCourseDto } from './dto/create-course.dto;
import { CoursesService } from '../courses/courses.service';
import { Course } from './courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @Roles(Role.Admin)
  create(@Body() AllBody: Course) {
    return this.coursesService.create(AllBody);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Course: Course) {
    let course = this.coursesService.update(id, Course);
    return course;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.coursesService.remove(id);
    return 'Course is removed';
  }
}
