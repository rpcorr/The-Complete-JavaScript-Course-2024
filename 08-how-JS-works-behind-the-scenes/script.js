'use strict';

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
