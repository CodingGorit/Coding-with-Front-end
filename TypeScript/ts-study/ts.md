# TS 学习笔记

学习资源来源：

1. 拉钩教育 TypeScript 学习笔记
2. TypeScript 中文网
3. TypeScript 高级教程

代码案例更多

## 一、TS 相关概念

### 1.1 基础概念

> TS 全称为 （TypeScript），是 JavaScript 的超集， 是 JS 的补充（为 JS 增加了类型系统，还有很多 JS 没有的特性），目前 TS 最新版本为
> 3.1。TypeScript 是类型化的 JavaScript，不仅支持 JavaScript 所有特性,还在 JavaScript 的基础上添加了静态类型注解扩展

- TypeScript 是添加了类型注解的 JavaScript （let a : number = 7;)

### 1.2 TS 开发 IDLE 推荐

1. 使用微软开源的 VS code
2. 在线 Playground
3. webStrom

### 1.3 TS 快速开始

> 安装 ts 环境

```node
npm
install - g
typescript

npm
install - g
ts - node // node 环境下的 ts

tsc - v

tsc--
init  // 快速创建一个 tsconfig.json 文件
```

> 修改 tsconfig.json 配置文件

```json
    /* Strict Type-Checking Options */
"strict": true, /* Enable all strict type-checking options. */
"noImplicitAny": true, /* Raise error on expressions and declarations with an implied 'any' type. */
"strictNullChecks": true,                    /* Enable strict null checks. */
"strictFunctionTypes": true, /* Enable strict checking of function types. */
"strictBindCallApply": true, /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
"strictPropertyInitialization": true, /* Enable strict checking of property initialization in classes. */
"noImplicitThis": true, /* Raise error on 'this' expressions with an implied 'any' type. */
"alwaysStrict": true,      
```

> 编译 TS 代码，创建一个名为 HelloWorld.ts 的文件

```ts
function say(word: string) {
    console.log(word);
}

say("Hello World");
```

> 运行 ts 文件

```ts
//使用 tsc （TypeScript Compier） 命令将 .ts 转换为 .js 文件
tsc
HelloWorld.ts--
strict--
alwaysStrict
false

// 监听文件变更
tsc
HelloWorld.ts--
strict--
alwaysStrict
false--
watch

// 使用 ts-node 运行 ts 文件，不需要编译成 JS 文件
ts - node
HelloWorld.ts
```

### 1.4 TS 配置自动编译构建

1. tsc --init 初始化项目
2. 修改 tsconfig.json 中 "outDir": "./js/"
3. 终端 —> 运行任务 —> tsc 监视即可

## 二、TS 基础语法学习

[学习文档](https://www.tslang.cn/docs/handbook/basic-types.html)
> TS 的作用在于在开发阶段，通过静态类型检测，能够解决开发中百分之三十的问题，极大提升开发效率

### 2.1 基础类型

#### 2.1.1 原始类型

> 以下为在 JavaScript 中表示非对象且没有方法的数值类型

1. number 数字类型
2. string
3. boolean
4. null （null 是一个伪原始类型，它在 JavaScript 中实际上是一个对象，且所有的结构化类型都是通过 null 原型链派生而来）。
5. undefined
6. symbol

```ts
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
```

#### 2.1.2 复杂对象数据类

1. 数组 Array
2. 元组 Tuple
3. 枚举
4. Any (一般在获取 DOM 时使用)
5. Void
6. Null 和 Undefined
7. Never (代表不存在的类型，通常作为抛出异常或无限循环的函数返回类型)
8. Object
9. 类型断言

代码示例：

```ts
/**
 * 复杂数类型
 * 数组
 * 元组 Tuple
 * 枚举
 * Any
 * Void
 * Null
 * Undefined
 * Never
 * Object
 * 类型断言
 */

// 定义数组方式一: 好处是避免 JSX 语法冲突，另一方面减少不少代码量
let arrayOfNumer: number[] = [1, 2, 3]
let arrayOfString: string[] = ['1', '2', '3']

// 定义数组方式二 （使用泛型）
let myArray: Array<number> = [2, 3, 4]
console.log(arrayOfNumer, arrayOfString, myArray)

// 元组类型：特性限制数组元素的个数和类型，它特别适合用来实现多值返回
let arr: [number, string] = [1, '2']
console.log(arr)

// any 类型 指的是任意类型，由官方提供绕过静态类型检测的方式
/**
 * 被 any 注解的变量
 * 1. 可以进行任何操作，包括获取不存在的属性和方法
 * 2. TypeScript 无法检测其属性是否存在，类型是否正确
 *
 * 用于缺少类型注解的第三方组件库, 或者不想为过复杂的数据添加类型注解
 *
 * any 类型会在对象的调用链进行传导，即素有 any 类型的任何属性类型是 any
 */

let anything: any = {}
let z = anything.a.b.c
z()
anything.doAnything()
anything = 1
anything = '2'
let num1: number = anything;
let str: string = anything

/**
 * unknown 不确定类型 3.1 版本之后才有，所有 unknown 只能赋值给 unknown 或 any
 * 所有的类型缩减都对 unknown 有效，比如指定
 * */
let result: unknown;
// let num2: number = result // 提示 2332
if (typeof result === 'number') {
    result = 1
}

/**
 * 特殊类型 （strict 模式下没有任何作用）
 * void undefined null
 * void 没有返回值的函数、警示处理
 * undefined 用于接口设计、警示处理
 * null 的价值在于接口制定上，表名属性或对象为空值
 */
const userInfo: {
    name: null | string
} = {name: null}

/**
 *  never 永远不会发生的值
 *  定义一个统一抛出错误的函数
 * 1. never 是所有类型的子类型
 * 2. 它可以给所有类型赋值
 * @param msg
 */
function ThrowError(msg: string): never {
    throw Error(msg)
}

// let unCertian: never = 1 // ts(2322)
// let num3:null = unCertian

// 把 never 作为接口类型向下属性类型，用来禁止写接口下特定的属性
const props: {
    id: number,
    name?: never
} = {
    id: 1
}

// props.name = null // ts(2322)

/**
 * object 类型 无实际作用
 */

// 类型断言 (Type Assertion)
1 as 2 // 字面断言
// let str1 = 'str' as cosnt; // 字面量值 + as xxx

// 使用类型守卫来代替非空断言

```

#### 2.1.3 类型推断

> 多种情况推断变量类型

1. 上下文推断
2. 字面量类型（字符串、数字、布尔）
3. 类型拓宽（Literal Widening）
4. Type Widening
5. Type Narrowing（类型范围缩小）

```ts
/**
 * 类型一：上下文推断
 */
// 缺少类型注解的变量可以通过类型推断出类型
{
    let str = "this is a string" // string
    let num = 1; //number
    let bool = true; // boolean
}
{
    const str = "this is str"
}

// 类型二：字面量类型 （集合类型子类型）
{
    let specifiedStr: 'this is str' = 'this is str';
    let specifiedNum: 1 = 1;
    let specifiedBoolean: true = true
}

// 应用场景、使用字面量类型组合的联合类型，限制函数指定的参数为指定的字面量类型
{
    let dbName: string | null = prompt()
}
type Direction = 'up' | 'down'

function move(dir: Direction) {
    //..
}

move('up')
move('down')

// 数字字面量类型 和 布尔字面量类型
interface Config {
    size: 'small' | 'big';
    isEnable: true | false;
    margin: 0 | 1 | 2
}

// Type Widening 字面量类型拓宽
{
    const specifiedStr: 'this is string' = 'this is string';// 类型是 this is string
    let str2 = specifiedStr;// 使用 let 定义，类型是 'this is string'
}

// 通过 let、var 定义变量，如果满足未显示声明类型注解被赋予了 null 或 undefined 值，则推断出这些变量类型是 any
{
    let x = null; // 类型拓宽成 any
    let y = undefined; // 类型拓宽程 any
    // ====== 分界线
    const z = null; // 类型是 null
    // ====== 分界线
    let anyFun = (param = null) => param; // 形参类型是 null
    let z2 = z;// null
    let x2 = x;//null
    let y2 = y;// undefined
}

// type narrowing 使用类型守卫将函数参数类型从 any 缩小到明确类型
{
    let func = (anything: any) => {
        if (typeof anything === 'string') {
            return anything;// anything 类型是 string
        } else if (typeof anything === 'number') {
            return anything;// anything 类型是 number
        }
        return null;
    }
}

// 通过多种表达式，将联合类型收敛为更具体的类型
{
    type Goods = 'pen' | 'pencil' | 'ruler';
    const getPenCost = (item: 'pen') => 2;
    const getPencilCost = (item: 'pencil') => 4;
    const getRulerCost = (item: 'ruler') => 6;

    const getCost = (item: Goods) => {
        if (item === 'pen') {
            return getPenCost(item);  // item = 'pen'
        }
    }
}

// 交叉类型  - 2023年8月2日
{
 // 将多个类型合并为一个类型
 interface Part1 {
  a: string;
 }

 interface Part2 {
  b: number;
 }

 type Combined = Part1 & Part2;
 let obj: Combined = {
  a: "aa",
  b: 10
 }
}
```

### 2.2 函数声明及使用

#### 2.2.1 定义函数

> function 字面量和箭头函数的形式定义函数

```typescript
// 定义函数 function 字面量和 箭头函数定义
function add() {

}

const add1 = () => {

}
```

#### 2.2.2 返回值类型

```typescript
// 返回值类型，默认为 undefined，如果显示的声明 undefined，会报错. 因此需要用 void 来代替
const add2 = (a: number, b: number): number => {
    return a + b;
}

/**
 * 返回值的区别 =>
 * TypeScript 函数类型中的 => 用来表示函数的定义
 * 左侧是函数参数，右侧是函数返回值类型
 * ES6 中 => 是函数的体现
 */

{
    // 定义一个 Adder 类型
    type Adder = (a: number, b: number) => number;
    const add: Adder = (a, b) => a + b;
}

/**
 * 返回值类型：函数返回值的类型推断结合泛型可以实现特别复杂的类型计算
 */
```

#### 2.2.3 参数类型

```typescript
/**
 * 参数类型：可选参数和默认参数
 */
function log(x?: string) { // 函数参数可传可不传，默认为 undefined
    return x;
}

// 默认参数
function log1(x: string = "hello") {
    return x;
}

// 传递的参数必须是其子类型
function log2(x: number | string = "Geei") {
    return x;
}

// 剩余参数
function sum(...num: number[]) {
    return num.reduce((a, b) => a + b, 0);
}

sum(1, 2);// => 3
sum(1, 2, 3);// => 6

function sum1(...nums: (number | string)[]): number {
    return nums.reduce<number>((a, b) => a + Number(b), 0);
}

sum1(1, '2', 3); // 6
```

#### 2.2.4 this 指向

```typescript
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

    say(this: Person): void;
}

const person: Person = {
    name: 'capatain',
    say() {
        console.log(this.name)
    }
}
```

#### 2.2.5 函数重载

```typescript
// 函数重载
function convert(x: string | number | null): string | number | -1 {
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

function convert1(x: string): number;
function convert1(x: number): string;
function convert1(x: null): -1;
function convert1(x: number | string | number): any {
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
```

#### 2.2.6 类型谓词

```typescript
/**
 * 类型谓词，特殊类型描述
 */
function isString(s): s is string {
    return typeof s === 'string';
}

function isNumber(n: number) {
    return typeof n === 'number'
}

function operator(x: unknown) {
    if (isString(x)) { // 类型缩小为 string

    }
    if (isNumber(x)) {
    } // unknown 不能赋值为 number
}
```

### 2.3 类类型

> TS 中可以显示的声明**变量类型**

#### 2.3.1 OOP 基本使用

```typescript
/**
 * OOP 类型
 *  ES6 中继承原型链来模拟继承
 */

class Dog {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    bark() {
        console.log(this.name + " barked!");
    }
}

const dog = new Dog("doge");
dog.bark();

//js 模拟 OOP：使用 函数 + 原型链的形式进行模拟
function Dog1(name: string) {
    this.name = name; // ts 2683
}

Dog1.prototype.bark = function () {
    console.log('barked')
}
```

#### 2.3.2 extends

```typescript
// 继承 extends  super 会调用基类的构造函数
class Animal {
    type = 'Animal';

    say(name: string) {
        console.log(`I'm${name}`);
    }
}

class cat extends Animal {
    miao() {
        console.log('miao')
    }
}
```

#### 2.3.3 访问你修饰符

```typescript
// 访问修饰符 public private protected （自身类和子类可见）
// 类属性默认是 public

class Son {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

#### 2.3.4 只读属性 readonly

```typescript
// 只读属性，如果不希望某个属性被修改，可以使用 readonly 只读修饰符声明
class Person {
    public readonly firstName: string;

    constructor(firstName: string) {
        this.firstName = firstName
    }
}

const p = new Person('To')
// p.firstName = 'dwa'
```

#### 2.3.5 存取器 getter 和 setter

```typescript
// 存取器
class Person1 {
    public readonly firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    get getMyLastName() {
        return this.lastName
    }

    set myLastName(name: string) {
        if (this.firstName === 'Tony') {
            this.lastName = name;
        } else {
            console.log('Unable to change myLastName')
        }
    }
}
```

#### 2.3.6 静态属性

```typescript
// 静态属性 通过类来直接访问（不依赖实例的上下问方法可以定义为静态属性）
class MyArray {
    static displayBane = 'MyArray';

    static isArray(obj: unknown) {
        return Object.prototype.toString.call(obj).slice(8, -1) === 'Array'
    }
}

console.log(MyArray.displayBane) // 访问静态属性
console.log(MyArray.isArray([]))// true
console.log(MyArray.isArray({}))// false
```

#### 2.3.7 抽象类与接口

```typescript
/**
 * 抽象类：需要被子类继承
 */

abstract class Adder {
    abstract x: number;
    abstract y: number;

    abstract add(): number;  // 抽象访问
    displayName = 'Adder' // public

    addTwice(): number {
        return (this.x + this.y) * 2
    }
}

class NumAdder extends Adder {
    // 实现抽象属性和抽象方法
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    add(): number {
        return this.x + this.y;
    }
}

const numAdder = new NumAdder(1, 2);
console.log(numAdder.displayName)
console.log(numAdder.add()) // => 3
console.log(numAdder.addTwice())// => 6

// 使用接口
interface IAdder {
    x: number;
    y: number;
    add: () => number;
}

class NumAdder1 implements IAdder {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add!: () => number;
}
```

#### 2.3.8 类的类型

```typescript
/**
 * 类的类型
 * 在定义类的时候，我们生命的除构造函数外素有属性，方法的类型就是是这个特殊类型成员
 */

class A {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// const a1:A = {} // name 属性没有
const a2: A = {name: 'a2'}
```

### 2.4 接口类型与类型别名

```typescript
/**
 * 接口类型 与接口别名
 */

/**
 * interface 接口类型
 * 通过接口类型，可以清晰地定义模块内，跨模块、跨项目代码的通信规则
 *
 * “鸭子类型”（ducking typing） 或者 “结构化类型” （structural subtyping）
 * 只要两个对象的结构一致，属性和方法类型一致，则他们类型就是一致的
 */

// 函数示例来初识接口类型
function Study(language: {
    name: string; age: () => number
}) {
    console.log(`编程语言 ${language.name}在${language.age()}年前发明的`);
}

Study({
    name: 'TypeScript',
    age: () => new Date().getFullYear() - 2012
});

// 结构语法 与 内联接口混用
/**纯 JavaScript 解构 */
// function studyJavaScript({name,age}) {
//     console.log(name,age)
// }

/**TypeScript 里解构与内联类型混用 */
function studyTypeScript({name, age}: { name: string, age: () => number }) {
    console.log(name, age)
}

/**接口定义 */
interface ProgramLanguage {
    /**语言名称 */
    name: string;
    /**使用年限 */
    age: () => number;
}

// 定义接口类型变量
let TypeScript: ProgramLanguage;
// 空对象会报错
// TypeScript = {

// }

/**
 * 可缺省对象接口
 */
interface OptionalProgramLanguage {
    /**语言名称 */
    name: string;
    /**使用年限 */
    age?: () => number; // undefined 
}

let OptionalTypeScript: OptionalProgramLanguage;
OptionalTypeScript = {
    name: 'JavaScript'
}

/**
 * 对对象属性或方法进行操作，就可以使用类型守卫或 Optional Chain
 * 避免运行时不时函数的方法
 */
if (typeof OptionalTypeScript.age === 'function') {
    OptionalTypeScript.age();
}

OptionalTypeScript.age?.();

/**
 * 只读属性（锁定写操作）
 */
interface ReadOnlyProgramLanguage {
    /**语言名称 */
    readonly name: string;
    /**使用年限 */
    readonly age: (() => number) | undefined;
}

let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
    name: 'TypeScript',
    age: undefined
}

// ReadOnlyTypeScript.name = 'zs'

/**
 * 定义函数类型
 */
interface StudyLanguage {
    (language: ProgramLanguage): void
}

let StudyInterface: StudyLanguage
    = language => console.log(`${language.name} ${language.age}`)

// 使用内联类型 或 类型别名配合箭头函数语法来定义函数类型
type StudyLanguageType = (location: ProgramLanguage) => void

/**索引签名定义映射结构 */
let LanguageRankMap = {
    1: 'TypeScript',
    2: 'JavaScript'
}

let LanguageMap = {
    'TypeScript': 2012,
    'JavaScript': 1995
}

/**
 * 定义索引签名接口
 */
interface LanguageRankInterface {
    [rank: number]: string;
}

interface LanguageYearInterface {
    readonly [name: string]: number;
}

{
    let LanguageRankMap: LanguageRankInterface = {
        1: 'TypeScript',
        2: 'JavaScript',
        // 'WrongIn': '2012'
    }

    let LanguageMap: LanguageYearInterface = {
        TypeScript: 2012,
        JavaScript: 1995,
        1: 1970
    }
}

// 继承与实现，类实现接口

/**
 * Type 类型别名
 * 将内联类型抽离出来，从而实现类型可复用
 *
 * type 别名 = 类型定义
 */

{
    type LanguageType = {
        name: string;
        age: () => number
    }
}

// type 针对接口类型无法覆盖的场景，只能使用类型别名来接收
{
    // 联合
    type MixedType = string | number;
    // 交叉
    type IntersectionType = { id: number; name: string; } & { age: number; name: string };
    // 提取接口
    type AgeType = ProgramLanguage['age']
}

// 接口类型可以重复定义，他们的属性会叠加，这样我们可以很容易与第三方融合
{
    interface Language {
        id: number;
    }

    interface Language {
        name: string;
    }

    let lang: Language = {
        id: 1,
        name: 'name'
    }
}
// 接口类型:掌握好接口类型,养成面向接口编程思维方式和惯性
// 将让我们的编程之路愈发顺利、高效

// 类型别名:使得类型可以像值一样能赋予另外一个变量(别名)
// 大大提升了类型复用性,最终也提升了我们的编程效率

```

### 2.5 高级类型（理解联合类型和交叉类型的含义）

#### 2.5.1 单一原子的类型元素

1. 基础类型
2. 字面量类型
3. 函数类型
4. 接口类型

#### 2.5.2 代码示例

```ts
/**
 * 联合类型（unions）用来表示变量，参数的类型不是
 * 单一原子类型，而可能是多种不同类型的组合
 *
 * 联合类型： 主要通过 “|” 操作符分割类型的语法来表示联合类型
 * 这里，可以把 “|” 类比为 JavaScript 中的逻辑或 “||”
 */

// 封装一个将 string 或者 number 类型的输入值转换 “数字” + “px” 格式的函数
function formatPX(size: unknown) {
    if (typeof size === 'number') {
        return `${size}px`;
    }
    if (typeof size === 'string') {
        return `${parseInt(size) || 0}px`;
    }
    throw Error(`仅支持 number 或者 string`)
}

const numPx = formatPX(13);
const stringPx = formatPX('13px');
console.log(numPx, stringPx)
// formatPX(true) // 运行出错

// 可以使用类型别名抽离上边联合类型，然后再将其进一步联合
type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型为上面两个的并集

/**
 * 接口类型联合起来表示更复杂的结构
 */

interface Bird {
    fly(): void;

    layEggs(): void;
}

interface Fish {
    swim(): void;

    layEggs(): void;
}

const getPet: () => Bird | Fish = () => {
    return {
        // ..
    } as Bird | Fish;
};

const pet = getPet();
// 判断基于 in 操作符判断类型守卫
// if (typeof pet.fly() === 'function')  { //ts (2339)
//     pet.fly();
// }

if ('fly' in pet) {
    pet.fly()
}

if ('layEggs' in pet) {
    pet.layEggs();// ok
}
// pet.fly(); // Fish 没有 fly 属性， 'Bird | Fish' 没有 'fly 属性'

/**
 * 交叉类型
 * 可以把多个类型合并为一个类型，合并后的类型拥有所有成员类型的特性
 * 使用 “&” 操作符表示交叉类型
 **/
{
    type Useless = string & number; // never 类型
}

// 合并接口类型：将多个接口类型合成一个类型，从而实现相等接口继承的效果
type intersectionType = { id: number, name: string } & { age: number };
const mixed: intersectionType = {
    id: 1,
    name: 'name',
    age: 18
}

// 报错
// {
//     type IntersectionTypeConfict = {id:number; name:string}
//     & {age: number; name: number}; // 两个冲突的 name ，number 无法赋值为 never 类型
//     const mixedConfilct: IntersectionTypeConfict = {
//         id: 1,
//         name: 2,
//         age: 2
//     }
// }

{
    type IntersectionTypeConfict = { id: number; name: 2 }
        & { age: number; name: number }; // 两个冲突的 name ，number 无法赋值为 never 类型
    const mixedConfilct: IntersectionTypeConfict = {
        id: 1,
        name: 2, // 不能赋值非2
        age: 2
    }
}

/**
 * 合并联合类型（求交集）
 * 需要同时满足不同的联合类型限制
 * 也就是提取了所有联合类型的相同类型成员
 */

type UninA = 'px' | 'em' | 'rem' | '%';
type UninB = 'vh' | 'em' | 'rem' | 'pt';
type IntersectionUnion = UninA & UninB
const intersectionA: IntersectionUnion = 'em'; // ok
const intersectionB: IntersectionUnion = 'rem'; // ok
// const intersectionC: IntersectionUnion = 'px'; // ts (2332)
// const intersectionD: IntersectionUnion= 'pt';

/**
 * 联合、交叉组合
 * 把分配率、交换律等基本规则引入类型组合中
 */
type UnionIntersectionC = ({ id: number; } & { name: string; } | { id: string; }) & { name: number; };
type UnionIntersectionD = { id: number; } & { name: string; } & { name: number; } & { id: string; } & { name: number; };//满足分配率
type UnionIntersectionE = ({ id: string; } | { id: number; } & { name: string; }) & { name: number; };//满足交换律


// number 和 boolean 一样的逻辑
type URStr = 'string' | string; // 类型是 string
type URNum = 2 | number; // 类型是 number
type URBoolen = true | boolean; // 类型是 boolean‘
enum EnumUR {
    ONE,
    TWO
}

type URE = EnumUR.ONE | EnumUR;// 类型是 EnumUR

/**
 * 类型缩减
 * 缩减极大地削减了 IDE 自动提升的能力
 */
type BorderColor = 'black' | 'red' | 'green' | 'yellow'
    | 'blue' | string // 类型缩减为 string

let color: BorderColor = 'black'

// 当联合类型的成员是接口类型，如果满足其中一个接口的属性是另外一个接口属性的子集
type UnionIntece =
    | {
    age: '1';
}

    | ({
    age: '1' | '2';
    [key: string]: string
})

// 定义 age 属性是数字类型，而其他不确定的属性是字符串你类型的数据结构对象

// 核心：找到一个即是 number 的子类型，这样 age 类型缩减之后的类型是 number。 同时也是 string 子类型

type UnionInterface =
    | {
    age: number;
}
    | ({
    age: never;
    [key: string]: string;
});

const O: UnionInterface = {
    age: 2,
    string: 'string'
}
```

### 2.6 枚举类型

> 常见枚举类型的 **7** 种用法

```ts
/**
 * 枚举 TS
 * 七种
 */

// 使用字面量类型来列举可能的类型，表示星期的类型
{
    type Day = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY'
        | 'FRIDAY' | 'SATRUDAY'
    const SUNDAY: Day = 'SUNDAY'
}

{
    // 数字表示星期几
    type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * 可以使用枚举定义包含被命名的常量集合
 * > TypeScript 支持数字、字符两种常量值的枚举类型
 * 可以使用 enmu 关键字定义枚举类型
 * > 格式是 enum + 枚举名字 + 一队花括弧（被命名了的常量成员）
 */

// 集合 或 集合类型
// TS 转译器  会把枚举类型转译为一个属性为常量，命名值从 0 开始递增数字映射的对象
enum Day {
    SUNDAY, // 0
    MONDAY, // 1
    TUESDAY, // 2
    WEDNESDAY, // 3
    THURSDAY, // 4
    FRIDAY,// 5
    SATURDAY// 6
}

// 转译后的效果
{
    // var Day = void 0;(function (Day){
    //     Day[ Day[ "SUNDAY"]=0]= "SUNDAY";Day[Day["MONDAY"] =1]="MONDAY";Day[Day["TUESDAY"]=2]="TUESDAY";
    //     Day Day["WEDNESDAY"]=3]="WEDNESDAY";Day[Day["THURSDAY"]=4]="THURSDAY";Day[Day[ "FRIDAY"]=5]= "FRIDAY";
    //     Day[Day["SATURDAY"]=6] ="SATURDAY";})(Day |l(Day = {));
}

// 访问枚举成员
function work(d: Day) {
    switch (d) {
        case Day.SUNDAY:
        case Day.SATURDAY:
            return 'take a res';
        case Day.MONDAY:
        case Day.TUESDAY:
        case Day.WEDNESDAY:
        case Day.THURSDAY:
        case Day.FRIDAY:
            return 'work hard';
    }
}

// 两种传值是等价的
work(Day.SUNDAY);
work(0)

/**
 * 枚举类型：
 * 1 数字类型
 * 2 字符串类型
 * 3 异构类型
 * 4 常量成员和计算（值）成员
 * 5 枚举成员类型
 * 6 常量枚举
 * 7 外部枚举
 */

// 数字枚举：仅仅指定常量命名下，定义的就是一个默认从0开始递增的数字集合
{
    // 初始值重命名
    enum Day {
        SUNDAY = 1, // 1
        MONDAY, // 2
        TUESDAY, // 3
        WEDNESDAY, // 4
        THURSDAY, // 5
        FRIDAY,// 6
        SATURDAY// 7
    }

    // 会转换成 1 递增的值
}

// 字符串枚举：定义值是字符串字面量的枚举
{
    enum Day {
        SUNDAY = 'SUNDAY', // 1
        MONDAY = 'MONDAY' // 2
    }

    // 转换成 JS
    // var Day = void O;(function(Day){
    //     Day["SUNDAY"] = "SUNDAY";
    //     Day["MONDAY"] = "MONDAY";})
    //     (Day ||l (Day = [));

}

// 异构枚举：TypeScript 支持枚举类型同时拥有数字和字符串类型的成员
{
    enum Day {
        SUNDAY = 1, // 1
        MONDAY = 'MONDAY' // 2
    }
}

/**
 * 枚举成员的值既可以是数字、字符串这样的常量，也可以是通过表达式计算出来的值
 */

// 常量成员 和 计算（值）成员
enum FileAccess {
    // 常量成员
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // 计算成员
    G = "123".length,
}

// 缺省值，比如 上述的 None 是从0开始递增

//   枚举类型
{
    enum Day {
        MONDAY // 字面量类型就是枚举类型
    }
}


//   常量枚举
/**
 * 添加 const 修饰定义常量枚举
 * 常量枚举定义转译翻译为 JavaScript 之后会被移除，并使用常量枚举成员的地方会被替换为相应的内联值
 * 因此常量枚举的成员都必须是常量成员（字面量 + 转译阶段课计算值表达式）
 */

{
    const enum Day {
        SUNDAY,
        MONDAY
    }

    const work = (d: Day) => {
        switch (d) {
            case Day.SUNDAY: // 0
                return 'take a rest';
            case Day.MONDAY: // 1
                return 'work hard';
        }
    }
}

/**
 * 外部枚举
 * 通过 declare 描述一个在其他地方已经定义过的变量
 * 作用：为两个不同枚举的成员内进行兼容，比较，被复用提供了一种途径
 */

// declare let $:any; // 将 $ 定义为任意类型
// ${'#id'}.addClass('show');

// 描述一个已经在其他地方定义过的
// declare enum Day {
//     SUNDAY
// }
```

### 2.7 泛型

```ts
/**
 * 使用 TypeScript 实现与 call（或者 apply）功能类似的函数
 *
 * 什么是泛型，泛型的作用是什么？
 * > 泛型指的是类型参数化，即将原来某种具体的类型进行参数化
 *
 * 可以给泛型定义若干个类型参数
 * 并在调用时给定明确的类型参数
 *
 * 设计泛型的目的：
 * > 有效约束类型成员之间的关系。函数参数和返回值、类或接口成员和方法之间的关系
 */

function reflect(param: unknown) {
    return param;
}

const str = reflect('str');// str 是 unknown 类型
const num = reflect(1);// num 类型也是 unknown
console.log(str)

// 定义泛型参数
function reflectFX<P>(param: P) {
    return param;
}

const reflectStr = reflectFX<string>('string');// str 是 string 类型
const reflectNum = reflectFX<number>(1);// num 是 number
const reflectNum1 = reflectFX(1); // num1 也是 number【可缺省】
console.log(reflectNum)

function reflectArray<P>(param: P[]) {
    return param;
}

const reflectArr = reflectArray([1, '1']) // 类型为 (string | number)[]

// 给函数定义任何个数的泛型入参
function reflectExtraParams<P, Q>(p1: P, p2: Q) {
    return [p1, p2];
}

// 泛型约束构造函数、属性、方法的类型
class Memory<S> {
    store: S;

    constructor(store: S) {
        this.store = store;
    }

    set(store: S) {
        this.store = store;
    }

    get() {
        return this.store;
    }
}

const numMenory = new Memory<number>(1); // <number> 可缺省
const getNumMemory = numMenory.get(); // 类型是 number
numMenory.set(2); // 只能写入 number类型

const strMemory = new Memory(""); //缺省 string
const getStrMemory = strMemory.get(); // string
strMemory.set('12312')

// 分配条件泛型
type BooleanOrString = string | boolean;
// type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; // string | boolean


// 使用泛型，抽象封装出很多有用，复杂的类型约束
interface ReduxModel<State> {
    state: State;
    reducers: {
        [action: string]: (state: State, action: any) => State
    }
}

type ModelInterface = { id: number; name: string };
const model: ReduxModel<ModelInterface> = {
    state: {id: 1, name: '千元'}, //
    reducers: {
        setId: (state, action: { payload: number }) => ({
            ...state,
            id: action.payload// ok 是 number
        }),
        setName: (state, action: { payload: string }) => ({
            ...state,
            name: action.payload
        })
    }
}

// ps：枚举不支持泛型

function reflectSpecified<P extends number | string | boolean>(param: P): P {
    return param;
}

reflectSpecified('string');
reflectSpecified(1);
reflectSpecified(true);
let res = reflectSpecified(null);
console.log(res)
```

## 三、TypeScript 进阶

### 3.1 TypeScript 类型守卫：保障业务类型的安全性

## X、错误汇总

1. ts (2332) 是什么错误？什么时候会出现

2. 类型断言会在什么时候出现

3. 如何注解函数 中 this 的类型？函数类型重载的匹配顺序是什么

4. public, protected, private 类型区别

5. 联合类型中，类型缩减的规则是什么？

6. 枚举有什么特性？常量枚举有什么特性？

7. 如何使用 TypeScript 实现 call？（Parameters、ReturnType）