'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// In ES6 the whole part of asyn data was replaced using fetch,
// which is works based on promise cycle

const request = fetch(`https://restcountries.com/v2/name/poland`);
console.log(request);
