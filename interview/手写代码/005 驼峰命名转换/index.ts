/**
 * Created Date: Tuesday, November 7th 2023, 12:02:54 am
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Tue Nov 07 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// 有字符串 get-element-by-id ，需要转换为 getElementById

function combo(s: string) {
    const arr = s.split('-');
    for (let i = 1; i < arr.length; i++) {
        // arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1, arr[i].length);
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1, arr[i].length);

    }
    return arr.join('');
}

console.log(combo('get-element-by-id'));
