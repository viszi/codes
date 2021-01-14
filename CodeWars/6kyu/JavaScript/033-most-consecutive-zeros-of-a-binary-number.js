// https://www.codewars.com/kata/59decdf40863c76ae3000080
// Given a string (str) containing a base-10 integer between 0 and 10000, convert the integer to its binary representation. At that point, obtain a count of the maximum amount of consecutive 0s. From there, return the count in written form with a capital letter.
// max_consec_zeros("9") => "Two"
// max_consec_zeros("15") => "Zero"

function maxConsecZeros(str) {
    const binaryForm = Number(str).toString(2);
    let n = binaryForm.length;

    while (n > 0) {
        const re = new RegExp(`0{${n}}`)
        if (re.test(binaryForm)) {
            break;
        }
        n--;
    }

    const nums = {
        0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
        6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
        11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen',
        16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty',
        30: 'Thirty', 40: 'Forty', 50: 'Fifty', 60: 'Sixty', 70: 'Seventy',
        80: 'Eighty', 90: 'Ninety'
    }

    if (n < 21 || n % 10 === 0) {
        return nums[n];
    } else {
        return nums[n - n % 10] + nums[n % 10].toLowerCase();
    }
}

function maxConsecZeros(s) {
    return Math.max(...(+s).toString(2).split(/1+/).map(v => v.length));
}

console.log(maxConsecZeros("9"), "Two");
console.log(maxConsecZeros("13"), "One");
console.log(maxConsecZeros("15"), "Zero");
console.log(maxConsecZeros("42"), "One");
console.log(maxConsecZeros("550"), "Three");
console.log(maxConsecZeros("4194304"), "Twentytwo");