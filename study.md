# 1.controllers

controllers负责处理传入的请求并将响应返回给客户端。

## 路径

在下面的示例中，我们将使用@Controller（）装饰器，这是定义基本控制器所必需的。我们将指定cat的可选路由路径前缀。在@Controller（）中使用路径前缀可以让我们轻松地对一组相关的路由进行分组，并最大限度地减少重复代码。例如，我们可以选择将一组路由分组，这些路由管理与路径 /cats下的cat实体的交互。在这种情况下，我们可以在@Controller（）decorator中指定路径前缀cat，这样我们就不必为文件中的每个路由重复该部分路径。

```typescript
import { Controller,Get, Req,Post } from "@nestjs/common";
import { Request } from "express";

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request:Request): string { // @Req是request对象注解
    return 'This action returns all cats'
  }
  @Post()
  create():string {
    return 'This action adds a new cat'
  }

}
```

*号作为通配符可以匹配任意字符串

```typescript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

上面`abcd`, `ab_cd`, `abecd`都能匹配

## 状态码 自定义Header 重定向 路径参数

请求默认返回200，post除外默认返回201，可以使用@HttpCode改变状态码

```ts
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

## 完整示例

```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}n removes a #${id} cat`;
  }
}
}
```

## 使用库特定的响应对象

```ts
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

# 2.Providers

## 完整实例

cats.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

cats.controller.ts

```ts
import { Controller,Get, Req,Post, HttpCode, Header, Redirect, Query, Param,Delete,Bind,Body,Put,Res,HttpStatus,Dependencies  } from "@nestjs/common";
import { Request,Response } from "express";
import { CatsService } from './cats.service';
import { Cat } from "./interface";
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService ) {
  }

  @Post()
  async create(@Body() createCatDto:Cat) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }  
}
```

interface.ts

```ts

export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

app.modules.ts

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';


@Module({
  imports: [],
  controllers: [AppController,CatsController],
  providers: [AppService,CatsService],
})
export class AppModule {}

```

# 3.Modules

cats.modules.ts

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

# 4.中间件

创建一个中间件

```ts
import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    console.log(req,'req--------------------')
    next()
  }
}
```

注入中间件(可以在每个module中注入)

```ts
import { MiddlewareConsumer, Module, NestModule,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/middleware';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
    // consumer.apply(LoggerMiddleware).forRoutes({path:'user',method:RequestMethod.GET}) // 给指定方法绑定中间件
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController,UserController) // 直接放入controller
    // consumer
    // .apply(LoggerMiddleware)
    // .exclude(
    //   { path: 'cats', method: RequestMethod.GET },
    //   { path: 'cats', method: RequestMethod.POST },
    //   'cats/(.*)',
    // )
    // .forRoutes('*');    // 判处一些路由不传中间件
  }
}
 }
}
,'user')
  }
}

```



全局中间件

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session'
import * as cors from 'cors'

const whiteList = ['/list']

function middleWareAll (req,res,next) {
  if(whiteList.includes(req.originalUrl)){
    next()
  }else{
    res.send({code:200})
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  // app.use(middleWareAll)
  app.use(cors())
  app.use(session({secret: "HuangHu", name: "huanghu.session", rolling: true, cookie: { maxAge: null }  }))
  await app.listen(3000);
}
bootstrap();(3000);
}
bootstrap();
```

# 5.拦截器

```ts
// response.ts
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
    console.log('context--------------------')
    console.log(context,)
    console.log('context--------------------')
    return next.handle().pipe(map(data => {
      console.log(data,'data----------------------')
      return {
        data,
        status:0,
        success:true,
        message:'哈哈'
      }
    }))
  }
}



// main.ts
app.useGlobalInterceptors(new Response()) // 全局拦截器
```

```ts
// 针对某个模块的拦截器
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

```ts
// cats.controller.ts
import { Controller,Get, Req,Post, HttpCode, Header, Redirect, Query, Param,Delete,Bind,Body,Put,Res,HttpStatus,Dependencies, UseInterceptors  } from "@nestjs/common";
import { Request,Response } from "express";
import { CatsService } from './cats.service';
import { Cat } from "./interface";
import { LoggingInterceptor } from "../logger/interceptor"
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService ) {
  }

  @Post()
  async create(@Body() createCatDto:Cat) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }  
}
```

# 异常过滤器

```ts
// filter.ts
import { ExceptionFilter,Catch,ArgumentsHost, HttpException,HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from '@nestjs/core';
import { Request,Response } from "express";

// 捕获http 异常
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    // console.log('filter----------------------------------------------')
    response.status(status).json({
      data: exception.message,
      time: new Date().getTime(),
      success: false,
      path: request.url,
      status
    })
  }
}

// main.ts
app.useGlobalFilters(new HttpFilter())
```
