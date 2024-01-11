import { PartialType } from '@nestjs/swagger';
import { CreateBbbDto } from './create-bbb.dto';

export class UpdateBbbDto extends PartialType(CreateBbbDto) {}
