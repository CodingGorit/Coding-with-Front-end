/**
    1. number 类型
    2. string 类型
    3. 布尔类型

*/

// ts 是 js 的超级，所以 js 的语法在 ts 中是完全可以使用的
let num = 1;
// console.log(num)

// ts 定义变量就是显示的声明变量类型，不同类型的会转换为 10 进制显示
let decNum: number = 1; // 十进制类型
let hexNum: number = 0xf00d; // 十六进制类型
let binaryNum: number = 0b1010; // 定义二进制数据类型
let octNum: number = 0o744; // 定义八进制
let integer: number = Number(3.14) // 支持小数
// let big: bigint =  100n; // 大数，需要兼容 ES2020, 而且不能和 number 相互转化

console.log(decNum, hexNum, binaryNum, octNum, integer)

// ts 字符串类型
let firstName: string = "Gorit"; // 字符串字面量
let familyName: string = String("Smith"); // 显示类型转换
let fullname = `my name is ${firstName} + ${familyName}` // 使用模板字符串

console.log(fullname)

// 布尔类型
let TypeTrue: boolean = true;
let TypeFalse: boolean = false;

console.log(TypeTrue, TypeFalse)

// Symbol 自 ECMAScript 6 起，TypeScript 开始支持新的Symbol原始类型， 即我们可以通过Symbol构造函数，创建一个独一无二的标记；同时，还可以使用symbol表示如下代码所示的类型。
// let sym1: symbol = Symbol();

// let sym2: symbol = Symbol('42');
