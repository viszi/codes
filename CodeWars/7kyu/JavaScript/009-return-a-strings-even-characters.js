//https://www.codewars.com/kata/566044325f8fddc1c000002c
//Write a function that returns a sequence (index begins with 1) of all the even characters from a string. If the string is smaller than two characters 
//or longer than 100 characters, the function should return "invalid string".

function evenChars(str) {
    //return invalid string if length is <2 or >100
    if (str.length < 2 || str.length > 100) { return "invalid string"; }

    //array which will store result
    let resultArray = [];

    //iterate through the string
    for (let i = 1; i < str.length; i += 2) {
        resultArray.push(str[i]);
    }

    return resultArray;
}

function evenChars(string) {
    if(2 > string.length || string.length > 100) return 'invalid string';
    return string.split('').filter(function(item, index) {
      return index % 2 != 0;
    });
  }

console.log(evenChars("a")); //, "invalid string")
console.log(evenChars("abcdefghijklm")); //, ["b", "d", "f", "h", "j", "l"])