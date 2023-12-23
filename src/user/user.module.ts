import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { UserMiddleware } from '../logger/middleware'  

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
