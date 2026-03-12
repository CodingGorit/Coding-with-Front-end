// 典型阶乘 - 普通实现
function factorial(num) {
    if (num === 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

// 使用 arguments.callee 实现 - 避免函数名耦合
function fac(num) {
    if (num === 1) {
        return 1;
    } else {
        // 注意：arguments.callee 在严格模式下不支持
        return num * arguments.callee(num - 1);
    }
}

// 测试
console.log('Factorial of 5:', factorial(5)); // 120
console.log('Factorial of 5 (using callee):', fac(5)); // 120

// 函数名变化测试
const myFactorial = fac;
console.log('Factorial via alias:', myFactorial(5)); // 120
