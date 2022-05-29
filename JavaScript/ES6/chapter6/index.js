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
    // Symbol 共享体系
    const name = "Symbol 共享体系"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    // 创建一个共享的 Symbol，可以用 Symbol.for() 方法，只接收一个参数，也就是要创建的 Symbol 的字符串标识符，这个参数也可以作为 Symbol 的描述    

    /**
     * Symbol.for() 方法首先在全局 Symbol 注册表中搜索键为 “uid”的 Symbol 是否存在，如果存在，直接返回已有的，不存在会先创建一个 Symbol，然后再返回
     * 如果后面创建一个一样的，返回的是相同的 Symbol
     */
    let uid = Symbol.for("uid");
    let uid1 = Symbol.for("uid");
    let object = {};

    object[uid] = "123";
    console.log(TAG.ES6, object[uid]);
    console.log(TAG.ES6, uid);

    console.log(TAG.ES6, uid === uid1); // true

    // 还有个相关的方法 Symbol.keyFor() 会在 Symbol 全局表中检索与 Symbol有关的键
    let uuid = Symbol.for("uuid");
    console.log(TAG.ES6, Symbol.keyFor(uuid));

    let uuid1 = Symbol.for("uuid");
    console.log(TAG.ES6, Symbol.keyFor(uuid1));

    let uuid2 = Symbol("uuid"); // 全局注册表中 没有 uuid2 这样的键，所以最终返回 undefined
    console.log(TAG.ES6, Symbol.keyFor(uuid2));

    // ES6 uuid
    // ES6 uuid
    // ES6 undefined
    console.log(TAG.ES6, `============== ${name} end ====================`);

    // Symbol 全局注册是一个类似全局作用域的共享环境，因此不能假设当前存在哪些键，使用第三方组件时，尽量使用 Symbol 键命名以减少命名冲突
}

{
    // Symbol 与类型强制转换
    const name = " Symbol 与类型强制转换"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // JavaScript 可以自动类型转换，但是 Symbol 不支持类型转换

    let uid = Symbol.for("uid");
    desc = String(uid);
    console.log(TAG.ES6, desc); // Symbol 默认行为 Symbol(uid)

    // desc1 = uid + 1;    // error

    // desc2 = uid + ''     // error
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // Symbol 属性检索
    const name = "Symbol 属性检索"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let uid = Symbol.for("uid");
    let object = {
        [uid]: "1234"
    };

    let symbol = Object.getOwnPropertySymbols(object);
    console.log(TAG.ES6, symbol.length); // 1
    console.log(TAG.ES6, symbol[0]);    // Symbol(uid)
    console.log(TAG.ES6, object[symbol[0]]);    // 1234
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些暴露的内部操作的方法
    const name = "Symbol 内部操作"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * ES6 开放了以前 JavaScript 中常见的内部操作
     * Symbol.hasInstance 一个执行 instanceof 时调用的内部方法，用于检测对象的继承信息
     * Symbol.isConcatSpreadable 一个布尔值，用于表示传递一个集合时，作为 Array.prototype.concat() 方法的参数时，是否应当将集合内的元素规整到同一层级
     * Symbol.iterator 一个返回迭代器的方法（见 chapter8）
     * Symbol.match 一个在调用 String.prototype.match() 方法时调用的方法，用于比较字符串
     * Symbol.replace 一个在调用 String.prototype.replace() 方法时调用的方法，用于替换字符串
     * Symbol.search 一个在调用 String.prototype.search*() ..， 用于在字符串中定位子串
     * Symbol.species 用于创建派生对象（chapter9）的构造函数
     * Symbol.split String.prototype.split，用于分割字符串
     * Symbol.toPrimitive 一个返回对象原始值的方法
     * Symbol.toStringTag 一个在调用 Object.prototype.toString() 方法时使用的字符串，用于创建对象描述
     * Symbol.unscopables 一个定义了一些不可被 with 语句引用的对象属性名称的对象集合
     */
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // Symbol.hasInstance
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}


{
    // 一些
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}