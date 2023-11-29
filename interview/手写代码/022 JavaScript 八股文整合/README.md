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

区别哪些会修改原数组?

- push
- pop
- shift
- unshift
- splice
- sort

## JS 数据类型检测方式有哪些？

1. typeof() 只适用于基础数据类型，遇到引用数据类型就不能用  Array 会检测为 Object
2. instanceof   只能判断引用数据类型，不能判断基本数据类型
3. constructor 几乎可以判断基础数据类型 和 引用数据类型，如果声明了一个构造函数，并把它的指向了 Array
4. Object.prototype.toString.call(obj)

## 什么是闭包？

函数嵌套函数，内部函数被外部函数返回并保存下来时，就会产生闭包

特点：

1. 可以重复利用变量
2. 并且这个变量不会污染全局的一种机制
3. 这个变量是一直保存在内存中，不会被 GC

缺点：

1. 闭包较多时，会消耗内存，影响性能，只有在 IE 游览器中才会导致内存泄露

使用场景：
防抖、节流、函数嵌套函数避免全局污染的时候