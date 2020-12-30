// https://www.codewars.com/kata/5629db57620258aa9d000014
// Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.
// s1 = "A aaaa bb c"          s2 = "& aaa bbb c d"
// s1 has 4 'a', 2 'b', 1 'c'  s2 has 3 'a', 3 'b', 1 'c', 1 'd'
// So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.
// We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.
// The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.
// In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".


function mix(s1, s2) {

    //convert s1 and s2 to object which contains lowercase letters and their frequencies
    let letters = splitIntoObject({}, s1, 1);
    letters = splitIntoObject(letters, s2, 2);

    let result = [];

    for (const letter in letters) {
        const value1 = letters[letter].s1;
        const value2 = letters[letter].s2;

        if (value1 > 1 || value2 > 1) {
            if (value1 === value2) {
                result.push(value1, letter, '=:');
            } else if (value1 > value2) {
                result.push(value1, letter, '1:');
            } else {
                result.push(value2, letter, '2:');
            }
        }
    }

    if (result.length > 0) {
        return multiSort(result).join('/');
    } else {
        return '';
    }

}

function multiSort(arr) {

    let result = [];
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    //find the max number in the array
    let max = arr.filter(value => !isNaN(value)).reduce((max, val) => val > max ? val : max);

    while (max > 1) {

        let temp = [];

        //if temp contains nothing we can grab max number elements from str1
        if (temp.length === 0) {
            for (i = 0; i < arr.length; i += 3) {
                if (arr[i] === max && arr[i + 2] != '=:') {
                    temp.push(i);
                }
            }
        }

        //if temp contains nothing we can grab max number elements from what left
        if (temp.length === 0) {
            for (i = 0; i < arr.length; i += 3) {
                if (arr[i] === max) {
                    temp.push(i);
                }
            }
        }

        //process all elements from the temp array
        while (temp.length > 0) {

            //find the smallest item by letters
            let smallest = 27;
            let smallestIndex;
            let smallestTempIndex = 0;
            for (j = 0; j < temp.length; j++) {
                let index = temp[j];
                if (ALPHABET.indexOf(arr[index + 1]) < smallest) {
                    smallest = ALPHABET.indexOf(arr[index + 1]);
                    smallestIndex = index;
                    smallestTempIndex = j;
                }
            }
            //we found so let's add to result array
            let matchValue = arr[smallestIndex];
            let matchString = arr[smallestIndex + 1];
            let matchType = arr[smallestIndex + 2];

            result.push(matchType + matchString.repeat(matchValue));

            //remove this element from temp
            temp.splice(smallestTempIndex, 1);

            //set to 0 the counter for that letter
            arr[smallestIndex] = 0;
        }

        //refind the max number
        max = arr.filter(value => !isNaN(value)).reduce((max, val) => val > max ? val : max);
    }

    return result;

}

function splitIntoObject(result, str, pos) {
    let obj = {};

    for (let i = 0, n = str.length; i < n; i++) {
        let letter = str[i];

        //check if letter is lowercase
        if (letter.match(/[a-z]/)) {

            //check if letter is not in the object yet
            if (!result[letter]) {

                if (pos === 1) {
                    obj = {
                        [letter]: {
                            s1: 1,
                            s2: 0,
                        }
                    };
                } else {
                    obj = {
                        [letter]: {
                            s1: 0,
                            s2: 1,
                        }
                    };
                }

                let current = new Object(obj);
                result = Object.assign(result, current);
            } else {
                if (pos === 1) {
                    result[letter].s1 += 1;
                } else {
                    result[letter].s2 += 1;
                }
            }
        }
    }

    return result;
}


console.log(mix("Are the kids at home? aaaaa fffff", "Yes they are here! aaaaa fffff"), "--> =:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh");
console.log(mix("my&friend&Paul has heavy hats! &", "my friend John has many many friends &"), "--> 2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss");
console.log(mix("mmmmm m nnnnn y&friend&Paul has heavy hats! &", "my frie n d Joh n has ma n y ma n y frie n ds n&"), "--> 1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss");
console.log(mix("Are they here", "yes, they are here"), "--> 2:eeeee/2:yy/=:hh/=:rr")
console.log(mix("looping is fun but dangerous", "less dangerous than coding"), "--> 1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg")
console.log(mix(" In many languages", " there's a pair of functions"), "--> 1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt")
console.log(mix("Lords of the Fallen", "gamekult"), "--> 1:ee/1:ll/1:oo")
console.log(mix("codewars", "codewars"), "--> ")
console.log(mix("A generation must confront the looming ", "codewarrs"), "--> 1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr")