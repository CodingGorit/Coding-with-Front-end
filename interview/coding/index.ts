/**
 * Created Date: Monday, November 20th 2023, 2:57:35 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Mon Nov 20 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


function flat(nums: any[], depth: number): number[] {
    const stack = [...nums];
    const res: number[] = [];
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next) && depth > 0) {
            res.push(...next);
        } else {
            res.unshift(next);
        }
        depth--;
    }
    return res;
}

// 手写深拷贝

//方法一:
const obj_test = {
 a: 1,
 b: {
  c: [1,2],
  d: "aaa"
 }
}

const copied_obj_test = JSON.parse(JSON.stringify(obj_test));

// 方法二: 使用 loadsh

// 手写:
function deepClone_test(obj: any) {
 if (typeof obj !== 'object' || obj === null) {
  return obj;
 }
 let res: any;
 if (obj instanceof Array) {
  res = [];
 } else {
  res = {};
 }
 for (let key in obj) {
 // 判断 obj 上的元素不是来自父元素
//  Object.prototype.hasOwnProperty.call(key);
  if (obj.hasOwnProperty(key)) {
   res[key] = deepClone_test(obj[key]);
  }
 }
 
 return res;
}

// 手写节流
function throttle_test(fn: Function, delay: number = 1000) {
 let old = Date.now();
 return function () {
  const args = arguments; // arguments 是一个类数组对象
  const context = this;
  let now = Date.now();
  if (now - old >= delay) {
   fn.apply(context, args);
   old = now;
  }
 }
}

function throttle_timer_test(fn: Function, delay) {
 let timer;
 return function (...args) {
  if (!timer) {
   timer = setTimeout(() => {
    fn.apply(this, args);
    timer = null;
   }, delay);
  }
 }
}

function  throotle_best(fn:Function, delay = 200) {
  let timer = null;
  let startTime = Date.now();
  return function () {
   let currentTime = Date.now();
   let remaining = delay - (currentTime - startTime);
   const context = this;
   const args = arguments;
   if (remaining <= 0) {
    fn.apply(context, arguments);
    startTime = Date.now();
   } else {
    timer = setInterval(fn, remaining);
   }
  }
}

function myCall(fn: Function, obj: any, ...args: any[]) {
 if (!obj) {
  obj = window || globalThis;
 }
 obj.temp = fn;
 const result = obj.temp(...args);
 delete obj.temp;
 return result;
}

function myApply(fn: Function, obj: any, args: any[]) {
 if (!obj) {
  obj = window || globalThis;
 }
 
 obj.temp = fn;
 const result = obj.temp(...args);
 delete obj.temp;
 return result;
}