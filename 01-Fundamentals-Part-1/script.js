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
lines`);
