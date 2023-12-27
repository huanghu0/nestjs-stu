import { MiddlewareConsumer, Module, NestModule,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/middleware';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { PipeModule } from './pipe/pipe.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CatsModule, 
    UserModule, 
    UploadModule, 
    PipeModule, 
    RoleModule,
    StudentModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'123456',
      database:'test_node',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      name:'one'
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_node',{connectionName:'test_node'})
  ],
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
