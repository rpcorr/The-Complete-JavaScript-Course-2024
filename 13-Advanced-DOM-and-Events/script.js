'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//for (let i = 0; i < btnsOpenModal.length; i++)
//btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// - method 1:
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // pageXOffset and pageYOffset are deprecated
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'Height/Width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // --Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // // -- Smooth Scrolling  (Old school way)
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //  -- Smooth Scrolling (Modern Way)
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// Lesson: Selecting, Creating, and Deleting Elements

// Selection elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const buttons = document.getElementsByTagName('button');
console.log(buttons);

console.log(document.getElementsByClassName('btn'));

// Create and inserting elements
// .interAdjacentHMTL

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent =
//  'We use cookies for improved functionality and analytics.';

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message); // the old way
  });

// Lesson: Styles, Attributes and Classes

// - Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// - Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

// - Setting Attributes
logo.alt = 'Beautiful minimalist logo';

//  - Non-standard
console.log(logo.designer); // will not work
console.log(logo.getAttribute('designer')); // will work
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// - special kind of attributes: Data attributes
console.log(logo.dataset.versionNumber);

// - Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not "includes" - as in arrays

// Don't use because it will override all the existing classes
// logo.className = 'Jonas';
