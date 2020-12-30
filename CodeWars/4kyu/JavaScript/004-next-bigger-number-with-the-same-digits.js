// https://www.codewars.com/kata/55983863da40caa2c900004e
// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:
// If the digits can't be rearranged to form a bigger number, return -1
// 12 ==> 21
// 513 ==> 531
// 2017 ==> 2071

function nextBigger(n) {
    
    //get the length of the input
    let length = Math.floor(Math.log10(n)) + 1;

    //return obivious combinations
    //for single digit nothing can be calculated
    if (length === 1) return -1;

    //for 2 digits try the swap
    let bigger = (n % 10) * 10 + Math.floor(n / 10);
    if (length === 2) return bigger > n ? bigger : -1;

    //for other cases try to build up a bigger number from the available digits
    //collect available digits from the input
    let original = n.toString().split('');

    //copy them to another array
    let digits = [...original].sort();

    bigger = '';

    let pos = 0;
    let back = 2;
    let needBigger = false;
    
    while (+bigger < n) {
        
        while (bigger.length < length) {
            let _original = +original[pos] + (needBigger ? 1 : 0);  //if original search has not found anything find a bigger number

            let hit = false;

            //find a number into the position which is >= than the number in the same position of the original number
            for (let i = 0; i < digits.length; i++) {
                let _new = +digits[i];

                //if number is >= then use it
                if (_new >= _original) {
                    //add the number to the result
                    bigger += _new;

                    //remove it from the available digits list
                    digits.splice(i, 1);

                    //go to next position
                    pos++;

                    //we found a number which look fine
                    hit = true;
                    
                    //if we found a bigger number then add all other digits to the number
                    if (hit && needBigger) {
                        bigger += digits.join('');
                        digits = [];
                        break;
                    }
                       
                    //stop the for loop for this search
                    break;
                }
            }

            //if we have not found a bigger then use the first number
            if (!hit) {
                bigger += digits.splice(0, 1);
                pos++;

                //we already found a bigger number no need to do it further
                needBigger = false;
            }

        }


        if (+bigger <= n) {
            //cut down last 'back' digits and add them back to digits array for selection
            bigger.slice(-back).split('').forEach(digit => digits.push(digit));
            digits.sort();
            bigger = bigger.substring(0, length - back);
            pos -= back;

            //we need a biggernumber
            needBigger = true;
            back++;
        }

        if (back > length + 1) {
            bigger = '-1';
            break;
        }

    }

    return +bigger;
}

// solutions by others
// const sortedDigits = n => { let arr = n.toString().split(''); arr.sort((a, b) => b - a); return arr; };

// function nextBigger2(n){

//   console.time('label')            //runtime measure
//   let arr = sortedDigits(n);
//   let max = parseInt(arr.join(''), 10);
  
//   for(var i = n + 1; i <= max; i++){
//     if(sortedDigits(i).every((x, j) => x === arr[j])){
//         console.timeEnd('label')  //runtime measure
//         return i;
//     }
//   }
  
//   return -1;
// }


console.log(nextBigger(2966276652), 2966522667);
console.log(nextBigger(12), 21);
console.log(nextBigger(513), 531);
console.log(nextBigger(2017), 2071);
console.log(nextBigger(414), 441);
console.log(nextBigger(144), 414);
console.log(nextBigger(154216533772), 154216537237);
console.log(nextBigger(447681784440), 447681804447);
