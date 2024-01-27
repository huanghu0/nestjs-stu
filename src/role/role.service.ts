import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// implements OnModuleInit,OnApplicationBootstrap,OnModuleDestroy,BeforeApplicationShutdown,OnApplicationShutdown
@Injectable()
export class RoleService  {

  // onModuleInit() {
  //   console.log('roleService onModuleInit')
  // }

  // onApplicationBootstrap() {
  //   console.log('roleService onApplicationBootstrap')
  // }  

  // onModuleDestroy() {
  //   console.log('RoleService onModuleDestroy')
  // }

  // beforeApplicationShutdown(){
  //   console.log('RoleService beforeApplicationShutdown')
  // }

  // onApplicationShutdown(){
  //   console.log('RoleService onApplicationShutdown')
  // }  

  create(createRoleDto: CreateRoleDto) {
    console.log(createRoleDto,'createRoleDto---------------')
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto,'updateRoleDto--------------')
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
