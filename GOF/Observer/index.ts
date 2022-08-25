/**
 * @see
 * https://www.bilibili.com/video/BV1qa411K7pu?is_story_h5=false&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=3bc1336c-0550-4e78-80e7-ccbe5e90ccb8&share_source=COPY&share_tag=s_i&timestamp=1661317719&unique_k=RqZRQ8I&vd_source=e9ef2749e9cd09056c2a449753f87ee8
 */

/**
 * 发布事件时，发给所有观察者
 */

// 被观察者
class Teacher {
    private _observer: Array<any>;
    constructor() {
        this._observer = [];
    }

    // return this 实现链式调用
    public addObserver(ob) {
        this._observer.push(ob);
        return this;
    }

    public sendMsg(msg) {
        this._observer.forEach(el => el.notice(msg));
    }
}

// 观察者
class Student {
    private _name: string;
    constructor(name) {
        this._name = name;
    }
    notice(msg) {
        console.log(`我: ${this._name}, 收到了消息: ${msg}`);
    }
}

let MissLiu = new Teacher();
let ZhangSan = new Student("张三");
let LiSi = new Student("李四");
let WangWu = new Student("王五");

MissLiu.addObserver(ZhangSan).addObserver(LiSi).addObserver(WangWu);
MissLiu.sendMsg("haha");


interface Listener {
    (...args: any[]): void;
    fn?: Listener
}

class Observer {

    protected events = {};

    on (eventName: string, callback: Listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [callback];
        } else {
            this.events[eventName].push(callback);
        }
    }

    // 拿到 callback 列表，并执行对应的函数
    emit (eventName: string) {
        if (!eventName) {
            return false;
        }
        const subscribers = this.events[eventName] || [];
        subscribers.forEach(sub => sub());
        return true;
    }

    off (eventName: string, subscriber: Listener) {
        if (!eventName) {
            return;
        }
        const subscribers = this.events[eventName] || [];
        if (subscribers) {
            const index = subscribers.findIndex(el => el === subscriber);
            index > -1 && subscribers.splice(index, 1);
        }
    }

    once (eventName: string, callback: Listener) {
        const on = (...args) => {
            callback(...args);
            this.off(eventName, on);
        }
        callback.fn = on;
        this.on(eventName, on);
        return this;
    }
}

const bookStore = new Observer();

const listener1 = () => {
    console.log("用户一买书");
}

// 第一次执行，第二次被删除
bookStore.on("newBook", listener1);

// 执行两次
bookStore.on("newBook", () => {
    console.log("用户二买书");
});

// 执行一次
bookStore.once("newBook", () => {
    console.log("用户三买书");
});

bookStore.emit("newBook");

bookStore.off("newBook", listener1);

bookStore.emit("newBook");