import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  login(@Body() user: LoginDto){
    console.log(user)
  }

  @Post('register')
  async register(@Body() user: RegisterDto){
    console.log(user)
    return await this.userService.register(user);
  }
}