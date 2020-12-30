// https://www.codewars.com/kata/534d2f5b5371ecf8d2000a08
// Your task, is to create NxN multiplication table, of size provided in parameter.
// for example, when given size is 3: the return value should be: [[1,2,3],[2,4,6],[3,6,9]]


multiplicationTable = function (size) {

    //create the result array
    let result = [];

    for (multiplier = 1; multiplier < size + 1; multiplier++) {

        //create a table which will contain numbers for a fixed multiplier
        let table = [];

        //do multiplication
        for (c = 1; c < size + 1; c++) {
            //store the result on the table
            table.push(c * multiplier);
        }
        
        //add the multiplied result to final table
        result.push(table);
    }
    return result;
}

console.log(multiplicationTable(3)); //, [[1,2,3], [2,4,6], [3,6,9]]);