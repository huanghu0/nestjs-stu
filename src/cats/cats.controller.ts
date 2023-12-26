import { Controller,Get, Req,Post, HttpCode, Header, Redirect, Query, Param,Delete,Bind,Body,Put,Res,HttpStatus,Dependencies, UseInterceptors, ParseUUIDPipe  } from "@nestjs/common";
import { Request,Response } from "express";
import { CatsService } from './cats.service';
import { Cat } from "./interface";
import { LoggingInterceptor } from "../logger/interceptor"
import { ApiTags } from "@nestjs/swagger";
// import * as uuid from 'uuid'
// console.log(uuid.v4())

@Controller('cats')
@ApiTags('猫')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
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

  @Get(':id')
  async findOne(@Param('id',ParseUUIDPipe) id:string) {
    return '验证ParseUUIDPipe'
  }
}