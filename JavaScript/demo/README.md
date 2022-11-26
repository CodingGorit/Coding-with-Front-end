# Function 小技巧

## 函数返回值

> 一个函数返回另一个函数【场景】

```javascript
// 对象数组根据对象属性排序
function createCompareFunction(property) {
    return function (val1, val2) {
        const value1 = va1[property];
        const value2 = va2[property];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}


const arr = [{name: 'zhangsan', age: 13}, {name: "lisi", age: 12}, {name: 'wangwu', age: 12}];

arr.sort(createCompareFunction('name'));

arr.sort(createCompareFunction('age'));
```

## 函数内部属性

- arguments（获取参数数组）
- this （当前作用域）

```javascript

// 典型阶乘
function factorial(num) {
    if (num === 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }

}

// 万一函数名变化了之后，递归 else 中得函数名也得高，这样就耦合性有点高

function fac(num) {
    if (num === 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1); //这么写，函数名变了，这里也不会有影响，严格模式不支持
    }

}

```