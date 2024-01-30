import { Body, Controller, Inject, Post, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject(JwtService)
  private jwtService:JwtService

  // 登陆 成功后将登陆token返回给前端 存在前端 之后的请求都带上 ValidationPipe 做参数的校验
  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto,@Res({passthrough:true}) res:Response){
    const foundUser = await this.userService.login(user);
    if(foundUser){
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username
        }
      })
      res.setHeader('token', token);      
      return 'login suceess'
    }else{
      return 'login fail'
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto){
    console.log(user,'user----------------------------')
    return await this.userService.register(user);
  }
}