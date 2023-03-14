import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './entities/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Students', schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
}
