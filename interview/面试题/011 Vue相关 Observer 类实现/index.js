/**
 * Created Date: Wednesday, November 22nd 2023, 4:11:12 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Wed Nov 22 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// Vue 原理分析 - 变化监测
export default class Observer {
    constructor(value) {
        this.value = value;

        if (Array.isArray(value)) {
            // 数组的逻辑
            for (const item of value) {
                if (typeof item === 'object') {
                    this.walk(item);
                }
            }
        } else if (typeof value === 'object') {
            // 对象的逻辑
            this.walk(value);
        }
    }

    walk(obj) {
        // {name: '小明', age: 18}
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }

}

// 让对象每一个属性都变得可被观测的
function defineReactive(obj, key, val) {
    if (arguments.length === 2) {
        val = obj[key]; // 对象的某个值
    }

    if (typeof obj === 'object') {
        new Observer(obj[key]);
    }

    Object.defineProperty(obj, key, {
        enumerable: true,   // 可枚举
        configurable: true, // 可改变
        get() {
            console.log(`${key}属性读取了`);
            return val;
        },
        set(newVal) {
            console.log(`${key} 属性被修改了, 新值为 ${newVal}`);
            val = newVal;
        }
    });
}