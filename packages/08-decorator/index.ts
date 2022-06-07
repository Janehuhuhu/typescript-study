/**
 * 1、类装饰器
 */
let res = null
function decorateClass(constructor) {
  res = constructor
  console.log('constructor', constructor, constructor === A)
}
@decorateClass
class A {
  constructor() {
  }
}

console.log('res', res === A)


/**
 * 2. 方法装饰器
 */
 function decorateMethod(target, key) {
  console.log('constructor', target, key)
}

class B {
  constructor() {}
  @decorateMethod
  getName() {
    console.log('name===>')
    // return 1
  }
}

@decorateMethod
function sayHello() {
  console.log('hello =====>')
}
