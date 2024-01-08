import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';

@Injectable()
export class LoggerGuard implements CanActivate {
  @Inject(AppService)
  private appServide: AppService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check',this.appServide.getHello())
    return true;
  }
}
