// https://www.codewars.com/kata/5324945e2ece5e1f32000370
// Given the string representations of two integers, return the string representation of the sum of those integers.
// sumStrings('1','2') // => 'N'
// A string representation of an integer will contain no characters besides the ten numerals "0" to "9".

function sumStrings(a, b) {
    //check the length of the strings
    let iteration = (a.length > b.length) ? a.length : b.length;

    //make sure that both strings are the same length by filling up with leading zeros
    let num1 = a.padStart(iteration, '0');
    let num2 = b.padStart(iteration, '0');

    //result will be a string
    let result = '';

    let remainder = 0;

    //iterate over the strings
    for (let i = iteration - 1; i >= 0; i--) {
        //grab the elements of the string
        let n1 = +num1[i];
        let n2 = +num2[i];

        //calculate the sums
        sum = n1 + n2 + remainder;

        //store the result and add the remainder to the next iteration
        result = (sum % 10) + result;
        remainder = Math.floor(sum / 10);
    }

    //add the last non-empty remainder to the result
    result = (remainder != 0) ? remainder + result : result;

    //remove any leading zeros from the result
    while (result[0] === '0') {
        result = result.substring(1);
    }

    return result;
}

function sumStrings(a, b) {
    //add together only the last N numbers of the strings
    //result could be N or N+1 numbers
    //add to output the last N numbers and keep the N+1 number for next step

    //how many characters should we check in a step - max could be 15 to avoid number overflow
    const N = 3;

    //find the max length of the input strings
    let length = Math.max(a.length, b.length);

    //make sure both strings are the same length, fill them with leading zeros if needed
    if (a.length < length) {
        a = a.padStart(length, '0');
    }
    if (b.length < length) {
        b = b.padStart(length, '0');
    }

    //based on input strings max length and max charecter check calculate how many steps we need to go through the input strings 
    let iteration = Math.floor(length / N) + 1;

    //variable to store the result
    let result = '';
    
    let i = 1;
    let remainder = 0;

    while (i <= iteration) {
        //get the part of the input strings from the end
        let num1 = +a.substring(length - N * i, length - N * (i - 1));
        let num2 = +b.substring(length - N * i, length - N * (i - 1));

        //calculate the sum of the inputs and with the remainder of the previous record
        let sum = num1 + num2 + remainder
        
        //sum cannot be smaller than N characters unless for the last iteration
        let add = (i != iteration) ? (sum % Math.pow(10, N)).toString().padStart(N, '0') : sum % Math.pow(10, N);

        result = add + result;
        remainder = Math.floor(sum / Math.pow(10, N));
        i++;
    }

    return result;
}



console.log(sumStrings('50095301248058391139327916261', '81055900096023504197206408605'), '131151201344081895336534324866');
console.log(sumStrings('99', '1'), '100');
console.log(sumStrings('00103', '08567'), '8670');
console.log(sumStrings('123', '4'), '127');
console.log(sumStrings('123', '456'), '579');
console.log(sumStrings('712569312664357328695151392', '8100824045303269669937'), '712577413488402631964821329');
console.log(sumStrings('50095301248058391139327916261', '81055900096023504197206408605'), '131151201344081895336534324866');
console.log(sumStrings('484899553959782801659338150821', '875777732708000350213948776876'), '1360677286667783151873286927697');
console.log(sumStrings('773128702598369291309184793846', '352450592049983854833520231826'), '1125579294648353146142705025672');
console.log(sumStrings('818450852846947156680788225097', '077381598181026008576442218644'), '895832451027973165257230443741');