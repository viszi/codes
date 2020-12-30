// https://www.codewars.com/kata/52742f58faf5485cae000b9a
// The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.
// formatDuration(62)    // returns "1 minute and 2 seconds"
// formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"

// Detailed rules
// The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the 
// valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.
// The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", 
// just like it would be written in English.
// A more significant units of time will occur before than a least significant one. Therefore, 1 second and 1 year is not correct, 
// but 1 year and 1 second is.
// Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.
// A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, 
// but it should be just 1 minute.

function formatDuration(seconds) {

    //return 'now' if 0 second was given
    if (seconds === 0) return "now"

    //divisors for years / days / hours / mins / seconds
    const divs = [31536000, 86400, 3600, 60, 1];
    const words = ['year', 'day', 'hour', 'minute', 'second'];

    //store the result of the calculation
    let values = [];

    //try to find how many years / days / hours etc we have in the inputs
    for (let i = 0; i < divs.length; i++) {
        let calc = Math.floor(seconds / divs[i]);

        //add to result only such values which appeared
        if (calc > 0) {
            values.push(calc);
            //try add the unit single or plural form to the array
            let word = (calc > 1) ? words[i] + 's' : words[i];
            values.push(word + ',');
        }
        seconds = seconds - calc * divs[i];
    }

    //join the content of the array into a string
    let result = values.join(' ');

    //cut off from the end the comma
    result = result.substring(0, result.length - 1);

    //find the last comma
    let lastComma = result.lastIndexOf(',');
    
    //if there was not comma then we are good
    //else replace it with ' and'
    if (lastComma === -1) {
        return result
    } else {
        return result.substring(0, lastComma) + ' and' + result.substring(lastComma + 1)
    }
}


console.log(formatDuration(1), "1 second");
console.log(formatDuration(62), "1 minute and 2 seconds");
console.log(formatDuration(120), "2 minutes");
console.log(formatDuration(3600), "1 hour");
console.log(formatDuration(3662), "1 hour, 1 minute and 2 seconds");