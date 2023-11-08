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
 * - pending
 * - fullfilled
 * - rejected
 *  https://zhuanlan.zhihu.com/p/183801144
 * 类似发布订阅模式
 */

type PromiseStatus = 'pending' | 'fulfilled' | 'rejected';

class MyPromise {
    // 默认状态
    private _status: PromiseStatus;
    // 存储状态成功的值
    private _value: any;
    // 存储状态失败的值
    private _reason: any;
    private onResolvedCallback: Function[];
    private onRejectedCallback: Function[];

    constructor(executor) {
        this._status ='pending';
        this._value = undefined;
        this._reason = undefined;
        // 存放成功的回调
        this.onResolvedCallback = [];
        // 存放失败的回调
        this.onRejectedCallback = [];


        const onResolved = (value) => {
            if (this._status === 'pending') {
                this._status = 'fulfilled';
                this._value = value;
                // 依次执行函数
                this.onResolvedCallback.forEach((fn) => fn());
            }
        }

        const onRejected = (reason) => {
            if (this._status === 'pending') {
                this._status = 'rejected';
                this._reason = reason;
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
            onRejected(this._reason);
        } else {
            this.onResolvedCallback.push(onResolved);
            this.onRejectedCallback.push(onRejected);
        }
    }

    static resolve(value: any): MyPromise {
        return new this((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    }

    static reject(value: any): MyPromise {
        return new this((resolve, reject) => {
            reject(value);
        });
    }

    static catch(onRejected: Function) {
        // return this.th
    }
}


let promise = new MyPromise({}).then