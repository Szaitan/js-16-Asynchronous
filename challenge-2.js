'use strict';

const divforImg = document.querySelector('.countries');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const newImage = document.createElement('img');
    newImage.src = imgPath;
    resolve(newImage);
  });
}

createImage('img/img-1.jpg')
  .then(resolve => {
    resolve.classList.add('images');
    divforImg.insertAdjacentElement('beforebegin', resolve);
    wait(2).then(() => {
      console.log((resolve.style.display = 'none'));
    });
  })
  .catch(err => console.log(err));
