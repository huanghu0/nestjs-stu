import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
})
// implements OnModuleInit,OnApplicationBootstrap,OnModuleDestroy,BeforeApplicationShutdown,OnApplicationShutdown
export class RoleModule  {
  // onModuleInit() {
  //   console.log('roleModule onModuleInit')
  // }

  // onApplicationBootstrap() {
  //   console.log('roleModule onApplicationBootstrap')
  // }  

  // onModuleDestroy() {
  //   console.log('RoleModule onModuleDestroy')
  // }

  // beforeApplicationShutdown(){
  //   console.log('RoleModule beforeApplicationShutdown')
  // }

  // onApplicationShutdown(){
  //   console.log('RoleModule onApplicationShutdown')
  // }   
  
}
