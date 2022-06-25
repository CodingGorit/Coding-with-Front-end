/**
 * Author：Gorit  
 * Date：2022年6月20日
 * Refer：《深入理解ES6》 
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


// template
{
    const name = "使用 set 验证属性陷阱";
    console.log(TAG, `${name} ============== begin ==================`);


    console.log(TAG, "============== end ==================");
}

