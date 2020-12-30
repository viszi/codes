// https://www.codewars.com/kata/52aae14aa7fd03d57400058f
// Write a function that takes an array of values and moves all elements that are zero to the end of the array, otherwise preserving the order of the array. The zero elements must also maintain the order in which they occurred.
// [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14] -> [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0]
// Zero elements are defined by either 0 or "0". Some tests may include elements that are not number literals.
// You are NOT allowed to use any temporary arrays or objects. You are also not allowed to use any Array.prototype or Object.prototype methods.


// convert the array to a string which contains type of the value and value and push zero values to the end
// at the end replace array element with the values stored in the string
function removeZeros(array) {
    // use a string separated by | to store values
    // format vould be like: type1:value1|type2:value2|
    // number:1|object:null|string:5|boolean:false|object:string%b:object%wars|
    let result = ''

    // zero values with the same format as result
    let zeroList = '';

    // iterate tru the array
    for (let i = 0; i < array.length; i++) {
        const value = array[i];

        if (value === 0 || value === '0') {
            zeroList += `${typeof (value)}:${value}|`;
        } else {
            switch (typeof (value)) {
                case 'object':
                    if (value === null) {
                        result += `${typeof (value)}:${value}|`;
                    } else {
                        for (entry in value) {
                            result += `${typeof (value)}:${typeof (entry)}%${entry}:${typeof (value[entry])}%${value[entry]}|`;
                        }
                    }
                    break;
                case 'number':
                case 'string':
                case 'boolean':
                    result += `${typeof (value)}:${value}|`;
            }
        }
    }

    // add to the end the neccessary amount of zeros
    result += zeroList;

    let start = 0;
    let end;

    for (let i = 0; i < array.length; i++) {
        // number:52|string:3|object:{"a":["code"]}|object:null|boolean:false
        // find the type of the element in  the string
        for (let c = start; c < result.length; c++) {
            if (result[c] === ':') {
                end = c;
                break;
            }
        }
        const typeElement = result.substring(start, end);
        start = end + 1;

        // find the element value in the string
        for (let c = start; c < result.length; c++) {
            if (result[c] === '|') {
                end = c;
                break;
            }
        }
        const element = result.substring(start, end);
        start = end + 1;

        // replace the element of the array with the found element
        switch (typeElement) {
            case 'number':
                array[i] = Number(element);
                break;
            case 'string':
                array[i] = String(element);
                break;
            case 'boolean':
                array[i] = (element === 'true') ? true : false;
                break;
            case 'object':
                if (element === 'null') {
                    array[i] = null;
                } else {
                    // string%b:object%wars
                    // find key and key type
                    let subStart = 0;
                    let subEnd;
                    for (let i = 0; i < element.length; i++) {
                        if (element[i] === '%') {
                            subEnd = i;
                            break;
                        }
                    }
                    const typeSubKey = element.substring(subStart, subEnd);
                    subStart = subEnd + 1;

                    for (let i = subStart; i < element.length; i++) {
                        if (element[i] === ':') {
                            subEnd = i;
                            break;
                        }
                    }
                    const subKey = element.substring(subStart, subEnd);
                    subStart = subEnd + 1;

                    // find value and value type
                    for (let i = subStart; i < element.length; i++) {
                        if (element[i] === '%') {
                            subEnd = i;
                            break;
                        }
                    }
                    const typeSubElement = element.substring(subStart, subEnd);
                    subStart = subEnd + 1;
                    const subElement = element.substring(subStart);

                    // put together the subkey and subvalue as an object
                    switch (typeSubElement) {
                        case 'object':
                            array[i] = { [subKey]: [subElement] };
                            break;
                        case 'number':
                            array[i] = { [subKey]: Number(subElement) };
                            break;
                        case 'string':
                            array[i] = { [subKey]: subElement };
                            break;
                    }
                }
                break;
        }
    }

    return array;
}

// go from the end to beginning and swap non-zero & zero elements righ away
function removeZeros(array) {

    let current = array.length - 1;

    while (current > 0) {
        let previous = current - 1;
        let zeroNumber = true;

        // if current element is non-zero then
        if (array[current] !== '0' && array[current] !== 0) {
            if (array[previous] === '0' || array[previous] === 0) {
                // if previous is zero replace them with array assignment
                zeroNumber = typeof array[previous] === 'number';

                array[previous] = array[current];
                array[current] = zeroNumber ? 0 : '0';
                // we have to go back to end again and check if we have any non-zero
                current = array.length - 1;
            } else {
                current -= 1;
            }
        } else {
            current -= 1;
        }
    }
    return array;
}

console.log(removeZeros([7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]));
console.log(removeZeros([1, null, '5', '0', '2', 0, 8, 6, null, false]), [1, null, "5", "2", 8, 6, null, false, "0", 0]);
console.log(removeZeros(['0']), ["0"]);
console.log(removeZeros([{ code: 'wars' }]), [{ "code": "wars" }])
console.log(removeZeros([1, '0', 2, 0, 52, '0', 7, 0, '3', 1]), [1, 2, 52, 7, "3", 1, "0", 0, "0", 0]);
console.log(removeZeros(['0', '0', '0', 0, 1]), [1, "0", "0", "0", 0]);
console.log(removeZeros([{ a: ['code'] }, 0, { b: ['wars'] }, 1]), [{ "a": ["code"] }, { "b": ["wars"] }, 1, 0]);
