import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'

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


  // 接受分片上传的文件 前端回分批调用
  @Post('sliceupload')
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads'
  }))
  uploadSilceFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: { name: string }) {
    console.log('body', body);
    console.log('files', files);
  
    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_'+ fileName;
  
    if(!fs.existsSync(chunkDir)){
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }  

  // 合并分片的文件 
  @Get('merge')
  merge(@Query('name') name: string) {
      const chunkDir = 'uploads/chunks_'+ name;
  
      const files = fs.readdirSync(chunkDir);
  
      let count = 0;
      let startPos = 0;
      files.map(file => {
        const filePath = chunkDir + '/' + file;
        const stream = fs.createReadStream(filePath);
        stream.pipe(fs.createWriteStream('uploads/' + name, {
          start: startPos
        })).on('finish', () => {
          count ++;
  
          if(count === files.length) {
            fs.rm(chunkDir, {
              recursive: true
            }, () =>{});
          }
        })
  
        startPos += fs.statSync(filePath).size;
      });
  }
  

}
