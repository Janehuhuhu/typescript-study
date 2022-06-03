/**
 * 1. 变量的声明和赋值是同时进行，TS编译器会自动判断变量的类型
 */
let a1: number
a1 = 1

let b1 = 1
// b1 = true  // ❌

/**
 * 2. 字面量
 */
 let a2: 'red' | 'blue' | 'black';
 a2 = 'black' // ☑️
//  color = 'aa' // ❌

/**
 * 3. any 和 unknown
 */
let a3: any = 4
a3 = true
let b4: number
b4 = a3
// b4 = true  // ❌
console.log('b4', b4) // 输出为 true

let aa3: unknown = 4
aa3 = true
let bb4: number
// bb4 = aa3  // ❌

/**
 * 4. void
 */
let a4: void = undefined
// a4 = null
// a4 = 1  // ❌

/**
 * 5. never
 */
function error(message: string): number {
  throw new Error(message);
}
// error('error')

/**
 * 6. tuple
 */
let a6: [number, string]
a6 = [1, '1']
// a6 = [1, '1', 1] // ❌


/**
 * enum
 */
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

/**
 * 类型断言
 */
 let someValue: unknown = "this is a string";
//  let strLength: number = (someValue as string).length;
 let strLength: number = (<string>someValue).length;