// https://www.codewars.com/kata/5d23d89906f92a00267bb83d
// All the orders they create look something like this:
// "milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"
// Their preference is to get the orders as a nice clean string with spaces and capitals like so:
// "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke"
// The kitchen staff expect the items to be in the same order as they appear in the menu.
// 1. Burger
// 2. Fries
// 3. Chicken
// 4. Pizza
// 5. Sandwich
// 6. Onionrings
// 7. Milkshake
// 8. Coke

function getOrder(input) {

    const menu = [
        'Burger',
        'Fries',
        'Chicken',
        'Pizza',
        'Sandwich',
        'Onionrings',
        'Milkshake',
        'Coke'
    ];

    let orders = [...Array(8)];

    //loop through the string and count how many times we found the menu items
    for (let i = 0; i < menu.length; i++) {
        orders[i] = input.split(menu[i].toLowerCase()).length - 1;
    };

    //construct the result as per items in the original menu
    let result = '';
    for (let i = 0; i < menu.length; i++) {
        //if order contains same item multiple times then repeat it
        let repeats = orders[i];
        if (repeats > 0) {
            let food = (menu[i] + ' ').repeat(repeats);
            result += food;
        }
    };

    return result.trim() + "\n";
}


function getOrder(input) {

    let menu = {
        'Burger': 0,
        'Fries': 0,
        'Chicken': 0,
        'Pizza': 0,
        'Sandwich': 0,
        'Onionrings': 0,
        'Milkshake': 0,
        'Coke': 0
    };

    //loop through the string and count how many times we found the menu items
    for (item in menu) {
        menu[item] = input.split(item.toLowerCase()).length - 1;
    };

    //construct the result as per items in the original menu
    let result = '';
    for (item in menu) {
        //if order contains the same item multiple times then repeat it
        let repeats = menu[item];
        if (repeats > 0) {
            let food = (item + ' ').repeat(repeats);
            result += food;
        }
    };

    return result.trim();
}

console.log(getOrder("milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"), "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke");
console.log(getOrder("pizzachickenfriesburgercokemilkshakefriessandwich"), "Burger Fries Fries Chicken Pizza Sandwich Milkshake Coke");