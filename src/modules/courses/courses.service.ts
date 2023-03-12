import { Injectable } from '@nestjs/common';
import { Course } from './courses.model';

let Courses: Course[] = [];
@Injectable()
export class CoursesService {
  create(course: Course) {
    Courses.push(course);
    return 'This action adds a new course';
  }

  findAll() {
    return Courses;
  }

  findOne(id: number) {
    const newCourse = Courses.find((course) => course.id === id) || {};
    return newCourse;
  }

  update(id: number, updateCourse: Course) {
    let index;
    Courses.find((course, i) => {
      if (course.id === id) {
        index = i;
        course.name = updateCourse.name;
        course.description = updateCourse.description;
        course.duration = updateCourse.duration;
      }
    });
    return Courses[index];
  }

  remove(id: number) {
    let index;
    Courses.find((std, i) => {
      index = i;
      if (std.id === id) {
        Courses.splice(index, std.id);
      }
    });

    return `This action removes a #${id} student`;
  }
}
