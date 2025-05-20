'use strict';

// The communications will be in order:

console.log('Test start'); // 1
setTimeout(() => console.log('0 sec timer'), 0); //4
Promise.resolve('Resolve promise 1').then(res => console.log(res)); // 3
console.log('Test End'); // 2

// This is because of the micro-tasks queue has prirority over callback queue
