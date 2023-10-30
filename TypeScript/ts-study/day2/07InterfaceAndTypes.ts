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
function Study(language: {name: string; age: () => number
}) 
{
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
function studyTypeScript({name,age}:{name:string,age:()=>number}) {
    console.log(name,age)
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
    name:string;
    /**使用年限 */
    age?: ()=>number; // undefined 
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
    readonly name:string;
    /**使用年限 */
    readonly age: (()=> number) | undefined;
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
    (language: ProgramLanguage):void
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
    type IntersectionType = {id: number; name: string;} & {age: number; name:string};
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
