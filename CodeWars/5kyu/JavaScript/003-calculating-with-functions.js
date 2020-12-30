// https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39
// This time we want to write calculations using functions and get the results. Let's have a look at some examples:
// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3

// Requirements:
// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby and Python)
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents the right operand
// Divison should be integer division. For example, this should return 2, not 2.666666...:

const calc = (val, arg) => parseInt(eval(`${val} ${arg}`));

function zero() {
    const value = 0;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function one() {
    const value = 1;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function two() {
    const value = 2;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function three() {
    const value = 3;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function four() {
    const value = 4;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function five() {
    const value = 5;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function six() {
    const value = 6;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function seven() {
    const value = 7;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function eight() {
    const value = 8;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}
function nine() {
    const value = 9;
    if (arguments.length === 0) {
        return value
    } else {
        return calc(value, arguments[0]);
    }
}

function plus() {
    return "+" + arguments[0]
}
function minus() {
    return "-" + arguments[0]
}
function times() {
    return "*" + arguments[0]
}
function dividedBy() {
    return "/" + arguments[0]
}


['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
.forEach(function (name, n) {
  this[name] = function (f) { return f ? f(n) : n }
});

function plus(n)      { return function (a) { return a + n } }
function minus(n)     { return function (a) { return a - n } }
function times(n)     { return function (a) { return a * n } }
function dividedBy(n) { return function (a) { return parseInt(a / n) } }


console.log(five(), 5);
console.log(five(plus(five())), 10);
console.log(seven(times(five())), 35);
console.log(four(plus(nine())), 13);
console.log(eight(minus(three())), 5);
console.log(six(dividedBy(two())), 3);
console.log(eight(dividedBy(three())), 2);