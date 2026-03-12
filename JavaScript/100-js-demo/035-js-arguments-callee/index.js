// arguments.callee 示例
// 用于在匿名函数中递归调用自己

// 场景 1：匿名函数递归
const factorial = function(num) {
    if (num <= 1) {
        return 1;
    } else {
        // 使用 arguments.callee 实现递归，即使函数没有名字
        return num * arguments.callee(num - 1);
    }
};

console.log('5! =', factorial(5)); // 120

// 场景 2：函数名变化不影响递归
function originalName(n) {
    if (n <= 1) return 1;
    return n * arguments.callee(n - 1);
}

const newName = originalName;
console.log('5! via alias =', newName(5)); // 120

// 注意：严格模式下不支持 arguments.callee
// 'use strict';
// 上述代码在严格模式下会报错
