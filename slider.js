document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        sliderCount(this);
        positionSwiperButtons();
      },
      slideChange: function () {
        sliderCount(this);
        positionSwiperButtons();
      },
    },
  });
});
function sliderCount(swiper) {
  let currentIndex = swiper.realIndex + 1;
  let numberOfSlides = swiper.slides.length;
  document.querySelector(
    ".slider-count"
  ).textContent = `${currentIndex}/${numberOfSlides}`;
}

function positionSwiperButtons() {
  const swiperButtons = document.querySelector(".swiper-buttons");
  const activeImage = document.querySelector(
    ".swiper-slide-active .swiper-image-container img"
  );

  if (!swiperButtons || !activeImage) return;
  const width = window.innerWidth;
  //Check if the image is loaded
  if (!activeImage.complete) {
    activeImage.onload = () => positionSwiperButtons();
    return;
  }
  if (width >= 1240) {
    swiperButtons.style.bottom = "53px";
    swiperButtons.style.top = "";
    swiperButtons.style.left = `calc(24 / 1312 * 100% + 24px)`;
    swiperButtons.style.transform = "translateX(0%)";
    return;
  }
 
  else if (width >= 1025) {
    swiperButtons.style.bottom = "32px";
    swiperButtons.style.top = "";
    swiperButtons.style.left = `calc(24 / 1128 * 100% + 24px)`;
    swiperButtons.style.transform = "translateX(0%)";
    return;
  }
  else if (width > 360) {
    swiperButtons.style.top = "24px";
    swiperButtons.style.bottom = "";
    swiperButtons.style.left = `calc(24 / 926 * 100%)`;
    swiperButtons.style.transform = "translateX(0%)";
    return;
  }

  const imageHeight = activeImage.offsetHeight;
  const buttonHeight = swiperButtons.offsetHeight;
  const top = (imageHeight - buttonHeight) / 2;

  swiperButtons.style.top = `${top}px`;
  swiperButtons.style.bottom = "";
  swiperButtons.style.left = "50%";
  swiperButtons.style.transform = "translateX(-50%)";

  console.log(`Image height: ${imageHeight}, Button height: ${buttonHeight}`);
}

window.addEventListener("load", positionSwiperButtons);
window.addEventListener("resize", positionSwiperButtons);
