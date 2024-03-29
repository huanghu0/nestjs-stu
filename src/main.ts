import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import * as cors from 'cors'
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

const whiteList = ['/list']

function middleWareAll (req,res,next) {
  if(whiteList.includes(req.originalUrl)){
    next()
  }else{
    res.send({code:200})
  }
}

async function bootstrap() {

  // const app = await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter());
  // await app.listen(3000)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  // app.use(middleWareAll) // 全局中间件
  app.use(cors())
  app.use(session({secret: "HuangHu", name: "huanghu.session", rolling: true, cookie: { maxAge: 600000 },resave:false,saveUninitialized:false  }))
  // app.useGlobalGuards(new LoggerGuard())
  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpFilter())
  app.useStaticAssets(join(__dirname,'images'),{
    prefix:'/huanghu'
  })
  // app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'toPublic'));
  app.setBaseViewsDir(join(__dirname, '..', 'toViews'));
  app.setViewEngine('hbs');
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN))
  const options = new DocumentBuilder().setTitle('nestjs-stu-接口文档').setDescription('描述......').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-doc', app, document);
  await app.listen(3000);
  // setTimeout(() => {
  //   app.close();
  // },3000)
}
bootstrap();

// observableFunc();