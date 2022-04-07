
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
    function add (first, second = getValue()) {
        return first + second;
    }

    // console.log(add(1, 1));  // 2
    // console.log(add(1));    // 6


    // ============= another example
    let val = 1;
    function getVal () {
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
    // function addErr (first = second, second) {
    //     return first + second;
    // }
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