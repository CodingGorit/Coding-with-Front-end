/**
 * TypeScript 装饰器
 * 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 
 * 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
 * https://www.tslang.cn/docs/handbook/decorators.html
 */

const TAG = "TS + Decorator";

// =============== 定义第一个装饰器 ==============
function seal(target: any) {
    // doSomething
}

// =============== 装饰器工厂 ================

// 如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。
function color(value: string) { // 这是一个装饰器工厂
    return function (target: any) { //  这是装饰器
        // do something with "target" and "value"...
    }
}

// 装饰器组合
// 多个装饰器可以同时应用到一个声明：

// @g @f x

// @g
// @f
// x

function f() {
    console.log(TAG, "f(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(TAG, "f(): called");
    }
}

function g() {
    console.log(TAG, "g(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(TAG, "g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// 装饰器求值
/**
 * 按顺序调用
    1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
    2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
    3. 参数装饰器应用到构造函数。
    4. 类装饰器应用到类。
 */

// 类装饰器
/**
 * 类装饰器在类声明之前被声明（紧靠着类声明）。 
 *  1. 类装饰器应用于 "类构造函数" ，可以用来监视，修改或替换类定义。 
 *  2. 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。
    3.  类装饰器表达式会在运行时当作函数被调用，“类的构造函数”作为其“唯一”的参数。
    4. 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

    注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。
 */

// 当@sealed被执行的时候，它将密封此类的构造函数和原型
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// 重载构造函数
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

// @sealed  // 加上该装饰器，就会使其修改失效
@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(TAG, new Greeter("world"));

// 方法装饰器
/**
 * 1. 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 
 * 2. 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 
 * 3. 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
 * 
 * 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

    - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    - 成员的名字。
    - 成员的属性描述符。

    注意  如果代码输出目标版本小于ES5，属性描述符将会是undefined。
     如果方法装饰器返回一个值，它会被用作方法的属性描述符。
    注意  如果代码输出目标版本小于ES5返回值会被忽略。

 */

class Greet {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet () {
        return "Hello, " + this.greeting;
    }
}

function enumerable(val: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = val;
    }
}

console.log(TAG, new Greet("greet").greet());

// 访问器装饰器


// 属性装饰器


// 参数装饰器

// 元数据