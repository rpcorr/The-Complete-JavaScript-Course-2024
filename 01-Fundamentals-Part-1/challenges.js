/*

JAVASCRIPT FUNDAMENTALS - PART 1
Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76m tall.

*/

// Data 1
let markMass = 78;
let markHeight = 1.69;

let johnMass = 92;
let johnHeight = 1.95;

const getBMI = (mass, height) => mass / height ** 2;
const compareBMI = (markBMI, johnBMI) => markBMI > johnBMI;
const resultsOutput = (
  scenerio,
  markBMI,
  johnBMI,
  isMarksBMIHeigherThanJohns
) =>
  console.log(
    `${scenerio}: Mark's BMI ${markBMI} John's BMI ${johnBMI}. Is Mark's BMI higher than John's: ${isMarksBMIHeigherThanJohns}`
  );

let markBMI = getBMI(markMass, markHeight);
let johnBMI = getBMI(johnMass, johnHeight);

let isMarksBMIHeigherThanJohns = compareBMI(markBMI, johnBMI);

resultsOutput('Data 1', markBMI, johnBMI, isMarksBMIHeigherThanJohns);

// Data 2
markMass = 95;
markHeight = 1.88;

johnMass = 85;
johnHeight = 1.76;

markBMI = getBMI(markMass, markHeight);
johnBMI = getBMI(johnMass, johnHeight);
isMarksBMIHeigherThanJohns = compareBMI(markBMI, johnBMI);

resultsOutput('Data 2', markBMI, johnBMI, isMarksBMIHeigherThanJohns);

/*
Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

Hint: Use an if/else statement 😉
*/

// Data 1
markMass = 78;
markHeight = 1.69;

johnMass = 92;
johnHeight = 1.95;

markBMI = getBMI(markMass, markHeight);
johnBMI = getBMI(johnMass, johnHeight);

whoHasTheHigherBMI('Data 1', markBMI, johnBMI);

// Data 2
markMass = 95;
markHeight = 1.88;

johnMass = 85;
johnHeight = 1.76;

markBMI = getBMI(markMass, markHeight);
johnBMI = getBMI(johnMass, johnHeight);

whoHasTheHigherBMI('Data 2', markBMI, johnBMI);

function whoHasTheHigherBMI(scenerio, markBMI, johnBMI) {
  if (markBMI > johnBMI) {
    console.log(
      `${scenerio}: Mark's BMI, (${markBMI}) is higher than John's, (${johnBMI}) `
    );
  } else {
    console.log(
      `${scenerio}: John's BMI, (${johnBMI}) is higher than Mark's, (${markBMI}) `
    );
  }
}
