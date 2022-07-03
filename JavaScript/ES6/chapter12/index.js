/**
 * Author：Gorit  
 * Date：2022年6月20日
 * Refer：《深入理解ES6》 
 * description：本章节学的是 代理 和 反射，创建代理，用反射来拦截操作
 */
const TAG = "chapter12";

{
    console.log(TAG, "=========== begin =============");
    // 代理 Proxy 和 反射 Reflection

    // 代理：数组问题
    // ES6 之前，不能通过自定义对象模仿 JavaScript 数组对象的行为方法。
    // 给数组特定对象赋值时，影响到数组的 length 属性，也可以通过 length 属性修改数组元素

    let colors = ["red", "green", "blue"];
    console.log(colors.length);


    colors[3] = "white";
    console.log(colors[3]); // white

    colors.length = 2;

    console.log(colors.length); // 2
    console.log(colors[3]); // undefined
    console.log(colors[2]); // undefined
    console.log(colors[1]); // green

    // 将 length 设置为 2 时，会移除数组的后两个元素，而只保留前两个。
    // 在 ES5 之前开发者无法自己是实现这些行为，现在通过 “代理” 就可以了
    console.log(TAG, "=========== end =============");
}

// NOTE：数组属性 和 length 属性具有这种非标准行为，因而在 ES6 中数组被认为时奇异对象，与普通对象相对

{
    // 代理 和 反射

    // 代理文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy
    // 调用 new Proxy() 可创建代替其他对象其他目标（target）对象的代理，它虚拟化了目标，所以而这功能看起来一致

    // 代理可以拦截  JavaScript 引擎内部目标的底层对象操作，这些底层操作被拦截后 会触发相应特定操作的陷阱函数

    // 反射 API 以 Reflect 对象形式出现，对象中方法的默认特性 与 相同底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名 和 参数都相同的 Reflect 方法

    // ================ 代理 陷阱的特性 ======================
    // | 代理陷阱        覆写特性                    默认特性
    // | get            读取一个属性值               Reflect.get()
    // | set            写入一个属性                 Reflect.set()
    // | has            in 操作符                    Reflect.has()
    // | deleteProperty delete 操作符                Reflect.deleteProperty()
    // | getPropertyOf  Object.getPropertyOf()      Reflect.getPropertyOf()
    // | setPropertyOf  Object.setPropertyOf()      Reflect.setPropertyOf()
    // | isExtensible   Object.isExtensible()       Reflect.isExtensible()
    // | preventExtensions Object.preventExtensions() Reflect.preventExtensions()
    // | getOwnPropertyDescriptor Object.getOwnPropertyDescriptor() Reflect.getOwnPropertyDescriptor()
    // | defineProperty Object.defineProperty()     Reflect.defineProperty()
    // | ownKeys        Object.keys()               Reflect.ownKeys()
    // |                Object.getOwnPropertyNames()
    // |                Object.getOwnPropertySymbols()
    // | apply          调用一个函数                 Reflect.apply()
    // | construct      用 new  调用一个函数         Reflect.construct()


    /**
     * 每个陷阱覆写 JavaScript 对象的一些内建特性，可以用它们拦截并修改这些特性。
     * 如果仍需使用内建特性，则可以使用相应的反射 API 方法
     * 创建代理会让 代理 和 反射 API 关系变得清楚，所以我们最好深入进去看一下示例
     */
}

{
    // 创建一个简单代理
    const name = "创建一个简单代理";
    console.log(TAG, `${name} ============== begin ==================`);
    // 用 Proxy 构造函数创建代理需要传入两个参数：目标 target， 处理程序 handler
    let target = {};

    let proxy = new Proxy(target, {});
    proxy.name = "proxy";   // 给 proxy 赋值 name 属性时，会在目标上创建 name
    console.log(proxy.name);    // proxy
    console.log(target.name);   // proxy

    target.name = "target";
    console.log(proxy.name);    // target
    console.log(target.name);   // target

    // 这里代理将所有的操作转发给目标。代理只是简单的将操作转发给目标，它不会存储这个属性。
    // 由于 proxy.name 和 target.name 引用的都是 target.name，因此二者的值相同。所以为 target.name 设置新值后，proxy.name 的值也会变化
    console.log(TAG, "============== end ==================");
}

{
    // 使用 set 验证属性陷阱
    const name = "使用 set 验证属性陷阱";
    console.log(TAG, `${name} ============== begin ==================`);

    let target = {
        name: "target"  // 1. 创建一个属性是数字的对象
    };


    // 这段代码创建了代理来验证添加到 target 中的属性
    let proxy = new Proxy(target, {
        /**
         * 
         * @param {*} trapTarget 接收属性（代理目标）的对象
         * @param {*} key 要写入的属性键（字符串 或 Symbol 类型）
         * @param {*} value 被写入的值
         * @param {*} receiver 操作发生的对象，通常是代理
         * @returns 
         */
        set(trapTarget, key, value, receiver) {

            // 忽略不希望受到已有属性的影响，排查是否存在该属性
            if (!trapTarget.hasOwnProperty(key)) {          // 2. 对象中每新增一个属性都要加以验证，我们可以定义一个 set 陷阱来覆写设置的默认特性
                if (isNaN(value)) {
                    throw new TypeError("属性必须是数字");
                }
            }

            // 添加属性
            return Reflect.set(trapTarget, key, value, receiver);
        }
    });

    // 添加一个新属性
    proxy.count = 1;
    console.log(proxy.count);
    console.log(target.count);

    // 由于目标值已有默认属性 name，直接修改
    proxy.name = "proxy";
    console.log(proxy.name);
    console.log(target.name);

    // 给不存在的属性赋值，会抛出异常
    // proxy.author = "aaa";

    // set 代理陷阱可以拦截写入属性的操作，get 代理陷阱可以拦截读取属性的操作
    console.log(TAG, "============== end ==================");
}

{ 
    const name = "用 get 陷阱验证对象结构（Object Shape)";
    console.log(TAG, `${name} ============== begin ==================`);
    let target = {};
    console.log(target.name);   // undefined  js 读取不存在的属性不会报错，会使用 undefined 来代替

    // 但是当输入错误的属性名时，通过代理检查对象结构可以回避这个问题
    // 对象结构是指所有可用属性和方法的集合， JS 引擎通过通过对象结构来优化代码，通常会创建类来表示对象
    // 由于通过读取属性才会检查属性，所以无论对象是否存在某个属性，都可以通过 get 陷阱来检查，接收三个参数
    /**
     * - trapTarget 被读取属性的源对象（代理的目标）
     * - key 要读取的属性键（字符串或 Symbol）
     * - receiver 操作发生的对象（通常是代理）
     */
    // 可以使用 Reflect.get() 接收 3 个参数并返回属性的默认值
    // 如果属性在目标不存在，则使用 get 陷阱和 Reflect.get() 时会抛出错误
    
    let proxy = new Proxy({}, {
        get(trapTarget, key, receiver) {
            // 这里为啥用 in 检查 receiver，而不检查 trapTarget，是为了防止 receiver 代理含有 has 陷阱，这种情况检查 trapTarget 可能会忽略 has 陷阱
            if (!(key in receiver)) {
                throw new TypeError("属性" + key + " 不存在");
            }
            return Reflect.get(trapTarget, key, receiver);
        }
    });

    // 在没有错误得情况下给 proxy 添加新属性 name，并写入指和读取值
    proxy.name = "proxy";
    console.log(proxy.name);    // "proxy"

    // 属性不存在，会抛出异常
    // console.log(proxy.nnt); // TypeError: 属性nnt 不存在

    console.log(TAG, "============== end ==================");
}

{
    const name = "使用 has 陷阱隐藏已有属性";
    console.log(TAG, `${name} ============== begin ==================`);
    // 用 in 操作符可以检测给定对象中是否有某个属性，如果自有属性或原型属性匹配这个名称 或 Symbol 就返回 true

    let target = {
        value: 64
    }

    console.log("value" in target); // true 自由属性
    console.log("toString" in target);  // true 继承自 Object 的原型属性

    // 二者在对象上都存在，所以用 in 操作符检测二者都返回 true，在代理中使用 has 陷阱可以拦截这些 in 操作符并返回一个不同值
    console.log(TAG, "============== end ==================");

    let target_ = {
        name: "target",
        value: 42   // value 属性将会被隐藏
    };

    let proxy = new Proxy(target_, {
        /**
         * 
         * @param {*} trapTarget 将要读取的属性对象
         * @param {*} key 检查的属性键
         * @returns 
         */
        has(trapTarget, key) {
            if (key === "value") {
                return false;
            } else {
                // Reflect.has() 接收这些参数并返回 in 操作符的默认相应，同时使用 has 陷阱和 Reflect.has() 可以改变一部分属性被 in 检测时的行为，并恢复另一些属性的默认行为
                return Reflect.has(trapTarget, key);
            }
        }
    });

    console.log("value" in proxy);  // false
    console.log("name" in proxy);   // true
    console.log("toString" in proxy);   // true
}

{
    const name = "使用 deleteProperty 陷阱防止删除属性";
    console.log(TAG, `${name} ============== begin ==================`);
    // delete 操作符可以从对象中移除属性，如果成功则返回 true，不成功则返回 false
    // 在严格模式下，如果尝试删除一个不可配置的属性，则会导致程序抛出错误，非严格模式下只是返回 false
    let target = {
        name: "target",
        value: 42
    };

    // 加上这个后，target.value 就拥有了不可配置属性，无法被删除
    Object.defineProperty(target, "name", { configurable: false }) ;

    console.log("value" in target);

    let result1 = delete target.value;
    console.log(result1);

    console.log("value" in target); // false

    // 注意：严格模式执行下面这行代码会抛出一个错误
    let result2 = delete target.name;
    console.log(result2);   // false

    console.log("name" in target);  // true

    // delete 可以删除 value，name 不可以（严格模式下会报错），在代理可以通过 deleteProperty 陷阱来改变该行为
    console.log(TAG, "============== end =========== ====");
}

{
    const name = "使用 deleteProperty 陷阱防止删除属性【验证】";
    console.log(TAG, `${name} ============== begin ==================`);
    let target = {
        name: "target",
        value: 12
    };

    let proxy = new Proxy(target, {
        // 二者可以确保 value 属性不会被删除
        deleteProperty(trapTarget, key) {

            // 就算调用了删除 delete proxy.value 一样返回 false
            if (key === "value") {
                return false;
            } else {
                return Reflect.deleteProperty(trapTarget, key);
            }
        }
    });

    // 尝试删除 proxy.value
    console.log("value" in proxy);  // true

    let result1 = delete proxy.value;
    console.log(result1);   // false    【删除失败了】

    console.log("value" in proxy);  // true

    // 尝试删除 proxy.name
    console.log("name" in proxy);   // true

    let result2 = delete proxy.name;
    console.log(result2);   // true

    console.log("name" in proxy);   // false
    console.log(TAG, "============== end ==================");

    // 适用场景，保护属性不被删除，而且严格模式下不会出错
}

{
    const name = "原型代理陷阱";
    // setPropertyOf、getPropertyOf 拦截 Object 对应的默认行为
    console.log(TAG, `${name} ============== begin ==================`);

    // setPropertyOf

    /**
     * 原型代理陷阱的运行机制
     * 1. getPropertyOf 陷阱必须返回对象 或null，只要返回值必将导致运行时错误
     * 2. 返回检查可以确保 Object.getPropertyOf() 返回的总是预期值
     * 3. 在 setPropertyOf 陷阱中，如果操作失败则一定返回的是 false
     * 4. 此时 Object.setPropertyOf() 会抛出错误
     * 5. 若 ssetPropertyOf 返回了任何不是 false 的值，那么 Object.setPropertyOf() 便假设操作成功
     */

    let target = {};
    let proxy = new Proxy(target, {
        getPrototypeOf(trapTarget) {
            return null;
        },
        setPrototypeOf(trapTarget, proto) {
            return false;
        }
    });

    let targetProto = Object.getPrototypeOf(target);
    let proxyProto = Object.getPrototypeOf(proxy);


    console.log(targetProto === Object.prototype);  // true
    console.log(proxyProto === Object.prototype);   // false  null === ~

    // 成功
    Object.setPrototypeOf(target, {});

    // 抛出错误
    // Object.setPrototypeOf(proxy, {});

    console.log(TAG, "============== end ==================");
}

{
    const name = "原型代理执行成功案例";
    console.log(TAG, `${name} ============== begin ==================`);
    // 实现 getPrototypeOf 和 setProptotypeOf 陷阱的默认行为
    let target = {};
    let proxy = new Proxy(target, {
        getPrototypeOf(trapTarget) {
            return Reflect.getPrototypeOf(trapTarget);
        },
        setPrototypeOf(trapTarget, proto) {
            return Reflect.setPrototypeOf(trapTarget, proto);
        }
    });

    let targetProto = Object.getPrototypeOf(target);
    let proxyProto = Object.getPrototypeOf(proxy);

    console.log(targetProto === Object.prototype);  // true
    console.log(proxyProto === Object.prototype);    // true


    // 成功
    Object.setPrototypeOf(target, {});
    Object.setPrototypeOf(proxy, {});
    console.log(TAG, "============== end ==================");

    /**
     * 区分 Reflect.getPrototypeOf Reflect.setPrototypeOf 与 Object 上同名方法的重要差异
     * Object.getPrototypeOf() 和 Object.setPrototypeOf() 是高级操作，不是对象，会将参数强制转换为一个对象
     * Reflect.getPrototypeOf() Reflect.setPrototypeOf() 是底层操作，如果传入的不是对象，会抛出错误
     * 
     * Reflect.setPrototypeOf() 与 Object.setPrototypeOf() 方法也不近相同
     * 前者返回 bool 值表示是否操作成功，true 则代表成功
     * 
     * 后者操作失败就会抛出异常
     */

    // getPrototypeOf 转换
    let result1 = Object.getPrototypeOf(1);  // 1 属于值类型，
    console.log("getPrototypeOf 转换",result1 === Number.prototype);  // true
    
    // Reflect.getPrototypeOf(1);  // error 这个不会强制转换值得类型

    // setPrototypeOf
    let target1 = {};
    let result2 = Object.setPrototypeOf(target1, {});
    console.log("setPrototypeOf",target1 === result2);   // true

    let target2 = {};
    let result3 = Reflect.setPrototypeOf(target2, {});
    console.log("Reflect.setPrototypeOf" ,target2 === result3);   // false
    console.log(result3);    // true

    // 代理陷阱主要是 Object 和 Reflect 得区别
}

{
    const name = "对象可扩展性陷阱";
    console.log(TAG, `${name} ============== begin ==================`);
    // ES5 通过 Object.preventExtensions() 方法 和 Object.isExtensible() 方法修正了对象的扩展性

    // ES6 可以通过代理中 preventExtensions 和 isExtensible 陷阱拦截这两个方法并调用底层对象。两个陷阱都接收唯一参数 trapTarget 对象，并调用上面的方法

    // isExtensible 返回 bool 值，表示是否可扩展，preventExtensions 陷阱返回的也一定是布尔值

    // Reflect.preventExtensions() 方法 和 Reflect。isExtensible() 方法实现了陷阱中的默认行为，二者都返回布尔值

    let target = {};
    let proxy = new Proxy(target, {
        isExtensible(trapTarget) {
            return Reflect.isExtensible(trapTarget);
        },
        preventExtensions(trapTarget) {
            return Reflect.preventExtensions(trapTarget);
            // return false; // 自测时，必须返回 true，否则就抛出异常
        }
    });

    console.log(Object.isExtensible(target));   // true
    console.log(Object.isExtensible(proxy));    // true

    // 如果不想让其生效，在 proxy 中，preventExtensions 直接返回 false，这样操作就不会转发到底层目标了
    Object.preventExtensions(proxy);

    console.log(Object.isExtensible(target));   // false
    console.log(Object.isExtensible(proxy));    // false
    console.log(TAG, "============== end ==================");
}

{
    const name = "使用 deleteProperty 防止删除陷阱";
    console.log(TAG, `${name} ============== begin ==================`);
    // delete 操作符可以从对象移除属性，如果删除成功则返回 true，否则返回 false，在严格模式，
    // 如果你尝试删除一个不可配置（nonconfiggurable）属性，则会导致程序抛出错误，非严格模式下则是返回 false
    
    let target = {
        name: "target",
        value: 42
    };

    Object.defineProperty(target, "name", {configurable: false});

    console.log("value" in target); // true

    let result1 = delete target.value;
    console.log(result1);   // true

    console.log("value" in target); // false

    // 严格模式下，以下会抛出一个错误

    let result2 = delete target.name;
    console.log(result2);   // false

    console.log("name" in target);  // true

    console.log(TAG, "============== end ==================");
}

{
    // 使用 Reflect.deleteProperty 来修改该行为，防止属性被删除
    let target = {
        name: "target",
        value: 42
    };

    let proxy = new Proxy(target, {
        deleteProperty(trapTarget, key) {
            if (key === "value") {
                return false;
            } else {
                return Reflect.deleteProperty(trapTarget, key);
            }
        }
    });

    // 尝试删除 value
    console.log("value" in target); // true

    let result1 = delete proxy.value;   // true
    console.log("delete proxy.value", result1);   // false

    console.log("value" in proxy);  // true

    // 尝试删除 proxy.name
    
    console.log("name" in proxy);   // true

    let result2 = delete proxy.name;
    console.log(result2);   // true

    console.log("name" in proxy);   // false
}

{
    const name = "不使用 new 来调用构造函数";
    console.log(TAG, `${name} ============== begin ==================`);
    function Numbers(...values) {

        if (typeof new.target === "undefined") {
            throw new TypeError("该函数必须通过 new 调用");
        }

        this.values = values;
    }

    let numberProxy = new Proxy(Numbers, {
        // 通过 apply 调用 Reflect.construct 即可实现
        apply: function(trapTarget, thisArg, arugmentsList) {
            return Reflect.construct(trapTarget, arugmentsList);
        }
    });

    let instance = numberProxy(2,3,4,5);
    console.log(instance.values);

    console.log(TAG, "============== end ==================");
}

// 剩下的基本上都是和原型相关的操作了

// 总结
{
    const name = "总结";
    console.log(TAG, `${name} ============== begin ==================`);
    //  ES6 引入了反射 API 还引入了 Reflect 对象，使用代理陷阱 和 反射 API 可以过滤一些操作，它们默认执行内置行为，只在某些特定条件下，这些陷阱会被调用
    //  ES6 可撤销代理，通过 revoke() 函数禁用特殊代理，revoke() 函数会种植代理上所有功能
    //  实际用到的代理数量有限，用例较少，一般是 get、set、has 陷阱用的比较多一点
    console.log(TAG, "============== end ==================");
}

