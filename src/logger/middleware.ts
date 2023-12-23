import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    console.log(req,'req--------------------')
    next()
  }
}

// @Injectable()
// export class UserMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next:NextFunction) {
//     console.log(req,'reqxxxxxxxxxxxxxxxxx--------------------')
//     next()
//   }
// }