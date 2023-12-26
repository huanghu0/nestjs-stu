import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import * as cors from 'cors'
import { Observable } from "rxjs";
import { observableFunc } from "./rxjs/index"
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';

const whiteList = ['/list']

function middleWareAll (req,res,next) {
  if(whiteList.includes(req.originalUrl)){
    next()
  }else{
    res.send({code:200})
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  // app.use(middleWareAll)
  app.use(cors())
  app.use(session({secret: "HuangHu", name: "huanghu.session", rolling: true, cookie: { maxAge: null }  }))
  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpFilter())
  app.useStaticAssets(join(__dirname,'images'),{
    prefix:'/huanghu'
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();

// observableFunc();