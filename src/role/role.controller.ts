import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleGuard } from './role.guard';
import { Role,ReqUrl } from './role.decorator';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色')
@UseGuards(RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  // @SetMetadata('role',['admin'])  
  @Role(['admin'])
  @ApiOperation({summary:"测试admin",description:"请求该接口需要amdin权限"})
  findAll(@ReqUrl() url) {
    // console.log(url,'url--------------------------------')
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiParam({name:"id",description:"用户id",required:true})
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
