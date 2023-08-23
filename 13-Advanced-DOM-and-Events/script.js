'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Cookies message

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

// Deleting Cookies message
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styling message
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

///////////////////////////////////////
// Smooth Scrolling

btnScrollTo.addEventListener('click', function (e) {
  //  -- Smooth Scrolling (Modern Way)
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// - works but not efficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Example of Event Delegation

//- 1. Add event listener to common parent element
//- 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Building a Tabbed Component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate tab
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked;

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  // when using bind this keyword becomes the opacity
  console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/*nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});*/

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation: The Scroll Event
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// Lesson: Selecting, Creating, and Deleting Elements

/*
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

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent =
// //  'We use cookies for improved functionality and analytics.';

// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message); // the old way
//   });
*/

/*
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
*/

/*
// Lesson: Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // - method 1:

  //const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // pageXOffset and pageYOffset are deprecated
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  // console.log(
  //   'Height/Width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // - method 2:

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
*/
/*
// Lesson: Types of Events and Events Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1);  this line doesn't needs to be here
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// the old school way
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
*/
/*
// Lesson: Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColour = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
//console.log(randomColour(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColour();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation(); not a good idea to do this
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColour();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColour();
    console.log('NAV', e.target, e.currentTarget);
  },
  false
);
*/

/*
// Lesson: DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';
h1.style.background = 'var(--gradient-primary)'; // works the same as the line above

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
