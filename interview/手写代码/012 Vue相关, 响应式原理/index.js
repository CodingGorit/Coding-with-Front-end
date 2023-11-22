/**
 * Created Date: Wednesday, November 22nd 2023, 4:43:51 pm
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

/**
 * 响应式核心
 * 1. 数据联动
 */

// 订阅器模型

let Dep = {
    clientList: {}, // 容器
    // 添加订阅
    listen: function(key, fn) {
        // if (!this.clientList[key]) {
        //     this.clientList[key] = [];
        // }
        // this.clientList[key].push(fn);

        // 短路表达式
        (this.clientList[key] || (this.clientList[key] = [])).push(fn);
    },
    // 发布
    trigger: function() {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }

        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    }
}

// 数据劫持
let dataHi = function({data, tag, dataKey, selector}) {
    let value = '',
    el = document.querySelector(selector)
    Object.defineProperty(obj, 'username', {
        // 取值
        get: function() {
            console.log('取值');
            return value;
        },
        set: function(val) {
            console.log('设置值');
            value = val;
            Dep.trigger(tag, val);
        }
    });

    // 订阅
    Dep.listen(tag, function(text) {
        el.innerHTML = text;
    });
}