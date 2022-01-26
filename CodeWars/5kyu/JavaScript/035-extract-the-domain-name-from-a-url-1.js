// https://www.codewars.com/kata/514a024011ea4fb54200004b
// Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:

// domainName("http://github.com/carbonfive/raygun") == "github" 
// domainName("http://www.zombie-bites.com") == "zombie-bites"
// domainName("https://www.cnet.com") == "cnet"

function domainName(url) {
    // 1. strip scheme
    let newURL = url.replace(/^https?:\/\//, "");

    // 2. strip everything after the path
    newURL = newURL.indexOf("/") > 0 ? newURL.substring(0, newURL.indexOf("/")) : newURL;

    // 3. split up by dots
    let elements = newURL.split(".");

    // 4. if there are only 2 elements, then first is domainName
    const len = elements.length;
    if (len === 2) return elements[0];

    //5. check if first element is not www
    if (elements[0].toLowerCase().startsWith('www')) {
        return elements[1];
    }
    return elements[0];
}


console.log(domainName("http://google.com"), "google");
console.log(domainName("http://google.co.jp"), "google");
console.log(domainName("www.xakep.ru"), "xakep");
console.log(domainName("https://youtube.com"), "youtube");
console.log(domainName("http://github.com/carbonfive/raygun"), "github");
console.log(domainName("http://www.zombie-bites.com"), "zombie-bites");
console.log(domainName("https://www.cnet.com"), "cnet");