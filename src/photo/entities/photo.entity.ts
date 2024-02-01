import { Entity, Column, PrimaryGeneratedColumn,OneToOne, ManyToOne, ManyToMany } from "typeorm";
import { PhotoMetadata } from "./photoMetadata.entity";
import { Author } from "./author.entity";
import { Album } from "./album.entity";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo,{
    cascade: true
  })
  metadata: PhotoMetadata;  

  @ManyToOne(type => Author, author => author.photos)
  author: Author;  

  @ManyToMany(typw => Album,album => album.photos)
  albums: Album[]

}
