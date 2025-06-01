'use strict';

const divforImg = document.querySelector('.countries');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

function createImage(imgPath) {
  return new Promise(function (resolve, _) {
    const newImage = document.createElement('img');
    newImage.src = imgPath;
    newImage.classList.add('images');
    newImage.addEventListener('load', function () {
      resolve(newImage);
    });
  });
}

async function loadNPause(imgPath) {
  try {
    const newImage = await createImage(imgPath);
    divforImg.insertAdjacentElement('beforebegin', newImage);
    await wait(2);
    newImage.style.display = 'none';
    newImage.src = 'img/img-2.jpg';
    newImage.style.display = 'flex';
  } catch (err) {
    console.error(err);
  }
}

loadNPause('img/img-1.jpg');

const imgs = [];
async function loadAll(list) {
  list.map(x => {
    const img = createImage(x);
    imgs.push(img);
  });
}

async function loadAll(list) {
  const imgs = await Promise.all(
    list.map(path => {
      return createImage(path);
    })
  );
  console.log(imgs);
  imgs.map(x => {
    x.classList.add('parallel');
    divforImg.insertAdjacentElement('beforebegin', x);
  });
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
