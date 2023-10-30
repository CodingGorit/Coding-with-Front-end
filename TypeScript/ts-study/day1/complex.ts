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
let arrayOfNumer: number[] = [1,2,3]
let arrayOfString: string[] = ['1','2','3']

// 定义数组方式二 （使用泛型）
let myArray: Array<number> = [2,3,4]
console.log(arrayOfNumer, arrayOfString, myArray)

// 元组类型：特性限制数组元素的个数和类型，它特别适合用来实现多值返回
let arr:[number,string] = [1,'2']
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
let str:string = anything

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
function ThrowError (msg: string):never {
 throw Error(msg)
}

// let unCertian: never = 1 // ts(2322)
// let num3:null = unCertian

// 把 never 作为接口类型向下属性类型，用来禁止写接口下特定的属性
const props: {
    id: number,
    name?:never
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
