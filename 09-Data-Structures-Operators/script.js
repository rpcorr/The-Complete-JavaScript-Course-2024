'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

// Lesson: Enhanced Object Literals

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  // [`day-${2 + 4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
// Lesson: Destructuring Arrays
const arr = [2, 3, 4];

// assigning the three variables without destructuring
const a = arr[0];
const b = arr[1];
const c = arr[2];

// assigning the three variables using destructuring
const [x, y, z] = arr; // destructing an array
console.log(x, y, z);
console.log(arr);

const [first, second] = restaurant.categories;
console.log(first, second);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables (previous way)
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(`Previous way: ${main}, ${secondary}`);

// Using destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Retrieve 2 return values fron a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

/*
// Lesson: Destructuring Objects

// (note: variables need to be the same name as in the object)
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// providing new names for the variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
*/

/*
// Lesson: The Spread Operator (...)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 or more arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables are: arrays, strings, maps, sets, but not objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`);  cannot use spread operator in this fashion

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
console.log(ingredients);

// old way
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// using the spread operator
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
// Lesson: Rest Pattern and Parameters

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

/*
// Lesson: Short Circuiting (&& and ||)

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas'); // returns 3
console.log('' || 'Jonas'); // returns Jonas
console.log(true || 0); // returns true
console.log(undefined || null); // returns null

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // returns Hello

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
console.log(0 && 'Jonas'); // returns 0
console.log(7 && 'Jonas'); // returns Jonas

console.log('Hello' && 23 && null && 'Jonas'); // returns null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

*/

/*
// Lesson: The Nullish Coalescing Operator (??)
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish values are: null and undefined (doesn't include 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/

/*
// Lesson: Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  //numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// - result the same as above
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator ( null or undefined )
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator

// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/*
// Lesson: Looping Arrays: The for-of Loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log('\nSame as above with destructuring');
// same as above with destructuring
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);
*/

/*
// Lesson Optional Chaining(?.)

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example of optional chaining operator and the nullish coalescing operator working together.
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];
console.log(users[0]?.name ?? 'User array empty');

// the above is the short form to without optional chaining
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');
*/

/*

// Lesson: Looping Objects: Object Keys, Values, and Entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
// console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
*/

/*

// Lesson: Sets

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

// Strings are also iterables
console.log(new Set('Jonas'));
console.log(new Set('Ronan'));

// get set size
console.log(ordersSet.size);

// check set if it contain a value
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

// add to a set
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

// delete from a set
ordersSet.delete('Risotto');

// clear a set
//ordersSet.clear();

console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

// count how many different letters in name
console.log(new Set('jonasschmedtmann').size);
console.log(new Set('jonas schmedtmann').size);
*/

/*
// Lesson: Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italino');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// read data from maps
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get('1'));
console.log(rest.get(1));

// print result base on outcome
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// check if map contains a certain key
console.log(rest.has('categories'));

// delete element from map based on a key
rest.delete(2);
console.log(rest);

// get map size
console.log(rest.size);

// clear map
// rest.clear();
// to make it work
const arr = [1, 2];
rest.set(arr, 'Test');

rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);
console.log(rest.size);

// console.log(rest.get([1, 2])); // does not work
console.log(rest.get(arr)); // does work
*/

// Lesson: Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz App
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log([...question.entries()]);  // produce the same output as line 544
console.log([...question.keys()]);
console.log([...question.values()]);
