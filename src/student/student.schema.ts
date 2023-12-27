import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop()
  sex: string;

  @Prop()
  id: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);