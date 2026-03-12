/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * myFunction(...iterableObj);
 * 
 * [...iterableObj, '4', ...'hello', 6];
 */


let str = "1234";
console.log([...str]);    // <=> str.split("");
// console.log(str.split(""));

// 数组拷贝
let arr = [2,3,4];
let resArr = [...arr];
resArr.push(5); // [2,3,4,5]
console.log(resArr);

// 等价 apply
myFunc(...arr);

myFunc.apply(undefined, arr);
function myFunc(x,y,z) {}

// 对象展开
let obj = {"a": 1, "b": 2};

let result = {...obj};
console.log(result);