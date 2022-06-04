class Person {
  public name: string;
  constructor(name: string){
      this.name = name;
  }
  sayHello(){
      console.log(`大家好，我是${this.name}`);
  }
}
class Employee extends Person {
  constructor(name: string, public age: number){
      super(name);
      this.name = name;
      this.age = 18
  }
  sayHello() {
    console.log('我是子类方法')
    super.sayHello()
  }
  test() {
    console.log('测试')
  }
}

const a = new Employee('TJ')
console.log(a.name)
a.sayHello()