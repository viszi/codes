// https://www.codewars.com/kata/520446778469526ec0000001
// Complete the function/method (depending on the language) to return true/True when its argument is an array that has the same nesting structures and same corresponding length of nested arrays as the first array.

// For example:
//  // should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

//  // should return false 
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );     

Array.prototype.sameStructureAs = function (other) {
    // Return 'true' if and only if 'other' has the same
    // nesting structure as 'this'.

    // Note: You are given a function isArray(o) that returns
    // whether its argument is an array.

    // check outer length
    if (this.length !== other.length) return false;

    // loop through this and check if we see same structure there recursevly
    return this.every((element, i) => {
        if (Array.isArray(element)) {
            return element.sameStructureAs(other[i]);
        } else {
            return Array.isArray(other[i]) === false && other[i] !== 'undefined'
        }
    })
};

console.log([1, [1, 1]].sameStructureAs([[2, 2], 2]), false);
console.log([1, 1, 1].sameStructureAs([2, 2, 2]), true);
console.log([1, [1, 1]].sameStructureAs([2, [2, 2]]), true);
console.log([1, [1, 1]].sameStructureAs([[2], 2]), false);
console.log([[[], []]].sameStructureAs([[[], []]]), true);
console.log([[[], []]].sameStructureAs([[1, 1]]), false);