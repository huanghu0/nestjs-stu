import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoMetadata } from './entities/photoMetadata.entity';
import { Author } from './entities/author.entity';
import { Album } from './entities/album.entity';

@Injectable()
export class PhotoService {

  @InjectRepository(Photo,'testConnection')
  private photoRepository:Repository<Photo>;

  @InjectRepository(PhotoMetadata,'testConnection')
  private photoMetaRepository:Repository<PhotoMetadata>

  @InjectRepository(Author,'testConnection')
  private authorRepository:Repository<Author>

  @InjectRepository(Album,'testConnection')
  private albumRepository:Repository<Album>

  async savePhoto(photo:CreatePhotoDto){
    try{
      await this.photoRepository.save(photo)
      return '添加成功'
    }catch(e){
      return '添加失败'
    }
  }

  async savePhotoMetaData(photometa:CreatePhotoDto){
    try{
      await this.photoMetaRepository.save(photometa)
      return '添加成功'
    }catch(e){
      return '添加失败'
    }
  }

  async findAllPhoto(){
    try{
      const data = await this.photoRepository.find()
      return data 
    }catch(e){
      return '查询失败'
    }
  }

  async findById(id:number){
    try{
      const data = await this.photoRepository.findBy({id})
      return data 
    }catch(e){
      return '查询失败'
    }    
  }

  async findJoin(){
    try{
      const data = await this.photoRepository.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata","metadata").getMany()
      return data
    }catch(e){
      return '查询失败'
    }
  }

  async addAlbum(album:CreatePhotoDto){
    try{
      await this.albumRepository.save(album)
      return '添加成功'
    }catch(e){
      return '添加失败'
    }
  }

  async findJoinAlbumAndMeta(){
    try{
      const data = await this.photoRepository.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata", "metadata").leftJoinAndSelect("photo.albums", "album").getMany()
      return data
    }catch(e){
      return '查询失败'
    }
  }


}
