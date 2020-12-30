// https://www.codewars.com/kata/52249faee9abb9cefa0001ee
// Implement a function which behaves like the uniq command in UNIX.
// It takes as input a sequence and returns a sequence in which all duplicate elements following each other have been reduced to one instance.
// Example:// ["a", "a", "b", "b", "c", "a", "b", "c"]  =>  ["a", "b", "c", "a", "b", "c"]

function uniq(a) {
    // create the result array
    let result = [];

    // variable to store the previous value of the array
    let previous;

    // iterate through the array
    a.map(current => {
        if (previous !== current) {
            result.push(current);
        }
        previous = current;
        return previous;
    });

    return result;

}

console.log(uniq(['a','a','b','b','c','a','b','c','c'])); //, ['a','b','c','a','b','c']);
