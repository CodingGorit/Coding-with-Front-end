/**
 * Created Date: Wednesday, December 18th 2024, 10:29:02 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Wed Dec 18 2024
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2024 <<company>> All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

 class EventEmitter {
    events: {};
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }


    emit(eventName, ...args) {
        if (!this.events[eventName]) return false;
        this.events[eventName].forEach(fn => fn(...args));
        return true;
    }

    off(eventName, fn) {
        if (!this.events[eventName]) return false;
        const index = this.events[eventName].findIndex(f => f === fn);
        if (index === -1) return false;
        this.events[eventName].splice(index, 1);
        return true;
    }

    once(eventName, fn) {
        const wrapper = (...args) => {
            fn(...args);
            this.off(eventName, wrapper);
        };
        this.on(eventName, wrapper);
    }

    allOff() {
        this.events = {};
    }

}
