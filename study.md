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




