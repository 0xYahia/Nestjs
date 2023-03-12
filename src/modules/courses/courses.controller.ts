import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
// import { CreateCourseDto } from './dto/create-course.dto;
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesService } from '../courses/courses.service';
import { Course } from './courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() AllBody: Course) {
    return this.coursesService.create(AllBody);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Course: Course) {
    return this.coursesService.update(+id, Course);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(+id);
  }
}
