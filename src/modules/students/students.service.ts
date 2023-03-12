import { Injectable, Delete } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.model';

let Students: Student[] = [];

@Injectable()
export class StudentsService {
  create(student: Student) {
    Students.push(student);
    return 'This action adds a new student';
  }

  findAll() {
    return Students;
  }

  findOne(id: number) {
    const newStd = Students.find((std) => std.id === id) || {};
    return newStd;
  }

  update(id: number, updateStudent: Student) {
    let index;
    Students.find((std, i) => {
      if (std.id === id) {
        index = i;
        std.age = updateStudent.age;
        std.coursesIDS = updateStudent.coursesIDS;
      }
    });
    return Students[index];
  }

  remove(id: number) {
    let index;
    Students.find((std, i) => {
      index = i;
      if (std.id === id) {
        Students.splice(index, std.id);
      }
    });

    return `This action removes a #${id} student`;
  }
}
