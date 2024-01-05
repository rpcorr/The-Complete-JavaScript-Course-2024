'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// delcare an array and variables
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = () => {
  // set array and variables values
  scores = [0, 0]; // cummulative scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // reset text content to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // hide the dice
  diceEl.classList.add('hidden');

  // remove player--winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // set active player to player0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // set aria-label attribute to Roll Dice and Hold buttons to help SRs indicate which player turn it is

  // update roll dice and hold button aria labels
  setRollDiceButtonAriaLabel(0);
  setHoldButtonAriaLabel(0);
};

// run the initial state of game
init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // update roll dice and hold button aria labels
  // adding this in a setTimeout will read the player who turn ended before annoucing the other player
  setTimeout(() => {
    setRollDiceButtonAriaLabel(activePlayer);
    setHoldButtonAriaLabel(activePlayer);
  }, 5000);

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const openModal = () => {
  // show modal and its overlay
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  // hide btnNew, btnRoll, btnHold, btnRules from keyboard users when modal is open
  btnNew.setAttribute('tabindex', '-1');
  btnRoll.setAttribute('tabindex', '-1');
  btnHold.setAttribute('tabindex', '-1');
  btnRules.setAttribute('tabindex', '-1');

  // give modal the focus, so SRs can read the content
  modal.focus();
};

const closeModal = () => {
  // remove tabindex attribute
  btnNew.removeAttribute('tabindex');
  btnRoll.removeAttribute('tabindex');
  btnHold.removeAttribute('tabindex');
  btnRules.removeAttribute('tabindex');

  // add hidden class to modal and overlay
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  // give Rules button the focus
  btnRules.focus();
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // update active player hold button aria label with current score
      setHoldButtonAriaLabel(activePlayer);

      srSpeak(
        `${
          activePlayer == '0' ? 'player 1' : 'player 2'
        } rolled a ${dice} and has a current score of ${currentScore}.`
      );
    } else {
      srSpeak(
        `${
          activePlayer == '0' ? 'player 1' : 'player 2'
        } rolled a ${dice} and forfeit a score of ${currentScore}, which leaves the tally score at ${
          scores[activePlayer]
        }.`
      );
      // if true, switch to next player
      switchPlayer();
    }
  }
});

btnRoll.addEventListener('focus', () => {
  setTimeout(() => {
    srSpeak(`and currently has ${scores[activePlayer]} as the tally score`);
  }, 3000);
});

// Holding the current number functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 1.1 alert screen readers active player decides to hold and add current score to grand total
    srSpeak(
      `${
        activePlayer == '0' ? 'player 1' : 'player 2'
      } decides to hold and add a score of ${currentScore} to the tally score which now sits at ${
        scores[activePlayer]
      }.`
    );

    const nextPlayerTurn = activePlayer == '0' ? 'player 1' : 'player 2';

    setTimeout(() => {
      setRollDiceButtonAriaLabel(nextPlayerTurn);
    }, 2000);

    setTimeout(() => {
      btnRoll.focus();
    }, 4000);

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else if (currentScore !== 0) {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Open the rules modal
btnRules.addEventListener('click', openModal);

// Close the rules modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// add ESC key functionally to close the rules modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnNew.addEventListener('click', init);

function setRollDiceButtonAriaLabel(activePlayer) {
  btnRoll.setAttribute(
    'aria-label',
    `${activePlayer == '0' ? 'player 1' : 'player 2'} roll dice`
  );
}

function setHoldButtonAriaLabel(activePlayer) {
  btnHold.setAttribute(
    'aria-label',
    `${
      activePlayer == '0' ? 'player 1' : 'player 2'
    } hold current score of ${currentScore}`
  );
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
