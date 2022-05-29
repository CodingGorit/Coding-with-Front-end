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
    // Symbol 接受一个可选参数，其可以让你添加一段文本描述即将创建的 Symbol。这段描述不可用属性访问，但是建议加上，以便更好地调试
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let firstName = Symbol("first name");
    let person = {};

    person[firstName] = "Nicos";

    console.log(TAG.ES6, "first name" in person); // false
    console.log(TAG.ES6, person[firstName]);    // Nicos
    console.log(TAG.ES6, firstName);    // 在执行时，隐式的调用了 firstName 的 toString() 方法，所以它的描述会被打印到日志中

    // ES6 false
    // ES6 Nicos
    // ES6 Symbol(first name)
    console.log(TAG.ES6, `============== ${name} end ====================`);

    // Symbol 的描述被存储在内部的 [[Description]]属性中，只有当调用 Symbol的toString() 方法才能读取该属性，见上面第三条 console.log() 但是代码不能直接访问 [[Description]]
}

{
    // Symbol的辨识方法
    const name = "Symbol的辨识方法"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let symbol = Symbol("test symbol");
    console.log(TAG.ES6, typeof symbol);    // symbol
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol
    const name = "使用 Symbol"
    /**
     * 所有可使用计算属性名的地方，都可以使用 Symbol，之前都是在括号里面用的
     * Symbol 也可以用于计算对象字面量属性名
     * Object.defineProperty() 和 Object.defineProperties() 方法的调用过程中
     */
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let firstName = Symbol("first name");

    // 使用一个可计算对象字面量属性
    let person = {
        [firstName]: 'Nicko'
    };

    // 将属性设置为只读
    Object.defineProperty(person, firstName, {writable: false});

    let lastName = Symbol("last name");

    Object.defineProperties(person, {
        [lastName]: {
            value: "Zakas",
            writable: false
        }
    })

    console.log(TAG.ES6, person[firstName]);
    console.log(TAG.ES6, person[lastName]);

    // 本节示例：使用 Object.defineProperty() 和 Object.defineProperties() 创建了只读属性 firstName 和 lastName
    // 所有可使用计算属性的地方都可以使用 Symbol 代替，但是为了在不同地方都可以共享这些 Symbol，需要建立一个体系
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}