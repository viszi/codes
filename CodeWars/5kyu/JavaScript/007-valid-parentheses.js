// https://www.codewars.com/kata/52774a314c2333f0a7000688
// Write a function called that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.
// "()"              =>  true
// ")(()))"          =>  false
// "("               =>  false
// "(())((()())())"  =>  true
// Constraints
// 0 <= input.length <= 100


function validParentheses(parens) {

    let length = parens.length;
    let position = 0;

    //grab the first and last element of the string 
    //if they are a pair "()" or ")(", then get the next elements from the beginning and end by incrementing the position counter
    while (parens[position] + parens[length - 1 - position] === '()' || parens[position] + parens[length - 1 - position] === ')(') {
        position++;
    }

    //if we checked all positions then we always found pairs
    if (position === length) {
        return true;
    } else {
        return false;
    }
}


function validParentheses(parens) {

    let change = true;

    //delete from the input "()" as many times as possible
    while (parens.length > 0 && change) {
        let new_parens = parens.replace('()', '');

        if (new_parens.length === parens.length) {
            change = false;
        } else {
            parens = new_parens;
        }
    }

    //if zerostring is left then return true
    return parens.length === 0 ? true : false
}

function validParentheses(parens) {

    let change = true;

    //delete from the input "()" as many times as possible
    while (parens.length > 0 && change) {
        let new_parens = parens.replace(/\(\)/g, '');

        if (new_parens.length === parens.length) {
            change = false;
        } else {
            parens = new_parens;
        }
    }

    //if zerostring is left then return true
    return parens.length === 0 ? true : false
}

function validParentheses(parens) {
    var n = 0;
    for (var i = 0; i < parens.length; i++) {
        if (parens[i] == '(') n++;
        if (parens[i] == ')') n--;
        if (n < 0) return false;
    }

    return n == 0;
}


console.log(validParentheses("()"), true);
console.log(validParentheses("())"), false);
console.log(validParentheses(")(()))"), false);
console.log(validParentheses("("), false);
console.log(validParentheses("(())((()())())"), true);
console.log(validParentheses("()()(())"), true);
console.log(validParentheses("()()()(())()()()()()"), true);
console.log(validParentheses("()()()()()"), true);
