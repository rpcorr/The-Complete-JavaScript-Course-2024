'use strict';
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(
    coords,
    distance,
    duration,
    weatherIcon,
    weatherDescription,
    temp,
    windSpeed,
    humidity
  ) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
    this.weatherIcon = weatherIcon; // icon from openweathermap.org
    this.weatherDescription = weatherDescription; // from openweathermap.org
    this.temp = temp; // in Celsius from openweathermap.org
    this.windSpeed = windSpeed; // in km/hr from openweathermap.org
    this.humidity = humidity; // % from openweathermap.org
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(
    coords,
    distance,
    duration,
    cadence,
    weatherIcon,
    weatherDescription,
    temp,
    windSpeed,
    humidity
  ) {
    super(
      coords,
      distance,
      duration,
      weatherIcon,
      weatherDescription,
      temp,
      windSpeed,
      humidity
    );
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(
    coords,
    distance,
    duration,
    elevationGain,
    weatherIcon,
    weatherDescription,
    temp,
    windSpeed,
    humidity
  ) {
    super(
      coords,
      distance,
      duration,
      weatherIcon,
      weatherDescription,
      temp,
      windSpeed,
      humidity
    );
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// dummy objects
const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);
// to call click method type the following in the console: run1.click(); cycling1.click()

//////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const modifyContainer = document.querySelector('.modify__container');
const showAllWorkouts = document.querySelector('.modify--show-all-workouts');
const modifySort = document.querySelector('.modify--sort');
const sortMenu = document.querySelector('.sort__by__input__menu');
const sortAsc = document.querySelector('.asc');
const sortDesc = document.querySelector('.desc');
const modifyDeleteAll = document.querySelector('.modify--delete');
const btnCancel = document.querySelector('.btn--cancel');
const errorMessageContainer = document.querySelector('.error__message');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #markers = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this)); // enter button submits form
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    showAllWorkouts.addEventListener('click', this._showAllWorkouts.bind(this));
    modifySort.addEventListener('click', this._sortWorkouts.bind(this));
    sortAsc.addEventListener('click', this._sortWorkoutsAsc.bind(this));
    sortDesc.addEventListener('click', this._sortWorkoutsDesc.bind(this));
    modifyDeleteAll.addEventListener(
      'click',
      this._deleteAllWorkouts.bind(this)
    );
  }

  // Getting the position
  _getPosition() {
    // check for internet connection
    if (!window.navigator.onLine) {
      errorMessageContainer.classList.remove('hidden');
      errorMessageContainer.textContent =
        'Could not get your position. Check your Internet connection.';
      return;
    }

    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), null);
  }

  // Load the map
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // get current position
    L.circle([latitude, longitude], 10, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent('📌 Current location')
      .openPopup();

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // render markers (from data in local)
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  // Showing the form
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();

    // add new--activity class to form to adjust height
    form.classList.add('new--activity');

    // remove edit--activity class from form
    form.classList.remove('edit--activity');

    // display cancel button and add an event listener
    btnCancel.classList.remove('hidden');
    btnCancel.addEventListener('click', this._hideForm.bind(this));
  }

  _hideForm() {
    // Empty inputs
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    // prevent animation when hiding the form and showing the result
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);

    // remove new--activity class to form to adjust height
    form.classList.remove('new--activity');

    // remove edit--activity class from form
    form.classList.remove('edit--activity');
  }

  // Toggling the elevation form
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  //Creating the workouts
  _newWorkout(e) {
    // prevent form from submitting
    e.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout, weatherDetails;

    const apiKey = 'a13ac26a83707dbc0a1f0a4bccf011f3';
    const city = 'Toronto';

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then(response => response.json())
      .then(data => this._getWeatherDetails(data))
      .then(res => {
        weatherDetails = res;

        // If workout running, create running object
        if (type === 'running') {
          const cadence = +inputCadence.value;
          // Check if data is valid
          if (
            !validInputs(distance, duration, cadence) ||
            !allPositive(distance, duration, cadence)
          ) {
            errorMessageContainer.classList.remove('hidden');
            errorMessageContainer.textContent =
              'Input have to be positive numbers!';
            return;
          }
          workout = new Running(
            [lat, lng],
            distance,
            duration,
            cadence,
            weatherDetails.weatherIcon,
            weatherDetails.weatherDescription,
            weatherDetails.temp,
            weatherDetails.windSpeed,
            weatherDetails.humidity
          );
        }

        // If workout cycling, create cycling object
        if (type === 'cycling') {
          const elevation = +inputElevation.value;
          // Check if data is valid
          if (
            !validInputs(distance, duration, elevation) ||
            !allPositive(distance, duration)
          ) {
            errorMessageContainer.classList.remove('hidden');
            errorMessageContainer.textContent =
              'Input have to be positive numbers!';
            return;
          }

          workout = new Cycling(
            [lat, lng],
            distance,
            duration,
            elevation,
            weatherDetails.weatherIcon,
            weatherDetails.weatherDescription,
            weatherDetails.temp,
            weatherDetails.windSpeed,
            weatherDetails.humidity
          );
        }

        console.log(workout);

        // Remove Error Message container (if present)
        errorMessageContainer.classList.add('hidden');

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        // Hide form and clear input
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage();
      });
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    // Storing the markers
    this.#markers.push(marker);

    // Attaching the id with the marker
    marker.markID = workout.id;
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout-mod__btns">
        <button class="workout__btn workout__btn--edit">
          ✏️
        </button>
        <button class="workout__btn workout__btn--delete">
          🗑️
        </button>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;
    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    `;

    html += `<div class="workout__details">
              <span class="workout__icon"><img
              src="https://openweathermap.org/img/wn/${workout.weatherIcon}.png"
              alt=""
              height="23"
              width="23"
            /></span>
              <span class="workout__unit">${workout.weatherDescription}</span>
              
            </div>
            <div class="workout__details">
              <span class="workout__icon">🌡️</span>
              <span class="workout__value">${Math.round(workout.temp)}</span>
              <span class="workout__unit">°C</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">💨</span>
              <span class="workout__value">${Math.round(
                workout.windSpeed
              )}</span>
              <span class="workout__unit">km/hr</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">💦</span>
              <span class="workout__value">${workout.humidity}</span>
              <span class="workout__unit">%</span>
            </div>
          </li>`;

    // add new entry to the end
    form.insertAdjacentHTML('afterend', html);

    // add event listener to the edit icon for each workout
    const btnEdit = document.querySelector('.workout__btn--edit');
    btnEdit.addEventListener('click', this._editWorkout.bind(this));

    // add event listener to the delete icon for each workout
    const btnDelete = document.querySelector('.workout__btn--delete');
    btnDelete.addEventListener('click', this._deleteWorkout.bind(this));

    // display the "Delete All Activities" button
    modifyContainer.classList.remove('hidden');
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    if (!workout) return; // prevent errors if workout is deleted

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    workout.click();

    // console.log(workout);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    // restore workouts and the prototype chain
    this.#workouts = data;
    this.#workouts.forEach(workout => {
      workout =
        workout.type === 'running'
          ? Object.setPrototypeOf(workout, Running.prototype)
          : Object.setPrototypeOf(workout, Cycling.prototype);
      console.log(workout);
      this._renderWorkout(workout);
    });
  }

  _editWorkout(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const selectedWorkout = this.#workouts.find(
      currentWorkout => currentWorkout.id === workoutEl.dataset.id
    );

    // show the form
    this._showForm();

    // hide btnCancel
    btnCancel.classList.add('hidden');

    // add edit--activity class to form
    form.classList.add('edit--activity');

    // remove new--activity class from form
    form.classList.remove('new--activity');

    // populate form fields with existing values
    inputDistance.value = selectedWorkout.distance;
    inputDuration.value = selectedWorkout.duration;
    selectedWorkout.cadence && (inputCadence.value = selectedWorkout.cadence);
    selectedWorkout.elevationGain &&
      (inputElevation.value = selectedWorkout.elevationGain);

    // toggle cadence and elevation fields base on selectedWorkout type
    if (inputType.value !== selectedWorkout.type) {
      inputType.value = selectedWorkout.type;
      this._toggleElevationField();
    }

    // re-define #mapEvent
    const lat = selectedWorkout.coords[0];
    const lng = selectedWorkout.coords[1];

    const coordsMap = {
      latlng: { lat: lat, lng: lng },
    };

    this.#mapEvent = coordsMap;

    // Delete original workout
    this._deleteWorkoutById(selectedWorkout.id);
  }

  _showAllWorkouts() {
    // create arrays for all the latitude and longitude coordinates on the map
    const latitudes = this.#workouts.map(workout => workout.coords[0]);
    const longitudes = this.#workouts.map(workout => workout.coords[1]);

    // retrieve the min and max latitudes and longitudes values from collections of coordinates
    const latitudeRadius = [Math.min(...latitudes), Math.max(...latitudes)];
    const longitudeRadius = [Math.min(...longitudes), Math.max(...longitudes)];

    // Set a 15% margin to target boundary
    const marginLatitude = (latitudeRadius[1] - latitudeRadius[0]) * 0.15;
    const marginLongitude = (longitudeRadius[1] - longitudeRadius[0]) * 0.15;

    // create a map boundary radius array
    const mapBoundaryRadius = [
      [
        latitudeRadius[0] - marginLatitude,
        longitudeRadius[0] - marginLongitude,
      ],
      [
        latitudeRadius[1] + marginLatitude,
        longitudeRadius[1] + marginLongitude,
      ],
    ];

    // pan map to the defined boundary radius
    this.#map.flyToBounds(mapBoundaryRadius);
  }

  _sortWorkouts() {
    this._sortByProperty(sortMenu.value);
    // store sort value in local storage to obtain later
    if (sortMenu.selectedIndex != 0)
      localStorage.setItem('sortBy', sortMenu.value);
    sortMenu.selectedIndex = 0;
  }

  _sortByProperty(sortByCriterion) {
    // if selected value is sortBy exit the function
    if (sortByCriterion === 'sortBy') return;

    // Create two arrays to check if workouts are already sorted
    const sortByCriterionFirstArray = this._mapSortByCriterion(this.#workouts);
    const sortByCriterionSecondArray = this._mapSortByCriterion(
      this._initialSort(this.#workouts, -1)
    );

    // if workouts arrays are already sorted then sort in reverse order.
    if (
      sortByCriterionFirstArray.every(
        (el, i) => el === sortByCriterionSecondArray[i]
      )
    ) {
      this._initialSort(this.#workouts, 1);
    } else {
      this._initialSort(this.#workouts, -1);
    }

    this._refreshWorkouts();
  }

  // sort array by the selected type
  _initialSort(arr, n) {
    return arr.sort(function (a, b) {
      if (
        !a[localStorage.getItem('sortBy')] &&
        b[localStorage.getItem('sortBy')]
      ) {
        return -2;
      }
      if (
        a[localStorage.getItem('sortBy')] &&
        !b[localStorage.getItem('sortBy')]
      ) {
        return 2;
      }

      if (
        !a[localStorage.getItem('sortBy')] &&
        !b[localStorage.getItem('sortBy')]
      ) {
        return 0;
      }

      return b[localStorage.getItem('sortBy')] <
        a[localStorage.getItem('sortBy')]
        ? -n
        : n;
    });
  }

  // Create an array for the sort by criterion values
  _mapSortByCriterion(arr) {
    return arr.map(el => el[localStorage.getItem('sortBy')]);
  }

  _sortWorkoutsAsc() {
    // obtain the workouts array in ascending order
    this._initialSort(this.#workouts, 1);

    this._refreshWorkouts();

    //console.log(localStorage.getItem('sortBy'));
    sortMenu.selectedIndex = localStorage.getItem('sortBy');
  }

  _sortWorkoutsDesc() {
    // obtain the workouts array in descending order
    this._initialSort(this.#workouts, -1);

    this._refreshWorkouts();

    //console.log(localStorage.getItem('sortBy'));
    sortMenu.selectedWorkout = localStorage.getItem('sortBy');
  }

  _deleteWorkoutById(id) {
    // check to see if there are workouts
    if (this.#workouts.length > 0) {
      // filter out the deleted workout
      this.#workouts = this.#workouts.filter(e => e.id !== id);

      // update workouts with out the deleted workout
      this._refreshWorkouts();

      // remove marker from map
      this._refreshMap();
    }
  }

  _deleteWorkout(e) {
    // Find the selected workout element and its index in the workouts array
    const clickedId = e.target.closest('.workout').dataset.id;
    const index = this.#workouts.findIndex(ind => ind.id === clickedId);

    // Remove the workout from the array
    this.#workouts.splice(index, 1);

    // Update the local storage with the new workouts array
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));

    // Check if the workouts array is empty
    if (this.#workouts.length === 0) {
      // If it's empty, remove the workouts from local storage and hide the modify buttons container
      localStorage.removeItem('workouts');

      // hide the "Delete All Activities" button
      modifyContainer.classList.add('hidden');
    }

    // Remove the marker from map
    this.#markers.find(work => work.markID === clickedId).remove();

    // Remove the workout element from sidebar
    e.target.closest('.workout').remove();
  }

  _deleteAllWorkouts() {
    // Remove workouts from sidebar
    document.querySelectorAll('.workout').forEach(e => e.remove());

    // Remove all markers from map
    this.#markers.forEach(work => work.remove());

    // empty the arrays
    this.#workouts.splice(0, this.#workouts.length);
    this.#markers.splice(0, this.#markers.length);

    // delete the workouts localstorage
    localStorage.removeItem('workouts');

    // hide the "Delete All Activities" button
    modifyContainer.classList.add('hidden');
  }

  _refreshWorkouts() {
    this._setLocalStorage();
    containerWorkouts.querySelectorAll('.workout').forEach(el => el.remove());
    this._getLocalStorage();
  }

  _refreshMap(coords) {
    const currentCoords = !coords
      ? {
          coords: {
            latitude: this.#map.getCenter().lat,
            longitude: this.#map.getCenter().lng,
          },
        }
      : coords;

    // reload map
    this.#map.remove();
    this._loadMap(currentCoords);
  }

  _getWeatherDetails(data) {
    const weatherDetails = {
      city: data.name,
      weatherIcon: data.weather[0].icon,
      weatherDescription: data.weather[0].description,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    return weatherDetails;
  }
}

const app = new App();

// TO DO:
/*
  EASY
  1. Ability to edit a workout - Completed
  2. Ability to delete a workout - Completed
  3. Ability to delete all workouts - Completed
  4. Ability to sort workouts by a certain field 
     (e.g. distance). Take a look at Bankist - Completed
  5. Re-build Running and Cycling objects coming from local storage - Completed
  6. More realistic error and confirmation messages. 
     e.g. avoid using alert messages - Completed

  HARDER
  7. Position Map to show all the workouts (very hard) - Completed
  8. Ability to draw lines and shapes instead of just points (very hard)

  ONLY AFTER ASYNCHRONOUS JAVASCRIPT section
  9. Geocode location from coordinates ("Run in Faro, Portugal")
  10. Display weather data for workout time and place - Completed
*/
