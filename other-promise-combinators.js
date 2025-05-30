'use strict';

// We have few diffrent types of promise combinators:
// all - Which returns the list of all fullfield promises. However if one of the promises id rejected it will return one error

// race - Creates a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected.

// allSettled - Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.

// any - Which will return first fullfield promise, but rejected promises are ignored.

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/tanzania`, 'Country not found'),
    getJSON(`https://restcountries.com/v2/name/egypt`, 'Country not found'),
    getJSON(`https://restcountries.com/v2/name/poland`, 'Country not found'),
  ]);
  console.log(res);
})();

// We can add timeout function in case the user has a bad internet connection
const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long.'));
    }, sec * 1000);
  });
};

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/tanzania`, 'Country not found'),
    timeOut(10),
  ]);
  console.log(res[0]);
})();

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
