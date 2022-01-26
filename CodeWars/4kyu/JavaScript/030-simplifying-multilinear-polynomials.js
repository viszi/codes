// https://www.codewars.com/kata/55f89832ac9a66518f000118
// Write a function: simplify, that takes a string in input, representing a multilinear non-constant polynomial in integers coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in the following way ( -> means application of simplify):

//  - All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:
//  "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"
//  - All monomials appears in order of increasing number of variables, e.g.:
//  "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"
//  - If two monomials have the same number of variables, they appears in lexicographic order, e.g.:
//  "a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"
//  - There is no leading + sign if the first coefficient is positive, e.g.:
//  "-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"

function simplify(poly) {
    const expressions = {};
    
    // split up by + or - signs
    let p = poly.split(/(\+|\-)/g);
    let plus = true;
    let coeff = '';
    
    // sum the founded expressions
    p.forEach(k => {
         switch (k) {
            case '+':
                plus = true;
                break;
            case '-':
                plus = false;
                break;
            case '':
                break;
            default:
                // grab the number part
                coeff = k.split(/\D/)[0];
                // return the rest
                expression = k.replace(coeff, '');

                // set to 1 if there is no valid coeff
                coeff = coeff === '' ? 1 : coeff;
                // adjust coeff as per the sign
                coeff = plus ? 1 * coeff : -1 * coeff;

                // sort expression characters in order
                expression = expression.split('').sort().join('');

                // add to the object the expression
                if (expression in expressions) {
                    expressions[expression] += coeff;
                } else {
                    expressions[expression] = coeff;
                }
                break;
        }
    });

    // skip items with 0 counts
    let keys = [];
    for ([key, value] of Object.entries(expressions)) {
        if (value != 0) keys.push(key);
    }

    // sort items lexically
    keys.sort();
    // sort items by length
    keys.sort((a, b) => a.length - b.length);
    
    let result = '';
    for (key of keys) {
        const v = expressions[key];

        if (v === 1) {
            result += result.length === 0 ? key : `+${key}`;
        } else if (v === -1) {
            result += `-${key}`;
        } else if (v > 1) {
            result += result.length === 0 ? `${v}${key}` : `+${v}${key}`;
        } else if (v < -1) {
            result += `${v}${key}`;
        }
    }
    return result;
}

console.log(simplify("-3bxd+15xd-1xd+6dxb-9xd-15xdb+15xbd+10bxd-1x"), "-x+5dx+13bdx");
console.log(simplify("-15cb-12cb-0c+7cb"), "-20bc");
console.log(simplify("+n-5hn+7tjhn-4nh-3n-6hnjt+2jhn+9hn"), "-2n+2hjn+hjnt");
console.log(simplify("2xy-yx"), "xy");
console.log(simplify("-a+5ab+3a-c-2a"), "-c+5ab");
console.log(simplify("dc+dcba"), "cd+abcd");
console.log(simplify("-abc+3a+2ac"), "3a+2ac-abc");
console.log(simplify("xyz-xz"), "-xz+xyz");
console.log(simplify("a+ca-ab"), "a-ab+ac");
console.log(simplify("xzy+zby"), "byz+xyz");
console.log(simplify("-y+x"), "x-y");
console.log(simplify("y-x"), "-x+y");
