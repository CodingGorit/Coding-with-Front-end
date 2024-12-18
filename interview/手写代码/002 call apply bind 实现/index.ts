/**
 * Created Date: Wednesday, November 1st 2023, 12:13:23 am
 * Author: CodingGorit
 * -----
 * Last Modified: Wed Nov 01 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// https://blog.csdn.net/weixin_45844049/article/details/118026630

// ============== call =================

function myCall(fn: Function, obj: any, ...args: any[]) {
    if (!obj) {
        obj = window || globalThis;
    }

    obj.temp = fn;
    const result = obj.temp(...args);
    delete obj.temp;
    return result;
}

// ============== apply =================

function myApply(fn: Function, obj: any, args: any[]) {

}


// ============== bind =================

