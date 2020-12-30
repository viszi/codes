// https://www.codewars.com/kata/5ebd53ea50d0680031190b96
// Complete the function to convert an integer into a string of the Turkish name.
// input will always be an integer 0-99;
// output should always be lower case.
// Forming the Turkish names for the numbers 0-99 is very straightforward:
// units (0-9) and tens (10, 20, 30, etc.) each have their own unique name;
// all other numbers are simply [tens] + [unit); like twenty one in English.

const getTurkishNumber = (num) => {
  const UNITS = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  const TENS = ["on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
	
  let result = "";
  
  // check if we need to add tens to the output or not
  if (num > 9) {
    result = TENS[parseInt(num / 10) - 1];
  }
  
  if (result == "") {
    // we don't have tens so only units are needed from the array
    return UNITS[num % 10];    
  } else {
    // we do need tens, but if number ends with zero then only tens, otherwise tens and units joined
    return (num % 10 == 0) ? result : result + " " + UNITS[num % 10];
  } 
}

console.log(getTurkishNumber(0) == "sıfır");
console.log(getTurkishNumber(16) == "on altı");
console.log(getTurkishNumber(70) == "yetmiş");
console.log(getTurkishNumber(26) == "yirmi altı");