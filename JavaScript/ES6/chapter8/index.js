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
    const name = "for-of"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // for ... of ... 
    // 可迭代对象具有 Symbol.iterator 属性，是一种与迭代器密切相关的对象

    // 由于生成器会为 Symbol.iterator 属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象
    // 使用 for...of.. 可以只关注集合要处理的内容，for-of 循环每执行一次都会调用可迭代对象的 next() 方法
    // 并将迭代器返回的结果对象的 value 属性存储在一个变量中,循环将持续执行这一过程直到返回对象的 done 属性的值为 true

    let values = [1,2,3];
    for (let num of values) {
        console.log(TAG.ES6, `current num is => ${num}`);
    }

    // for-of 实际上是调用数组 values 的 Symbol.iterator 的 next() 方法来获取迭代器,这一过程是在 JavaScript 引擎背后完成的
    // 随后迭代器的 next() 方法被多次调用,其返回的 value 赋值给 num,当结果对象 done 为 true 就会退出,因此 num 不会被赋值为 undefined

    // 对于遍历简单的数组 或者 集合中的值,使用 for-of 比传统的 for 少更多的条件,会更少出错
    // warning!!! for-of 用于不可迭代的对象,null 或 undefined 将会导致程序抛出错误
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    const name = "默认迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // 访问默认迭代器
    // 使用 Symbol.iterator
    let values = [1,2,3];
    let iterator = values[Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());   // { value: undefined, done: true 

    // Symbol.iterator 获取了数组 values 的默认迭代器，并用它遍历数组中的元素

    // 由于具有 Sybmol.iterator 属性的对象都有默认迭代器，所有可以用它检测对象是否为可迭代对象

    /**
     * 检查指定对象是否有默认的函数类型迭代器，for-of 在执行之前也会做类似的检查
     * @param {*} object 
     * @returns 
     */
    function isIterable (object) {
        return typeof object[Symbol.iterator] === 'function';
    }

    console.log(isIterable([1,2,3])); // true
    console.log(isIterable("hello"));   // true
    console.log(isIterable(new Map()));    // true
    console.log(isIterable(new Set())); //true
    console.log(isIterable(new WeakMap()));    // false
    console.log(isIterable(new WeakSet())); //  false
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 Symbol.iterator 创建可迭代对象
    const name = "使用 Symbol.iterator 创建可迭代对象"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    // 默认开发者定义的对象都是不可迭代对象，但是给 Symbol.iterator 属性添加一个生成器，可以将其转换为可迭代对象

    let collection = {
        items: [],
        // 创建一个生成器，将其赋值给对象 Symbol.iterator 属性来创建默认的迭代器
        *[Symbol.iterator]() {
            // 生成器通过 for-of 迭代 this.items 并用 yield 返回每一个值
            for (let item of this.items) {
                yield item;
            }
        }
    };
    // collections 迭代器的返回值由 this.items 自动生成，而非手动遍历定义返回值

    collection.items.push(1);
    collection.items.push(2);
    collection.items.push(3);

    for (let x of collection) {
        console.log(TAG.ES6, x);
    }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用内建迭代器
    // ES6 中有三种内建集合对象：数组、Map集合、Set集合，三个内建对象内建了以下爱三种迭代器
    // entries() 返回一个迭代器，其值为多个键值对
    // values() 返回一个迭代器，其值为集合的值
    // keys() 返回一个迭代器，其值为集合中所有的键名
    const name = "内建迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * entries() 迭代器，每次调用返回一个数组
     * 1. 集合为数组时，第一个参数是数组的索引，第二个才是数组的值
     * 2. 集合为 Set 时，则数组两个参数都是 Set 的值
     * 3. 集合为 Map 时，第一个参数为Map 的键，第二个参数为值
     */
    let colors = ["red", "blue", "yellow"];
    let tracking = new Set([1234,2345,3456]);
    let data = new Map();
    data.set("title", "study ECMAScript 6");
    data.set("date", "5/20/2022");

    for (let color of colors.entries()) {
        console.log(TAG.ES6, "array => ", color);
    }

    for (let entry of tracking.entries()) {
        console.log(TAG.ES6, "set => ", entry);
    }

    for (let entry of data.entries()) {
        console.log(TAG.ES6, "map => ", entry);
    }

    // ES6 array =>  [ 0, 'red' ]
    // ES6 array =>  [ 1, 'blue' ]
    // ES6 array =>  [ 2, 'yellow' ]
    // ES6 set =>  [ 1234, 1234 ]
    // ES6 set =>  [ 2345, 2345 ]
    // ES6 set =>  [ 3456, 3456 ]
    // ES6 map =>  [ 'title', 'study ECMAScript 6' ]
    // ES6 map =>  [ 'date', '5/20/2022' ]

    seprator();

    // values 迭代器会返回所有的值
    for (let color of colors.values()) {
        console.log(TAG.ES6, "array => ", color);
    }

    for (let entry of tracking.values()) {
        console.log(TAG.ES6, "set => ", entry);
    }

    for (let entry of data.values()) {
        console.log(TAG.ES6, "map => ", entry);
    }

    // ES6 array =>  red
    // ES6 array =>  blue
    // ES6 array =>  yellow
    // ES6 set =>  1234
    // ES6 set =>  2345
    // ES6 set =>  3456
    // ES6 map =>  study ECMAScript 6
    // ES6 map =>  5/20/2022

    seprator();
    // keys
    for (let color of colors.keys()) {
        console.log(TAG.ES6, "array => ", color);
    }

    for (let entry of tracking.keys()) {
        console.log(TAG.ES6, "set => ", entry);
    }

    for (let entry of data.keys()) {
        console.log(TAG.ES6, "map => ", entry);
    }

    // 数组打印索引
    // ES6 array =>  0
    // ES6 array =>  1
    // ES6 array =>  2
    // ES6 set =>  1234
    // ES6 set =>  2345
    // ES6 set =>  3456
    // ES6 map =>  title
    // ES6 map =>  date
    
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 使用 不同集合的默认迭代器
    const name = "不同集合的默认迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    let colors = ["red", "blue", "yellow"];
    let tracking = new Set([1234,2345,3456]);
    let data = new Map();
    data.set("title", "study ECMAScript 6");
    data.set("date", "5/20/2022");

    // 等同 colors.values()
    for (let color of colors) {
        console.log(TAG.ES6, "array => ", color);
    }

    // 等同 tracking.values()
    for (let entry of tracking) {
        console.log(TAG.ES6, "set => ", entry);
    }

    // 等同于 data.entries()
    for (let entry of data) {
        console.log(TAG.ES6, "map => ", entry);
    }

    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 解构与 for-of 循环，使用 Map 的默认构造函数来简化编码过程
    const name = "解构与 for-of 循环"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let data = new Map();

    data.set("title", "Study ES6");
    data.set("format", "ebook");

    for (let [key, value] of data) {
        console.log(TAG.ES6, "key =>", key, "value =>", value);
    }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 字符串迭代器
    const name = "字符串迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    console.log(TAG.ES6, `============== ${name} end ====================`);
}


{
    // 字符串迭代器
    const name = "字符串迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    // ES5 访问字符串
    let message = "A 和 B";
    for (let i = 0, len = message.length; i < len; i++) {
        console.log(TAG.ES5, message[i]);   // 可能会出现无法访问中文（双字符）得情况
    }
    seprator();
    // ES6 访问字符串，ES6 是全面支持 Unicode，并且我们可以通过改变字符串的默认迭代器来解决这个问题
    for (let c of message) {
        console.log(TAG.ES6, c);
    }
    

    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // NodeList 迭代器，ES6 新增的默认迭代器，是 DOM 的 NodeList 也拥有默认迭代器（这个是 HTML 的标准，而不是 ES6 的标准）
    const name = "NodeList 迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // let divs = document.getElementsByTagName("div");

    // for (let div of divs) {
    //     console.log(div);
    // }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 展开运算符与非数组可迭代对象
    const name = "字符串迭代器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    let set = new Set([1,2,2,3,3,3,4,5]), array = [...set];

    console.log(TAG.ES6, array);    // 数组去重
    
    let map = new Map([["name", "Nic"], ["age", 25]]), arrayMap = [...map];
    console.log(arrayMap);  // [ [ 'name', 'Nic' ], [ 'age', 25 ] ]

    // 数组字面量可以多次使用展开运算符
    let smallNum = [1,2,3];
    let bigNum = [100,101,102];
    let allNum = [0, ...smallNum, ...bigNum];
    console.log(TAG.ES6, allNum);
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

// 高级迭代器篇

{
    // 给迭代器传参数
    const name = "给迭代器传参数"
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    // 可以是用迭代器的 next() 返回值，也可以用迭代器的 yield关键字生成值

    function *createIterator() {
        let first = yield 1;
        let second = yield first + 2;   // 4+2
        yield second + 3;   // 5 + 3
    }

    let iterator = createIterator();
    console.log(TAG.ES6, iterator.next());  // 第一次不传参，是因为会被丢弃，由于传给 next() 方法前不会执行任何 yield 语句，第一次调用不会执行 yield 语句，所以第一次调用 yield 传参无意义
    console.log(TAG.ES6, iterator.next(4)); // 第二次传入4，它最后被赋值给生成器函数内部变量 first。
    // 在一个含 yield 的语句中，表达式右侧等价于第一次调用 next() 方法后的下一个返回值，左侧等价于第二次调用 next()方法后下一个返回值，在函数继续执行前得到的返回值
    console.log(TAG.ES6, iterator.next(5));
    console.log(TAG.ES6, iterator.next());

     
    // ES6 { value: 1, done: false }
    // ES6 { value: 6, done: false }
    // ES6 { value: 8, done: false }
    // ES6 { value: undefined, done: true }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 在迭代器中抛出错误
    const name = "在迭代器中抛出错误"
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    /**
     * 示例一
     * 可以给迭代器传递错误调节，通过 throw()方法，在迭代器恢复执行时可令其抛出一个错误，这种主动抛出错误的能力对于编程很重要
     * 也能提供模拟结束函数执行的两种方法（返回值 或 抛出错误）
     */
    // function *createIterator() {
    //     let first = yield 1;
    //     let second = yield first + 2;   // 4+2, 然后抛出错误
    //     yield second + 3;   // 永远不会执行
    // }

    // 使用 try-catch（示例二）
    function *createIterator() {
        let first = yield 1;
        let second;
        try {
            second = yield first + 2;   // 4+2, 然后抛出错误
        } catch (ex) {
            second = 6; // 如果捕获到异常
        }
        yield second + 3;   // 永远不会执行
    }

    let iterator = createIterator();
    console.log(iterator.next());
    console.log(iterator.next(4));
    console.log(iterator.throw(new Error("boom")));  // 生成器中抛出错误（示例一直接停止了，示例二则不会）
    console.log(iterator.next());

    // { value: 1, done: false }
    // { value: 6, done: false }
    // { value: 9, done: false }
    // { value: undefined, done: true }
    console.log(TAG.ES6, `============== ${name} end ====================`);

    // 小结：在迭代器内部，如果使用了 yield 语句，则可以通过 next() 方法和 throw() 方法控制执行过程，return 也可以做一些不一样的操作
}


{
    // 生成器返回语句
    const name = "生成器返回语句"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * 生成器其实也是一个函数，可以通过 return 终止执行，也可以通过return 指定一个返回值
     * 
     * 生成器中， return 的操作表示完成，属性 done 被设为 true，如果同时提供了相应的值，则属性 value会被设置成这个值 
     */

    function *createIterator() {
        yield 1;
        return; // return 后，后面的 yield 语句都不会执行
        yield 2;
        yield 3;
    }

    let iterator = createIterator();
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());

    // ES6 { value: 1, done: false }
    // ES6 { value: undefined, done: true }

    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 生成器返回语句
    const name = "生成器返回语句"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    function *createIterator() {
        yield 1;
        return 20; // return 后，后面的 yield 语句都不会执行
    }

    let iterator = createIterator();
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());

    // ES6 { value: 1, done: false }
    // ES6 { value: 20, done: true }    // 这里 value 有值，同时 done 被置为 true 了
    // ES6 { value: undefined, done: true }

    // 通过 return 返回指定的值，只在返回对象中出现一次，在后续继续调用返回的对象中，value 值会被重置为 undefined
    console.log(TAG.ES6, `============== ${name} end ====================`);


    /**
     * Tips：
     *  展开运算符 与 for-of 循环语句会直接忽略通过 return 语句指定的任何返回值
     * 只要 done 为 true 就立即停止读取其他的值
     */
}

{
    // 委托生成器
    const name = "委托生成器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    // 一些情况下，需要两个迭代器合二为一，就可以创建一个生成器，再给 yield 语句添加一个星号，就可以将生成数据的过程委托给其他迭代器
    // 再定义这些生成器时,只需要将星号 放在关键字 yield 和 生成器的函数名之间即可

    function *createNumberIterator() {
        yield 1;
        yield 2;
    }

    function *createColorIterator() {
        yield "red";
        yield "green";
    }

    function *createCombinedIterator() {
        yield *createNumberIterator();
        yield *createColorIterator();
        yield true;
    }

    let iterator = createCombinedIterator();
    // createCombinedIterator 先委托了 createNumberIterator
    console.log(iterator.next());
    console.log(iterator.next());
    // createCombinedIterator 后委托了 createColorIterator
    console.log(iterator.next());   // 不加 * 就是这个结果 { value: Object [Generator] {}, done: false }
    console.log(iterator.next());
    // 最后是自己的
    console.log(iterator.next());

    // { value: 1, done: false }
    // { value: 2, done: false }
    // { value: 'red', done: false }
    // { value: 'green', done: false }
    // { value: true, done: false }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    // 委托生成器组合应用
    const name = "委托生成器组合应用"
    console.log(TAG.ES6, `============== ${name} begin ====================`);

    function *createNumberIterator() {
        yield 1;
        yield 2;
        return 3;
    }

    function *createRepeatingIterator(count) {
        for (let i = 0; i < count; i++) {
            yield "repeat";
        }
    }

    function *createCombinedIterator() {
        let result = yield *createNumberIterator(); // createNumberIterator 取到返回的对象,给下一个生成器使用
        yield result;   // 3 存在于 createCombinedIterator() 内部,如果想要输出这个值,可以额外增加一条 yield 语句
        yield *createRepeatingIterator(result);
    }

    let iterator = createCombinedIterator();

    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());
    console.log(TAG.ES6, iterator.next());

    console.log(TAG.ES6, `============== ${name} end ====================`);

    // yield * 可以直接用于字符串, yield * "hello", 此时将使用字符串的默认迭代器
}

{
    const name = "异步任务执行"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    // 由于 yield 语句会暂停当前函数执行过程并等待下次一次 掉哦那个 next(), 因此你可以创建一个函数,在函数中调用生成器生成对应迭代器
    
    /**
     * 
     * @param {*} taskDef must be a generator
     */
    function run (taskDef) {

        // 创建一个无使用限制的迭代器
        let task = new taskDef();

        // 开始执行任务
        let result = task.next();

        // 循环调用next() 的函数
        function step() {
            if (!result.done) {
                result = result.next();
                step();
            }
        }

        // 开始执行
        step();
    }

    // 使用run() 函数,可以执行一个包含多条 yield 语句的生成器
    run(function*() {
        console.log(1);
        yield;
        console.log(2);
        yield;
        console.log(3);
    });
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    const name = "向任务执行器传递数据"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    // 给任务执行器传递数据最简单的办法, 把 yield 返回的值传入下一次 next() 方法的调用.在这里,我们只需要把 result.value 传递给 next() 方法

    /**
     * 
     * @param {*} taskDef must be a generator
     */
         function run (taskDef) {

            // 创建一个无使用限制的迭代器
            let task = new taskDef();
    
            // 开始执行任务
            let result = task.next();
    
            // 循环调用next() 的函数
            function step() {
                if (!result.done) {
                    result = result.next();
                    step();
                }
            }
    
            // 开始执行
            step();
        }
    
        // 使用run() 函数,可以执行一个包含多条 yield 语句的生成器
        run(function*() {
            let value = yield 1;
            console.log(value); // 1

            value = yield value + 3;
            console.log(value); // 4
        });
    console.log(TAG.ES6, `============== ${name} end ====================`);

    // 这么做,数据已经能在 yield 之间相互传递了
}

{
    const name = "异步任务执行器"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    
    // 通过回调函数,可以实行异步任务

    /**
     * @description fetchData 是同步函数,加个 setTimeout 使其变成异步 
     * 参数 callback 需要任务执行器确定
     * @returns 接受一个回到函数作为参数, 调用时会传入 Hi! 作为回调函数的参数并执行
     */
    function fetchData() {
        return function (callback) {
            setTimeout(() => {
                callback(null, "Hi");
            }, 50);
        }
    }

    // 我们做点修改,当 result.value 是 function 的时候,任务执行器会将这个函数结果传入 next() 方法
    function run(taskDef) {

        let task = taskDef();

        let result = task.next();

        function step() {
            if (!result.done) {
                if (typeof result.value === 'function') {
                    result.value(function(err, data) {
                        if (err) {
                            result = task.throw(err);
                            return;
                        }

                        result = task.next(data);
                        step();
                    })
                } else {
                    result = task.next(result.value);
                    step();
                }
            }
        }

        step();
    }
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

{
    const name = "AS ALL"
    console.log(TAG.ES6, `============== ${name} begin ====================`);
    /**
     * Symbol.iterator 被用来定义的默认迭代器, 内建对象 和 开发者自定义的对象都支持的属性
     * for-of 可以获取可迭代对象中的值
     * ES6 中 array set map 都有默认的迭代器
     * 展开运算符也可以用于可迭代对象
     * 生成器是一类特殊函数, 在定义时需要额外添加一个 *,被调用时,可以自动创建迭代器,通过 yield * 来生成标识符
     * 借助生成委托的新特性, 便可以重用已有生成器来创建新的生成器,从而进一步封装更复杂的迭代器行为
     * 
     * 生成器 和 迭代器的应用场景, 创建建议的异步代码
     */
    console.log(TAG.ES6, `============== ${name} end ====================`);
}

function seprator() {
    console.log("=========================================");
}