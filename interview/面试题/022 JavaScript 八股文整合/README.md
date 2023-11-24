# JavaScript 八股文整理

## JS 由哪三部分组成

ECMAScript：JS 的核心内容，描述了语言的基础语法，比如 var，for，数据类型（数组、字符串）
文档对象模型（DOM）：DOM 把这个 HTML页面规划为元素构成文档
游览器对象模型（BOM）：对游览器窗口进行访问和操作


## JS 有哪些内置对象

- String
    - concat()
    - length
    - slice()
- Boolean
- Number
- Array
    - map()
    - filiter()
    - reduce()
- Object
- Function
- Math
    - Math.pow()
    - Math.max()
    - min()
- Date
    - new Date()
    - Date.now()
    - getYear()
- RegExp
- Error
- JSON
- ...

## 操作数组的方法

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

## JS 数据类型检测方式有哪些？

1. typeof() 只适用于基础数据类型，遇到引用数据类型就不能用  Array 会检测为 Object
2. instanceof   只能判断引用数据类型，不能判断基本数据类型
3. constructor 几乎可以判断基础数据类型 和 引用数据类型，如果声明了一个构造函数，并把它的指向了 Array
4. Object.prototype.toString.call(obj)
