import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
// implements OnModuleInit,OnApplicationBootstrap,OnModuleDestroy,BeforeApplicationShutdown,OnApplicationShutdown
export class CatsModule  {
  // onModuleInit() {
  //   console.log('CatsModule onModuleInit')
  // }

  // onApplicationBootstrap() {
  //   console.log('CatsModule onApplicationBootstrap')
  // }    

  // onModuleDestroy() {
  //   console.log('CatsModule onModuleDestroy')
  // }

  // beforeApplicationShutdown(){
  //   console.log('CatsModule beforeApplicationShutdown')
  // }

  // onApplicationShutdown(){
  //   console.log('CatsModule onApplicationShutdown')
  // }  
}