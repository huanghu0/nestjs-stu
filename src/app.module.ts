import { MiddlewareConsumer, Module, NestModule,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/middleware';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { CatsController } from './cats/cats.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [CatsModule, UserModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
    // consumer.apply(LoggerMiddleware).forRoutes({path:'user',method:RequestMethod.GET}) // 给指定方法绑定中间件
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController,UserController) // 直接放入controller
    // consumer
    // .apply(LoggerMiddleware)
    // .exclude(
    //   { path: 'cats', method: RequestMethod.GET },
    //   { path: 'cats', method: RequestMethod.POST },
    //   'cats/(.*)',
    // )
    // .forRoutes('*');    // 判处一些路由不传中间件
  }
}
