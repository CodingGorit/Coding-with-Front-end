const TAG = {
    ES5: "ES5",
    ES6: "ES6"
}

/**
 * Symbol 与 Symbol 属性
 * ES6 新增的第六种原始属性 Symbol
 * 通过 Symbol 可以给属性添加非字符串名称
 */

{
    // 通过全局 Symbol 函数创建一个 Symbol
    const name = "创建 Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let firstName = Symbol();
    let person = {};
    person[firstName] = "Nick";
    console.log(TAG.ES6, person[firstName]);    // ES6 Nick
    console.log(TAG.ES6, `============== ${name} end ====================`);

    // PS Symbol 是原始值，因此调用 new Symbol() 会抛出异常
}

{
    // 使用 Symbol
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}