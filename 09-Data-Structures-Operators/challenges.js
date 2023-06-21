/*

DATA STRUCTURES, MODERN OPERATORS AND STRINGS

Coding Challenge #1

We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:

1. Create one player array for each team (variables 'players1' and
'players2')

2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players

3. Create an array 'allPlayers' containing all players of both teams (22
players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log('Coding Challenge #1\n\n');

// 1. Create one player array for each team (variables 'players1' and 'players2')
// The use of destructuring
console.log('1. Create one player array for each team');
const [players1, players2] = game.players;
console.log(players1, players2);

/*2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
*/
console.log(
  '\n2. The first player is the goal keepers, while the others are field players'
);
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

/* 3. Create an array 'allPlayers' containing all players of both teams (22
players)
*/
console.log(
  "\n3. Create an array 'allPlayers' containing all players of both team"
);
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

/* 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
*/
console.log('\n4. Team 1 used 3 substitute players');
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

/* 5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
*/
console.log(
  "\n5. Creae one variable for each odd (called 'team1', 'draw', and 'team2'"
);
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

/* 6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in) */
console.log(
  "\n6. Write a function ('printGoals') that receives an arbitrary number of player names and prints each of them to the console, along with the number of goals that were scored in total"
);

const printGoals = function (...players) {
  console.log(`\n${players.length} goals were scored.  The scorers are:`);
  for (i = 0; i <= players.length - 1; i++) {
    console.log(players[i]);
  }
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored);

/*
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.

use of logical assignment operators
*/
console.log(
  '\n7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win'
);
team1 < team2 && console.log(`Team 1 is more likely to win`);
team1 > team2 && console.log(`Team 2 is more likely to win`);

/*
Coding Challenge #2

Let's continue with our football betting app! Keep using the 'game' variable from
before.

Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)

3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names 😉

4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}
GOOD LUCK 😀
*/

console.log('\nCoding Challenge #2\n\n');

console.log(
  '1. Loop over the game.scored array and print each player name to the console, along with the goal number\n\n'
);

for (const [goal, player] of game.scored.entries())
  console.log(`Goal ${goal + 1}: ${player}`);

console.log(
  '\n2. Use a loop to calculate the average odd and log it to the console\n\n'
);

const odds = Object.values(game.odds);
let average = 0;

for (odd of odds) average += odd;

average /= odds.length;

console.log(`The average odd is: ${average}`);

console.log(
  '\n3. Print the 3 odds to the console, but in a nice formatted way\n\n'
);
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]} `;
  console.log(`Odd of ${teamStr} ${odd}`);
}

console.log(
  "\n4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value."
);
const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);
