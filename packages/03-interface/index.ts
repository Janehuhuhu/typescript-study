interface Person{
  name: string;
  sayHello():void;
}
class Student1 implements Person{
  constructor(public name: string, public age: number) {
    this.age = age
  }
  sayHello() {
      console.log('大家好，我是'+this.name, '今年' + this.age);
  }
  test() {
    console.log('测试')
  }
}

const s = new Student1('🛖', 18)
s.sayHello()
s.test()