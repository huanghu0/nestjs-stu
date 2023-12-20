import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session'
import * as cors from 'cors'

const whiteList = ['/list']

function middleWareAll (req,res,next) {
  if(whiteList.includes(req.originalUrl)){
    next()
  }else{
    res.send({code:200})
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  // app.use(middleWareAll)
  app.use(cors())
  app.use(session({secret: "HuangHu", name: "huanghu.session", rolling: true, cookie: { maxAge: null }  }))
  await app.listen(3000);
}
bootstrap();
