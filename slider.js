const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const loadingBar = document.querySelector('.slide__bar');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  const timer = 4500;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  loadingBar.style.animationDuration = `${timer / 1000}s`;

  setInterval(() => {
    currentSlide++;
    goToSlide(currentSlide);
    if (currentSlide === maxSlide) currentSlide = -1;
  }, timer);

  goToSlide(0);
};

sliders();
