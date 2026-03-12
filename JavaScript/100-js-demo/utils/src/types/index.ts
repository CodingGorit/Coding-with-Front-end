
export interface testObj {
    name: string,
    age: number,
    eighteen: boolean,
    hobbies?: Array<string>,    // typeof === object need Array.isArray() to check
    charteristic?: Object
}