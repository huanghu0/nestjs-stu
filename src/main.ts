import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({secret: "HuangHu", name: "huanghu.session", rolling: true, cookie: { maxAge: null }  }))
  await app.listen(3000);
}
bootstrap();
