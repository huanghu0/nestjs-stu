import { Controller,Get, Req,Post, HttpCode, Header, Redirect, Query, Param,Delete,Bind,Body,Put,Res,HttpStatus,Dependencies  } from "@nestjs/common";
import { Request,Response } from "express";
import { CatsService } from './cats.service';
import { Cat } from "./interface";
@Controller('cats')
export class CatsController {
  
  // @Post()
  // @Bind(Body())
  // create(createCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // @Bind(Query())
  // findAll(query) {
  //   console.log(query);
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }  
  
  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send('This action adds a new cat');
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //    res.status(HttpStatus.OK).json([]);
  // }

  // @Get(':id')
  // @Bind(Param('id'))
  // findOne(id) {
  //   return `This action returns a #${id} cat`;
  // }

  // @Put(':id')
  // @Bind(Param('id'), Body())
  // update(id, updateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // @Bind(Param('id'))
  // remove(id) {
  //   return `This action removes a #${id} cat`;
  // }

  constructor(private readonly catsService: CatsService ) {
  }

  @Post()
  async create(@Body() createCatDto:Cat) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }  
}