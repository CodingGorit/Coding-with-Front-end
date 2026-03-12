/**
 * @author CodingGorit
 * @date 2022年3月25日
 */

/**
 * @param arr 
 * @throws if param is not an array
 * @returns Get the max value from array
 */
export function _max(arr: Array<number>) {
    if (!arr) {
        throw new Error("argument is not an Array");
    }
    if (arr.length === 0) {
        return arr;
    }
    return Math.max.apply(null, arr);
}