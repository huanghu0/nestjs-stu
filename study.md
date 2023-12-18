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
