/**
 * Created Date: Wednesday, November 15th 2023, 9:46:53 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Wed Nov 15 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


// 实现 let
// 在块级作用域内有效
// 不能重复声明
// 不能预处理，不存在变量提升，即未声明之前的代码不能调用
(function () {
    var a = 3;
    console.log(a); //3
})();

// console.log(a); // can not find 'a'a

// 实现 const
// 由于 ES5 环境没有 block 的概念，所以是无法百分百实现 const，只能是挂载到某个对象下，要么是全局的 window，要么就是自定义一个 object 来当容器
function _const(key, value) {
    window[key] = value;
    Object.defineProperty(window, key, {
        enumerable: false,  // 能否通过 for-in 循环返回属性
        configurable: false,    //  能否通过 delete 删除，能否修改属性特性 (保证不可重复赋值) 
        get: function () {
            return value;
        },
        set: function (newValue) {
            if (newValue !== value) {
                throw new Error('const can not change value');
            } else {
                return value;
            }
        }
    });
}

_const('a', 3);
_const('a', 4);
