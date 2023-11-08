/**
 * Created Date: Wednesday, November 8th 2023, 6:04:37 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Wed Nov 08 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

/**
 * promise 有三个状态
 * pending
 * fullfilled
 * rejected
 */

type PromiseStatus = 'pending' | 'fulfilled' | 'rejected';

class MyPromise {
    private _status: PromiseStatus;
    private _value: any;
    private onResolvedCallback: Function[];
    private onRejectedCallback: Function[];

    constructor(executor) {
        this._status ='pending';
        this._value = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];


        const onResolved = (value) => {
            if (this._status === 'pending') {
                this._status = 'fulfilled';
                this._value = value;
                this.onResolvedCallback.forEach((fn) => fn());
            }
        }

        const onRejected = (reason) => {
            if (this._status === 'pending') {
                this._status = 'rejected';
                this._value = reason;
                this.onRejectedCallback.forEach((fn) => fn());
            }
        }

        try {
            executor(onResolved, onRejected);   // 传入执行的函数
        } catch (e) {
            onRejected(e);
        }
    }

    then(onResolved, onRejected) {
        if (this._status === 'fulfilled') {
            onResolved(this._value);
        } else if (this._status === 'rejected') {
            onRejected(this._value);
        } else {
            this.onResolvedCallback.push(onResolved);
            this.onRejectedCallback.push(onRejected);
        }
    }

    static resolve(value: any): MyPromise {
        return new this((resolve) => {
            resolve(value);
        });
    }

    static reject(value: any): MyPromise {
        return new this((resolve, reject) => {
            reject(value);
        });
    }
}


let promise = new MyPromise({}).then