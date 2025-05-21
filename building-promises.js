'use strict';

//////////////////////////////////
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening !!!');
  if (Math.random() >= 0.5) {
    resolve('YOU win !!!');
  } else {
    ('YOU lost !!!');
  }
});
