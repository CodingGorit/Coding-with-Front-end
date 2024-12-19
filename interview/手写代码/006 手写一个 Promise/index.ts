/**
 * Created Date: Thursday, December 19th 2024, 10:09:51 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Thu Dec 19 2024
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2024 fmin-courses.com All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


class MyPromise<T> {
    private callbacks: Array<(value: T) => void> = [];
    private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
    private value: T | null = null;
    private reason: any = null;

    constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
        const resolve = (value: T) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.callbacks.forEach(callback => callback(value));
            }
        };

        const reject = (reason: any) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled: (value: T) => void): MyPromise<T> {
        return new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled' && this.value !== null) {
                onFulfilled(this.value);
                resolve(this.value);
            } else if (this.state === 'pending') {
                this.callbacks.push((value: T) => {
                    onFulfilled(value);
                    resolve(value);
                });
            }
        });
    }
}