'use strict';

const geocodeCode = '148615786301788546690x120270';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////

// Let say that we want to run 3 fetch functions at the same time. If we would do it one after another it would not be trully async code because it would fetch data one after another.
// To solve this problem we can use Promises.all() which allows to call async functions at the same time which is better for performance.

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getDataForThreeCountries = async function (c1, c2, c3) {
  try {
    const datas = await Promise.all([
      getJSON(
        `https://restcountries.com/v2/name/${c1}`,
        'Country not found'
      ).then(result => {
        return result;
      }),
      getJSON(
        `https://restcountries.com/v2/name/${c2}`,
        'Country not found'
      ).then(result => {
        return result;
      }),

      getJSON(`https://restcountries.com/v2/name/${c3}`, 'Country not found'),
    ]);
    console.log(datas);
  } catch (err) {
    console.log(err);
  }
};

const dataC = getDataForThreeCountries('poland', 'germany', 'italy');
