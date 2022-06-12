const TAG = {
    ES5: "es5",
    ES6: "es6"
}


{
    // ES5 中的 set 与 map
    const name = "ES5 中的 set 与 map";
    console.log(TAG.ES6, "================" + name + "===================");
    let set = Object.create(null);
    set.full = true;
    
    // 检查属性是否存在
    if (set.full) {
        // 业务逻辑
    }


    // 模拟 map
    let map = Object.create(null);
    map.foo = "bar";

    let value = map.foo;
    console.log(TAG.ES5, value);

    // 问题来了
    map[5] = "aaa";
    console.log(TAG.ES5, map[5]);   // aaa
    console.log(TAG.ES5, map["5"]); // aaa
    console.log(TAG.ES6, "================" + name + "===================");
}

// weak set
{
    // ES6 Weak Set
    const name = "ES6 Weak Set";
    console.log(TAG.ES6, "================" + name + "===================");

    // Set 可以被看作是一个强引用
    let set = new Set(),
    key = {};
    set.add(key);

    console.log(TAG.ES6, set.size); // 1

    delete key;
    key = null;

    console.log(TAG.ES6, set.size); // 1

    // Weak Set 可以被看作弱引用
    // weak set 只有 add() has() delete() 三个方法
    let weakSet = new WeakSet();
    let keyWeak = {};
    weakSet.add(keyWeak);   // true

    console.log(TAG.ES6, weakSet.has(keyWeak));

    weakSet.delete(keyWeak);
    console.log(TAG.ES6, weakSet.has(keyWeak)); // false
    console.log(TAG.ES6, "================" + name + "===================");
}

{
    // set 与 weak set 主要区别
    let set = new WeakSet(),
        key = {};

        set.add(key);

        console.log(set.has(key));  // true

        key = null; // 移除引用，keySet 中的也被移除

        console.log(set.has(key));  // false
}

/**
 * Weak Set 总结
 * 1. add() 传入非对象参数会导致程序报错，面向 has() 和 delete() 方法传入非对象参数会返回 false
 * 2. Weak Set 集合不可迭代，所以不能用 for - of
 * 3. Weak Set 不暴露任何迭代器，keys()，values()，无法通过程序本身检测其中内容
 * 4. Weak Set 不支持 forEach()
 * 5. Weak Set 不支持 size 属性
 */

// weak map
{
    // weak map 是 map 的弱引用集合，也用于存储对象的弱引用
    // weak map 中的键必须是一个对象，使用非对象键名会报错

    let map = new WeakMap(),
        element = document.querySelector(".element");
    
    map.set(element, "Original");
    let value = map.get(element);
    console.log(value); // Original

    // 移除 element 元素
    element.parentNode.removeChild(element);
    element = null;

    // 此是 map 集合为空


    // weak map 的使用场景用于 存储 DOM 元素
}

// weak map 集合初始化方法（传入一个 iteratorable 数组）
{
    let key1 = {},
        key2 = {},
        map = new WeakMap([key1, "Hello"], [key2, "42"]);

    console.log(map.has(key1)); // true
    console.log(map.get(key1)); // hello
    console.log(map.has(key2)); // true
    console.log(mao.get(key2)); // 42

}

// weak map 支持的方法
{
     let map = new WeakMap(),
        element = document.querySelector(".element")

    map.set(element, "Original");
    console.log(map.has(element));  // true
    console.log(map.get(element));  // Original

    map.delete(element);
    console.log(map.has(element));  // false
    console.log(map.get(element));  // undefined
}

// 私有对象数据
{

    function Person(name) {
        this._name = name;
    }

    // 私有化方法会被无意间覆写
    Person.prototype.getName = function() {
        return this._name;
    }
}

// ES5 创建真正的私有属性
{

    let Person = (function() {
        // 私有变量
        let privateData = {},   // 存储每个实例的私有信息
            privateId = 0;

        function Person(name) {
            Object.defineProperty(this, "_id", { value: privateId++ });

            privateData[this._id] = {
                name: name
            };
        }

        Person.prototype.getName = function () {
            return privateData[this._id].name;
        };

        return Person;
    })();

    // 这种写法虽然保证了this._id 实际上很安全，因为通过立即调用函数表达式（IIFE) 生成

    // 但是不主动管理，由于无法获取对象何时被销毁，privateData 就永远不会消失，使用 WeakMap 可以解决这个问题
}

// 改进
{
    // 调用 Person 构造函数时，新条目会被添加到 Weak Map 集合中，条目是 this，值是对象包含的私有信息
    let Person = (function() {
        /**
         * 由于 Person 对象可以直接作为键使用，无序维护 ID 来跟踪数据
         */
        let privateData = new WeakMap();

        function Person(name) {
            privateData.set(this, {name: name});
        }
        
        // 对象的值是一个 name 属性对象，调用 getName() 时，会将this 传入 privateData.get() 方法作为参数获取私有信息，即获取 value 对象并访问 name 属性
        Person.prototype.getName = function() {
            return privateData.get(this).name;
        }

        return Person;
    })();

    // 这里只要对象实例销毁，相关信息也会销毁，从而保证信息的私有性
}

/**
 * Set 之间的值与值是通过 Object.is() 进行比较的，自动过滤重复值
 * WeakSet 是特殊 Set 集合，集合只存放对象的弱引用。同时不可以被检查，因此追踪成组的对象是该集合的最好方式
 * Map 也是通过 Object.js() 来过滤重复值
 * WeakMap 存放的 键 也是对象的弱引用。非常适用于 实际使用 与 生命周期管理分离的对象添加额外信息
 */