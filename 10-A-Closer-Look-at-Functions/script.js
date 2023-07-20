'use strict';
/*
// Lesson: Default Parameters

const bookings = [];

const createBooking = function (
  fligtNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    fligtNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH456', 2);
createBooking('LH456', 5);
createBooking('LH456', undefined, 1000);
*/

/*
// Lesson: How Passing Arguments Works: Value vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 247394479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 247394479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
};

//checkIn(flight, jonas);
//console.log(flight);
//console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
*/

/*

// Lesson: Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋🏼');
};

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
*/

// Lesson: Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');
greetArr('Hi')('Ronan');
