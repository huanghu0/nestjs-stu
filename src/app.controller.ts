import { Controller, Get, HostParam, Inject, Ip, Redirect, Render, Req, Res, Session } from '@nestjs/common';
import session from 'express-session';
import { AppService } from './app.service';
import { request } from 'http';
import { FastifyReply, FastifyRequest } from 'fastify';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

// @Controller({ host:':host.0.0.1' })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  
  // @Get()
  // getHello(@Req() request:FastifyRequest,@Res() replay:FastifyReply) {
  //   replay.header('url',request.url)
  //   replay.send('hello')
  // }

  @Get()
  getHello(): string {
    this.logger.log('hello',AppController.name)
    return this.appService.getHello();
  }

  @Get('/ip')
  ip(@Ip() ip:string) {
    // console.log(ip,'ip-----------------------');
  }

  @Get('/session')
  session(@Session() session){
    // console.log(session,'session-----------------')
  }

  @Get('/host')
  gethostParams(@HostParam('host') host) {
    return host
  } 

  @Get('/getReq')
  getReq(@Req() req,@Res({  passthrough:true}) res) {
    // console.log(req,'req----------------------')
    // console.log(res,'res----------------------')
    // res.send('getReq')
    return 'getReq'
  }

  @Get('/jump')
  @Redirect('https://www.baidu.com/',302)
  jump(){
    return {
      url:'http://juejin.cn',
      statusCode:302
    }
  }

  @Get('/lizhien')
  @Render('lizhien')
  lizhien() {
    return { name:'lizhien',age:24 }
  }

  @Get('/redis')
  async getRedis(){
    return await this.appService.getRedisKeys();
  }

}
