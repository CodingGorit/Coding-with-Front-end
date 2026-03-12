let arr = ['a', 'b'];
let elements = [1,2,3];

arr.push.apply(arr, elements);
console.log(arr);   // ['a', 'b', 1, 2, 3]

/**
 * 
 * @param {*} fn 
 * @param {*} obj this 指向
 * @param {*} args 数组[]
 * @returns 
 */
function apply(fn, obj, args) {
    if (obj === undefined || obj === null) {
        obj = globalThis;
    }
    // 为 obj 添加临时方法
    obj.temp = fn;
    // 执行临时方法，传参
    const result = obj.temp(...args);
    // 删除临时方法
    delete obj.temp;
    
    return result;
}

function add(a , b) {
    return a + b + this.c;
}

const obj = {
    c: 10
}

// 如果没有绑定这个，则会打印 NaN
globalThis.c = 5;

console.log(apply(add, undefined, [10, 20]));   //  35
console.log(apply(add, obj, [10, 20]));   // 40


const test = [10,20,30,40];

console.log("test max val is =>", Math.max.apply(undefined, test));
console.log("test min val is =>", Math.min.apply(undefined, test));