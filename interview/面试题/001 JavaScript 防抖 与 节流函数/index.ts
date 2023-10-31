/**
 * Created Date: Tuesday, October 31st 2023, 4:46:04 pm
 * Author: CodingGorit
 * -----
 * Last Modified: Tue Oct 31 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// ============== 节流 ================
/**
 * 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 */


function throttle_timestamp(fn: Function, delay = 500) {
    let lastTime = 0;
    return function (...args) {
        let newTime = Date.now();
        if (newTime - lastTime > delay) {
            fn.apply(this, args);
            lastTime = Date.now();
        }
    }
}

function throttle_timeout(fn: Function, delay = 500) {
    let timer: number | null = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    }
}

function throttle(fn: Function, delay = 500) {
    let timer: number | null = null;
    let startTime = Date.now();
    return function() {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        const context = this;
        const args = arguments;
        // clearTimeout(timer);
        if (remaining <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}

// ============== 防抖 ================
/**
 * 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 */

function debounce(fn: Function, delay: number) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}