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
