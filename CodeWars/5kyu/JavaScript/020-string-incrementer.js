// https://www.codewars.com/kata/54a91a4883a7de5d7800009c
// Your job is to write a function which increments a string, to create a new string.
// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:
// foo -> foo1
// foobar23 -> foobar24
// foo0042 -> foo0043

function incrementString(strng) {
    // find the ending number part of the string
    const nums = strng.match(/\d+$/);

    if (nums === null) {
        // if nothing was found append 1 to the string
        return strng + 1;
    } else {
        // else create a string with the same length or more and replace old number with new
        const num = nums[0];
        const new_nums = ('' + (+num + 1)).padStart(num.length, '0');
        return strng.replace(nums, new_nums);
    }
}


console.log(incrementString("foobar000"), "foobar001");
console.log(incrementString("foo"), "foo1");
console.log(incrementString("foobar001"), "foobar002");
console.log(incrementString("foobar99"), "foobar100");
console.log(incrementString("foobar099"), "foobar100");
console.log(incrementString(""), "1");