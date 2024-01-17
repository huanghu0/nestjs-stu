import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Cat } from './interface';

// implements OnModuleInit,OnApplicationBootstrap,OnModuleDestroy,BeforeApplicationShutdown,OnApplicationShutdown 
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  // onModuleInit() {
  //   console.log('CatsService onModuleInit')
  // }

  // onApplicationBootstrap() {
  //   console.log('CatsService onApplicationBootstrap')
  // } 

  // onModuleDestroy() {
  //   console.log('CatsService onModuleDestroy')
  // }

  // beforeApplicationShutdown(){
  //   console.log('CatsService beforeApplicationShutdown')
  // }

  // onApplicationShutdown(){
  //   console.log('CatsService onApplicationShutdown')
  // }


  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}