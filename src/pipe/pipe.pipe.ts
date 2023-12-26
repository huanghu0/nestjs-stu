import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value,metadata,'PipePipe---------------------')
    // console.log(this.toValidate(metadata.metatype),'xx---')
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }    
    const DTO = plainToInstance(metadata.metatype,value)
    const errors = await validate(DTO)
    if(errors.length > 0) {
      throw new HttpException(errors,HttpStatus.BAD_REQUEST)
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }  
}
