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
import { APP_GUARD } from '@nestjs/core';
import { LoggerGuard } from './logger/logger.guard';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { ReqUrl } from './role/role.decorator';
import { FileModule } from './file/file.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk';
import 'winston-daily-rotate-file';

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
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_node',{connectionName:'test_node'}),
    // AaaModule.register({
    //   aaa:1,
    //   bbb:'12'
    // }),
    // AaaModule.registerAsync({
    //   useFactory: async () => {
    //     await 111;
    //     return {
    //       aaa:222,
    //       bbb:'111'
    //     }
    //   },
    //   inject:[]
    // }), 
    AaaModule.register({
      aaa:1,
      bbb:'bbb',
      isGlobal:true
    }),   
    BbbModule.register({
      aaa:1,
      bbb:2
    }), 
    FileModule,
    WinstonModule.forRoot({
      level: 'debug',
      format: format.simple(),
      transports: [
          new transports.Console({
              format: format.combine(
                  format.colorize(),
                  format.printf(({context, level, message, time}) => {
                      const appStr = chalk.green(`[NEST]`);
                      const contextStr = chalk.yellow(`[${context}]`);
  
                      return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                  })
              ),

          }),
          // new transports.File({
          //     format: format.combine(
          //         format.timestamp(),
          //         format.json()
          //     ),
          //     filename: '111.log',
          //     dirname: 'log'
          // })
          new transports.DailyRotateFile({
              level: 'info',
              dirname: 'log',
              filename: 'test-%DATE%.log',
              datePattern: 'YYYY-MM-DD-HH-mm',
              maxSize: '1k'
          })          
      ]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoggerGuard
    }
  ],
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
