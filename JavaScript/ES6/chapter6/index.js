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
    const name = "Symbol.hasInstance"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * 每个函数都有 Symbol.hasInstance 方法，用于确定对象是否为函数的实例。
     * 该方法在 Function.prototype 中定义，所有的函数都继承了 instanceof 属性的默认行为
     * 为了确保 Symbol.hasInstance 不被意外重写，该方法被定义为不可写，不可配置，且不可枚举
     * 
     * Symbol.hasInstance 方法只接受一个参数，即要检查的值。如果传入的值是函数的实例，则返回 true
     * 可以看下面的实例
     */

    let obj = [];

    // 本质上，ES6 将 instanceof 操作符重新定义为此方法的简写语法
    console.log(TAG.ES6, name, obj instanceof Array);

    // 等价于

    console.log(TAG.ES6, name, Array[Symbol.hasInstance](obj));

    // 你可以通过定义一个无实例的函数，就可以将 Symbol.hasInstance 得返回值硬编码 false
    function MyObject () {
        // 空函数
    }

    Object.defineProperty(MyObject, Symbol.hasInstance, {
        value: function(v) {
            return false;
        }
    });

    console.log(TAG.ES6, obj instanceof MyObject);  // false

    // 这里告诉我们，只有通过 Object.defineProperty() 才能改写一个不可写属性，使其始终返回一个固定值

    // 还可以基于任意条件，通过值检查来确定被检测是否为实例，举个例子，可以将 1~100 的数字定义为一个特殊数字类型的实例

    function SpecialNumber () {
        // 空函数
    }

    Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
        value: function(v) {
            return (v instanceof Number) && (v >= 1 && v <= 100);
        }
    });

    let two = new Number(2);
    let zero = new Number(0);
    console.log(TAG.ES6, two instanceof SpecialNumber); // true
    console.log(TAG.ES6, zero instanceof SpecialNumber);  // false

    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // Symbol.isConcatSpreadable
    const name = "Symbol.isConcatSpreadable"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // JS 数组的 concat() 方法被设计用于拼接两个数组
    let colors1 = ["red", "green"],
        colors2 = colors1.concat(["blue", "black"]);
    console.log(TAG.ES6, colors2.length);   // 4
    console.log(TAG.ES6, colors2);

    // concat 也可以接收非数组参数, 此是会将其添加到数组末尾
    let colors3 = colors1.concat(["blue", "black"], "purple");
    console.log(TAG.ES6, colors3);  // ES6 [ 'red', 'green', 'blue', 'black', 'purple' ]


    // Symbol.isConcatSpreadable 属性是一个 布尔值,若值为 true,则表示对象有 length 属性 和 数字见,故它的数值型属性应该被独立添加到 concat() 调用的结果中,这个 Symbol 属性默认情况下不会出现在标准对象
    // 是一个可选属性,用于增强作用于特定对象类型的 concat() 方法的功能,有效简化其默认特性
    // 见下面这个示例 
    let collection = {
        0: "Hello",
        1: 'world',
        length: 2,
        [Symbol.isConcatSpreadable]: true
    };

    let messages = ["Hi"].concat(collection);
    console.log(TAG.ES6, messages.length);
    console.log(TAG.ES6, messages);

    // 这个示例中,创建了一个类数组对象 collection,它有一个 length 属性,还有两个数字数字键, Symbol.isConcatSpreadable 属性为 true
    // 表明属性值应当作为独立元素添加进数组中

    // 也可以在派生数组子类中将 Symbol.isConcatSpreadable 设置为 false,从而防止元素在调用 concat 时被分解
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 一些字符串的 Symbol 属性
    const name = "一些字符串的 Symbol 属性"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    /**
     * Symbol.match  match(regex) 确认给定字符串是否匹配正则表达式 regex
     * Symbol.replace  replace(regex, replacement) 将字符串匹配的正则表达式部分替换为 replacement
     * Symbol.search  search(regex) 在字符串中定位匹配正则表达式 regex 的位置索引
     * Symbol.split  split(regex) 按照正则表达式 regex 的元素将字符串分切,并将结果存入数组
     */

    console.log(TAG.ES6, `============== ${name} end ====================`);
}


{
    // Symbol.toPrimitive
    const name = "Symbol.toPrimitive"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    /**
     * 作用:更改比较暴露出的值(原始值)
     * 
     * 该方法被定义在每个标准类型原型上,并且规定了当对象转换为原始值应执行的操作.每当执行原始值转换时,总会调用 Symbol.toPrimitive
     * 方法并传入一个值作为参数,这个值在规范中被称作类型提示(hint)
     * 类型提示参数
     * 1. "number" 返回值数字
     * 2. "string" 返回值字符串
     * 3. "default" 返回值无类型偏好值
     */

    // 数字模式优先级
    // 1. 调用 valueOf() 若为原始值,则返回
    // 2. 否则调用 toString() 方法,如果结果为原始值,则返回
    // 3. 若无可选值,则抛出异常

    // 字符串模式优先级
    // 1. 调用 toString() 方法,如果结果为原始值,则返回
    // 2. 否则调用 valueOf(), 若为原始值,则返回
    // 3. 若无可选值,则抛出异常

    // 大多数情况, 默认对象会将默认模式按照数字模式处理 (除了 Date对象),这种情况会按照字符串模式
    // 如果自定义了 Symbol.toPrimitive, 可以覆盖这些默认强制转换特性

    function Temperture(degrees) {
        this.degrees = degrees;
    }

    // 覆写默认的转换属性,可以将函数的 Symbol.toPrimitive 赋值为一个新函数
    Temperture.prototype[Symbol.toPrimitive] = function(hint) {
        switch (hint) {
            case "string":
                return this.degrees + "\u00b0"; // degress symbol
            case "number":
                return this.degrees;
            case "default":
                return this.degrees + " degress";

        }
    };

    let freezing = new Temperture(32);
    console.log(TAG.ES6, freezing + "!");   
    console.log(TAG.ES6, freezing / 2);
    console.log(TAG.ES6, String(freezing));

    // ES6 32 degress! 默认模式
    // ES6 16   数字模式
    // ES6 32°  字符串模式 Unicode 编号
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // Symbol.toStringTag
    const name = "Symbol"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * 在一个页面存在 iframe 之类的内容时，就会出现两个全局环境
     * 但是这两个环境无法进行对象共享
     * 
     * 比如判断数组 instanceof Array 在另一个领域页面会 拿到 false
     */

    // 针对类型识别的问题解决方案

    function isArray (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    }

    console.log(TAG.ES6, isArray([]));  // true

    // 类似要区分全局 JSON
    function supportNativeJSON() {
        return typeof JSON !== "undefined" && Object.prototype.toString().call(JSON) === "[object JSON]";
    }

    // Object.prototype 能跨过 iframe 的边界识别数组，使用类似的特性就能区分自建 JSON


    // 在 ES6 定义对象字符串标签，通过 Symbol.toStringTag，这个 Symbol 改变调用了 Object.prototype.toString() 返回的标识符。这个 Symbol 所定义的属性每个对象都存在
    // 其定义了调用对象的 Object.prototype.toString.call() 方法时返回的值。对于数组，调用那个函数返回的值通常是 “Array”，它正是存储在对象的 Symbol.toStringTag属性中

    function Person(name) {
        this.name = name;
    }

    Person.prototype[Symbol.toStringTag] = "Person";    // 使用了该定义，此是不再继承 Object.prototype.toString()

    Person.prototype.toString = function() {
        return this.name;
    }
    let person = new Person("Nicks");
    console.log(TAG.ES6, person);
    console.log(TAG.ES6, person.toString());
    console.log(TAG.ES6, Object.prototype.toString.call(person));

    // ES6 Person { name: 'Nicks' }
    // ES6 Nicks
    // ES6 [object Person]

    // 我们可以用此方式修改内建方式的值，但是不建议这么做 Person.prototype[Symbol.toStringTag] = "Person";
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // Symbol.unscopables
    const name = "Symbol.unscopables"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // ES6 如何兼容使用 with 语句，未来不会使用这个，严格模式不允许使用 with
    let values = [1,2,3],
    colors = ["red", "green", "blue"],
    color = "black";

    with(colors) {
        push(color);
        push(...values);
    }
    console.log(TAG.ES6, colors);

    // [ 'red', 'green', 'blue', 'black', 1, 2, 3 ]

    /**
     * 这个示例 with 调用了两次 push 方法，等价调用了两次 colors.push() ，因为 with 已经将 push 添加为局部绑定了
     * color 和 values 都是引用外部 with 语句创建的变量
     * 
     * 但是在 ES6 中，数组添加了一个 values 方法
     * 简单来说，with 引用的是数组自带的 value是方法，而不是 with 语句外部的变量 values
     * 这样就脱离代码原本的目的，因此 ES6 也添加了 Symbol.unscopables 这个 Symbol 来解决问题
     * 
     * Symbol.unscopables 通常用于 Array.prototype，以 with语句中标示出不创建绑定的属性名
     * Symbol.unscopables 是以对象的形式出现的，它的键是在 with 中要忽略的标识符
     */

    // 创建原型为 null 的对象
    Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null), {
        copyWithin: true,
        entries: true,
        fill: true,
        find: true,
        findIndex: true,
        keys: true,
        values: true
    });

    // 不要乱用 Symbol.unscopables 属性，除非在代码中使用 with 并且正  修改代码库已有的对象
    console.log(TAG.ES6, `============== ${name} end ====================`);   
}

{
    /**
     * 总结
     * 1. Symbol 是 ES6 新的原始类型，必须通过 Symbol 才能引用的属性，但是比较难以意外复写改变
     * 2. Symbol 可以添加描述，这样更好的区分每个 Symbol 的用户，全局作用域有个 Symbol 注册表
     * 3. ES6 通过 Object.getOwnPropertySymbols() 检索 Symbol 属性，Object.defineProperties() Object.defineProperty() 仍可以改变 Symbol
     * 4. well-known Symbol 定义了一些内置的 Symbol 比如 Symbol.hasInstance()
     */
}