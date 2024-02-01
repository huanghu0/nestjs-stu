import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoMetadata } from './entities/photoMetadata.entity';
import { Author } from './entities/author.entity';
import { Album } from './entities/album.entity';
import { UserModule } from 'src/user/user.module';


@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports:[
    TypeOrmModule.forFeature([Photo,PhotoMetadata,Author,Album],'testConnection'),
    UserModule
  ]
})
export class PhotoModule {}
