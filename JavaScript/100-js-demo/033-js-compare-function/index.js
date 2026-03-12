// 对象数组根据对象属性排序
function createCompareFunction(property) {
    return function (val1, val2) {
        const value1 = val1[property];
        const value2 = val2[property];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

// 使用示例
const arr = [
    {name: 'zhangsan', age: 13}, 
    {name: "lisi", age: 12}, 
    {name: 'wangwu', age: 12}
];

console.log('Original array:', arr);

// 按名字排序
arr.sort(createCompareFunction('name'));
console.log('Sorted by name:', arr);

// 按年龄排序
arr.sort(createCompareFunction('age'));
console.log('Sorted by age:', arr);
