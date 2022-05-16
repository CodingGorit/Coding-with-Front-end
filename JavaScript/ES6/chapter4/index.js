const TAG = {
    ["ES5"]: "ES5",
    ["ES6"]: "ES6"
}

{
    // 对象语法扩展 ES5
    function createPerson(name, age) {
        return {
            name: name,
            age: age
        }
    }

    function createPersonInES6(name, age) {
        return {
            name,
            age
        }
    }
}

{
    // 对象的简写 ES5
    let person = {
        name: "ncik",
        sayName: function() {
            console.log(this.name);
        }
    }

    person.sayName();

    let personInES6 = {
        name: 'Nick',
        sayName () {
            console.log(this.name);
        }
    }

}

{
    // 可计算属性名 【点替法、方括号法】
    let person = {},
    lastName = "last name";

    person['first name'] = "Nick";
    person[lastName] = "Zaa";

    console.log(person['first name']);  // 这种方式带空格，不可以使用点记法引用这些属性
    console.log(person[lastName]);  // 方括号却可以

    // 上面的表达方式可以用于被已知字符串字面量表示的情况，但是属性名称 "first name" 被包含在一个变量中，或者需要计算才可以得到该变量的值，那么 ES5 就不能为一个对象字面量定义该属性

    // ES6 中，可以在对象字面量中使用可计算属性名称

    let lastname = "last Name";

    let person1 = {
        "first name": "Nick",
        [lastname]: 'Za'
    }
    console.log(TAG.ES6, person1[lastname]);

    // 在对象字面量中使用方括号表示的该属性名称是可计算的，它的内容将被求职并最终转换为一个字符串，因而同样使用表达式作为属性时计算名称
    let suffic = " name";
    let person2 = {
        ["first" + suffic]: "Nico",
        ["last" + suffic]: "Zaks"
    }

    console.log(TAG.ES6, person2["first name"]);
    console.log(TAG.ES6, person2["last name"]);
}

{
    // ES6 新增对象方法

    Object.is();

    /**
     * 特殊情况：
     * 1. +0 === -0 为 true
     * 2. NaN === NaN 为 false，需要使用 isNaN 来检测 NaN
     */

    console.log(TAG.ES6, "================Object.is() start=================");
    console.log("+0 == -0",+0 == -0); // true
    console.log("+0 === -0",+0 === -0); // true
    console.log("Object.is(+0, -0)",Object.is(+0, -0)); // false

    console.log("NaN == NaN",NaN == NaN);    // false
    console.log("NaN === NaN",NaN === NaN);   // false
    console.log("Object.is(NaN, NaN)",Object.is(NaN, NaN));   // true


    console.log("5 == 5",5 == 5);    // true
    console.log('5 == \"5\"',5 == "5");  // true
    console.log("5 === 5", 5 === 5);    // true
    console.log('5 === \"5\"', 5 === "5");  // false
    console.log("Object.is(5,5)", Object.is(5,5));  // true
    console.log("Object.is(5, \'5\')", Object.is(5, "5"));  // false

    console.log(TAG.ES6, "================Object.is() end=================");
}

{
    // ES6 新增方法
    // Object.assign();
    console.log(TAG.ES6, "================Object.assign()begin==================")
    // 对象混合，在 mixin 方法中，一个对象接收来自另一个对象的属性和方法

    function mixin(receiver, suppler) {
        Object.keys(suppler).forEach(function(key) {
            receiver[key] = suppler[key];
        })

        return receiver;
    }


    // mixin() 函数遍历 supplier 自有属性并复制到 reciver（作为浅拷贝，当属性是对象时，拷贝的是对象引用）
    // 这样 receiver 不通过继承就可以获得新属性

    function EventTarget() { /** */}
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function() {/** */},
        on: function() {/** */}
    }

    let myObject = {};
    mixin(myObject, EventTarget.prototype);
    myObject.emit("something went changed");

    // 在这段代码中，myObject 接收 EventTarget.prototype 对象的所有行为，因此可以通过 emit() 发布事件，或者 on() 订阅事件
}

{
    // 任何使用 mixin() 方法的地方都可以是使用 Object.assign() 方法来完成
    function EventTarget() { /** */}
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function() {/** */},
        on: function() {/** */}
    }

    let myObject =  {};
    Object.assign(myObject, EventTarget.prototype);

    myObject.emit("sometthing went changedd");
}

{
    // Object.assign() 可以接收任意数量的对象，并按照指定顺序将属性复制到该对象中，所以如果多个对象具备同名属性，则靠后的源对象会覆盖排位靠前的。
    let receiver = {};

    Object.assign(receiver, 
        {
            type: "js",
            name: "file.js"
        },
        {
            type: "css"
        })

    console.log(TAG.ES6, receiver.type);
    console.log(TAG.ES6, receiver.name);
}

{
    /**
     * 访问器属性
     * 1. Object.assign()方法不能将提供者的“访问器”属性复制到“接收对象”
     * 2. 由于 Object.assign() 方法执行了 赋值 操作。因此提供者的访问器属性 最终会转变为对象中的一个 “数据属性”
     */
     
    let receiver = {},
        // supplier 有一个名为 name 的访问器属性
        supplier = {
            get name() {
                return "file.js"
            }
        }
    
    Object.assign(receiver, supplier);

    let descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
    console.log(TAG.ES6, descriptor.value); // 'file.js'
    console.log(TAG.ES6, descriptor.get);   // 'undefined'

    // 调用 Object.assign() 方法返回字符串 “file.js”，因此 receiver 接收这个字符串后，数据属性为 receiver.name
}

{
    // 重写对象字面量属性
    // ES5 中严格模式增加了对象字面量重复属性校验，同时存在多个相同属性会报错
    "use strict"

    let person = {
        name: "nick",
        name: "aaa"
    }

    console.log(TAG.ES6, person.name);  // "aaa"
    // ES6 中就删除了这种重复校验，而是会取最后一个属性为值
}

{
    // 自有属性枚举，ES6 中枚举属性的返回顺序，这会影响到 Object.getOwnPropertyNames() 方法及 Reflect.ownKeys,Object.assin() 的处理方式也会改变
    // 自有属性枚举基本顺序枚举规则
    
    /**
     * 1. 所有数字键按升序排序
     * 2. 所有字符串按照它们被加入对象的顺序排序
     * 3. 所有 symbol 键按照它们被加入对象的顺序排序
     */
    let obj = {
        a: 1,
        0: 1,
        c: 1,
        2: 1,
        b: 1,
        1: 1
    }

    obj.d = 1;

    console.log(TAG.ES6, Object.getOwnPropertyNames(obj).join("")); // 012acbd
    // 该方法按照0、1、2、a、c、b、d的顺序返回定义的属性
}

{
    // 增强对象原型

    // ================= 改变对象原型 =================
    /**
     * ES5 之前，对象实例化后，原型不可以改变
     * 可以通过 Object.getPrototypeOf() 获取当前对象的原型
     * ES6 可以通过 Object.setPrototypeOf() 来修改对象原型
     */

    let person = {
        getGreeting() {
            return "Hello";
        }
    };

    let dog = {
        getGreeting() {
            return "Woof";
        }
    };

    // 以 person 对象为原型
    let friend = Object.create(person);
    console.log(friend.getGreeting());  // Hello
    console.log(Object.getPrototypeOf(friend) === person);  // true

    // 将原型设为 dog
    Object.setPrototypeOf(friend, dog);
    console.log(friend.getGreeting());  // Woof
    console.log(Object.getPrototypeOf(friend) === dog);
    // 操作 [[Prototype]] 的方法 Object.setPrototypeOf()
}

{
    // 简化原型的 Super 访问
    /**
     * 假设你需要重写对象实例的方法，又要调用与它同名的原型方法
     */

    console.log(TAG.ES5, "使用");
    let person = {
        getGreeting() {
            return "hello";
        }
    };

    let dog = {
        getGreeting() {
            return "woof";
        }
    };

    let friend  = {
        getGreeting() {
            // ES5 实现
            // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi";
            // ES6 实现，super 相当于指向对象原型的指针
            return super.getGreeting() + ", hi";
        }
    };

    // 将原型设为 person
    Object.setPrototypeOf(friend, person);
    console.log(friend.getGreeting());  // Hello, hi
    console.log(Object.getPrototypeOf(friend) === person);  // true

    // 原型设为 dog
    Object.setPrototypeOf(friend, dog);
    console.log(friend.getGreeting());  // Woof, hi
    console.log(Object.getPrototypeOf(friend) === dog);  // true

    // 使用 super.getGreeting() 相当于在当前上下文中调用 Object.getProtypeOf(this).getGreeting.call(this)
}

{
    /**
     * 总结
     * 1. 对象是 JavaScript 编程的核心
     * 2. ES6 中对象方法简写，function 简写，重复属性名覆盖
     * 3. Object.assign() 一次性更改对象中的多个属性
     * 4. Object.is() 有时候比 === 比较更安全
     * 5. ES6 中自有属性的枚举顺序
     * 6. ES6 修改原型：Object.setPrototypeOf()
     * 7. 使用 super 关键字调用对象原型上的方法，此时 this 绑定会自动设置当前作用域的 this 值
     */
}