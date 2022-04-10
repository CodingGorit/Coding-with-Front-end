
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
    // 声明函数时，可以为任意参数指定默认值，在已指定默认的参数后可以继续声明无默认值参数。由于是在 TS 环境下，为避免报错，才加的 callback?
    function makeTest(url, timeout = 2000, callback?) {

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
    // TypeScript 中，通过 '?' 即可指定默认参数，!类型断言表示参数一定存在
    const bigger = (params1, param2) => {
        console.log(param2);
    }
}

/**
 * common function
 * @param body 
 */
function doSomething(body) {
    console.log(typeof body);
}