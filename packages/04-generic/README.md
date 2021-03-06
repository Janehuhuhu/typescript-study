## 泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定）；一般函数的输出和输入类型有一定关联的时候可以用泛型描述

此时泛型便能够发挥作用；

举个例子：

```typescript
function test(arg: any): any{
    return arg;
}
```

上例中， `test` 函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的；

由于类型不确定所以参数和返回值均使用了 `any` ，但是很明显这样做是不合适的：

首先使用 `any` 会关闭 `TS` 的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型；

<br>

### 泛型函数

#### 创建泛型函数

```typescript
function test<T>(arg: T): T{
    return arg;
}
```

这里的`<T>`就是泛型；

`T` 是我们给这个类型起的名字（不一定非叫 `T` ），设置泛型后即可在函数中使用 `T` 来表示该类型；

所以泛型其实很好理解，就表示某个类型；

那么如何使用上边的函数呢？

#### 使用泛型函数

##### 方式一（直接使用）：

```typescript
test(10)
```

使用时可以直接传递参数使用，类型会由TS自动推断出来，但有时编译器无法自动推断时还需要使用下面的方式

##### 方式二（指定类型）：

```typescript
test<number>(10)
```

也可以在函数后手动指定泛型；

#### 函数中声明多个泛型

可以同时指定多个泛型，泛型间使用逗号隔开：

```typescript
function test<T, K>(a: T, b: K): K{
  return b;
}
test<number, string>(10, "hello");
```

使用泛型时，完全可以将泛型当成是一个普通的类去使用；

<br>

### 泛型类

类中同样可以使用泛型：

```typescript
class MyClass<T>{
  prop: T;
  constructor(prop: T){
      this.prop = prop;
  }
}
```

### 泛型继承

除此之外，也可以对泛型的范围进行约束

```typescript
interface MyInter{
  length: number;
}
function test<T extends MyInter>(arg: T): number{
  return arg.length;
}
```

使用 *T extends MyInter* 表示泛型T必须是 `MyInter` 的子类，不一定非要使用接口类和抽象类同样适用；