'use strict';

const divforImg = document.querySelector('.country__img');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

function createImage(imgPath) {
  return new Promise(function (resolve, _) {
    divforImg.src = imgPath;
    divforImg.style.display = 'flex';
    divforImg.classList.add('images');
    resolve(divforImg);
  });
}

const loadNPause = async function (firstImg) {
  const img = await createImage(firstImg);
  console.log(img);
};

loadNPause('img/img-1.jpg');
