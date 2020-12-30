// https://www.codewars.com/kata/52685f7382004e774f0001f7
// Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
// HH = hours, padded to 2 digits, range: 00 - 99
// MM = minutes, padded to 2 digits, range: 00 - 59
// SS = seconds, padded to 2 digits, range: 00 - 59
// The maximum time never exceeds 359999 (99:59:59)

function humanReadable(seconds) {
    //get hours, mins, second from the input
    let h = parseInt(seconds / 3600);
    seconds = seconds - h * 3600;
    let m = parseInt(seconds / 60);
    let s = seconds - m * 60;

    //format the result string with leadng zeros
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function humanReadable(seconds) {
    const divisors = [3600, 60, 1];

    let result = [];

    divisors.forEach(divs => {
        let calc = parseInt(seconds / divs);
        result.push(calc.toString().padStart(2, '0'));
        seconds = seconds - calc * divs;
    })

    return result.join(":");
}


console.log(humanReadable(0), '00:00:00', 'humanReadable(0)');
console.log(humanReadable(5), '00:00:05', 'humanReadable(5)');
console.log(humanReadable(60), '00:01:00', 'humanReadable(60)');
console.log(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
console.log(humanReadable(359999), '99:59:59', 'humanReadable(359999)');