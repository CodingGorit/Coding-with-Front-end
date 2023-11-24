/**
 * Created Date: Friday, November 24th 2023, 12:49:38 am
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Fri Nov 24 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// 遍历对象：for..in 可以，for..of 不可以
{
    let obj = {
        name : 'CodingGorit',
        age: 18
    }
    for (let key in obj) {
        console.log(key);
    }
}
// 遍历 Map Set： for..of 可以， for..in 可以
// 遍历 generator：for..of 可以，for..in 不可以


// for..in 用于 可枚举数据，如对象，数组，字符串，得到 key
// for..of 用于可迭代数据，数组，字符串，map，set，得到 value