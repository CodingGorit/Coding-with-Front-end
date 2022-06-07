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

}