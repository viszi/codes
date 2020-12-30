// https://www.codewars.com/kata/530017aac7c0f49926000084
// Implement a function which takes a sequence of objects and a property name, and returns a sequence containing the named property of each object.
// For example:
//  pluck([{a:1}, {a:2}], 'a')      // -> [1,2]
//  pluck([{a:1, b:3}, {a:2}], 'b') // -> [3, undefined]
// If an object is missing the property, you should just leave it as undefined/None in the output array.

function pluck(objs, name) {

    let result = [];

    objs.forEach(element => {
        // for (let [key, value] of Object.entries(element)) {
        //     result.push((key == name) ? value: undefined);
        //   }
        result.push((element[name]));
    });

    return result;
}

function pluck(objs, name) {
    return objs.map(function (obj) { return obj[name] });
}

console.log(pluck([{ a: 1 }, { a: 2 }], 'a')); //, [1,2])
console.log(pluck([{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }, { a: 10, b: 11 }], 'a'));