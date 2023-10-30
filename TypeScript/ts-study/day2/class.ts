/**
 * OOP 类型
 *  ES6 中继承原型链来模拟继承
 */

class Dog {
    name: string;
    constructor(name:string) {
        this.name = name;
    }

    bark () {
        console.log(this.name + " barked!");
    }
}

const dog = new Dog("doge");
dog.bark();


// js 模拟 OOP：使用 函数 + 原型链的形式进行模拟
// function Dog1(name:string) {
//     this.name = name; // ts 2683
// }

// Dog1.prototype.bark = function () {
//     console.log('barked')
// }

// 继承 extends  super 会调用基类的构造函数
class Animal {
    type='Animal';
    say(name:string) {
        console.log(`I'm${name}`);
    }
}

class cat extends Animal {
    miao () {
        console.log('miao')
    }
}

// 访问修饰符 public private protected （自身类和子类可见）
// 类属性默认是 public

class Son {
    private name:string;
    private age:number;
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}

// 只读属性，如果不希望某个属性被修改，可以使用 readonly 只读修饰符声明
class Person {
    public readonly firstName: string;
    constructor(firstName:string) {
        this.firstName = firstName
    }
}

const p = new Person('To')
// p.firstName = 'dwa'

// 存取器
class Person1 {
    public readonly firstName: string;
    private lastName:string;
    constructor(firstName:string,lastName:string) {
        this.firstName = firstName
        this.lastName= lastName
    }

    get getMyLastName() {
        return this.lastName
    }

    set myLastName(name:string) {
        if (this.firstName === 'Tony') {
            this.lastName = name;
        } else {
            console.log('Unable to change myLastName')
        }
    }
}

// 静态属性 通过类来直接访问（不依赖实例的上下问方法可以定义为静态属性）
class MyArray {
    static displayBane = 'MyArray';
    static isArray (obj:unknown) {
       return Object.prototype.toString.call(obj).slice(8,-1)  === 'Array'
    }
}
console.log(MyArray.displayBane) // 访问静态属性
console.log(MyArray.isArray([]))// true
console.log(MyArray.isArray({}))// false

/**
 * 抽象类：需要被子类继承
 */

abstract class Adder{
    abstract x: number;
    abstract y: number;
    abstract add():number;  // 抽象访问
    displayName= 'Adder' // public

    addTwice():number {
        return (this.x + this.y)*2
    }
}

class NumAdder extends Adder {
    // 实现抽象属性和抽象方法
    x:number;
    y:number;
    constructor(x:number,y:number) {
        super();
        this.x = x;
        this.y = y;
    }
    add():number {
        return this.x + this.y;
    }
}

const numAdder = new NumAdder(1,2);
console.log(numAdder.displayName)
console.log(numAdder.add()) // => 3
console.log(numAdder.addTwice())// => 6

// 使用接口
interface IAdder {
    x: number;
    y: number;
    add: () => number;
}

class NumAdder1 implements IAdder {
    x: number;
    y: number;
    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
    add!: () => number;
}

/**
 * 类的类型
 * 在定义类的时候，我们生命的除构造函数外素有属性，方法的类型就是是这个特殊类型成员
 */

class A {
    name: string;
    constructor(name:string) {
        this.name = name;
    }
}

// const a1:A = {} // name 属性没有
const a2:A = {name: 'a2'}
