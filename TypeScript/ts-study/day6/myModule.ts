// 模块
export const myVar: number = 10;

export function  myFunc():void {
    console.log("Hello from myModule");
}

// 命名空间
export namespace MyNameSpace {
    export const myVar = 20;
    
    export function myFunc() {
        console.log("Hello from myNameSpace");
    }
}