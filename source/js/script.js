const card = document.querySelectorAll(".card-anim");
const enterElement = document.querySelectorAll(".before-animated-entree");

const burgerBtn = document.querySelector(".header__navugation--burger-btn");

const tabsBtn = document.querySelectorAll(".comparison__tab-title");

const tabs =
  window.innerWidth <= 768
    ? document.querySelectorAll(".comparison__tab-mobile")
    : document.querySelectorAll(".comparison__tab");

const showTabBtn = document.querySelector(".comparison__show-btn-mobile");
const spoilerId = document.querySelectorAll("[data-spoiler-id]");

// <================================================>
for (let item of card) {
  item.addEventListener("mousemove", function (e) {
    if (e.target != this) e.stopImmediatePropagation();
    let element = this;
    let x = e.offsetX - element.offsetWidth / 2;
    let y = e.offsetY - element.offsetHeight / 2;

    element.style.transform = `rotateX(${Math.ceil(
      y / 5
    )}deg) rotateY(${Math.ceil(x / 5)}deg)`;
  });
  item.addEventListener("mouseleave", function (e) {
    this.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
}

// работа с эффектом всплытия
let checkDistance = Math.ceil(window.innerHeight / 1.2);

window.addEventListener("scroll", () => {
  let yScroll = window.pageYOffset;

  enterElement.forEach((e) => {
    if (
      e.getBoundingClientRect().top + yScroll <= yScroll + checkDistance &&
      e.getBoundingClientRect().height +
        e.getBoundingClientRect().top +
        yScroll >=
        yScroll &&
      !e.classList.contains("animated-in")
    )
      e.classList.add("animated-in");
  });
});

burgerBtn.addEventListener("click", function () {
  this.classList.toggle("header__navugation--burger-btn__active");
  const menu = document.querySelector(".navigation-list--burger-menu");
  menu.classList.toggle("navigation-list--burger-menu__active");
});

// lazy
const lazy = new LazySlide({
  elements: ".testimonial__slide-card",
  DOMEvent: "mouseenter",
  currentSlide: 1,
  tabletWatch: true,
});
// tabs
for (let i of tabsBtn) {
  i.addEventListener("click", (e) => {
    let tabId = e.target.dataset.tabId;
    tabsBtn.forEach((e) => {
      e.classList.remove("comparison__tab-title_active");
    });

    e.target.classList.add("comparison__tab-title_active");

    tabs.forEach((e) => {
      e.classList.remove("comparison__tab_active");
    });
    tabs.forEach((e) => {
      if (e.attributes.id.nodeValue == tabId) {
        e.classList.add("comparison__tab_active");
      }
    });
  });
}
if (window.innerWidth <= 768) {
  tabsBtn[0].click();
}
// tabs btn
showTabBtn.addEventListener("click", () => {
  const tabsNavContainer = document.querySelector(
    ".comparison__tabs-navigation"
  );
  tabsNavContainer.classList.toggle("comparison__tabs-navigation_active");
  showTabBtn.classList.toggle("comparison__show-btn-mobile_active");
});
// spoiler
for (let i of spoilerId) {
  i.addEventListener("click", () => {
    showSpoiler(i);
  });
}
function showSpoiler(target) {
  target.classList.toggle("footer__spoiler-btn_active");
  const spoilerContent = document.querySelector("#" + target.dataset.spoilerId);
  spoilerContent.classList.toggle("footer__text-wrapper_active");
}
