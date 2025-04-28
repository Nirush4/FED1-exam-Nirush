const siderBar = document.querySelectorAll('.img-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let index = 0;
const interval = 5000;

const hideAll = () => {
  siderBar.forEach((slide) => {
    slide.style.display = 'none';
  });
};

const nextSlide = () => {
  hideAll();
  siderBar[index].style.display = 'block';
  index++;

  if (index === siderBar.length) {
    index = 0;
  }
};

const prevSlide = () => {
  hideAll();
  siderBar[index].style.display = 'block';
  index--;

  if (index < 0) {
    index = siderBar.length - 1;
  }
};

nextSlide();

const changeSlide = setInterval(nextSlide, interval);

prevButton.addEventListener('click', () => {
  clearInterval(changeSlide);
  prevSlide();
});

nextButton.addEventListener('click', () => {
  clearInterval(changeSlide);
  nextSlide();
});
