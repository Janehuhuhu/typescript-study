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
let a4: void = null
a4 = undefined
// a4 = 1  // ❌

/**
 * 5. never
 */
function error(message: string): number {
  throw new Error(message);
}
// error('error')