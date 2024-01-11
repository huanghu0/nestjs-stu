import { applyDecorators, createParamDecorator, ExecutionContext, Get, SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const Role = (role: string[]) => {
  // console.log(role,'-----------------------------------')
  return SetMetadata('role', role);
} 

export const ReqUrl = createParamDecorator((data:string,ctx:ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>()
  return req.url
})

export const RoleAndGet = (path,role) => {
  return applyDecorators(
    Get(path),
    Role(role)
  )
}