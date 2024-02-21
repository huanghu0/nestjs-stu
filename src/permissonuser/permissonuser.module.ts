import { Module } from '@nestjs/common';
import { PermissonuserService } from './permissonuser.service';
import { PermissonuserController } from './permissonuser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissonUser } from './entities/permissonuser.entity';

@Module({
  controllers: [PermissonuserController],
  providers: [PermissonuserService],
  imports:[
    TypeOrmModule.forFeature([PermissonUser],'aclTestConnection')
  ],  
})
export class PermissonuserModule {}
