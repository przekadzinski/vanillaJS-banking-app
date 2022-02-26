'use strict';

const currency = [...document.querySelectorAll('.exchange td')];
const showExchangeRatioBtn = document.querySelector('.footer__showExchange');
const popupExchange = document.querySelector('.popup-exchange');

const getRatio = function (e) {
  popupBackground.classList.add('active');
  popupExchange.classList.add('active');
  const url = 'http://api.nbp.pl/api/exchangerates/tables/a/';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let ratio = [
        data[0].rates[1].mid,
        data[0].rates[7].mid,
        data[0].rates[9].mid,
        data[0].rates[10].mid,
        data[0].rates[12].mid,
      ];

      currency.forEach((el, i) => {
        el.textContent = ratio[i].toFixed(2);
      });
    })
    .catch(err => console.log(err));
};
showExchangeRatioBtn.addEventListener('click', getRatio);
