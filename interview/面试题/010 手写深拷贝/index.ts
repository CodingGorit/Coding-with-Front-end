/**
 * Created Date: Thursday, November 16th 2023, 3:22:07 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Thu Nov 16 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


// 方式一：
const obj = {
    a: 1,
    b: {
        c: [1,2],
        d: "aaa"
    }
}

const copied_obj = JSON.parse(JSON.stringify(obj));

// 有弊端，无法拷贝 Symbol 类型

// 方式二：使用 loadsh 的拷贝

// 方式三：手写 deepClone
function deepClone(obj: any) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    let res: any;

    // 获取返回值
    if (obj instanceof Array) {
        res = [];
    } else {
        res = {};
    }

    for (let key in obj) {
        // Object.prototype.hasOwnProperty.call(obj, key); // 检查不是来自父元素
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key]);
        }
    }
    return res;
}

const dest = deepClone(obj);
console.table(JSON.stringify(dest));