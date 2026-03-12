function add(a, b) {
    // console.log(this);	// 游览器环境是 Window， Node 环境是 GlobalThis
    return a + b;
}

add(1,2);

// 使用 call

function add1(a, b) {
    console.log(this);	// obj
    return a + b + this.c;
}

const obj = {
    c: 20,
};

let res = add1.call(obj, 10, 20);
console.log(res);   // 50, 一般开发中都是传 Undefined

/**
 * 如何实现 call 函数？
 * 对象.函数() this 指向这个对象
 * @param {*} fn 接收的函数
 * @param {*} obj 改变 this 为 obj
 * @param  {...any} args 传参
 * @refer   Bilibili 大佬
 */
function call1(fn, obj, ...args) {
    // 可能存在为 null 或 undefined 的 this
    if (obj === undefined || obj === null) {
        // 绑定 Node.js 的全局对象
        obj = globalThis || window;
    }

    // console.log(obj);
    // 临时绑定方法 为 obj
    obj.temp = fn;
    const result = obj.temp(...args);
    // 删除对象的属性，方法
    delete obj.temp;
    return result;
}

globalThis.c = 10;

let result = call1(add1, obj, 20, 20);
console.log(result);    // 60

let result1 = call1(add1, undefined, 20, 20);
console.log(result1);   // 50