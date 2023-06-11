'use strict';
/*
// Scoping in practice
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

// Hoisting and TDZ in Practice

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
