/**
 * Author：Gorit  
 * Date：2022年6月20日
 * Refer：《深入理解ES6》 
 */
const TAG = "chapter16";

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
    // | 代理陷阱        覆写特性                默认特性
    // | get            读取一个属性值           Reflect.get()
    // | set            写入一个属性             Reflect.set()
    // | has            in操作符                Reflect.has()


    /**
     * 每个陷阱覆写 JavaScript 对象的一些内建特性，可以用它们拦截并修改这些特性。
     * 如果仍需使用内建特性，则可以使用相应的反射 API 方法
     * 创建代理会让 代理 和 反射 API 关系变得清楚，所以我们最好深入进去看一下示例
     */
}   
