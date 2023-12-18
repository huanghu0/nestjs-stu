import { Controller, Get, Post, Body, Param, Request, Query, Headers, HttpCode, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    console.log(req.session,'req------------------------------')
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    console.log(captcha.text,'captcha.text------------------------')
    req.session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
 
  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body)
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