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
    let specifiedStr:'this is str' = 'this is str';
    let specifiedNum:1 = 1;
    let specifiedBoolean:true =true
}

// 应用场景、使用字面量类型组合的联合类型，限制函数指定的参数为指定的字面量类型
type Direction = 'up' | 'down'
function move(dir:Direction) {
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
    const z= null; // 类型是 null
    // ====== 分界线
    let anyFun = (param = null) => param; // 形参类型是 null
    let z2 = z;// null
    let x2 = x;//null
    let y2 = y;// undefined
}

// type narrowing 使用类型守卫将函数参数类型从 any 缩小到明确类型
{
    let func =  (anything: any) => {
        if (typeof anything === 'string') {
            return anything;// anything 类型是 string
        } else if (typeof anything ==='number') {
            return anything;// anything 类型是 number
        }
        return null;
    }
}

// 通过多种表达式，将联合类型收敛为更具体的类型
{
    type Goods = 'pen' | 'pencil' | 'ruler';
    const getPenCost = (item:'pen') => 2;
    const getPencilCost = (item:'pencil') => 4;
    const getRulerCost = (item:'ruler') => 6;
    
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