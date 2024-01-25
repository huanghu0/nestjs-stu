import { Controller, Get, Post, Body, Param, Request, Query, Headers, HttpCode, Res, Req, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto,'createUserDto-----------------')
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(+id,updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.userService.remove(+id);
  }
  
  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    req.session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
 
  @Post('create')
  createUser(@Req() req, @Body() body) {
    if (req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: "验证码正确"
      }
    } else {
      return {
        message: "验证码错误"
      }
    }
 
  }
}