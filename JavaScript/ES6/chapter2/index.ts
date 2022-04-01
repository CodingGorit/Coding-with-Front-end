
// 正则表达式
{
    // 支持 Unicode，对 UTF-16 支持

}


// ES6 字符串新增方法
{
    // 字符串子串识别
    let msg = "Hello World!";

    console.log(msg.startsWith("Hello"));   // true

    console.log(msg.startsWith("Hello", 0));    // true

    console.log(msg.endsWith("!")); // true

    console.log(msg.includes("o")); // true

    // PS: 以上三个方法不能传 正则表达式，而 indexOf or lastindexOf 可以传正则表达式
}

{
    // 字符串 repeat

    console.log("x".repeat(3)); // xxx
}