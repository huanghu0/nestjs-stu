import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository,Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  
  constructor(@InjectRepository(Student) private readonly student:Repository<Student>){}

  create(createStudentDto: CreateStudentDto) {
    const data = new Student()
    data.name = createStudentDto.name
    data.sex = createStudentDto.sex
    return this.student.save(data)
  }

  async findAll(query) {
    const data = await this.student.find({
      where:{
        name:Like(`%${query.name}%`)
      },
      order:{
        id:'DESC'
      }
    })    
    return data
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.student.update(id,updateStudentDto)
  }

  remove(id: number) {
    return this.student.delete(id);
  }
}
