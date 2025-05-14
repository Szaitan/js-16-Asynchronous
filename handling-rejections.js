'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// There are two ways of hanlding errors for promises

// First
// We can pass second fucntion in .then method
const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`);
  request
    .then(
      response => response.json(),
      err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response2 => response2.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// const getCountyData = function (country) {
//   const request = fetch(`https://restcountries.com/v2/name/${country}`);
//   request
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0]?.borders[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response2 => response2.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };

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
  countriesContainer.style.opacity = 1;
};

// Adding event to the button
btn.addEventListener('click', function () {
  getCountryData('poland');
});

// Calling function
