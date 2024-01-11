import { PartialType } from '@nestjs/swagger';
import { CreateAaaDto } from './create-aaa.dto';

export class UpdateAaaDto extends PartialType(CreateAaaDto) {}
