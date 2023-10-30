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

function reflect (param: unknown) {
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

function reflectArray<P>(param:P[]) {
    return param;
}
const reflectArr = reflectArray([1,'1']) // 类型为 (string | number)[]

// 给函数定义任何个数的泛型入参
function reflectExtraParams<P,Q>(p1:P,p2:Q) {
    return [p1,p2];
}

// 泛型约束构造函数、属性、方法的类型
class Memory<S> {
    store: S;
    constructor(store:S) {
        this.store = store;
    }

    set(store:S) {
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
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[]: BooleanOrString; // string | boolean


// 使用泛型，抽象封装出很多有用，复杂的类型约束
interface ReduxModel<State> {
    state: State;
    reducers: {
        [action: string]:(state:State,action: any) => State
    }
}

type ModelInterface = {id:number; name:string};
const model: ReduxModel<ModelInterface> = {
    state: {id: 1, name: '千元'}, //
    reducers: {
        setId: (state,action: {payload:number})=> ({
            ...state,
            id: action.payload// ok 是 number
        }),
        setName: (state,action:{payload:string}) => ({
            ...state,
            name:action.payload
        })
    }
}

// ps：枚举不支持泛型

function reflectSpecified<P extends number| string | boolean>(param: P):P {
    return param;
}

reflectSpecified('string');
reflectSpecified(1);
reflectSpecified(true);
let res = reflectSpecified(null);
console.log(res)