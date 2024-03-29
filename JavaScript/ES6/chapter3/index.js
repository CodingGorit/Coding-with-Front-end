
const TAG = {
    ES5: "es5",
    ES6: "es6"
}
// function
{
    // 函数形参中的默认值

    // in es5, but it's not secure
    function makeRequest(url, timeout, callback) {
        timeout = timeout || 2000;  // what if timeout is zero?

        callback = callback || function () { };

        // ....
    }

    // in es5, more secure
    function makeRequest1(url, timeout, callback) {
        timeout = (typeof timeout !== 'undefined') ? timeout : 2000;

        callback = (typeof callback !== 'undefined') ? callback : function () { };
    }
}

{
    // default value in es6
    /**
     * 
     * @param url 必传参数
     * @param timeout 可选
     * @param callback 可选
     */
    function makeRequest2(url, timeout = 2000, callback = function (body) { }) {

    }

    // 根据 ES6 的语法 url 为必传参数
    makeRequest2("/foo");

    makeRequest2("/foo", 500);  // callback use default funcion

    makeRequest2("/foo", 500, (body) => {
        doSomething(body);
    });

}

{
    // 声明函数时，可以为任意参数指定默认值，在已指定默认的参数后可以继续声明无默认值参数
    function makeTest(url, timeout = 2000, callback) {

    }

    // timeout 作为默认参数时
    makeTest("/foo", undefined, function (body) {
        doSomething(body);
    });

    // timeout 作为默认参数时
    makeTest("/foo");

    // 不使用 timeout 作为默认参数时
    makeTest("/foo", null, function (body) {
        doSomething(body);
    });

    // ==== 默认参数值中，null 是合法值 ====
}

{
    // 默认参数对 arguments 对象的影响，es5 中使用默认参数值时，arguments 对象的行为会和以往不同

    function mixArgs(first, second) {
        console.log(TAG.ES5, first === arguments[0]);   // true
        console.log(TAG.ES5, second === arguments[1]);  // true
        first = "c";
        second = "d";
        console.log(TAG.ES5, first === arguments[0]);   // true
        console.log(TAG.ES5, second === arguments[1]);  // true
    }

    // mixArgs("a", "b");  // true true true true

    // 为啥会出现种情况呢？在非严格模式下，命名参数变化会同步更新到 arguments 对象中，
                   
    function mixArgs1(first, second) {
        'use strict';

        console.log(TAG.ES5, first === arguments[0]);   // true
        console.log(TAG.ES5, second === arguments[1]);  // true
        first = "c";
        second = "d";
        console.log(TAG.ES5, first === arguments[0]);   // true
        console.log(TAG.ES5, second === arguments[1]);  // true
    }

    // mixArgs1("a", "b"); // true true false false

    // es6  如果一个函数使用了默认参数值，则无论是否显示的定义了严格模式，arguments 对象的行为都将与 ES5 严格模式保持一致

    // 默认参数使 arguments 对象保持与命名参数分离

    function mixArgsInEs6(first, second = "b") {
        console.log(TAG.ES6, arguments.length);
        console.log(TAG.ES6, first === arguments[0]);   // true
        console.log(TAG.ES6, second === arguments[1]);  // false
        first = "c";
        second = "d";
        console.log(TAG.ES6, first === arguments[0]);   // true
        console.log(TAG.ES6, second === arguments[1]);  // false
    }

    // mixArgsInEs6("a");  // arguments[1] = undefined

}

{
    /**
     * 默认参数表达式
     * 1. 非原始值传参
     *  */

    // Get default value by function
    function getValue() {
        return 5;
    }

    // 初次声明函数不会调用 getValue() 方法，该方法会在调用 add() 且不传第二个参数才会被调用
    function add(first, second = getValue()) {
        return first + second;
    }

    // console.log(add(1, 1));  // 2
    // console.log(add(1));    // 6


    // ============= another example
    let val = 1;
    function getVal() {
        return val++;
    }

    // 只要调用了 addVal() 函数，就有可能求 second 默认值，任何时候都可以改变 “默认值”
    function addVal(first, second = getVal()) {
        return first + second;
    }

    // console.log(addVal(1, 1));  // 2
    // console.log(addVal(1)); // 2
    // console.log(addVal(1)); // 3

    // PS：在形参中中 getVal() 没有加括号，则传递的是函数的引用，而不是函数调用的结果

    // ================== 还可以这么做，默参数在函数调用时求职，所以可以用先定义的参数作为后定义参数的默认值
    function addSame(first, second = first) {
        return first + second;
    }

    // console.log(addSame(1, 1)); // 2
    // console.log(addSame(1));    // 2

    // ================== 将 first 的值传入一个函数来求 second
    function getSecondVal(value) {
        return value + 5;
    }

    function addSecondVal(first, second = getSecondVal(first)) {
        return first + second;
    }

    // console.log(addSecondVal(1, 1));    // 2
    // console.log(addSecondVal(1)); // 7

    // ts(2713) second 比 firt 后定义，不能作为 first 的默认值，这又涉及到了临时死区的概念
    // function addErr (first = second, second) {   // => addErr(undefined, xxx);
    //     return first + second;
    // }

    /**
     * note：
     * 所有引用临时死区中的绑定行为都会抛出异常
     * 函数有各自的作用域 与 临时死区
     * 函数的作用域都是各自独立的，因此 函数的默认值 不可访问 函数内部声明的变量
     */
}

{
    /**
     * 处理无名参数（ES5 中无名参数）
     * JS 中通过 arguments 对象来检查函数的所有参数，从而不必定义每一个要用到的参数
     * 下面的示例检查了 arguments 对象 
     * @param object 被复制属性的原对象  
     * @param other 其他为被赋值属性的名称
     */
    function pick(object) {
        let result = Object.create(null);

        // 从第二个参数开始
        for (let i = 1, len = arguments.length; i < len; i++) {
            result[arguments[i]] = object[arguments[i]];
        }

        // 返回 object 的副本
        return result;
    }

    let book = {
        title: 'Understanding ES6',
        author: 'GG',
        year: 2016
    };

    // @ts-ignore es5 no params
    let bookData = pick(book, 'author', 'year');

    // console.log(TAG.ES5,bookData.author);
    // console.log(TAG.ES5, bookData.year);

    // pick 传递了三个参数，但是函数实际上只定义了一个参数，为什么可以这么做呢？
    /**
     * 1. 第一个命名参数已经被占用
     * 2. 当要查找需拷贝对象的属性名称时，不得不从索引 1 而不是索引 0 开始遍历 arguments 对象
     */
}

{
    /**
     * ES6 中引入的不定参数，通过传入 ... 来表示是一个不定参数
     * 1. 该参数为一个数组，包含自它传入的所有参数
     * 2. 通过数组名即可逐一访问里面的参数
     * 3. 使用不定参数重写上面的 pick() 函数
     */
    function pick_overide_by_es6(object, ...keys) {
        let result = Object.create(null);

        for (let i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = object[keys[i]];
        }

        return result;
    }

    /**
     * 不定参数 keys 包含的是 object 传入的所有的参数（而 arguments 对象包含的是所有传入的参数，包括 object
     */
}

{
    // 不定参数的使用限制

    // ① 不定参数后不饿能有其他命名参数
    // function pick_waring1(object, ...keys, aaa) {
    //     // ...
    // }


    // ②不能用于对象的 setter 中
    let obj_waring2 = {

        // 不可以在 setter 中使用 ... （因为 setter 中只能有一个参数）
        // set name (...keys) {
        // ...
        // }
    }
}

{
    // 不定参数对 arguments 的影响
    function checkArgs(...args) {
        console.log(TAG.ES6, args.length);
        console.log(TAG.ES6, arguments.length);
        console.log(TAG.ES6, args[0], arguments[0]);
        console.log(TAG.ES6, args[1], arguments[1]);
    }

    checkArgs("a", "b");

    /**
     * 无论是否使用不定参数，arguments 总是包含所有传入函数的参数
     */
}

{
    // 增强的 Function，常用来动态创建新的函数，构造函数接受的必须是字符串形式的参数，及函数参数及函数体
    let add = new Function("first", "second", "return first + second");

    // console.log(add(1, 2)); // 2

    // ES6 的做法同样适合 Function => 支持默认参数
    let add1 = new Function("first", "second = first", "return first + second");

    // 支持不定参数，在最后一个参数加 ... 即可
    let add2 = new Function("...args", "return args[0]");

}

{
    // 展开运算符

    // Math.max(...args: number[]);
    let values = [25, 50, 75, 100];

    // 求最大值可以用循环遍历求，也可以用 apply()，但是 apply() 需要手动绑定 this，但是使用“展开运算符” 就没有这样的问题
    // console.log(TAG.ES5, Math.max.apply(values));

    // ES6  JS 引擎读取这段程序后会将参数数组分割为独立的参数依次传入 
    // console.log(TAG.ES6, Math.max(...values));

    // 防止出现负数
    // console.log(TAG.ES6, Math.max(...values, 0));

    // 大部分能用 apply() 的地方，其实也可以用“展开运算符”

}

{
    // ES6 中给每个函数新增了一个 name 属性
    function doSomeThing() {
        //  
    }

    let doSomeThings = function () {
        //
    }

    // console.log(TAG.ES6, doSomeThing.name); // 'doSomeThing'

    // console.log(TAG.ES6, doSomeThings.name);    // 'doSomeThings'

    // name 属性特殊情况 
    let doSomething1 = function doSomethingElse() {
        // 空函数
    }

    let person = {
        get firstName() {
            return "Helo";
        }

        // @ts-ignore
        // sayName: function() {
        //     console.log(this.name);
        // }
    }

    // console.log(doSomething1.name); // doSomethingElse
    // console.log(person.sayName.name);   // sayName
    // @ts-ignore
    // console.log(person.firstName.name); // "get firstName"

    // 有 setter 的话，前缀是 set

    /**
     * 通过 bind() 创建的函数，名称带有 "bound" 的前缀
     * 通过 Function 构造函数创建的，其名称前缀带有 "anonymous"
     */

    // console.log(doSomeThing.bind(doSomeThing).name);    // bound doSomeThing
    // console.log((new Function()).name); // "anonymous"


    // ps：  函数 name 属性的只不一定引用同名变量，它知识协助调试用的额外信息，所以不能使用 name 属性的值来获取对于函数的引用
}

{
    // 明确函数的多重用途, ES5 中函数有多重作用，可以结合 new 使用，函数内的 this 指向一个新对象，函数最终返回新对象
    function Person(name) {
        this.name = name;
    }

    let person = new Person("Nick");
    let notPerson = Person("Nick"); // 没有通过 new 调用 Person()，最终返回 undefined（在非严格模式下会在全局对象设置 name 属性）

    // console.log(TAG.ES5, person);   // es5 Person { name: 'Nick' }
    // console.log(TAG.ES5, notPerson);    // es5 undefined

    /**
     * 但是在 ES6 中，函数混乱的双重身份有了变化
     * ES6 中函数有两个不同的内部方法：[[Call]]、[[Construct]]
     * 区别：
     * 1. 通过 new  关键字调用函数时，执行的时 [[Construct]] 函数，它负责创建一个通常被称作实例的新对象。然后再执行函数体，将 this 绑定到实例上
     * 2. 否则执行 [[Call]] 函数，从而直接执行代码中的函数体
     * 
     * 同时具备 [[Construct]] 方法的函数被统称为构造函数
     * PS：不是所有函数都有 [[Construct]] 方法，所以不是所有函数都可以通过 new 调用，比如 箭头函数就没有 [[Construct]]
     */
}

{
    // ES5 中判断函数被调用的方法【instance】
    function Person1(name) {
        if (this instanceof Person1) { // new 调用
            this.name = name;
        } else {
            throw new Error("必须通过 new 调用");
        }
    }

    let person1 = new Person1("Noak");
    let notPerson1 = Person1.call(person1, "Mick");

    console.log(TAG.ES5, person1);  // es5 Person1 { name: 'Mick' }
    console.log(TAG.ES5, notPerson1);   // es5 undefined

    //  前面说过，[[Construct]] 方法会创建一个新实例，并将 this 绑定到这个新实例上，这样做有时也不可靠，还有种方式可以不依赖 new，将 this 绑定到实例上

    /**
     * 见 notPerson1, Person1.call() 时，将变量 person1 作为第一个参数，相当于在 Perons1 函数里将 this 设为了 person1 实例。但是函数本身无法区分是通过 Person.call() （或 Person.apply()） 还是 new 关键字调用得到的 Person 实例
     */
}

{
    // 元属性 new.target [es6 新属性]
    /**
     *  调用函数 [[Construct]] 方法， new.target 被赋值为 new 操作符的目标，通常是新创建对象实例，若调用 [[Call]] 方法，则 new.target 的值是 undefined
     */
    function Person2(name) {
        if (typeof new.target !== "undefined") {
            this.name = name;
        } else {
            throw new Error("必须通过 new 调用");
        }
    }

    // 在放弃使用 typeof instanceof Person 改为 new.target 检测，也可以使用 new.target 是否被某个特定函数调用
    function Person3(name) {
        if (new.target === Person3) {
            this.name = name;
        } else {
            throw new Error("必须通过 new 调用 Person3");
        }
    }

    function anotherOne(name) {
        Person2.call(this, name);
    }
    // let p = new Person2("nick");
    // let ao = new anotherOne("a");   // error

    // 函数外不能使用 new.target，属于错误语法, 在添加了 new.target 后， ES6 解决了函数调用的一些模棱两可的问题，以及另一个问题，在代码块中声明函数
}

{
    // 块级函数

    if (true) {
        console.log(TAG.ES6, typeof doSomeThing);

        doSomeThing();
    }

    // doSomething() 我们是在另一个代码块中定义的，但是 ES6 将其提升至全局作用域，在各个游览器中统一了标准
}

{
    // 箭头函数
    /**
     * 与传统函数的区别
     * 1. 没有 this，super，arguments 和 new.target 的绑定，前面讲到的属性将由最近一层非箭头函数决定
     * 2. 不能通过 new 关键字调用，箭头函数没有 [[Construct]]  方法，所以不能被用作构造函数
     * 3. 没有原型，没有通过 new 关键字调用箭头函数，同时没有构造原型的需求，所以不存在 prototype 属性
     * 4. 不可更改 this 的绑定，函数内部 this 不可改变
     * 5. 不支持 arguments 对象，箭头函数没有 arguments 绑定，所以必须通过命名参数 和 不定参数访问函数参数
     * 6. 不支持重复命名参数：无论严格模式 和 非严格模式，箭头函数都不支持重复命名参数；传统函数在严格模式下，不能由重复命名参数
     * 
     * 箭头函数消除了 this，减少了许多不必要的麻烦
     */

    // 箭头函数也有 name 属性，和其他函数一致\

    // eg
    const reflect =  value => value;
    const reflectFunc = function(value) {
        return value;
    }

    const sum = (num1, num2) => num1 + num2;
    const sumFunc = function(num1, num2) {
        return num1 + num2;
    }

    const getName = () => "Nick";
    const getNameFunc = function () {
        return "Nick";
    }

    const sum1 = (num1, num2) => {
        return num1 + num2;
    }
    // same as sumFunc


    const something = () => {};
    const somethingFunc = function() {}

    // return object in es6
    const doNothing = id => ({id: id, name: "xx"})
    const doNothongFunc = function(id) {
        return {
            id: id,
            name: "T"
        }
    }

}

{
    // 创建立即执行函数表达式【定义一个匿名函数，并立即调用，自始自终不保存对该函数的引用】

    // 创建一个与其他程序隔离的作用域

    let pp = function (name) {

        return {
            getName: function() {
                return name;
            }
        }
    }("mikas");

    // 这里立即函数创建了一个包含 getName() 方法的新对象，将参 name 作为该对象的一个私有成员返回给函数调用者

    let pp1 = ((name) => {

        return {
            getName: function() {
                return name;
            }
        }
    })("mikas");
    // 箭头函数包含小括号，即可实现相同功能
    // console.log(pp.getName());
}

{
    // 箭头函数没有 this 绑定
    /**
     * 函数内的 this 绑定很容易让人混淆 —— 函数内的 this 可以根据函数调用上下文而改变
     */

    let PageHandler = {
        id: "12345",

        init: function() {
            document.addEventListener('click', function(event) {
                this.doSth(event.type); // error, this 绑定的事件对象目标引用（document，而没有绑定 PageHandler），doSth 在 document 中不存在，在实际调用时会报错
            }, false);
        },

        doSth: function(type) {
            console.log("Handling ", type, " for " + this.id);
        }
    }

    // 解决方法一： 使用 bind() 将 this 绑定到 PageHandler
    let PageHandler1 = {
        id: "12345",

        init: function() {
            document.addEventListener('click', (function(event) {
                this.doSth(event.type); // error, this 绑定的事件对象目标引用（document，而没有绑定 PageHandler），doSth 在 document 中不存在，在实际调用时会报错
            }).bind(this), false);
        },

        // 这里用到了 bind(this)，实际上是创建了一个新函数，它的 this 被绑定到了当前 this，也就是 PageHandler，为了避免创建新函数，可使用 箭头函数

        doSth: function(type) {
            console.log("Handling ", type, " for " + this.id);
        }
    }

    let PageHandler2 = {
        id: "12345",

        init: function() {
            document.addEventListener('click', event => this.doSth(event.type), false) // error, this 绑定的事件对象目标引用（document，而没有绑定 PageHandler），doSth 在 document 中不存在，在实际调用时会报错
        },
        // 内部的 this 与 init() 函数的 this 一致，结果也和 bind(this) 一致

        doSth: function(type) {
            console.log("Handling ", type, " for " + this.id);
        }
    }

    // 解答：箭头函数缺少 prototype 属性，设计之初就是 “即用即弃”，所以不能用 new 调用箭头函数，前面讲过，箭头函数函数的 this 值取决于外部非箭头函数的 this值，不能通过 call() bind() apply() 改变 this 的值
}

{
    // 箭头函数与数组

    const arr = [2,4,1,3];
    let res = arr.sort(function(a, b) {
        return a - b;
    })

    let re1 = arr.sort((a, b) => a - b);

    // 还接受 reduce()、 map() 等回调方法
}

{
    // 箭头函数没有 arguments 绑定

    /**
     * 箭头函数没有自己的 arguments 对象，且未来无论函数在哪个上下文中执行，箭头函数始终可以访问外围函数的 arguments 对象
     * 
     */
    function createArrowFunctionReturningFirstArg() {
        return () => arguments[0];
    }

    let arrFunction = createArrowFunctionReturningFirstArg(5);
    console.log(TAG.ES6, arrFunction)
}

{
    // 箭头函数辨别方法

    let comparator = (a,b) => a-b;

    console.log(typeof comparator); // 'function'
    console.log(comparator instanceof Function);// true

    // 箭头函数调用 call() bind() apply() 时，this 值不会受到这些方法影响

    let sum2 = (num1, num2) => num1 + num2;
    console.log(sum2.call(null, 1, 2)); // 3
    console.log(sum2.apply(null, [1,2]));   // 3

    let bound = sum2.bind(null, 1, 2);
    console.log(bound()); // 3
}

{
    // ES6 尾调用优化，篇幅太长

    // 一个函数被作为另一个函数的最后一条语句被调用
    function doSth() {
        return doSomeThing();
    }

    /**
     * 满足被 JS 引擎优化的条件
     * 1. 尾调用不访问当前栈帧的变量（函数不是一个闭包）
     * 2. 在函数内部，尾调用时最后一条语句
     * 3. 尾调用结果作为函数值返回 
     */

    function fac(n, p = 1) {
        if (n <= 1) {
            return 1 * p;
        } else {
            let res = n * p;
            return fac(n - 1, res);
        }
    }

    // 重写递归函数，使 JS 引擎减小消耗 
}

{
    // TypeScript 中，通过 '?' 即可指定默认参数，!类型断言表示参数一定存在
    const bigger = (params1, param2) => {
        console.log(param2);
    }
}

{
    /**
     * common function
     * @param body 
     */
    function doSomething(body = "default") {
        console.log(typeof body);
    }
}