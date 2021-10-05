function showLanguages() {
  const language = document.getElementsByClassName("lang")[0];
  const languages = document.getElementsByClassName("lang-list")[0];

  const mobileLanguage = document.getElementsByClassName("mobile-lang")[0];
  const mobileLanguages =
    document.getElementsByClassName("mobile-lang-list")[0];

  mobileLanguage.addEventListener("click", () => {
    return mobileLanguages.style.display === "none"
      ? (mobileLanguages.style.display = "flex")
      : (mobileLanguages.style.display = "none");
  });

  language.addEventListener("click", () => {
    return languages.style.display === "none"
      ? (languages.style.display = "flex")
      : (languages.style.display = "none");
  });
}

function showMobileMenu() {
  const toggle = document.getElementsByClassName("lines")[0];
  const menu = document.getElementsByClassName("menu-options-mobile")[0];

  toggle.addEventListener("click", () =>
    ![...menu.classList].includes("show") ? open() : close()
  );

  function open() {
    const menu = document.getElementsByClassName("menu-options-mobile")[0];
    const lines = document.getElementsByClassName("line");

    lines[0].style.transform = "translateY(9px)" + " " + "rotate(45deg)";
    lines[1].style.transform = "translateY(-9px)" + " " + "rotate(-45deg)";
    lines[2].style.display = "none";

    menu.classList.add("show");
  }

  function close() {
    const menu = document.getElementsByClassName("menu-options-mobile")[0];
    const lines = document.getElementsByClassName("line");

    lines[0].style.transform = "none";
    lines[1].style.transform = "none";
    setTimeout(() => (lines[2].style.display = "block"), 300);

    menu.classList.remove("show");
  }
}

function scrollArrow() {
  const scrollArrow = document.getElementsByClassName("main-scroll")[0];

  scrollArrow.addEventListener("click", () => {
    const pageMain = document.getElementsByClassName("main-page")[0];
    const coords = pageMain.getBoundingClientRect();
    const coordY = coords.height;

    window.scroll({ top: coordY, left: 0, behavior: "smooth" });
  });
}

function scrollers() {
  const buttonsForward = [
    document.querySelector(".scroll-main-forward"),
    document.querySelector(".scroll-about-forward"),
    document.querySelector(".scroll-features-forward"),
    document.querySelector(".scroll-reqs-forward"),
    document.querySelector(".scroll-quotes-forward"),
  ];

  const buttonsBackward = [
    document.querySelector(".scroll-main-backward"),
    document.querySelector(".scroll-about-backward"),
    document.querySelector(".scroll-features-backward"),
    document.querySelector(".scroll-reqs-backward"),
    document.querySelector(".scroll-quotes-backward"),
  ];

  const buttonsMobile = [
    document.querySelector(".scroll-main-mobile"),
    document.querySelector(".scroll-about-mobile"),
    document.querySelector(".scroll-features-mobile"),
    document.querySelector(".scroll-reqs-mobile"),
    document.querySelector(".scroll-quotes-mobile"),
  ];

  buttonsForward.forEach((button, index) => {
    button.addEventListener("click", () => {
      scroll(index)
    });
  });

  buttonsBackward.forEach((button, index) => {
    button.addEventListener("click", () => {
      scroll(index)
    });
  });

  buttonsMobile.forEach((button, index) => {
    button.addEventListener("click", () => {
      scroll(index)
    });
  })

  function getHeight(el) {
    const coords = el.getBoundingClientRect();
    console.log()
    return coords.height;
  }

  function scroll(buttonIndex) {
    const pages = [
      document.querySelector(".main-page"),
      document.querySelector(".about-page"),
      document.querySelector(".features-page"),
      document.querySelector(".requirements-page"),
      document.querySelector(".quotes-page"),
    ];

    let point = 0;

    pages.forEach((page, pageIndex) => {
      if (pageIndex >= buttonIndex) {
        return;
      }

      point += getHeight(page);
    });

    window.scroll({ top: point, left: 0, behavior: "smooth" });
  }
}

function collapsible() {
  const collapsibles = [...document.querySelectorAll(".collapsible")];

  collapsibles.forEach((item, index) => {
    const text = document.querySelector(".collapsible-text" + index);

    item.addEventListener("click", () => {
      if (![...text.classList].includes("show")) {
        text.classList.add("show");
        item.classList.add("active");
      } else {
        text.classList.remove("show");
        item.classList.remove("active");
      }
    });
  });
}

function init() {
  showLanguages();
  showMobileMenu();
  scrollArrow();
  collapsible();
  scrollers();
}

init();

class Gallery {
  constructor() {
    this.offset = 45;
    this.position = 0;
    this.current = 0;
    this.images = document.getElementsByClassName("image-set")[0].children;
    this.max = this.images.length - 1;
  }

  scroll() {
    const image = this.images[this.current];

    image.style.left = this.position + this.offset + "px";
    image.style.zIndex = -1;
    image.opacity = 0;

    this.current === this.max ? (this.current = 0) : this.current++;

    const nextDiv = this.images[this.current];
    const nextImg = nextDiv.children[0];
    nextImg.style.width = "auto";
    nextImg.style.height = "100%";
    nextDiv.style.left = this.position + "px";
    nextDiv.style.zIndex = 3;

    const secondDiv = this.images[this.calculate(this.current, 1, this.max)];
    const secondImg = secondDiv.children[0];
    secondImg.style.width = "auto";
    secondImg.style.height = "90%";
    secondDiv.style.left = this.position + this.offset + "px";
    secondDiv.style.zIndex = 2;

    const thirdDiv = this.images[this.calculate(this.current, 2, this.max)];
    const thirdImg = thirdDiv.children[0];
    thirdImg.style.width = "auto";
    thirdImg.style.height = "80%";
    thirdDiv.style.left = this.position + this.offset * 2 + "px";
    thirdDiv.style.zIndex = 1;
  }

  calculate(curr, n, max) {
    let result;
    if (curr + n > max) {
      result = curr + n - 1 - max;
      return result;
    }

    if (curr + n <= max) {
      result = curr + n;
      return result;
    }
  }
}

const gallery = new Gallery();

const slider = document.getElementsByClassName("switch")[0];

slider.addEventListener("click", () => gallery.scroll());
