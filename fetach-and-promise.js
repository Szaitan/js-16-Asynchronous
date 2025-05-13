'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// In ES6 the whole part of asyn data was replaced using fetch,
// which is works based on promise cycle

// For simple GET we dont need to pass it as parameter
// const request = fetch(`https://restcountries.com/v2/name/poland`);
// console.log(request);

// For simple GET we dont need to pass it as parameter
// Now we cosume our pending
const getCountyData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`);
  // method .then is called on promise that fullfield condition
  // first thing is in callback to call json method on which works in async mode
  // thats why we have to use another .then method on it
  request
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders[0];

      // Here we start chain of promises instead of callback hell
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response2 => response2.json())
    .then(data => renderCountry(data, 'neighbour'));
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
  countriesContainer.style.opacity = 1;
};

// Calling function
getCountyData('poland');
