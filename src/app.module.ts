import { MiddlewareConsumer, Module, NestModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/middleware';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { PipeModule } from './pipe/pipe.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { LoggerGuard } from './logger/logger.guard';
import { FileModule } from './file/file.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import { JwtModule } from '@nestjs/jwt'
import * as chalk from 'chalk';
import 'winston-daily-rotate-file';
import { createClient } from 'redis';
import { login_test_config,test_config,acl_test } from './ormConfig'
import { StudentModule } from './student/student.module';
import { PhotoModule } from './photo/photo.module';
import { PermissonuserModule } from './permissonuser/permissonuser.module';

@Module({
  imports: [ 
    UserModule,
    StudentModule, 
    UploadModule, 
    PipeModule, 
    RoleModule,
    TypeOrmModule.forRoot(login_test_config),
    TypeOrmModule.forRoot(test_config),
    TypeOrmModule.forRoot(acl_test),    
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
    }),
    JwtModule.register({
      global:true,
      secret:'huanghu',
      signOptions:{
        expiresIn: '7d'
      }
    }),
    PhotoModule,
    PermissonuserModule
    // JwtModule.registerAsync({
    //   async useFactory() {
    //     await 111;
    //     return {
    //       secret:'huanghu',
    //       signOptions:{
    //         expiresIn:'7d'
    //       }
    //     }
    //   }
    // })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoggerGuard
    },
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
            socket: {
                host: 'localhost',
                port: 6379
            },
            database:2
        });
        await client.connect();
        return client;
      }
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
