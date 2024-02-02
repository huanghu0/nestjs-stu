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

  @Get('/treeData')
  getTreeData(){
    const data = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
      { id: 4, parentId: 2 },
      { id: 5, parentId: 2 },
      { id: 6, parentId: 3 }
    ];
    
    function createNode(id, data) {
      // 去 data 中查找这个构建的 node 有哪些子节点
      const childData = data.filter(({ parentId }) => parentId === id);
      const node = {
        id,
        children: childData.reduce(
        (acc, cur) => {
          acc.push(createNode(cur.id, data));
          return acc;
        },
        [])
      };
      return node;
    }
    
    function getTree(data){
      // 先获取到哪个是根节点
      const rootNodeData = data.find(({ parentId }) => parentId === null);
      if (!rootNodeData) {
        throw new Error('在给定的数据中找不到根节点');
      }
      // 从根节点开始构建节点, 递归构建成树
      return createNode(rootNodeData.id, data);
    }
    
    
    return getTree(data)
  }

}
