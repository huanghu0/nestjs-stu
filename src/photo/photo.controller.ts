import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Inject } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { UserService } from 'src/user/user.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Inject()
  private userService:UserService

  @Post('/addPhoto')
  async addphoto(@Body() photo:CreatePhotoDto){
    console.log(photo,'photo')
    return await this.photoService.savePhoto(photo)
  }

  @Post('/addPhotometa')
  async addphotometa(@Body() photometa:CreatePhotoDto){
    console.log(photometa,'photometa')
    return await this.photoService.savePhotoMetaData(photometa)
  }

  @Get('/list')
  async findphotoList(){
    return await this.photoService.findAllPhoto();
  }

  @Get('/getByid/:id')
  async findByid(@Param() param:any){
    // console.log(param.id,'Number(id)')
    return await this.photoService.findById(Number(param.id))

  }

  @Get('/getByJoin')
  async findJoin(){
    return await this.photoService.findJoin()
  }


  @Post('/addAlbum')
  async addAlbum(@Body() album:CreatePhotoDto){
    return await this.photoService.addAlbum(album)
  }

  @Get('/findJoinAlbumAndMeta')
  async findJoinAlbumAndMeta(){
    return await this.photoService.findJoinAlbumAndMeta()
  }

}
