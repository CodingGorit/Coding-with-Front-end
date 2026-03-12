/**
 * @author CodingGorit
 * @date 2022年3月25日
 */

/**
 * @abstract Initializes the object value
 * @param obj 
 * @throws if obj is not an object
 * @returns the resetObject
 */
export function resetObject(obj: Object) {
    if (typeof obj !== 'object') {
        throw new Error('type obj is not object');
    }

    const tempObj = deepDataObjCopy(obj);
    for (const key in tempObj) {
        let val = tempObj[key];
        if (typeof val === 'string') {
            tempObj[key] = "";
        }
        if (typeof val === 'number') {
            tempObj[key] = 0;
        }
        if (typeof val === 'boolean') {
            tempObj[key] = false;
        }
        if (typeof val === 'object') {
            // Array is object
            if (Array.isArray(val)) {
                tempObj[key] = [];
            } else {
                tempObj[key] = {};
            }
        }
    }
    return tempObj;
}


export function deepDataObjCopy(obj: Object) {
    if (typeof obj !== 'object') {
        return obj;
    } else {
        return JSON.parse(JSON.stringify(obj));
    }
}