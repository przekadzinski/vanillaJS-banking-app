document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id === 'account.html') {
      window.location.href = 'account.html';
    }
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelector('.footer__btn').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.dataset.scroll;
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});
