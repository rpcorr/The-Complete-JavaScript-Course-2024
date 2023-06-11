'use strict';
/*
// Demo: Scoping in practice
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}.`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); reference error (not accessible)
    console.log(millenial);
    // console.log(add(2, 3)); reference error (not accessible)
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age); // reference error (not accessible)
// printAge(); // reference error (not accessible)
*/

/*
// Demo: Hoisting and TDZ in Practice

// Variables
console.log(me);
// console.log(job); // in TDZ
// console.log(year); // in TDZ

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDeclaration(2, 3)); // works
// console.log(addExpression(2, 3)); // in the TDZ
// console.log(addArrowExpression); // doesn't work when declared with var
// console.log(addArrowExpression(2, 3)); // in the TDZ

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

var addArrowExpression = (a, b) => a + b;

// Example
console.log(numProduct);
if (!numProduct) deleteShoppingCart();

var numProduct = 10;

function deleteShoppingCart() {
  console.log('All producted deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
*/
/*
// Lesson: The this keyword in Practice
console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // this keyword is assigned to it's scope; thus is undefined
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // this keyword is the arrow's parent because arrow functions don't have the this keyword; thus this is window
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f(); // produce this undefined because it is not attached to any object
*/

// Lesson: Regular Functions vs. Arrow Functions
var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    // Solution 1:
    // how to handle this keyword within a function in a function
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   //console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // Solution 2:
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },

  greeter: function () {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

jonas.greet();
// console.log(this.firstName);  // produce undefined
// jonas.greeter();

jonas.calcAge();

// argumnent keyword
const addExpression = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpression(2, 5);
addExpression(2, 5, 8, 12);

var addArrowExpression = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrowExpression(2, 5, 8);
