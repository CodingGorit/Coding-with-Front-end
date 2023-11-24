/**
 * Created Date: Thursday, November 23rd 2023, 10:11:49 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Thu Nov 23 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// 不能使用箭头函数的时机

// 1. 没有 arguments
const fn1 = () => {
    console.log("arguments", arguments);
}

fn1('a', 'n');

function fn2() {
    console.log("arguments", arguments);
}

fn2('a', 'b');

// 2. 无法通过 call bind apply 改变 this
// 箭头函数的 this 指向父作用于的

const fn3 = () =>{
    console.log(this);  // 对应的 this 是父节点的 this 即 window 或者 globalThis
}

fn3.call({a: 1});   // 箭头函数指向的还是父节点

// 3. 某些箭头函数难以阅读

// 4. 对象的方法不能使用 箭头函数
let obj = {
    name: 'Fc',
    getName() {
        return this.name;
    },

    getNameArrow:() => {
        return this.name;   // 拿不到数据
    }
}

// 5 箭头函数不能使用构造函数

// 6. Vue 生命周期 和 Method 
// Vue 组件本身是一个 JS 对象
// React 组件（非 Hook）它本质是一个 ES6 class


// 总结
// 1. 对象方法
// 2. 对象原型
// 3. 构造函数
// 4. 动态上下文回调函数
// 5. Vue 生命周期 method