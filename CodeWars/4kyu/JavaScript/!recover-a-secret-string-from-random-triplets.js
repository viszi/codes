// https://www.codewars.com/kata/53f40dff5f9d31b813000774/
// There is a secret string which is unknown to you. Given a collection of random triplets from the string, recover the original string.
// A triplet here is defined as a sequence of three letters such that each letter occurs somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".
// As a simplification, you may assume that no letter occurs more than once in the secret string.
// You can assume nothing about the triplets given to you other than that they are valid triplets and that they contain sufficient information to deduce the original string. In particular, this means that the secret string will never contain letters that do not occur in one of the triplets given to you.

function recoverSecret(triplets) {

    let result = '';

    triplets.forEach(([let1, let2, let3]) => {
        //check if we have seen any letter in the result
        let pos1 = result.indexOf(let1);
        let pos2 = result.indexOf(let2);
        let pos3 = result.indexOf(let3);

        if (pos1 === -1 && pos2 === -1 && pos3 === -1) {
            //if we have not seen them add to the end
            result += let1 + let2 + let3;
        } else {
            if (pos1 >= 0) {
                // 1) let1 is found
                // 1A) let2 is not found then, put it after let1
                if (pos2 === -1) {
                    result = result.substring(0, pos1 + 1) + let2 + result.substring(pos1 + 1);
                } else if (pos2 < pos1) {
                    // 1B) let2 is found before let1, we have to move let1 before let2
                    result = result.substring(0, pos2) + let1 + result.substring(pos2, pos1) + result.substring(pos1 + 1);
                } else if (pos3 < pos1) {
                    // 1C) let3 is found before let1, we have to move let1 before let3
                    result = result.substring(0, pos3) + let1 + result.substring(pos3, pos1) + result.substring(pos1 + 1);
                } else if (pos3 < pos2) {
                    // 1D) let1 is before the others, but let2 must be moved before let3
                    result = result.substring(0, pos3) + let2 + result.substring(pos3, pos2) + result.substring(pos2 + 1);
                }
            } else {
                //2) let1 is not found 
                if (pos2 >= 0) {
                    // 2A) if let2 was found put before it
                    if (pos3 === -1) {
                        result = result.substring(0, pos2) + let1 + result.substring(pos2) + let3;
                    } else {
                        result = result.substring(0, pos2) + let1 + result.substring(pos2);
                    }
                } else if (pos3 >= 0) {
                    // 2B) if let3 was found put before it
                    result = result.substring(0, pos3) + let1 + result.substring(pos3);
                } else {
                    // 2C) put at the end of the sring
                    result += let1;
                }

            }
        }
    });

    return result;
}


function recoverSecret(triplets) {

    let result = triplets[0][0] + triplets[0][1] + triplets[0][2];

    for (let i = 1; i < triplets.length; i++) {
        const [t0, t1, t2] = triplets[i];

        const t0Pos = result.indexOf(t0);
        const t1Pos = result.indexOf(t1);
        const t2Pos = result.indexOf(t2);

        if (Math.max(t0Pos, t1Pos, t2Pos) === -1) {
            result += t0 + t1 + t2;
        }
    }

    return result;

}


secret1 = "whatisup"
triplets1 = [
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's']
]

console.log(recoverSecret(triplets1), secret1);

secret1 = "mhfatisu"
triplets1 =
    [['t', 's', 'f'],
    ['a', 's', 'u'],
    ['m', 'a', 'f'],
    ['a', 'i', 'n'],
    ['s', 'u', 'n'],
    ['m', 'f', 'u'],
    ['a', 't', 'h'],
    ['t', 'h', 'i'],
    ['h', 'i', 'f'],
    ['m', 'h', 'f'],
    ['a', 'u', 'n'],
    ['m', 'a', 't'],
    ['f', 'u', 'n'],
    ['h', 's', 'n'],
    ['a', 'i', 's'],
    ['m', 's', 'n'],
    ['m', 's', 'u']]

console.log(recoverSecret(triplets1), secret1);

triplets1 =
    [['o', 'x', 'y'],
    ['h', 'r', 'u'],
    ['b', 'x', 'z'],
    ['r', 'y', 'z'],
    ['v', 'y', 'z'],
    ['v', 'w', 'y'],
    ['o', 's', 'y'],
    ['i', 'u', 'z'],
    ['q', 'y', 'z'],
    ['k', 'p', 'v'],
    ['w', 'x', 'z'],
    ['k', 'x', 'y'],
    ['r', 'w', 'x'],
    ['a', 'n', 'w'],
    ['b', 'd', 't'],
    ['p', 'u', 'y'],
    ['n', 'v', 'z'],
    ['f', 'k', 'q'],
    ['i', 'm', 'z'],
    ['a', 'w', 'y'],
    ['b', 'k', 'n'],
    ['t', 'u', 'w'],
    ['x', 'y', 'z'],
    ['f', 'g', 'j'],
    ['n', 'y', 'z'],
    ['s', 'y', 'z'],
    ['k', 'w', 'x'],
    ['m', 's', 'u'],
    ['h', 'i', 's'],
    ['q', 'w', 'z'],
    ['w', 'y', 'z'],
    ['j', 'o', 'p'],
    ['r', 'v', 'y'],
    ['h', 'p', 'w'],
    ['s', 't', 'z'],
    ['j', 'k', 'r'],
    ['n', 'u', 'w'],
    ['h', 'v', 'w'],
    ['t', 'u', 'y'],
    ['l', 'q', 'y'],
    ['v', 'w', 'x'],
    ['r', 'w', 'z'],
    ['m', 'o', 'w'],
    ['k', 'q', 'x'],
    ['e', 'h', 'r'],
    ['e', 'k', 'l'],
    ['d', 'h', 'p'],
    ['r', 'u', 'w'],
    ['e', 'g', 'n'],
    ['m', 'o', 'y'],
    ['q', 'r', 's'],
    ['d', 'i', 'q'],
    ['u', 'w', 'z'],
    ['u', 'w', 'x'],
    ['u', 'x', 'z'],
    ['e', 'l', 'x'],
    ['p', 't', 'v'],
    ['k', 't', 'w'],
    ['v', 'x', 'y'],
    ['f', 'y', 'z'],
    ['v', 'w', 'z'],
    ['d', 'f', 'h'],
    ['h', 't', 'x'],
    ['c', 'w', 'x'],
    ['v', 'x', 'z'],
    ['f', 'p', 'x'],
    ['g', 'x', 'y'],
    ['g', 'v', 'w'],
    ['f', 'l', 's'],
    ['c', 'f', 'v'],
    ['g', 'q', 's'],
    ['d', 't', 'y'],
    ['j', 'p', 't'],
    ['d', 'k', 's'],
    ['s', 'w', 'x'],
    ['d', 'q', 'x'],
    ['o', 'r', 's'],
    ['l', 'v', 'y'],
    ['r', 't', 'y'],
    ['i', 'y', 'z'],
    ['g', 'r', 'w'],
    ['g', 'h', 'l'],
    ['c', 'x', 'z'],
    ['g', 't', 'v'],
    ['f', 'g', 'n'],
    ['l', 'r', 't'],
    ['r', 'u', 'x'],
    ['u', 'x', 'y'],
    ['s', 'x', 'y'],
    ['b', 'u', 'z'],
    ['l', 'w', 'y'],
    ['a', 'n', 'v'],
    ['k', 'l', 'z'],
    ['n', 'q', 'w'],
    ['m', 'u', 'z'],
    ['k', 'u', 'y'],
    ['t', 'v', 'z'],
    ['o', 'w', 'z'],
    ['c', 'h', 'y'],
    ['h', 's', 'y']];

console.log(recoverSecret(triplets1), secret1);