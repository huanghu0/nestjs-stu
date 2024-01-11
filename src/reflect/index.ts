// Metadata 和 Reflector 
function Type(type) {
  return Reflect.metadata("design:type", type);
}
function ParamTypes(...types) {
  return Reflect.metadata("design:paramtypes", types);
}
function ReturnType(type) {
  return Reflect.metadata("design:returntype", type);
}

@ParamTypes(String, Number)
class Guang {
  constructor(text, i) {
  }

  @Type(String)
  get name() { return "text"; }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x, y) {
    return x + y;
  }
}

let obj = new Guang('a',1)

// 获取到参数
let paramtypes = Reflect.getMetadata("design:paramtypes",obj,"add");


console.log(paramtypes,'paramtypes--------------------')
