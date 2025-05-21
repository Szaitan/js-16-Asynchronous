'use strict';

//////////////////////////////////
// By creating promise we have to pass executor(callback) function
// which takes two parameters resolve and reject
// Resolve parameter is used when the statment is fullfieled
// Reject when its not

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening !!!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('YOU win !!!');
    } else {
      reject(new Error('YOU lost !!!'));
    }
  }, 2000);
});

lotteryPromise
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
