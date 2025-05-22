'use strict';

const geocodeCode = '148615786301788546690x120270';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

function whereAmI() {
  getPosition()
    .then(response => {
      // We have to remember to return the fetch
      return fetch(
        `https://geocode.xyz/${response.coords.latitude},${response.coords.longitude}?geoit=json&auth=${geocodeCode}`
      );
    })
    .then(response => {
      // what is important here is that we are checking the direct response from the server
      // Thats why we cant use json method before we check the status of response
      // we return prepared json data after the status is checked

      if (!response.ok)
        throw new Error(
          `There was to many calls in 1 second. ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city} ${data.country}`);
      return data;
    })
    .then(data => {
      getCountryData(data.country);
    })
    .catch(err => console.log(`This is a problem: ${err.message}`));
}

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];

      if (!neighbour) throw new Error('There is no neighbour country!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(function (err) {
      renderErrorMessage(`Something went wrong. ${err.message}.`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

// Render error message
const renderErrorMessage = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// Function to render country
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// Adding event to the button
btn.addEventListener('click', function () {
  whereAmI();
});
