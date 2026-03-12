/**
 * Created Date: Wednesday, November 1st 2023, 11:50:00 pm
 * Author: CodingGorit
 * -----
 * Last Modified: Thu Nov 02 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


function flatten_stack(array: any[]) {
    const stack = [...array];
    const res: number[] = [];
    while (stack.length) {
        // console.log(stack);
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            res.unshift(next);
        }
    }
    return res;
}

// 递归 + 参数控制扁平化成都
function flatten_forEach(arr:any[], depth = 1) {
    const result: number[] = [];
    (function flat(arr, depth) {
        arr.forEach((item: number[] | number) => {
            if (Array.isArray(item) && depth > 0) {
                flat(item, depth - 1);
            } else {
                result.push(item as number);
            }
        })
    })(arr, depth)
    return result;
}

function flatten_while(arr: any[]) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

console.log(flatten_stack([1, 2, [3, 4, [5, 6]]]));
console.log(flatten_forEach([1, 2, [3, 4, [5, 6]]], Infinity));
console.log(flatten_while([1, 2, [3, 4, [5, 6]]]));