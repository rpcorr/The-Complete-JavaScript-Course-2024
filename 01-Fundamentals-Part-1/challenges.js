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

console.log('CODING CHALLENGE 1');

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

console.log('\n\nCODING CHALLENGE 2');

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

/*
Coding Challenge #3
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!

Your tasks:
1. Calculate the average score for each team, using the test data below

2. Compare the team's average scores to determine the winner of the competition,
   and print it to the console. Don't forget that there can be a draw, so test for that
   as well (draw means they have the same average score)

3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
   team only wins if it has a higher score than the other team, and the same time a
   score of at least 100 points. Hint: Use a logical operator to test for minimum
   score, as well as multiple else-if blocks 😉

4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
   both teams have the same score and both have a score greater or equal 100
   points. Otherwise, no team wins the trophy

Test data:
  § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
  § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
  § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

  GOOD LUCK 😀
*/

console.log('\n\nCODING CHALLENGE 3');

let bMinimumScoreInPlay = false;
const minimumScore = 100;

// 1. Calculate the average scores for each team
let dolphinsAvgScore = calculateAverageScore(96, 108, 89);
let koalasAvgScore = calculateAverageScore(88, 91, 110);

console.log('1. Calculate the average score for each team');

displayDataSet('Data 1', 96, 108, 89, 88, 91, 110);
displayAverageScores(dolphinsAvgScore, koalasAvgScore);

// 2. Compare average score and determine the winner
console.log(
  "\n\n2. Compare the team's average scores to determine the winner of the competition"
);

outputResult(
  bMinimumScoreInPlay,
  minimumScore,
  dolphinsAvgScore,
  koalasAvgScore
);

// 3. Include a minimum score requirement
bMinimumScoreInPlay = true;
dolphinsAvgScore = calculateAverageScore(97, 112, 101);
koalasAvgScore = calculateAverageScore(109, 95, 123);

console.log(
  '\n\n3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points'
);

displayDataSet('Bonus 1', 97, 112, 101, 109, 95, 123);
displayAverageScores(dolphinsAvgScore, koalasAvgScore);
outputResult(
  bMinimumScoreInPlay,
  minimumScore,
  dolphinsAvgScore,
  koalasAvgScore
);

// 4. minimun score also applies to a draw
bMinimumScoreInPlay = true;
dolphinsAvgScore = calculateAverageScore(97, 112, 101);
koalasAvgScore = calculateAverageScore(109, 95, 106);

console.log(
  '\n\n4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy'
);

dolphinsAvgScore = calculateAverageScore(97, 112, 81);
koalasAvgScore = calculateAverageScore(109, 95, 86);

displayDataSet('Bonus 2', 97, 112, 81, 109, 95, 86);
displayAverageScores(dolphinsAvgScore, koalasAvgScore);
outputResult(
  bMinimumScoreInPlay,
  minimumScore,
  dolphinsAvgScore,
  koalasAvgScore
);

dolphinsAvgScore = calculateAverageScore(97, 112, 101);
koalasAvgScore = calculateAverageScore(109, 95, 106);

displayDataSet('Bonus 2', 97, 112, 101, 109, 95, 106);
displayAverageScores(dolphinsAvgScore, koalasAvgScore);
outputResult(
  bMinimumScoreInPlay,
  minimumScore,
  dolphinsAvgScore,
  koalasAvgScore
);

/// FUNCTIONS

function displayDataSet(scenerio, d1, d2, d3, k1, k2, k3) {
  console.log(`\n   ${scenerio} Data:\n`);
  console.log(`   Dolphins: ${d1}, ${d2}, ${d3}`);
  console.log(`   Koalas: ${k1}, ${k2}, ${k3}\n\n`);
}

function displayAverageScores(dolphinsAvgScore, koalasAvgScore) {
  console.log(`   Team Dolphins average score is: ${dolphinsAvgScore}`);
  console.log(`   Team Koalas average score is: ${koalasAvgScore}`);
}

function outputResult(
  bMinimumScoreInPlay,
  minimumScore,
  dolphinsAvgScore,
  koalasAvgScore
) {
  if (bMinimumScoreInPlay) {
    if (dolphinsAvgScore > koalasAvgScore && dolphinsAvgScore >= minimumScore) {
      console.log(`   Team Dolphins is the winner of the competition! 🏆`);
    } else if (
      dolphinsAvgScore < koalasAvgScore &&
      koalasAvgScore >= minimumScore
    ) {
      console.log(`   Team Koalas is the winner of the competition! 🏆`);
    } else if (
      dolphinsAvgScore === koalasAvgScore &&
      dolphinsAvgScore >= minimumScore
    ) {
      console.log(
        `   It's a draw! Both teams have an average score of ${dolphinsAvgScore}. Both teams win the trophy! 🏆`
      );
    } else {
      console.log(
        `   Since both teams have less than 100, neither wins the trophy`
      );
    }
  } else {
    if (dolphinsAvgScore > koalasAvgScore) {
      console.log(`   Team Dolphins is the winner of the competition! 🏆`);
    } else if (dolphinsAvgScore < koalasAvgScore) {
      console.log(`   Team Koalas is the winner of the competition! 🏆`);
    }
  }
}

function calculateAverageScore(num1, num2, num3) {
  return (num1 + num2 + num3) / 3;
}
