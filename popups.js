'use strict';

const popupBackground = document.querySelector('.popup__background');
const popupCheckDetails = document.querySelector('.popup__checkDetails');
const closePopUps = document.querySelectorAll('.popup__close-btn');
const btnsCheckDetails = document.querySelectorAll('.check-detail');

const closePopUpFn = function (e) {
  const elementsAreActive = document.querySelectorAll('.active');
  elementsAreActive.forEach(el => el.classList.remove('active'));
};

const showDetails = function () {
  popupCheckDetails.classList.add('active');
  popupBackground.classList.add('active');
};

for (let i = 0; i < closePopUps.length; i++) {
  closePopUps[i].addEventListener('click', closePopUpFn);
}

for (let i = 0; i < btnsCheckDetails.length; i++) {
  btnsCheckDetails[i].addEventListener('click', showDetails);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && popupBackground.classList.contains('active')) {
    closePopUpFn();
  }
});

popupBackground.addEventListener('click', closePopUpFn);
