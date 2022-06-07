"use strict";

class Singleton {

    private static _instance;

    static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    static releaseInstance() {
        delete this._instance;
        this._instance = null;
    }

    // 禁止外部 new
    private constructor () {
        if (new.target !== undefined) {
            console.log("created !!!");
        }
    }

    // 你自己定义的一些方法等等
}