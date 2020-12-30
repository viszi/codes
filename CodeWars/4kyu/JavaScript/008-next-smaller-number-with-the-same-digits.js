// https://www.codewars.com/kata/5659c6d896bc135c4c00021e
// Write a function that takes a positive integer and eturns the next smaller positive integer containing the same d, is.);
// nextSmaller(21) = 12);
// nextSmaller(531) = 513);
// nextSmaller(2071) = 2017;

function nextSmaller(n) {
   
    //get the length of the input
    let length = Math.floor(Math.log10(n)) + 1;

    //return obivious combinations
    //for single digit nothing can be calculated
    if (length === 1) return -1;

    //for 2 digits try the swap
    if (length === 2) {
        let smaller = (n % 10) * 10 + Math.floor(n / 10);
        return smaller < n ? (smaller > 10) ? smaller : -1 : -1;
    }

    //for other cases try to build up a number from the available digits
    //collect available digits from the input
    let original = n.toString().split('');

    //copy them to another array in reversed order
    let digits = [...original].sort((a,b) => b - a);

    smaller = '';

    let pos = 0;
    let back = 2;
    let needSmaller = false;
    
    while (true) {        
        while (smaller.length < length) {
            let _original = +original[pos] - (needSmaller ? 1 : 0);  //if original search has not found anything find a smaller number

            let hit = false;

            //find a number into the position which is <= than the number in the same position of the original number
            for (let i = 0; i < digits.length; i++) {
                let _new = +digits[i];

                //if number is >= then use it
                if (_new <= _original) {
                    //add the number to the result
                    smaller += _new;

                    //remove it from the available digits list
                    digits.splice(i, 1);

                    //go to next position
                    pos++;

                    //we found a number which looks fine
                    hit = true;
                    
                    //if we found a bigger number then add all other digits to the number
                    if (hit && needSmaller) {
                        smaller += digits.join('');
                        digits = [];
                        break;
                    }
                       
                    //stop the for loop for this search
                    break;
                }
            }

            //if we have not found a bigger then use the first number
            if (!hit) {
                smaller += digits.splice(0, 1);
                pos++;

                //we already found a bigger number no need to do it further
                needSmaller = false;
            }

        }


        if (+smaller >= n) {
            //cut down last 'back' digits and add them back to digits array for selection
            smaller.slice(-back).split('').forEach(digit => digits.push(digit));
            digits.sort((a, b) => b - a);
            smaller = smaller.substring(0, length - back);
            pos -= back;

            //we need a biggernumber
            needSmaller = true;
            back++;
        } else {
            return smaller[0] === '0' ? -1 : +smaller;
        }

        if (back > length + 1) {
            smaller = '-1';
            break;
        }

    }

    return -1;
}

console.log(nextSmaller(21), 12);
console.log(nextSmaller(531), 513);
console.log(nextSmaller(2071), 2017);
console.log(nextSmaller(1027), -1);
console.log(nextSmaller(907), 790);
console.log(nextSmaller(135), -1);
console.log(nextSmaller(414), 144);
console.log(nextSmaller(123456798), 123456789);
console.log(nextSmaller(123456789), -1);
console.log(nextSmaller(1234567908), 1234567890);