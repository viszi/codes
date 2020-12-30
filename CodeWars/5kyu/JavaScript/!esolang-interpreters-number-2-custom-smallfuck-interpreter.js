// https://www.codewars.com/kata/58678d29dbca9a68d80000d7
// Smallfuck is an esoteric programming language/Esolang invented in 2002 which is a sized-down variant of the famous Brainfuck Esolang. Key differences include:

// Smallfuck operates only on bits as opposed to bytes
// It has a limited data storage which varies from implementation to implementation depending on the size of the tape
// It does not define input or output - the "input" is encoded in the initial state of the data storage (tape) and the "output" should be decoded in the final state of the data storage (tape)
// Here are a list of commands in Smallfuck:

// > - Move pointer to the right (by 1 cell)
// < - Move pointer to the left (by 1 cell)
// * - Flip the bit at the current cell
// [ - Jump past matching ] if value at current cell is 0
// ] - Jump back to matching [ (if value at current cell is nonzero)
// As opposed to Brainfuck where a program terminates only when all of the commands in the program have been considered (left to right), Smallfuck terminates when any of the two conditions mentioned below become true:

// All commands have been considered from left to right
// The pointer goes out-of-bounds (i.e. if it moves to the left of the first cell or to the right of the last cell of the tape)
// Smallfuck is considered to be Turing-complete if and only if it had a tape of infinite length; however, since the length of the tape is always defined as finite (as the interpreter cannot return a tape of infinite length), its computational class is of bounded-storage machines with bounded input.

// More information on this Esolang can be found here.

// Implement a custom Smallfuck interpreter interpreter() (interpreter in Haskell and F#, Interpreter in C#, custom_small_fuck:interpreter/2 in Erlang) which accepts the following arguments:

// code - Required. The Smallfuck program to be executed, passed in as a string. May contain non-command characters. Your interpreter should simply ignore any non-command characters.
// tape - Required. The initial state of the data storage (tape), passed in as a string. For example, if the string "00101100" is passed in then it should translate to something of this form within your interpreter: [0, 0, 1, 0, 1, 1, 0, 0]. You may assume that all input strings for tape will be non-empty and will only contain "0"s and "1"s.
// Your interpreter should return the final state of the data storage (tape) as a string in the same format that it was passed in. For example, if the tape in your interpreter ends up being [1, 1, 1, 1, 1] then return the string "11111".

// NOTE: The pointer of the interpreter always starts from the first (leftmost) cell of the tape, same as in Brainfuck.

function interpreter(code, tape) {

    let output = tape.split('');
    let position = 0;
    let flip = false;

    for (c of code) {
        switch (c) {
            case ">":   // move to right
                position++;
                break;
            case "<":   // move to left
                position--;
                break;
            case "[":
                // "begin loop": if the current bit is 1, increment the instruction pointer (move it to the next command to the right), 
                // otherwise move it to the next command to the right of the matching ] command;
                break;
            case "]":
                // "end loop": if the current bit is 0, increment the instruction pointer, otherwise move it to the next command to the 
                // right of the matching [ command. Can also be interpreted as unconditional jump to the matching [ command, since [ performs an extra check itself.
                break;
            case "*":
                flip = true;
        }
        // retrun immediately when position is out of boundaries
        if (position < 0 || position > tape.length - 1) {
            break;
        }
        // perform the flip on the given position
        if (flip) {
            output[position] = (output[position] === '0') ? '1' : '0';
            flip = false;
        }
    }

    return output.join('');
}


// // Flips the leftmost cell of the tape
console.log(interpreter("*", "00101100") == "10101100");
// // Flips the second and third cell of the tape
console.log(interpreter(">*>*", "00101100") == "01001100");
// // Flips all the bits in the tape
console.log(interpreter("*>*>*>*>*>*>*>*", "00101100") == "11010011");
// // Flips all the bits that are initialized to 0
console.log(interpreter("*>*>>*>>>*>*", "00101100") == "11111111");
// // Goes somewhere to the right of the tape and then flips all bits that are initialized to 1, progressing leftwards through the tape
console.log(interpreter(">>>>>*<*<<*", "00101100") == "00000000");
// // return immediately when the pointer moves too far to the right
console.log(interpreter("*>>>*>*>>*>>>>>>>*>*>*>*>>>**>>**", "0000000000000000") == "1001101000000111");
// // interpreter should not follow through any command after the pointer goes out of bounds for the first time
console.log(interpreter(">>*>*>*<<*<*<<*>*", "1101") == "1110");
// // should evaluate a simple non-nested loop properly
console.log(interpreter("*[>*]", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") == "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
// // interpreter should jump to the matching "]" when it encounters a "[" and the bit under the pointer is 0
console.log(interpreter("[>*]", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")  == "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
// // interpreter should jump to the matching "]" when it encounters a "[" and the bit under the pointer is 0
console.log(interpreter("*>*>>>*>*>>>>>*>[>*]","0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") == "1100110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
// // interpreter should jump back to the matching "[" when it encounters a "]" and the bit under the pointer is nonzero
console.log(interpreter("*>*>>>*>*>>>>>*[>*]", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") == "1100110000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");