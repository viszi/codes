// https://www.codewars.com/kata/5f0ed36164f2bc00283aed07
// Evens increase on the right; odds decrease on the left. 
// House numbers start at 1 and increase without gaps. When n = 3, 1 is opposite 6, 3 opposite 4, and 5 opposite 2.

function overTheRoad(address, n) {
    // location of my house
    location = parseInt(address / 2) + 1

    // count back from the end
    if (address % 2) {
        // even side
        return (n * 2) - (location - 1) * 2; 
    } else {
        // odd side
        return (n * 2) + 1 - (location - 1) * 2 ;
    }
}

console.log(overTheRoad(1,3) == 6);
console.log(overTheRoad(3,3) == 4);
console.log(overTheRoad(2,3) == 5);
console.log(overTheRoad(3,5) == 8);
console.log(overTheRoad(7,11) == 16);