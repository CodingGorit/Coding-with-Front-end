import { deepDataObjCopy, resetObject } from "../../core/objects"
import { testObj } from "../../types"

const TAG = "test > object ";

const obj: testObj = {
    name: "CoCo",
    age: 22,
    eighteen: true,
    charteristic: {
        aaa: "xxx",
        age: 44,
        eighteen: true
    },
    hobbies: ['baseball','table tennis']
}

const res = resetObject(obj);

console.log(TAG, res);

const copiedObj = deepDataObjCopy(obj);

copiedObj.name = "ZS";

console.log(TAG, obj);
console.log(TAG, copiedObj);