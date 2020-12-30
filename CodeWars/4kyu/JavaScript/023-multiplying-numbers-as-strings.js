// https://www.codewars.com/kata/55911ef14065454c75000062
// Multiply two numbers! Simple!
// - The arguments are passed as strings.
// - The numbers may be way very large
// - Answer should be returned as a string
// - The returned "number" should not start with zeros e.g. 0123 is invalid

function multiply(a, b) {
  
    let multiplier;
    let number;

    // the shorter number will be the multiplier
    if (a.length > b.length) {
        multiplier = b;
        number = a;
    } else {
        multiplier = a;
        number = b;
    }

    // store the multiplicated values in an array
    let multiplications = [];

    // loop through the digits of the multiplier
    for (let m = multiplier.length - 1; m >= 0; m--) {
        // add tens places 
        let multiplicate = '0'.repeat(multiplier.length - m - 1);

        let carryOver = 0;
        
        // multiply digits of the number
        for (let x = number.length - 1; x >= 0; x--) {
            const multi = number[x] * multiplier[m] + carryOver;

            if (multi >= 10) {
                carryOver = Math.floor(multi / 10);
            } else {
                carryOver = 0;
            }

            multiplicate = multi % 10 + multiplicate;
        }

        if (carryOver > 0) {
            multiplicate = carryOver + multiplicate;
        }

        multiplications.push(multiplicate);
    }

    // sum the result of the multiplications
    let result = '';

    // make all values the same length with trailing zeros
    const maxLength = Math.max(...multiplications.map(v => v.length));
    multiplications = multiplications.map(v => v.padStart(maxLength, '0'));

    // add together all multiplied values
    carryOver = 0;
    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = carryOver;
        for (let j = 0; j < multiplications.length; j++) {
            // get the digits from the same position for every multiplied values
            sum += +multiplications[j][i];
        }

        if (sum >= 10) {
            carryOver = Math.floor(sum / 10);
        } else {
            carryOver = 0;
        }
        result = sum % 10 + result;
    }

    if (carryOver > 0) {
        result = carryOver + result;
    }

    // get rid of trailing zeros
    result = result.replace(/(^0+)(\d+)/g,'$2');

    return result;
}

console.log(multiply("1000", "101"), "101000");
console.log(multiply("1009", "03"), "3027");
console.log(multiply("0000001", "3"), "3");
console.log(multiply("30", "69"), "2070");
console.log(multiply("11", "85"), "935");
console.log(multiply("2", "3"), "6");
console.log(multiply("2", "0"), "0");
console.log(multiply("0", "30"), "0");
console.log(multiply("98765", "56894"), "5619135910");
console.log(multiply("1020303004875647366210", "2774537626200857473632627613"), "2830869077153280552556547081187254342445169156730");
console.log(multiply("58608473622772837728372827", "7586374672263726736374"), "444625839871840560024489175424316205566214109298");
console.log(multiply("9007199254740991", "9007199254740991"), "81129638414606663681390495662081");