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
function work(d:Day) {
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
    
    const work = (d:Day) => {
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