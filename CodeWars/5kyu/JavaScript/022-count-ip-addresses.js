// https://www.codewars.com/kata/526989a41034285187000de4
// Implement a function that receives two IPv4 addresses, and returns the number of addresses between them (including the first one, excluding the last one).
// All inputs will be valid IPv4 addresses in the form of strings. The last address will always be greater than the first one.
// ipsBetween("10.0.0.0", "10.0.0.50")  ===   50 
// ipsBetween("10.0.0.0", "10.0.1.0")   ===  256 
// ipsBetween("20.0.0.10", "20.0.1.0")  ===  246

function ipsBetween(start, end) {
    // get from start and end every octet
    let startIP = start.split(".");
    let endIP = end.split(".");

    // loop over every octet and find the difference 
    // multiple the difference by 256^3, 256^2, 256^1, 256^0
    let size = 0;

    for (let i = 0; i < 4; i++) {
        size += (Number(endIP[i]) - Number(startIP[i])) * Math.pow(256, 3 - i);
    }

    return size;
}


// same as above but using reduce
function ipsBetween(start, end) {
    
    let startIP = start.split(".");
    let endIP = end.split(".");

    return endIP.reduce((size, val, i) => {
        return size += (Number(val) - Number(startIP[i])) * 256 ** (3 - i);
    }, 0);
}

// convert IP to INT32 binary which can be converted to a decimal number
function ipsBetween(start, end) {

    //convert to int32 start and end
    const ip2bin = (n) => {
        return n.split('.').reduce((result, octet) => {
            return result += Number(octet).toString(2).padStart(8, '0');
        }, '');
    };

    //calculate the difference of the 2 decimal number
    return parseInt(ip2bin(end), 2) - parseInt(ip2bin(start), 2);
}

// convert IP to a big decimal number
function ipsBetween(start, end) {

    //convert the ip to a decimal number
    const ip2dec = (n) => {
        return n.split('.').reduce((result, octet, index) => {
            return result += octet * 256 ** (3 - index);
        }, 0);
    };

    //calculate the difference of the 2 decimal number
    return ip2dec(end) - ip2dec(start);
}


console.log(ipsBetween("10.0.0.0", "10.0.0.50"), 50);
console.log(ipsBetween("10.0.0.0", "10.0.1.0"), 256);
console.log(ipsBetween("20.0.0.10", "20.0.1.0"), 246);