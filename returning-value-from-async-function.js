'use strict';

const geocodeCode = '148615786301788546690x120270';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////////////////////////////////
// To catch errors we use try {} witch catch (){} construction

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

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

const renderErrorMessage = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const whereAmI = async function () {
  try {
    const myPosition = await getPosition();
    const { latitude: lat, longitude: lng } = myPosition.coords;

    const countryData = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${geocodeCode}`
    );
    if (!countryData.ok) {
      new Error('There is a problem with your position data.');
    }
    const data = await countryData.json();

    const res = await fetch(
      `https://restcountries.com/v2/name/${data.countrygggggg}`
    );
    if (!res.ok) {
      ('There is a problem with your country data.');
    }
    const finalData = await res.json();
    renderCountry(finalData[0]);

    // to return value from functions we simply use return
    // however we have to remember that we have to use .await outside
    return `You are in country ${finalData[0].name}, in ${finalData[0].capital}.`;
  } catch (err) {
    renderErrorMessage(err);

    // For error we have to throw new error
    throw new Error(`2: ${err}`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

btn.addEventListener('click', async function () {
  try {
    const final = await whereAmI();
    console.log(final);
  } catch (err) {
    console.log(err);
  }
});
