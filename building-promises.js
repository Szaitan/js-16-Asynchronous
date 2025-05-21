'use strict';

//////////////////////////////////
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening !!!');
  if (Math.random() >= 0.5) {
    resolve('YOU win !!!');
  } else {
    reject(new Error('YOU lost !!!'));
  }
});

lotteryPromise
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
