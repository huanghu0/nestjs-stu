import { Controller,Get, Req,Post, HttpCode, Header, Redirect, Query, Param,Delete,Bind,Body,Put,Res,HttpStatus,Dependencies, UseInterceptors, ParseUUIDPipe, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown  } from "@nestjs/common";
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
// implements OnModuleInit,OnApplicationBootstrap,OnModuleDestroy,BeforeApplicationShutdown,OnApplicationShutdown
export class CatsController    {
  constructor(private readonly catsService: CatsService ) {
  }

  // onModuleInit() {
  //   console.log('CatsController onModuleInit')
  // }

  // onApplicationBootstrap() {
  //   console.log('CatsController onApplicationBootstrap')
  // }

  // onModuleDestroy() {
  //   console.log('CatsController onModuleDestroy')
  // }

  // beforeApplicationShutdown(){
  //   console.log('CatsController beforeApplicationShutdown')
  // }

  // onApplicationShutdown(){
  //   console.log('CatsController onApplicationShutdown')
  // }    

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