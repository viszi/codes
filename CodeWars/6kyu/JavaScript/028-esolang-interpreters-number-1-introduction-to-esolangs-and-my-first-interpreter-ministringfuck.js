// https://www.codewars.com/kata/586dd26a69b6fd46dd0000c0/train/javascript
// The Language
// MiniStringFuck is a derivative of the famous Brainfuck which contains a memory cell as its only form of data storage as opposed to a memory tape of 30,000 cells in Brainfuck. The memory cell in MiniStringFuck initially starts at 0. MiniStringFuck contains only 2 commands as opposed to 8:
// + - Increment the memory cell. If it reaches 256, wrap to 0.
// . - Output the value of the memory cell as a character with code point equal to the value
// For example, here is a MiniStringFuck program that outputs the string "Hello, World!":
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++


function myFirstInterpreter(code) {
    let position = 0;
    return code
        .split('.')
        .map((v, i, a) => {
            if (i < a.length - 1) {
                // count only the '+' signs as valid command
                const increments = v.length - v.replace(/\+/g,'').length;
                position += increments;
                if (position > 255) position = position % 256;
                return String.fromCharCode(position);
            }
        })
        .join('')
}

console.log(myFirstInterpreter("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++.+++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++."), "Hello, World!");
console.log(myFirstInterpreter("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+."), "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
console.log(myFirstInterpreter("+++++sdfs++++sdf++++sdklfjsdklfdjmvncxmnxmiuroewurwio+++++++++++++2423423++234+23++234+23++342+2++24++234++++++++++++++???++++++%+++++$#$#++++++++.+++++ssdf+++++++++++++++S+SDFSFSFWWET+BCV+BC+VBN+V+X+++.+++++++.WER.+++.++++++++++++++++++WERW+ERWE++++++++++++XCV+XC++++++++++++++++CXV+XC+XCV++++++++++++++++++++++++XCVXCXCVSTTYJFGDF++++++++++++++++s+dfs+sdf++sdsd+f++SDFS+DFS+FdfsdRTETRCBVCsdfsdf++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++.+++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++."), "Hello, World!");