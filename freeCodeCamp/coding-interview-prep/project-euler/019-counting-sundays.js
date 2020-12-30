// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-19-counting-sundays
// Project Euler: Problem 19: Counting Sundays
// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

// brute-force
function countingSundays(firstYear, lastYear) {

    const MONTHSTARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    const MONTHSTARTSLEAP = [1, 32, 61, 92, 122, 153, 183, 214, 245, 275, 306, 336];

    let countFirst = 0; // Sundays until firstYear
    let countLast = 0;  // Sundays until lastYear
    let actualDay = 0; // 0 = Mon, 7 = Sun

    for (let year = 1900; year <= lastYear; year++) {
        let days = 365;

        // check leap year
        if (year % 4 === 0 && year % 100 !== 0) {
            days = 366;
        }
        // correcting 400 leap years
        if (year % 400 === 0) {
            days = 366;
        }

        for (let day = 1; day <= days; day++) {
            actualDay += 1;

            // check if actual day is SUNDAY
            if (actualDay % 7 === 0) {
                // see if day is month start
                if (days === 366) {
                    // check for leap year
                    if (MONTHSTARTSLEAP.includes(day)) {
                        // console.log(`${year}.${MONTHSTARTSLEAP.indexOf(day) + 1}.1`)
                        if (year < firstYear) {
                            countFirst++;
                        }
                        countLast++;
                    }
                } else {
                    // check for standard year
                    if (MONTHSTARTS.includes(day)) {
                        // console.log(`${year}.${MONTHSTARTS.indexOf(day) + 1}.1`)
                        if (year < firstYear) {
                            countFirst++;
                        }
                        countLast++;
                    }
                }
            }
        }
    }

    return countLast - countFirst;
}

// user Date object
function countingSundays(firstYear, lastYear) {

    let counter = 0;

    for(let year = firstYear; year <= lastYear; year++) {
        for(let month = 0; month < 12; month++) {
            const monthStart = new Date(year, month, 1);
            if (monthStart.getDay() === 0) {
                counter++;
            }
        }
    }

    return counter;
}


console.log(countingSundays(1943, 1946), 6);
console.log(countingSundays(1995, 2000), 10);
console.log(countingSundays(1901, 2000), 171);