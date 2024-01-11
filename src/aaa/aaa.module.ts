import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { ConfigurableModuleClass } from './aaa.module-definition';

@Module({
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule extends ConfigurableModuleClass {}
