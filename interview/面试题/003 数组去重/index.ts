/**
 * Created Date: Wednesday, November 1st 2023, 11:46:06 pm
 * Author: CodingGorit
 * -----
 * Last Modified: Wed Nov 01 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// NaN 和 {} 需要特殊处理，其她的不用

// 完整代码去重
function unique(arr: any[]) {
    let map = new Map();
    let result = new Array();
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'object') {
            let a = JSON.stringify(arr[i]);
            if (!map.has(a)) {
                map.set(a, true);
                result.push(arr[i]);
            }
        } else {
            if (!map.has(arr[i])) {
                map.set(arr[i], true);
                result.push(arr[i]);
            }
        }
    }
    return result;
    // set 无法处理 NA 或 {} 的情况
    // return Array.from(new Set(arr));
}

// 一般情况去重
function unique_general(arr: any[]) {
	return Array.from(new Set(arr));
}


console.log(unique([123,'123', {}, {}, null, undefined, 'abc', 'abc', NaN, NaN]));