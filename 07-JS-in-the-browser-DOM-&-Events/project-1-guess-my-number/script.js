'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = (selector, message) => {
  document.querySelector(selector).textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
  turnTaken();
});

document.querySelector('#number').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) turnTaken();
});

document.querySelector('#number').addEventListener('focus', (e) => {
  srSpeak('Start guessing...');
});

///////////////////////////////////////////
// Coding Challenge #1

/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
GOOD LUCK 😀
*/

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.number').textContent = '?';
  displayMessage('.message', 'Start guessing...');
  displayMessage('.score', score);
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.getElementById('number').focus();
});

function turnTaken() {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('.message', '⛔ No number!');
    srSpeak('No number was provided. Try again.');
    document.querySelector('#number').focus();

    // When player wins the game
  } else if (guess === secretNumber) {
    displayMessage('.message', '🎉 Correct Number!');
    displayMessage('.number', secretNumber);

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      displayMessage('.highscore', highscore);
    }

    srSpeak(
      `Congratulations! You have guessed the secret number, ${secretNumber}. Your score is ${score}. Your high score is ${highscore}`
    );

    setTimeout(() => {
      document.querySelector('.again').focus();
    }, 5000);

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        '.message',
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );

      score--;
      document.querySelector('.score').textContent = score;
      srSpeak(
        `${guess} is ${
          guess > secretNumber ? 'Too high!' : 'Too low!'
        } You have ${score} more guesses`
      );
      document.querySelector('#number').focus();
    } else {
      displayMessage('.message', '💥You lost the game!');
      displayMessage('.score', 0);
      srSpeak(
        "You didn't guess the secret number in 20 guesses and have lost the game! "
      );
    }
  }
}

function srSpeak(text, priority) {
  const el = document.createElement('div');
  const id = 'speak-' + Date.now();
  el.setAttribute('id', id);
  el.setAttribute('aria-live', priority || 'polite');
  el.classList.add('sr-only');
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id));
  }, 1000);
}
