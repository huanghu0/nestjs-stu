import { Injectable,NestInterceptor,CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";

interface data<T> {
  data:T
}

// 拦截器是用 @Injectable() 装饰器注释并实现 NestInterceptor 接口的类。
@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<data<T>> {
    return next.handle().pipe(map(data => {
      return {
        data,
        status:0,
        success:true,
        message:'哈哈'
      }
    }))
  }
}