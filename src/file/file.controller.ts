import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }

  @Post('singlefile')
  @UseInterceptors(FileInterceptor('aaa',{
    dest:'uploads'
  }))
  uploadFile(@UploadedFile() file:Express.Multer.File,@Body() body){
    console.log('ffff')
    console.log('body',body)
    console.log('file',file)
  }

  @Post('mutipulfiles')
  @UseInterceptors(FilesInterceptor('bbb',2,{
    dest:'uploads'
  }))
  uploadFiles(@UploadedFiles() files:Array<Express.Multer.File>,@Body() body){
    console.log('ffff')
    console.log('body',body)
    console.log('file',files)
  }

  @Post('mixfiles')
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'aaa', maxCount: 2 },
      { name: 'bbb', maxCount: 3 },
  ], {
      dest: 'uploads'
  }))
  uploadFileFields(@UploadedFiles() files: { aaa?: Express.Multer.File[], bbb?: Express.Multer.File[] }, @Body() body) {
      console.log('body', body);
      console.log('files', files);
  }

  @Post('anyfiles')
  @UseInterceptors(AnyFilesInterceptor({
      dest: 'uploads'
  }))
  uploadAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
      console.log('body', body);
      console.log('files', files);
  }  



}
