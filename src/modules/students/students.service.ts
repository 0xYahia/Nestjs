import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from './student.interface';

// let Students: CreateStudentDto[] = [];
let fieldsIgnored = {
  __v: false,
};
@Injectable()
export class StudentsService {
  [x: string]: any;
  constructor(@InjectModel('Students') private StudentModel: Model<IStudent>) {}

  async create(student: CreateStudentDto) {
    let newStudent = new this.StudentModel(student);
    await newStudent.save();
    return newStudent;
  }

  async findAll() {
    let allStudents = await this.StudentModel.find({}, fieldsIgnored)
      .populate({ path: 'coursesIDS', select: 'name' })
      .exec();
    return allStudents;
  }

  async findOne(id: any) {
    const student = await this.StudentModel.findById(id)
      .populate({ path: 'coursesIDS', select: 'name' })
      .exec();
    return student;
  }

  async update(id: any, updateStudent: UpdateStudentDto) {
    let stduent = await this.StudentModel.findOneAndUpdate(
      id,
      {
        ...updateStudent,
      },
      { new: true },
    )
      .populate({ path: 'coursesIDS', select: 'name' })
      .exec();
    return stduent;
  }

  async remove(id: any) {
    await this.StudentModel.findOneAndDelete(id).exec();

    return `This action removes a #${id} student`;
  }
}
