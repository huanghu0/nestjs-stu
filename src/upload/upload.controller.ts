import { Controller, Get, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express'
import { join } from 'path';
import {  zip } from 'compressing';
import { ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('下载')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 上传文件
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file){
    // console.log('xx---------------------------')
    console.log(file,this.uploadService,'ss----')
    return true
  }

  // 下载文件
  @Get('export')
  downLoad(@Res() res:Response){
    const url = join(__dirname,'../images/1703248752744.png')
    
    res.download(url)
  }

  // 文件流下载
  @Get('stream')
  async down(@Res() res:Response){
    const url = join(__dirname,'../images/1703248752744.png')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader(
      'Content-Disposition',  
      `attachment; filename=huanghu`,
    );
 
    tarStream.pipe(res)    
  }

}
