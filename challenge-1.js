'use strict';
const geocodeCode = '148615786301788546690x120270';

function whereAmI(lat, lng) {
  return fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${geocodeCode}`
  ).then(response => {
    const data = response.json();
    console.log(data);
    return data;
  });
}
whereAmI(52.508, 13.381);
