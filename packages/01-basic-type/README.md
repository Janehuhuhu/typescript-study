## **TypeScript中的基本类型**

`TypeScript` 中的基本类型：

- 类型声明

  - 类型声明是 `TS` 非常重要的一个特点；

  - 通过类型声明可以指定 `TS` 中变量（参数、形参）的类型；

  - 指定类型后，当为变量赋值时，`TS` 编译器会自动检查值是否符合类型声明，符合则赋值，否则报错；

  - 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值；

  - 语法：

    - ```typescript
      let 变量: 类型;
      
      let 变量: 类型 = 值;
      
      function fn(参数: 类型, 参数: 类型): 类型{
          ...
      }
      ```

- 自动类型判断

  - `TS` 拥有自动的类型判断机制
  - 当对变量的声明和赋值是同时进行的，`TS` 编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

- 类型：

  | **类型** |     **例子**      |            **描述**            |
  | :------: | :---------------: | :----------------------------: |
  |  number  |    1, -33, 2.5    |            任意数字            |
  |  string  | 'hi', "hi", `hi`  |           任意字符串           |
  | boolean  |    true、false    |       布尔值true或false        |
  |  字面量  |      其本身       |  限制变量的值就是该字面量的值  |
  |   any    |         *         |            任意类型            |
  | unknown  |         *         |         类型安全的any          |
  |   void   | 空值（undefined） |     没有值（null或undefined）      |
  |  never   |      没有值       |          不能是任何值          |
  |  object  |  {name:'孙悟空'}  |          任意的JS对象          |
  |  array   |      [1,2,3]      |           任意JS数组           |
  |  tuple   |       [4,5]       | 元组，TS新增类型，固定长度数组 |
  |   enum   |    enum{A, B}     |       枚举，TS中新增类型       |

- number

  - ```typescript
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;
    let big: bigint = 100n;
    ```

- boolean

  - ```typescript
    let isDone: boolean = false;
    ```

- string

  - ```typescript
    let color: string = "blue";
    color = 'red';
    
    let fullName: string = `Bob Bobbington`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${fullName}.
    
    I'll be ${age + 1} years old next month.`;
    ```

- 字面量

  - 也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

  - ```typescript
    let color: 'red' | 'blue' | 'black';
    let num: 1 | 2 | 3 | 4 | 5;
    ```

- any

  - 可以赋值任何类型的值，也可以赋值变量，虽不改变变量类型，但值可能会和类型有偏差。如 *b4* 原本的 `number` 类型却打印出 `boolean`。即虽然 *b4* 仍为 *number* 类型，不能赋值 *true*, 但通过 *any* 类型赋值 *b4* 变为 *true*
  - ```typescript
    let a3: any = 4
    a3 = true
    let b4: number
    b4 = a3
    // b4 = true  // ❌
    console.log('b4', b4) // 输出为 true
    ```

- unknown

  - 安全的 `any` 类型，可以赋值任何类型的值，也可以赋值变量，赋值和类型有偏差时会报错

  - ```typescript
    let aa3: unknown = 4
    aa3 = true
    let bb4: number
    // bb4 = aa3  // ❌
    ```

- void

  - `undefined` 或 `null`, 赋值为 `undefined` 的自动类型判断为 `any`。但是 `null` 不可以赋值给 `void`, 报错 *Type 'null' is not assignable to type 'void'*。没有返回值的函数，其返回值类型为 `void`。[详情参考](https://juejin.cn/post/6844904126019534861)

  - ```typescript
    let a4: void = undefined
    // a4 = null // ❌
    // a4 = 1  // ❌
    ```

- never
  - 不能是任何值, `undefined` 都不行，一般是报错了

  - ```typescript
    function error(message: string): never {
      throw new Error(message);
    }
    ```

- object（没啥用）

  - ```typescript
    let obj: object = {};
    ```

- array

  - ```typescript
    let list: number[] = [1, 2, 3];
    let list: Array<number> = [1, 2, 3];
    ```

- tuple
  - 元组，`TS` 新增类型，固定长度数组

  - ```typescript
    let x: [string, number];
    x = ["hello", 10]; 
    ```

- enum
  - 适合枚举值的赋值场景，默认从 0 开始，也可以直接赋值，如果只赋值一部分，后面的值会依次累加

  - ```typescript
     enum Color1 {
        Red,
        Green,
        Blue,
      }
      let c1: Color1 = Color1.Green;
      console.log('c1', c1) // 输出为 1

      // 支持赋值
      enum Color2 {
        Red = 1,
        Green,
        Blue,
      }
      let c2: Color2 = Color2.Green;
      console.log('c2', c2) // 输出为 2

      enum Color3 {
        Red,
        Green = 3,
        Blue,
      }
      let c3: Color3 = Color3.Blue;
      console.log('c3', c3) // 输出为 4

      enum Color4 {
        Red = 1,
        Green = 2,
        Blue = 4,
      }
      let c4: Color4 = Color4.Green;
      console.log('c4', c4) // 输出为 2
    ```

- 类型断言

  - 有些情况下，变量的类型对于我们来说是很明确，但是 `TS` 编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

    - 第一种

      - ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (someValue as string).length;
        ```

    - 第二种

      - ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (<string>someValue).length;
        ```