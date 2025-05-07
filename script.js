// მენიუს კატეგორიები დასამატებელი html სტვის
const allCategories = [
  "პოლიტიკა",
  "საზოგადოება",
  "Covid-19",
  "სამართალი",
  "ბიზნესი & ეკონომიკა",
  "კრიმინალი",
  "შემთხვევა",
  "მსოფლიო",
  "სპორტი",
  "რელიგია",
  "ხელოვნება",
];

// ეკრანის ზომის დამახსოვრებისთვის
let isCompact = null;

// ეკრანის ზომის მიხედვით დაამატებს ან დამალავს ელემენტებს
function updateMenu() {
  const menu = document.getElementById("menu"); // ვწვდები html ში მენიუს
  const windowWidth = window.innerWidth; // ვწვდები ფანჯრის სიგანეს
  const compactNow = windowWidth <= 1240;

  //თუ ეკრანის ზომა იგივეა არ შეიცვლება
  if (compactNow === isCompact) return;
  isCompact = compactNow;

  menu.innerHTML = "";

  // თუ ეკრანი პატარაა (1240px ან ნაკლები)
  if (compactNow) {
    // ახალი სია პატარა ეკრანისთვის
    const visibleItems = [
      "პოლიტიკა",
      "საზოგადოება",
      "Covid-19",
      "სამართალი",
      "ბიზნესი & ეკონომიკა",
      "კრიმინალი",
      "შემთხვევა",
      "მსოფლიო",
    ];

    // თითო ელემენტს ვამატებთ მენიუში
    visibleItems.forEach(function (item) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#">${item}</a>`;
      menu.appendChild(listItem);
    });

    // ვქმნით "მეტი" dropdown ელემენტს
    const moreListItem = document.createElement("li"); //ვწვდები html li
    moreListItem.classList.add("more-dropdown");
    moreListItem.innerHTML = `
      <a href="#" class="more-toggle">
        მეტი <img src="./icons/arrow-down.svg" alt="arrow" />
      </a>
      <ul class="dropdown-list">
        <li><a href="#">სპორტი</a></li>
        <li><a href="#">რელიგია</a></li>
        <li><a href="#">ხელოვნება</a></li>
      </ul>
    `;
    menu.appendChild(moreListItem);
  } else {
    // თუ ეკრანი დიდია (1240px-ზე მეტი), ყველა კატეგორიას ვაჩვენებთ ერთ რიგში
    allCategories.forEach(function (item) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#">${item}</a>`;
      menu.appendChild(listItem);
    });
  }
}

// ფუნქცია, რომელიც ავსებს ბურგერ მენიუს (მხოლოდ 1024px-ზე და ნაკლებზე)
function populateBurgerMenu() {
  const burgerList = document.querySelector(".burger-menu-list");

  // თუ არ არსებობს .burger-menu-list ელემენტი, ფუნქცია არაფერს აკეთებს
  if (!burgerList) return;

  burgerList.innerHTML = "";

  // თუ ეკრანი პატარაა (1024px ან ნაკლები), ვამატებთ ყველა კატეგორიას ბურგერში
  if (window.innerWidth <= 1024) {
    allCategories.forEach(function (item) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#">${item}</a>`;
      burgerList.appendChild(listItem);
    });
  }
}

// ვწვდები ბურგერის მენიუს (რესფონსივზე)
const burgerIcon = document.querySelector(".burger-icon");
const burgerMenu = document.querySelector(".burger-menu");

burgerIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("active"); // toggle ნიშნავს, რომ თუ კლასია — შლის, თუ არაა — ამატებს
});

// ფუნქცია, რომელიც ორივე მენიუს (ზედა და ბურგერის) განაახლებს
function handleResizeAndLoad() {
  updateMenu(); // ანაახლებს მენიუს
  populateBurgerMenu(); // ამატებს ელემენტებს ბურგერის მენიუში
}

// როცა გვერდი ჩაიტვირთება
window.addEventListener("DOMContentLoaded", handleResizeAndLoad);

// როცა ფანჯრის ზომა იცვლება
window.addEventListener("resize", handleResizeAndLoad);


//სლაიდერი

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
  } else if (width >= 1025) {
    swiperButtons.style.bottom = "32px";
    swiperButtons.style.top = "";
    swiperButtons.style.left = `calc(24 / 1128 * 100% + 24px)`;
    swiperButtons.style.transform = "translateX(0%)";
    return;
  } else if (width > 360) {
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
