'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// old school way of making a AJAX call
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  // console.log(this.responseText); does not work

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    // convert JSON to an object
    const [data] = JSON.parse(this.responseText);

    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" alt="${data.flags.alt}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// countries may render in different order due to
// the time it takes for the AJAX call to finish
getCountryData('canada');
getCountryData('portugal');
getCountryData('usa');
