// https://www.codewars.com/kata/52f831fa9d332c6591000511
// For a given chemical formula represented by a string, count the number of atoms of each element contained in the molecule and return an object (associative array in PHP, Dictionary<string, int> in C#, Map<String,Integer> in Java).
// var water = 'H2O';   parseMolecule(water); // return {H: 2, O: 1}
// var magnesiumHydroxide = 'Mg(OH)2'; parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}
// var fremySalt = 'K4[ON(SO3)2]2';  parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
// As you can see, some formulas have brackets in them. The index outside the brackets tells you that you have to multiply count of each atom inside the bracket on this index. For example, in Fe(NO3)2 you have one iron atom, two nitrogen atoms and six oxygen atoms.
// Note that brackets may be round, square or curly and can also be nested. Index after the braces is optional.

function parseMolecule(formula) {
    let molecules = new Set(formula.match(/[A-Z][a-z]{0,1}/g));
    let occurence = '';

    return formula.match(/[A-Z][a-z]{0,1}/g);

}

function parseMolecule(formula) {
    const repeatAtoms = (match, pattern, occurence) => {
        if (pattern[0] === '(' || pattern[0] === '[')  {
            str = pattern.slice(1, -1);
        } else {
            str = pattern;
        } 
        if (!occurence) {
            occurence = 1;
        }
        return str.repeat(occurence);
    };

    //step 1: replace H2 or O3 with HH or OOO
    const regex_1 = /([A-Z][a-z]{0,1})([1-9]+)/g    // find combinations like H2 or O3 or Na2
    let molecule = formula.replace(regex_1, repeatAtoms);

    //step2: replace (OH)2 with OHOH
    //const regex_2 = /(\([A-Z]+[a-z]{0,1}\))([1-9]+)/g  // find combinations like (OH)2 or (SO3)2
    const regex_2 = /(\([A-Z]+\))([1-9]+)/gi  // find combinations like (OH)2 or (SO3)2
    molecule = molecule.replace(regex_2, repeatAtoms);
    
    //remove all () from the string e.g. HH(0) -> HH0
    molecule = molecule.replace(/[\(|\))]/g,'');

    //step3: replace [OH]2 with OHOH
    const regex_3 = /(\[[A-Z]+\])([1-9]+)/gi            // find combinations like [OH]2
    molecule = molecule.replace(regex_3, repeatAtoms);

    //remove all [] from the string e.g. HH[0] -> HH0
    molecule = molecule.replace(/[\[|\])]/g,'');

    //step5: replace {OH}2 with OHOH
    const regex_4 = /(\{[A-Z]+\})([1-9]+)/gi      // find combinations like [OH]2
    molecule = molecule.replace(regex_4, repeatAtoms);

    //remove all {} from the string e.g. HH{0} -> HH0
    molecule = molecule.replace(/[\{|\})]/g,'');

    //loop through the generated string and count occurences of each molecules
    let molecules = {};

    for (let i = 0; i < molecule.length; i++) {
        let atom = molecule[i];
        let step = 0;

        //if the next letter is small then we need to use it too
        let next = (i === molecule.length - 1) ? "" : molecule[i + 1];
        
        if (/[a-z]/.test(next)) {
            atom += next
            step = 1;
        }

        i += step;

        molecules[atom] = (molecules[atom] || 0) + 1

    }   

    return molecules;
}

console.log(parseMolecule("H2(O)"), { H: 2, O: 1 });
console.log(parseMolecule("Mg(OH)2"), { Mg: 1, O: 2, H: 2 });
console.log(parseMolecule("K4[ON(SO3)2]2"), { K: 4, O: 14, N: 2, S: 4 });
console.log(parseMolecule("As2{Be4C5[BCo3(CO2)3]2}4Cu5"));
console.log(parseMolecule("{[Co(NH3)4(OH)2]3Co}(SO4)3"));