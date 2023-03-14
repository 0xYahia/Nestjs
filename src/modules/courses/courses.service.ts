import { Injectable } from '@nestjs/common';
import { Course } from './courses.model';
import { Model } from 'mongoose';
import { ICourse } from './course.interface';
import { InjectModel } from '@nestjs/mongoose';

let fieldsIgnored = {
  __v: false,
};

let Courses: Course[] = [];
@Injectable()
export class CoursesService {
  constructor(@InjectModel('Courses') private CoursetModel: Model<ICourse>) {}
  async create(course: Course) {
    return await this.CoursetModel.create(course);
  }

  async findAll() {
    return await this.CoursetModel.find({}, fieldsIgnored).exec();
  }

  async findOne(id: any) {
    return await this.CoursetModel.findById(id).exec();
  }

  async update(id: any, updateCourse: Course) {
    return await this.CoursetModel.findOneAndUpdate(
      id,
      {
        ...updateCourse,
      },
      { new: true },
    ).exec();
  }

  async remove(id: any) {
    return await this.CoursetModel.findOneAndDelete(id).exec();
  }
}
