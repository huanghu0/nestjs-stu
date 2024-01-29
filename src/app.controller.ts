import { Controller, Get, HostParam, Inject, Ip, Redirect, Render, Req, Res, Session,UseInterceptors,Query, UnauthorizedException,Headers } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
import { MyCacheInterceptor } from 'src/my-cache.interceptor';
import { JwtService } from '@nestjs/jwt';
// @Controller({ host:':host.0.0.1' })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  @Inject(JwtService)
  private jwtService: JwtService;
  
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
    console.log(ip,'ip-----------------------');
  }

  @Get('/session')
  session(@Session() session,@Req() req){
    console.log(session,'session',req)
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('/host')
  gethostParams(@HostParam('host') host) {
    return host
  } 

  @Get('/getReq')
  getReq(@Req() req,@Res({  passthrough:true}) res) {
    // console.log(req,'req----------------------')
    console.log(res,'res----------------------')
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

  @Get('redis/aaa')
  @UseInterceptors(MyCacheInterceptor)
  aaa(@Query('a') a:string){
    console.log('aaa',a)
    return 'aaa'
  }

  @Get('ttt')
  ttt(@Headers('authorization') authorization: string, @Res({ passthrough: true}) response: Response) {
      if(authorization) {
        try {
          const token = authorization.split(' ')[1];
          const data = this.jwtService.verify(token);
  
          const newToken = this.jwtService.sign({
            count: data.count + 1
          });
          response.setHeader('token', newToken);
          return data.count + 1
        } catch(e) {
          console.log(e);
          throw new UnauthorizedException();
        }
      } else {
        const newToken = this.jwtService.sign({
          count: 1
        });
  
        response.setHeader('token', newToken);
        return 1;
      }
  }
  

}
