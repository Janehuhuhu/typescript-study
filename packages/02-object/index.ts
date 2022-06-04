class Person{
  public name: string;
  constructor(name: string){
      this.name = name; // 可以修改
  }
  sayHello(){
      console.log(`大家好，我是${this.name}`);
  }
}
class Employee extends Person{
  constructor(name: string){
      super(name);
      this.name = name; //子类中不能修改
  }
  sayHello() {
    console.log('我是子类方法')
    super.sayHello()
  }
}

const a = new Employee('TJ')
console.log(a.name)
a.sayHello()