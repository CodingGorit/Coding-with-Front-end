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
        return `${parseInt(size)||0}px`;
    }
    throw Error(`仅支持 number 或者 string`)
}

const numPx = formatPX(13);
const stringPx = formatPX('13px');
console.log(numPx,stringPx)
// formatPX(true) // 运行出错

// 可以使用类型别名抽离上边联合类型，然后再将其进一步联合
type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型为上面两个的并集

/**
 * 接口类型联合起来表示更复杂的结构
 */

interface Bird {
    fly():void;
    layEggs():void;
}

interface Fish {
    swim():void;
    layEggs():void;
}

const getPet:() => Bird | Fish = () => {
    return  {
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
type intersectionType = {id: number,name: string} & {age: number};
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
    type IntersectionTypeConfict = {id:number; name:2}
    & {age: number; name: number}; // 两个冲突的 name ，number 无法赋值为 never 类型
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
 type UnionIntersectionC= ({ id: number; }& { name:string; } | {id: string; }) &{name: number; };
 type UnionIntersectionD = {id: number; } & { name: string; }&{name: number; } &{ id: string; } &{ name: number;};//满足分配率
 type UnionIntersectionE= ({ id: string; } | { id: number; }&{name: string; })&{name: number; };//满足交换律
 

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
    [key: string]:string
})

// 定义 age 属性是数字类型，而其他不确定的属性是字符串你类型的数据结构对象

// 核心：找到一个即是 number 的子类型，这样 age 类型缩减之后的类型是 number。 同时也是 string 子类型

type UnionInterface =
| {
    age: number;
}
| ({
    age: never;
    [key:string]:string;
});

const O: UnionInterface = {
    age: 2,
    string: 'string'
}