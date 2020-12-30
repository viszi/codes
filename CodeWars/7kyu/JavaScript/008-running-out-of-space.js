// https://www.codewars.com/kata/56576f82ab83ee8268000059
// Kevin is noticing his space run out! Write a function that removes the spaces from the values and returns an array showing the space decreasing. 
// For example, running this function on the array ['i', 'have','no','space'] would produce ['i','ihave','ihaveno','ihavenospace'].

function spacey(array){
    // create a result which will contain the growing text
    let result = "";
    
    // create the returning array
    let returnArray = [];
    
    // iterate thourgh input and fill result and returnArray
    for (let i = 0; i < array.length; i++) {
      result = result + array[i];
      returnArray.push(result);
    }
  
    return returnArray;
  }


function spacey(array){
    let result = "";
    let returnArray = [];

    array.forEach(element => {
        result = result + element
        returnArray.push(result);
    });

    return returnArray;
}

console.log(spacey(['kevin', 'has','no','space'])); // == ['kevin', 'kevinhas', 'kevinhasno', 'kevinhasnospace']);
console.log(spacey(['this','cheese','has','no','holes'])); // == ['this','thischeese','thischeesehas','thischeesehasno','thischeesehasnoholes']);