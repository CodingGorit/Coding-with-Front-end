/**
 * TS 函数的学习
 * 函数是用来抽离可服用的逻辑，抽象模型，封装过程
 */

// 定义函数 function 字面量和 箭头函数定义
function add() {

}

const add1 = () => {

}

// 返回值类型，默认为 undefined，如果显示的声明 undefined，会报错. 因此需要用 void 来代替
const add2 = (a:number,b: number):number  =>  {
    return a+b;
}

/**
 * 返回值的区别 =>
 * TypeScript 函数类型中的 => 用来表示函数的定义
 * 左侧是函数参数，右侧是函数返回值类型
 * ES6 中 => 是函数的体现
 */

{
    // 定义一个 Adder 类型
    type Adder = (a:number,b:number)=>number;
    const add:Adder = (a,b) => a+b;
}

/**
 * 返回值类型：函数返回值的类型推断结合泛型可以实现特别复杂的类型计算
 */

/**
 * 参数类型：可选参数和默认参数
 */
function log(x?:string) { // 函数参数可传可不传，默认为 undefined
    return x;
}

// 默认参数
function log1(x: string="hello") {
    return x;
}

// 传递的参数必须是其子类型
function log2(x:number | string="Geei") {
    return x;
}

// 剩余参数, 可以传递一个数组
function sum(...num: number[]) {
    return num.reduce((a,b)=> a+b,0);
}

sum(1,2);// => 3
sum(1,2,3);// => 6

function sum1(...nums:(number | string)[]):number {
    return nums.reduce<number>((a,b)=> a + Number(b),0);
}

sum1(1,'2',3); // 6

/**
 * this 的类型不固定，取决于执行的上下文
 * 在 TS 中，声明 this 的类型，只需要在第一个  参数中声明 this 指代对象
 */

function say(this: Window, name: string) {
    console.log(this.name)
}

window.say = say
window.say('hi')

// say('22') // this 不指定 window，默认指向 void

// 定义对象的函数属性时，只要实际调用中 this 的指向与指定 this 指向不同 TypeScript 就能发现 this 指向错误
interface Person {
    name: string;
    say(this:Person):void;
}

const person:Person = {
    name: 'capatain',
    say () {
        console.log(this.name)
    }
}

// 函数重载
function convert(x: string | number| null):string|number|-1 {
    if (typeof x === 'string') {
        return Number(x)
    }
    if (typeof x === 'number') {
        return String(x)
    }
    return -1
}

const x1 = convert('1') // string | number
const x2 = convert(1)  // string | number
const x3 = convert(null) // string | number

// 重载优化

function convert1 (x: string):number;
function convert1 (x: number):string;
function convert1 (x: null):-1;
function convert1 (x: number | string | number):any {
    if (typeof x === 'string') {
        return Number(x)
    }
    if (typeof x === 'number') {
        return String(x)
    }
    return -1
}


const y1 = convert('1') //  number
const y2 = convert(1)  // string 
const y3 = convert(null) // -1

/**
 * 类型谓词，特殊类型描述
 */
function isString(s):s is string {
    return typeof s === 'string';
}

function isNumber(n:number) {
    return typeof n === 'number'
}

function operator(x:unknown) {
    if (isString(x)) { // 类型缩小为 string

    }
    if (isNumber(x)) {} // unknown 不能赋值为 number
}

