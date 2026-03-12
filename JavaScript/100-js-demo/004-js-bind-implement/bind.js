/**
 * bind()  方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 指定为 bind() 的第一个参数，而其他参数则作为新函数的参数，供调用使用
 */

globalThis.x = 9; // Node.js 环境 globalThis

var module = {
    x: 81,
    getX: function() {
        return this.x;
    }
}

console.log(module.getX()); // 81

let retireve = module.getX;
console.log(retireve());    // 9 拿到的是全局的

/**
 * 绑定函数
 * 创建一个新函数，把 'this' 绑定到 module 对象上
 */

let boundGetX = retireve.bind(module);
console.log(boundGetX());   // 81


function bind1(fn, obj, ...args1) {
    // 返回新函数
    return function (...args2) {
        // 新函数执行 call 返回结果
        return call(fn, obj, ...args1, ...args2);
    }
}