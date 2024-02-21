import { PartialType } from '@nestjs/swagger';
import { CreatePermissonuserDto } from './create-permissonuser.dto';

export class UpdatePermissonuserDto extends PartialType(CreatePermissonuserDto) {}
