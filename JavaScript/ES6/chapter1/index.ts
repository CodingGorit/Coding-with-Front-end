/**
 * Author：Gorit  
 * Date：2022年3月21日  
 * Refer：《深入理解ES6》 
 */
const TAGS = {
    VAR: "var",
    LET : "let",
    DUPLICATE : "dup",
    CONST : "const",
    FUNC : "func"
}

/**
 * var declare
 */
{
    function getVarValue(condition: boolean) {
        if (condition) {
            var value = "val";
            console.log(value);
            return value
        } else {
            console.log(value); // undefined
            return null;
        }
    }

    function getVarValueDetail(condition: boolean) {
        var value;
        if (condition) {
            value = "val";
        } else {
            return null;
        }
    }

    getVarValue(true);
    getVarValue(false);
}

/**
 * let declare
 */
{
    function getLetValue(condition: boolean) {
        if (condition) {
            let value = "val";
            console.log(value);
            return value
        } else {
            // console.log(value); // error
            return null;
        }
    }

    // getLetValue(false);
}

// 禁止重复声明
{
    // var value = 30;  // error
    
    let value = 20;

    // ====================    
    let condition: boolean;
    var cnt = 40;

    if (condition) {
        let cnt = 50;   // ok 会覆盖全局作用域中的 cnt

    }
    console.log(TAGS.DUPLICATE,"cnt is =>", cnt);    // 40
}

// const
{
    let condition = true;

    const items = 5;

    // const notIntial;    // ts 1155 必须初始化

    // items = 6;  // ts 2588 常数

    if (condition) {
        const max = 11; // 通 let 也是块级作用域

    }
    // console.log(max);   // 出了 if， 就被销毁了，所以访问不到

    // var msg = "hahaha";    // 和 let 一样，不能声明同名标识符
    // let stars = 5;

    // const msg = "Hello";
    // const stars = 6;
}

// use const declare Object
{
    const dog = {
        name: "dog",
        age: 3
    }
    console.log(TAGS.CONST, "dog =>", dog);  // const dog => { name: 'dog', age: 3 }
    // dog = {}    // ts 2588 常量不能继续赋值

    dog.name = "PP";
    dog.age = 1;
    console.log(TAGS.CONST, "dog =>", dog);  // const dog => { name: 'PP', age: 1 }
}

// temporal dead zone
{
    let condition = true;
    
    // console.log(typeof value);

    if (condition) {
        // console.log(typeof value);  // ts 2448 声明之前使用了块级变量

        let value = "xxx";
    }
}

{
    for (var i = 0; i < 10; i++) {

    }
    // 由于变量提升，i 仍可访问
    console.log(TAGS.VAR, i);

    for (let j = 0; j < 10; j++) {

    }
    // can not find name 'j'
    // console.log(TAGS.LET, j);
}

// 循环中的函数
{
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        funcs.push(function () {
            console.log(TAGS.FUNC, i);
        })
    }

    funcs.forEach((item) => {
        // item(); // 期望输出 0 - 9，输出十次 10
    });

    // 在 let 和 const 出现之前，要这么处理
    var funcs1 = [];
    for (var j = 0; j < 10; j++) {
        funcs1.push((function(value) {
            // 调用函数表达式，强制生成计数器的副本
            return function() {
                console.log(TAGS.FUNC, value);
            }
        }(j)));
    }

    funcs1.forEach((item) => {
        // item();
    })

}

// 循环中的 let 函数
{
    let func = [];

    for (let i = 0; i < 9; i++) {
        func.push(function() {
            console.log(TAGS.LET, TAGS.FUNC, i);
        })
    }

    func.forEach(function(func) {
        // func();   // 0,1,2
    })
}

// for in
{
    var func = [],
        obj = {
            a: true,
            b: true,
            c: true
        }
    
    for (let key in obj) {
        func.push(function() {
            console.log(TAGS.FUNC, key);
        })
    }

    func.forEach(function(func) {
        func(); // a,b,c
    })
}

// for const
{
    var funcs = [],
    obj = {
        a: true,
        b: true,
        c: true
    }

    // for (const i = 0; i < 10; i++) {
    //     funcs.push(function() {
    //         console.log(TAGS.CONST, i);
    //     })
    // }

    for (const key in obj) {
        funcs.push(function() {
            console.log(TAGS.CONST, key);
        })
    }

    func.forEach(function(item) {
        item();
    })
     
}

// global area (Node.js 环境下为 globalThis)
{
    // under the Node.js enviroment
    // var RegExp = "Hello";   // ts 是有类型限制的，所以不会让你这么定义的
    // console.log(window.RegExp === RegExp);   // false

    let ncz = "Hi!";
    console.log(ncz in globalThis);     // false
}