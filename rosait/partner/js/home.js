$(document).ready(function () {
  //slick - rs-slider
  if ($('.rs-slider__slider').length > 0) {
    $('.rs-slider__slider').slick({
      infinite: true,
      slidesToShow: 1,
      speed: 1000,
      dots: false,
      arrows: false,
      autoplay: true,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
    });
  }

  // slick on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 479) {
      destroySlick('.rs-automatization__items');
    } else {
      addSlick('.rs-automatization__items');
    }
  });
  addSlick('.rs-automatization__items');
  function addSlick(name) {
    if ($(name).length > 0) {
      $(name).slick({
        infinite: true,
        slidesToShow: 1,
        speed: 800,
        dots: false,
        arrows: false,
        autoplay: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 767,
            settings: 'unslick',
          },
        ],
      });
    }
  }
  function destroySlick(name) {
    $(name).slick('unslick');
  }

  // on scroll events
  var scrollPrev = 0;
  var header = $('header');
  $(window).bind('scroll', function (e) {
    //add sticky for header on scroll
    var scrolled = $(window).scrollTop();
    if (scrolled > 47) {
      header.addClass('sticky');
    } else {
      header.removeClass('sticky');
    }
    if (scrolled > 67 && scrolled > scrollPrev) {
      header.addClass('out');
    } else {
      header.removeClass('out');
    }
    scrollPrev = scrolled;
  });
}); //.document-ready

//vanila JS
window.onload = function () {
  //click event handling
  document.addEventListener('click', documentActions);
  function documentActions(e) {
    const targetElement = e.target;
    //open-close menu burger
    if (window.innerWidth < 992) {
      if (targetElement.closest('.rs-menu-form__burger')) {
        targetElement.closest('.rs-menu-form__burger').classList.toggle('active');
        document.body.classList.toggle('_lock');
        document.querySelector('.rs-menu-form__menu').classList.toggle('active');
        document.querySelector('.rs-menu-form').classList.toggle('active');
      }
    }
  }
}; //.window-onload

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
