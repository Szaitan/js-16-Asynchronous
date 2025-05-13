'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
  // first country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);

    // first country render
    renderCountry(data);
    console.log(data);

    if (!data.borders[0]) return;
    // What we see it is called a callback hell
    // If we would have many vallbacks the shape would be of a tree
    // That is a bad pratice for the code

    // Firsts country neighbour
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v2/alpha/${data.borders[0]}`
    );
    request2.send();

    request2.addEventListener(`load`, function () {
      const data2 = JSON.parse(request2.responseText);
      // Firsts country neighbour render
      renderCountry(data2, 'neighbour');
    });
  });
};
// test
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M</p>
              // <p class="country__row"><span>🗣️</span>${
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

getCountryData('usa');
