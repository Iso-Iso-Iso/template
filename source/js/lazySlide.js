class LazySlide {
  constructor({
    elements = ".lazy-element",
    DOMEvent = "click",
    currentSlide = 0,
    tabletWatch = false,
  }) {
    this._elements = document.querySelectorAll(elements);
    this._currentSlide = currentSlide;
    this._DOMEvent = DOMEvent;
    this._tabletWatch = tabletWatch;
    // add event
    if (this._elements.length > 0) {
      for (let i = 0; i < this._elements.length; i++) {
        if (i == this._currentSlide)
          this._elements[i].classList.add("lazy-element-active");
        this._elements[i].addEventListener(this._DOMEvent, (e) => {
          this.selectSlide({
            target: this._elements[i],
            targetIndex: i,
            event: e,
          });
        });
      }
      if (this._tabletWatch && window.innerWidth <= 768) {
        window.addEventListener("scroll", (event) => {
          this.tabletWatcher({
            elements: this._elements,
            event,
          });
        });
      }
    }
  }
  selectSlide(data) {
    let { target, targetIndex: index, event } = data;
    for (let i of this._elements) {
      i.classList.remove("lazy-element-active");
    }
    target.classList.add("lazy-element-active");
  }
  tabletWatcher(data) {
    let { elements, event } = data;

    let y = window.pageYOffset;
    let height = window.innerHeight;
    let point = y + height / 2;

    elements.forEach((element, index) => {
      if (
        element.getBoundingClientRect().top + y <= point &&
        point <=
          element.getBoundingClientRect().top +
            y +
            element.getBoundingClientRect().height &&
        !element.classList.contains("lazy-element-active")
      ) {
        this.selectSlide({ target: element, targetIndex: index });
      }
    });
  }
}
