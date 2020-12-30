// https://www.codewars.com/kata/550f22f4d758534c1100025a
// Write a function dirReduc which will take an array of strings and returns an array of strings with the 
// needless directions removed (W<->E or S<->N side by side).
// eg. ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"] == ["WEST", "WEST"].

function checkPairs(arr) {
    // final direction holder
    let result = [];

    //object with pairs
    let dirs = {
        'NORTH': 'SOUTH',
        'SOUTH': 'NORTH',
        'EAST': 'WEST',
        'WEST': 'EAST'
    }

    let opposite = false;

    // loop through an array and check if current and next item is not an opposite pair
    // set to empty string the matching pairs
    result = arr.map((direction, index, array) => {
        let dir = '';
        if (opposite) { //if previous step was opposite, then we can reset this
            opposite = false;
        } else if (dirs[direction] == arr[index + 1]) {   //check if next item is opposite or not
            
            opposite = true;
        } else {
            dir = direction;
        }
        return dir;
    }).filter(dir => dir != '');

    return result;
}

function dirReduc(arr) {

    // original
    let orig = [...arr];

    // let reduced = [];
    let reduced = checkPairs(orig);

    // check more reduce
    while (orig.length > reduced.length) {
        orig = [...reduced];
        reduced = checkPairs(orig);
    }

    return reduced;
}

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]), ["WEST"]);
console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]), ["NORTH", "WEST", "SOUTH", "EAST"]);
console.log(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]), []);
console.log(dirReduc(['NORTH', 'SOUTH', 'WEST', 'EAST', 'SOUTH', 'NORTH', 'SOUTH', 'WEST', 'WEST', 'EAST', 'SOUTH', 'NORTH', 'EAST', 'WEST']), ['SOUTH', 'WEST']);
console.log(dirReduc(['SOUTH', 'NORTH', 'WEST', 'EAST', 'NORTH', 'SOUTH', 'NORTH', 'EAST', 'EAST', 'WEST', 'SOUTH', 'NORTH', 'EAST', 'WEST']), ['NORTH', 'EAST']);
console.log(dirReduc(['EAST', 'WEST', 'NORTH', 'SOUTH', 'NORTH', 'NORTH', 'NORTH', 'WEST', 'EAST', 'SOUTH', 'NORTH']), ['NORTH', 'NORTH', 'NORTH']);