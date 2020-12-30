// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-38-pandigital-multiples
// Take the number 192 and multiply it by each of 1, 2, and 3:
// 192 × 1 = 192
// 192 × 2 = 384
// 192 × 3 = 576
// By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1, 2, 3).
// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1, 2, 3, 4, 5).
// What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer with (1, 2, ... , n) where n > 1?


function pandigitalMultiples() {

    const getNumber = (number, n) => {
        let result = String(number);

        // create number with the sequence
        for (let i = 2; i <= n; i++) {
            result += number * i;
        }

        return result;
    }

    const isPandigital = (number, n) => {
        if ('' + number.length > 10) return false;
        if ('' + number.split('').sort().join('').substring(0, n) != '123456789'.substring(0, n)) return false;

        return true;;
    }

    let pandigitalNums = {};
    let max = 0;

    for (let i = 1; i < 9999; i++) {
        for (let j = 2; j < 10; j++) {
            const value = getNumber(i, j);

            if (isPandigital(value, 9)) {
                max = (value > max) ? +value : max;

                if (pandigitalNums[value]) {
                    pandigitalNums[value] = [[i, j]];
                }

            }
        }
    }
    console.log(pandigitalNums);
    return max;
}

console.log(pandigitalMultiples(), 932718654);