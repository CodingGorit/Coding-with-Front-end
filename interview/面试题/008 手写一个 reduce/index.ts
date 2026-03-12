/**
 * Created Date: Wednesday, November 15th 2023, 7:29:32 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Wed Nov 29 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// 楼主面试: 乌鸫科技-阿里巴巴-天猫超市时 遇到的手写代码题

// @ts-ignore
Array.prototype.selfReduce = function (callback, initValue) {
    // 获取源数组
    const originArray = this;

    // 判断源数组是否为空，如果为空，抛出异常
    if(!originArray.length) {
        throw new Error('selfReduce of empty array with no initial value');
    }

    // 声明累计器
    let accumulator

    // 是否有初始值情况
    // 设置累计器初始值（如果有初始值，第一次调用`callback`时，`callback`的第一个参数的值为初始值，否则为源数组的第一项）
    if (initValue === undefined) {
        accumulator = originArray[0];
    } else {
        accumulator = initValue;
    }

    // 遍历数组，执行`callback`函数
    for (let i = 0; i < originArray.length; i++) {
        // 如果没有初始值且是最后一次循环，不再执行callback
        if (initValue === undefined && (i + 1) === originArray.length) break;

        // 循环执行 `callback`
        // 这里判断一下`currentValue`
        // 因为有初始值时，`currentValue`是`originArray[i]`
        // 没有初始值时`currentValue`是`originArray[i + 1]`
        accumulator = callback(accumulator, initValue === undefined ? originArray[i + 1] : originArray[i], i, originArray);
    }

    // 把累计器返回出去
    return accumulator
}