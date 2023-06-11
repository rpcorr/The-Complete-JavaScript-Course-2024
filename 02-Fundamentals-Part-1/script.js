/*

// Lesson: Values and Variables
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Ronan');
console.log(23);

let firstName = 'Ronan';

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let ronan_melissa = 'RM';
let $function = 27;

let person = 'Ronan';
let PI = 3.1415;

let myFirstJob = 'Coder';
let myCurrentJob = 'Teacher';

let job1 = 'programmer';
let job2 = 'teacher';

console.log(myFirstJob);

// Lesson: Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);

//console.log(typeof true);
console.log(typeof javascriptIsFun);
//console.log(typeof 23);
//console.log(typeof 'Ronan');

javascriptIsFun = 'Yes!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);
*/

/*
// Lesson: let, const, var;
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;

//const job;

var job = 'programmer';
job = 'teacher';

lastName = 'Corr';
console.log(lastName);
*/

/*
// Lesson: Basic Operators

// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Ronan';
const lastName = 'Corr';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 == 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x);

// Comparision operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/

// Lesson: Operator Precedence

/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

//console.log(25 - 10 - 5);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);*/

/*
// Lesson: Strings and Template Literals

const firstName = 'Ronan';
const job = 'Front-end developer';
const birthYear = 1977;
const year = 2023;

const ronan =
  "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!';
console.log(ronan);

const ronanTemplateLiterals = `I'm ${firstName}, a ${
  year - birthYear
} years old ${job}!`;
console.log(ronanTemplateLiterals);

console.log(`Just a regular string...`);

console.log(
  'String with \n\
multiple \n\
lines'
);

console.log(`String
multiple
lines`); */

/*
// Lesson: Taking Decisions: if/else Statements

const age = 15;

if (age >= 18) {
  console.log('Sarah can start her driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

*/

/*
// Lesson: Type Conversion and Coercion

// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Ronan'));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log('I am ' + 46 + ' years old'); // numbers are converted to strings using plus(+)
console.log('23' - '10' - 3); // strings are converted to numbers using minus(-) 10
console.log('23' + '10' + 3); // '23103' (string)
console.log('23' + '10' - 3); //2307 (number)
console.log('23' * '2'); // 46 (number)
console.log('23' / '2'); // 11.5 (number)

let n = '1' + 1;
n = n - 1;
console.log(n); // result 10 number

console.log(2 + 3 + 4 + '5'); // outputs '95' (string)
console.log('10' - '4' - '3' - 2 + '5'); // outputs '15' (string)
*/

/*
// Lesson: Truthy and Falsy Values

// There are 5 falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Ronan'));
console.log(Boolean({}));
console.log(Boolean(''));
const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
*/

/*
// Lesson: Equality Operators: == vs ===
const age = '18';
if (age === 18) console.log('You just became an adult 😀 (strict)');

if (age == 18) console.log('You just became an adult 😀 (loose)');

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 17) {
  // '17' == 17
  console.log('Cool! 17 is an amazing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 9) {
  console.log('9 is also a cool number');
} else {
  console.log('Number is not 17 or 7 or 9');
}

if (favourite !== 17) console.log('Why not 17?');
*/

/*
// Lesson: Logical Operators
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

/*if (hasDriversLicense && hasGoodVision) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}*/

/*
const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}
*/

/*
// Lesson: The Switch Statement
const day = 'sunday';

console.log('Using the switch statment\n');
switch (day) {
  case 'monday': // day === 'monday'
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend 😊');
    break;
  default:
    console.log('Not a valid day!');
}

console.log('\nUsing If/Else');
if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend 😊');
} else {
  console.log('Not a valid day!');
}
*/

// Lesson: The Conditional (Ternary) Operator
const age = 18;
/*age >= 18
  ? console.log('I like to drink wine 🍷')
  : console.log('I like to drink water 💧');
*/

const drink = age >= 18 ? 'wine 🍷' : 'water 💧';
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = 'wine 🍷';
} else {
  drink2 = 'water 💧';
}

console.log(drink2);

console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);
