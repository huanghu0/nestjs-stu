import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;  

  getHello(): string {
    return 'Hello World!';
  }

  async getRedisKeys(){
    const value = await this.redisClient.keys('*');
    return value;    
  }

}
