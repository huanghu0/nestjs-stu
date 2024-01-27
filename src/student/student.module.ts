import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
// import { Student } from './entities/student.entity';
import { Student,StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  // imports:[TypeOrmModule.forFeature([Student])],
  imports:[MongooseModule.forFeature([{name:Student.name,schema: StudentSchema}],'test_node')],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
