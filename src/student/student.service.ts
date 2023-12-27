import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository,Like } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Student } from './entities/student.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
@Injectable()
export class StudentService {
  
  // constructor(@InjectRepository(Student) private readonly student:Repository<Student>){}
  constructor(@InjectModel(Student.name,'test_node') private StudentModel: Model<Student>) {}

  create(createStudentDto: CreateStudentDto) {
    // const data = new Student()
    // data.name = createStudentDto.name
    // data.sex = createStudentDto.sex
    // return this.student.save(data)
    
    const createStudent = new this.StudentModel(createStudentDto)
    // console.log(createStudent,createStudentDto,'createStudent----------------------')
    return createStudent.save()
  }

  async findAll() {
    // const data = await this.student.find({
    //   where:{
    //     name:Like(`%${query.name}%`)
    //   },
    //   order:{
    //     id:'DESC'
    //   }
    // })    
    // return data
    return this.StudentModel.find().exec();
  }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return this.student.update(id,updateStudentDto)
  // }

  // remove(id: number) {
  //   return this.student.delete(id);
  // }
}
