'use strict';

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navLogo = document.querySelector('.nav__logo');
const logo = document.querySelector('.header__logo');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.3));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    logo.classList.add('header__logo--sticky');
  } else {
    nav.classList.remove('sticky');
    logo.classList.remove('header__logo--sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight - 60}px`,
});

headerObserver.observe(header);
