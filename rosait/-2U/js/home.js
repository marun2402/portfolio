$(document).ready(function () {
  //slick - rs-slider
  $('.rs-slider__slider').on('init afterChange', function () {
    let activeSlide = $('.rs-slider .slick-active');
    let prevSlide = activeSlide.prev();
    let nextSlide = activeSlide.next();
    if (!prevSlide.length) {
      prevSlide = $('.rs-slider .rs-slider__item').last();
    }
    if (!nextSlide.length) {
      nextSlide = $('.rs-slider .rs-slider__item').first();
    }
    let prevImg = prevSlide.find('.rs-slider__image_main source').attr('srcset');
    let nextImg = nextSlide.find('.rs-slider__image_main source').attr('srcset');
    $('.rs-slider .rs-slider__arrow_prev span').css('background-image', `url(${prevImg})`);
    $('.rs-slider .rs-slider__arrow_next span').css('background-image', `url(${nextImg})`);
    activeSlide.find('.rs-slider__item-inner').addClass('active');
  });

  $('.rs-slider__slider').on('beforeChange', function () {
    let activeSlide = $('.rs-slider .slick-active');
    activeSlide.find('.rs-slider__item-inner').removeClass('active');
  });
  if ($('.rs-slider__slider').length > 0) {
    $('.rs-slider__slider').slick({
      infinite: true,
      slidesToShow: 1,
      fade: true,
      speed: 1000,
      dots: false,
      arrows: false,
      autoplay: false,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      arrows: true,
      prevArrow: '.rs-slider__arrow_prev',
      nextArrow: '.rs-slider__arrow_next',
    });
  }

  //slick - rs-hotevent-slider
  function setProgress(index, name) {
    const calc = ((index + 1) / $(`.${name}-slider`).slick('getSlick').slideCount) * 100;
    $(`.${name}__progress`).css('background-size', `${calc}% 100%`);
  }
  $('.rs-hotevent-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgress(nextSlide, 'rs-hotevent');
  });
  if ($('.rs-hotevent-slider').length > 0) {
    $('.rs-hotevent-slider').slick({
      infinite: true,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      arrows: true,
      prevArrow: '.rs-hotevent__arrow_prev',
      nextArrow: '.rs-hotevent__arrow_next',
      adaptiveHeight: true,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }
  setProgress(0, 'rs-hotevent');

  //slick - rs-reviews-slider
  $('.rs-reviews-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgress(nextSlide, 'rs-reviews');
  });
  if ($('.rs-reviews-slider').length > 0) {
    $('.rs-reviews-slider').slick({
      infinite: true,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      arrows: true,
      prevArrow: '.rs-reviews__arrow_prev',
      nextArrow: '.rs-reviews__arrow_next',
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }
  setProgress(0, 'rs-reviews');

  //slick - reasons-slider
  $('.reasons-slider').on('wheel', function (e) {
    e.preventDefault();
    if (e.originalEvent.deltaY >= 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  });
  $('.reasons-slider').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2.5,
    arrows: false,
    infinite: false,
  });

  // counter numbers
  function countup(className, options) {
    var countBlockTop = $('.' + className).offset().top;
    var windowHeight = window.innerHeight;
    var show = true;
    $(window).scroll(function () {
      if (show && countBlockTop < $(window).scrollTop() + windowHeight - windowHeight / 4) {
        show = false;
        $('.' + className).spincrement(options);
      }
    });
  }
  countup('spincrement', {
    from: 1,
    duration: 3000,
  });
  countup('spincrement-plus', {
    from: 1,
    duration: 1000,
    complete: function (e) {
      e.text(e.text() + '+');
    },
  });
  countup('spincrement-plus-dec', {
    from: 1,
    duration: 1000,
    decimalPlaces: 3,
    decimalPoint: ' ',
    complete: function (e) {
      e.text(e.text() + '+');
    },
  });

  // forms validate
  if ($('#footer-form').length > 0) {
    $('#footer-form').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        mail: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
          minlength: 10,
        },
        message: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        mail: {
          required: 'Введите свой email',
          email: 'Введите корректный email',
        },
        phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
        message: {
          required: 'Введите сообщение',
        },
      },
    });
  }

  if ($('#callback-form').length > 0) {
    $('#callback-form').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        company: {
          required: true,
        },
        phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        company: {
          required: 'Введите свой email',
        },
        phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }
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
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
  offset: 220,
  delay: 0,
  duration: 500,
  easing: 'ease',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
});
