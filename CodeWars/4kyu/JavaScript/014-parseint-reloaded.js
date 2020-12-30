// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
// In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.
// Examples:
// "one" => 1
// "twenty" => 20
// "two hundred forty-six" => 246
// "console.log(parseInt('seven hundred eighty-three thousand nine hundred and nineteen" => 783919
// Tconsole.log(parseInt('he minimum number is "zero" (inclusively)
// Tconsole.log(parseInt('he maximum number, which must be supported is 1 million (inclusively)
// Tconsole.log(parseInt('he "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
// Aconsole.log(parseInt('ll tested numbers are valid, you don't need to validate them

function parseInt(string) {
    const DICT = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000
    }

    // split up the input by spaces
    let nums = string.split(' ');

    // go over each element and find the number pair for the text
    let parts = nums.map(element => {
        // check if element contains hyphen -
        if (element.indexOf('-') !== -1) {
            // split up by hyphen 
            let subNums = element.split('-')
            return subNums.reduce((sum, num) => {
                return sum += DICT[num];
            }, 0)
        } else {
            return DICT[element] || 0;
        }
    });

    let sum = 0;
    let highest_tens = 1;
    let tens = 1;

    let result = [];

    if (parts.length === 1) {
        return parts[0];
    } else {
        i = 0;
        while (i < parts.length) {
            //get next two values
            let next = parts[i];
            let multiplier = parts[i + 1];

            // if multiplier is really a factor
            if (multiplier === 100 || multiplier === 1000 || multiplier === 1000000) {
                tens = Math.log10(multiplier);

                // use multiplier if it is bigger then previous biggest
                if (tens > highest_tens) {
                    highest_tens = tens;

                    sum += next;
                    sum *= multiplier;
                } else {
                    // if it is not bigger then store the got number
                    result.push(sum);
                    sum = next;
                    sum *= multiplier;
                }
                i += 2;
            } else {
                sum += next;
                i += 1;
            }
        }

        result.push(sum);
    }

    return result.reduce((sum, val) => sum += val);
}


function parseInt(string) {
    const DICT = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000
    }

    // split up the input by spaces
    let nums = string.split(' ');

    // go over each element and find the number pair for the text
    let parts = [];

    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];

        // check if element contains hyphen -
        if (element.indexOf('-') !== -1) {
            // split up by hyphen 
            let subNums = element.split('-')

            // add parts the generated value
            parts.push(subNums.reduce((sum, num) => {
                return sum += DICT[num];
            }, 0))
        } else {
            // add only valid elements - skip "and"
            if (DICT[element]) {
                parts.push(DICT[element]);
            }
        }
    };

    let result = 0;
    let partialResult = 0;

    for (let i = 0; i < parts.length; i++) {
        const value = parts[i];

        // check if number is a multiplier
        if ([1000, 1000000].includes(value)) {
            partialResult = partialResult === 0 ? 1 : partialResult;
            partialResult *= value;
            result += partialResult;
            partialResult = 0;
        } else {
            if (value === 100) {
                partialResult = partialResult === 0 ? 1 : partialResult;
                partialResult *= value;
            } else {
                partialResult += value;
            }
        }        
    }
    result += partialResult;

    return result;

}

// other's solution 
var words = {
    "zero":0, "one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, 
    "ten":10, "eleven":11, "twelve":12, "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16, 
    "seventeen":17, "eighteen":18, "nineteen":19, "twenty":20, "thirty":30, "forty":40, "fifty":50, 
    "sixty":60, "seventy":70, "eighty":80, "ninety":90
  };
  var mult = { "hundred":100, "thousand":1000, "million": 1000000 };
  function parseInt(str) {
    return str.split(/ |-/).reduce(function(value, word) {
      if (words[word]) value += words[word];
      if (mult[word]) value += mult[word] * (value % mult[word]) - (value % mult[word]);
      return value;
    },0);
  }


// https://stackoverflow.com/questions/18548345/converting-words-to-numbers-in-c

// https://brilliant.org/discussions/thread/10-basic-algorithms-every-programmer-should-know/

// console.log(parseInt("seven hundred thousand"), 700000);
// console.log(parseInt("two hundred thousand three"), 200003);
// console.log(parseInt("two hundred thousand and three"), 200003);
// console.log(parseInt("two hundred thousand and three"), 200003);
// console.log(parseInt("five hundred thousand three hundred"), 500300);
// console.log(parseInt("four hundred ninety-four thousand one hundred and ten"), 494110);
// console.log(parseInt('ten thousand hundred ten'), 10100);
// console.log(parseInt('one'), 1);
// console.log(parseInt('twenty'), 20);
console.log(parseInt('two hundred forty-six'), 246);
console.log(parseInt('two hundred ten'), 210);
console.log(parseInt('seven hundred eighty-three thousand nine hundred and nineteen'), 783919);
console.log(parseInt('two thousand two hundred eighty-one'), 2281);
console.log(parseInt('six thousand one hundred forty-four'), 6144);
console.log(parseInt('twenty-three thousand five hundred sixty-seven'), 23567);
console.log(parseInt('six hundred forty-one thousand two hundred fifty-six'), 641256);
console.log(parseInt('thirty-one million nine hundred thirty-four thousand six hundred twenty-three'), 31934623);