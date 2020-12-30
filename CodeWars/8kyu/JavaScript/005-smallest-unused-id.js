// https://www.codewars.com/kata/55eea63119278d571d00006a
// Use zero-based and non-negative ID's to make each data item unique! Returns the smallest unused ID for your next new data item...
// Note: The given array of used IDs may be unsorted. For test reasons there may be duplicate IDs, but you don't have to find or remove them!

function nextId(ids) {

    //get the length of the ids
    let length = ids.length;

    let number = 0;

    //check sequential numbers 
    for (; number < length; number++) {
        //if array does not contain the number stop the loop
        if (ids.indexOf(number) === -1) break;
    }

    return number
}

function nextId(ids) {
    const used = new Set(ids);
    for (let i = 0; i <= ids.length; i++) {
        if (!used.has(i)) return i;
    }
}

console.log(nextId([0, 1, 2, 3, 5]), 4);
console.log(nextId([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 11);
console.log(nextId([4, 8, 9, 8, 8, 1, 8, 1]), 0);
console.log(nextId([4, 6, 7, 1, 7, 7, 2, 6]), 0);