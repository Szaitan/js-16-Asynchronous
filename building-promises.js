'use strict';

//////////////////////////////////
// By creating promise we have to pass executor(callback) function
// which takes two parameters resolve and reject
// Resolve parameter is used when the statment is fullfieled
// Reject when its not fullfieled.

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

// Promisifing timeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('I waited for 2 seconds.');
  return wait(1).then(() => console.log('I waited for 1 second'));
});

function getUserPromise(id) {
  return new Promise(function (resolve, reject) {
    if (typeof id !== 'number') reject(new Error('This is not a number'));
    setTimeout(() => {
      resolve({ id, name: 'Marta', age: 28 });
    }, 1500);
  });
}

getUserPromise(45)
  .then(data => console.log(`This is working!`, data))
  .catch(err => console.log(err));
