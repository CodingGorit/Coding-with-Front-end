const TAG = {
    ES5: "ES5",
    ES6: "ES6"
};


{
    /**
     * ES6 增加了迭代器的特性，Set、Map 都依赖于 迭代器实现。
     * 新的 for .. of 循环
     * 展开运算符 ...
     */
    let colors = ["red", "green", "yellow"];

    for (let i = 0, len = colors.length; i < len; i++) {
        console.log(TAG.ES5, colors[i]);
    }
}

{
    // 迭代器
    // 所有迭代器对象都有一个 next() 方法
    // 每次调用都返回一个结果对象，包含 value (值) 和 done (没数据时返回 true)
    // 迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每次调用 next()方法 都会返回下一个可用的值
    // 最后一个值调用了 next() 返回的值为 undefined，done 为true

    console.log(TAG.ES5, "Implement with Iterator in ES5");
    function createIterator(items) {
        let i = 0;
        return {
            next: function() {
                let done = (i >= items.length);
                let value = !done ? items[i++]: undefined;
                return {
                    done: done,
                    value: value
                };
            }
        };
    }

    let iterator = createIterator([1,2,3]);
    console.log(TAG.ES5, iterator.next());  // { done: false, value: 1 }
    console.log(TAG.ES5, iterator.next());  // { done: false, value: 2 }
    console.log(TAG.ES5, iterator.next());  // { done: false, value: 3 }
    console.log(TAG.ES5, iterator.next());

    // 最后的调用都会返回一样的结果
    console.log(TAG.ES5, iterator.next());  // { done: true, value: undefined }
}

{
    // ES6 中通过生成器来创建迭代器，但是得先知道什么是生成器
    // 生成器是一种返回迭代器得函数，通过 function 关键字后的 (*) 来表示，函数中会用到新关键字 yield， 星号可以紧挨着 function 关键字，也可以加个空格
    
    // 生成器
    function *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }

    // 生成器和普通函数调用方式一致，只不过返回一个迭代器
    let iterator = createIterator();
    console.log(TAG.ES6, iterator.next().value);    // 1
    console.log(TAG.ES6, iterator.next().value);    // 2
    console.log(TAG.ES6, iterator.next().value);    // 3

    // 生成器一个有趣的特性， yield 执行完后，就会停止执行，直到下次使用 next() 

    // 注意：yield 可以返回任何值 或者 表达式，因此我们可以在 for 循环中使用 yield
}

{
    console.log(TAG.ES6, "=============== implement iterator in ES6 begin ======================");
    // 实现上述 ES5 迭代器同样的功能
    function *createIterator(items) {
        for (let i = 0, len = items.length; i < len; i++) {
            yield items[i];
        }
    }

    let iterator = createIterator([1,2,3]);
    console.log(TAG.ES6, iterator.next());  // ES6 { value: 1, done: false  
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());

    console.log(TAG.ES6, iterator.next());  // ES6 { value: undefined, done: true 
    console.log(TAG.ES6, "=============== implement iterator in ES6 end ======================");
}

{
    /**
     * yield 使用限制
     * 1. yield 关键字只能在生成器内部使用，其他地方就会抛错，包括生成器内部的函数
     function *createIterator(items) {
 
         items.forEach(element => {
             // 语法错误
             yield element + 1;
         });
     }
     * yield 关键字 和 return 关键字一样，二者都不能穿透函数边界
     */

}

{
    // 使用生成器函数表达式
    const name = "生成器函数表达式";
    console.log(TAG.ES5, `============== ${name} begin ====================`);
    let createIterator = function *(items) {
        for (let i = 0, len = items.length; i < len; i++) {
            yield items[i];
        }
    }

    let iterator = createIterator([1,2,3]);
    console.log(TAG.ES6, iterator.next());  // ES6 { value: 1, done: false  
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());

    console.log(TAG.ES6, iterator.next());  // ES6 { value: undefined, done: true 
    console.log(TAG.ES5, `============== ${name} end ====================`);
}


{
    // 使用生成器对象的方法
    const name = "生成器对象的方法";
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    let o = {
        createIterator: function *(items) {
            for (let i = 0, len = items.length; i < len; i++) {
                yield items[i];
            }
        }
    }

    let iterator = o.createIterator([1,2,3]);

    // 对象简写
    let o1 = {
        *createIterator(items) {
            for (let i = 0, len = items.length; i < len; i++) {
                yield items[i];
            }
        }
    }
    let iterator1 = o1.createIterator([1,2,3]);

    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // for ... of ... TODO
}