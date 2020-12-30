// https://www.codewars.com/kata/51c8e37cee245da6b40000bd
// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.
// solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// "apples, pears\ngrapes\nbananas"

function solution(input, markers) {
   
    let texts = input.split('\n');
    
    return texts.map( (text) => {
        let result = '';
        let comment = false;

        // loop through the string and if markers found set comment flag to true
        for (let i = 0; i < text.length; i++) {
            let letter = text[i];
    
            // if marker is found and comment is not set change it to true
            if (markers.includes(letter) && comment === false) {
                comment = true;
            }
    
            // add letter to result only if it is not a comment
            if (!comment) {
                result += letter;
            }
        }

        return result.trim();
    }).join('\n')
}

// same as above with reduce
function solution(input, markers) {
   
    let texts = input.split('\n');
    
    return texts.reduce( (result, text) => {
        let comment = false;

        // loop through the string and if markers found set comment flag to true
        for (let i = 0; i < text.length; i++) {
            let letter = text[i];
    
            // if marker is found and comment is not set change it to true
            if (markers.includes(letter) && comment === false) {
                comment = true;
            }
    
            // add letter to result only if it is not a comment
            if (!comment) {
                result += letter;
            }
        }
        return result.trim() + '\n';
    }, '').slice(0,-1);
}


// other's solution on codewars
// function solution(input, markers) {
//     regex = new RegExp(` [${markers.join(',')}].+`, 'gi')
    
//     return input.replace(regex,'');
// }


console.log(solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]), "\n=>\napples, pears\ngrapes\nbananas\n");
console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]), "\n=>\napples, plums\npears\noranges\n");
console.log(solution("Q @b\nu\ne -e f g", ["@", "-"]), "\n=>\nQ\nu\ne\n");