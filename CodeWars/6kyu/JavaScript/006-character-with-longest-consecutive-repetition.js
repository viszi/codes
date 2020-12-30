// https://www.codewars.com/kata/586d6cefbcc21eed7a001155
// For a given string s find the character c (or C) with longest consecutive repetition and return: [c, l]
// where l (or L) is the length of the repetition. If there are two or more characters with the same l return the first in order of appearance.
// For empty string return: ["", 0]

// 1007 ms
function longestRepetition(s) {
    //return answer for empty string
    if (!s) return ["", 0];

    //previous element - start with first letter
    let previous = s[0];

    //store most founded character, first index and counts in an array
    let bestFind = [, 0];
    let currentFind = [previous, 1]; // [...Array(2)];

    for (let i = 1; i < s.length; i++) {
        let current = s[i];

        if (current == previous || current == previous.toLowerCase() || current == previous.toUpperCase()) {
            //we can increment the occurence of current findings                
            currentFind[1] += 1;
        } else {
            //we have another letter - check if it is better than the best so far
            //if it is better copy the result
            if (currentFind[1] > bestFind[1]) {
                bestFind[0] = currentFind[0];
                bestFind[1] = currentFind[1];
            }

            //we should start the countig of the new letter
            currentFind[0] = current;
            currentFind[1] = 1;
        }
        //memorize the current value for next iteration
        previous = current;
    };

    if (currentFind[1] > bestFind[1]) {
        return currentFind;
    } else {
        return bestFind;
    }
}

// 2117 ms - not good for complex strings

function longestRepetition(s) {
    //return answer for empty string
    if (!s) return ["", 0];

    //collect unique letters from the string
    let letters = new Set()

    for (let i = 0; i < s.length; i++) {
        letters.add(s[i]);
    }

    //convert to lowercase the input for easy comparison
    let sLowCase = s.toLowerCase();

    //calculate the max length of a substring based on string length and number of unique letters
    let maxlength = s.length - letters.size

    //store the best result in this array
    let best = [, 0, s.length];

    //loop through fhe found letters and generate a substring by repeating the letters given times
    //find the largest the substring in the input string
    letters.forEach(letter => {
        let reps = maxlength - best[1] + 2;

        //create smallere and smaller substrings until it is not found in the input
        while (sLowCase.indexOf(letter.toLowerCase().repeat(reps)) == -1) {
            reps -= 1
        }

        let pos = sLowCase.indexOf(letter.toLowerCase().repeat(reps));

        //if we completed a letter then check do we have something better and go to next letter
        if (reps > best[1]) {
            best[0] = letter;
            best[1] = reps;
            best[2] = pos;
        } else {
            if (reps == best[1] && pos < best[2]) {
                best[0] = letter;
                best[1] = reps;
                best[2] = pos;
            }
        }
    });

    return best.slice(0, 2);

}

console.log(longestRepetition("v0e0kpsgtesf1lm3b7u5ccwu2ce4auibveg64xxmvkuutcmgmbnufvazhbp7mme9s0jitnnd698l02hju9nw0ni0r1abd8hvk2v058dt5xe3ox9jxqrmadnyi1735g66bokxfr8uf5orsx6rzjxk5cinlujhhob1h8rloiverhlxwq659ng5mrhf65wnva5wf97blcbbqnjt4vvw6m33wx6455hytaw663k3myjr5lhuz66vv8m31wkelr31eg2xeevdvnsbvaj7xs5ftxnx9v2s16k79n7xxeth1fhqjt6m3buxb1ddtv044qjcmupqwmog62hte3lmtg6mpv3y0fw5i9d4eq98jvxl1fu2wxhle5sipxju1iktlu97k5ezmxlz6wfzvvm1r5sclxrv7gqlhql0tro26etd81n5uuswj9ye1i6t849qi4320khehfky9n4f5a257t2scbdog9ojqc7ro890xvfmy7dj1ewsacsk618g"));
console.log(longestRepetition("aaaabb"), ["a", 4]);
console.log(longestRepetition("bbbaaabaaaa"), ["a", 4]);
console.log(longestRepetition("cbdeuuu900"), ["u", 3]);
console.log(longestRepetition("abbbbb"), ["b", 5]);
console.log(longestRepetition("aabb"), ["a", 2]);
console.log(longestRepetition(""), ["", 0]);
console.log(longestRepetition("ba"), ["b", 1]);