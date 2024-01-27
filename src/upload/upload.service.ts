import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    console.log(createUploadDto,'createUploadDto---------------')
    return 'This action adds a new upload';
  }
}
