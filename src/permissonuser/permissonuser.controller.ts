import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissonuserService } from './permissonuser.service';
import { CreatePermissonuserDto } from './dto/create-permissonuser.dto';
import { UpdatePermissonuserDto } from './dto/update-permissonuser.dto';

@Controller('permissonuser')
export class PermissonuserController {
  constructor(private readonly permissonuserService: PermissonuserService) {}

  @Get('init')
  async initData(){
    console.log('cccccc---------------------------------------------------------------------------')
    await this.permissonuserService.initData();
    return 'Done'
  }
}
