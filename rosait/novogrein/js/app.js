(function (factory) {
  typeof define === 'function' && define.amd ? define('app', factory) : factory();
})(function () {
  'use strict'; //spollers plugin

  var spollersArray = document.querySelectorAll('[data-spollers]');

  if (spollersArray.length > 0) {
    var initSpollers = function initSpollers(spollersArray) {
      var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(function (spollersBlock) {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener('click', setSpollerAction);
        } else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener('click', setSpollerAction);
        }
      });
    };

    var initSpollerBody = function initSpollerBody(spollersBlock) {
      var hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');

      if (spollerTitles.length > 0) {
        spollerTitles.forEach(function (spollerTitle) {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');

            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    };

    var setSpollerAction = function setSpollerAction(e) {
      var el = e.target;

      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        var spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        var spollersBlock = spollerTitle.closest('[data-spollers]');
        var oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle('_active');

          _slideToggle(spollerTitle.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    };

    var hideSpollersBody = function hideSpollersBody(spollersBlock) {
      var spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');

      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');

        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    };

    var spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(',')[0];
    });

    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }

    var spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(',')[0];
    });

    if (spollersMedia.length > 0) {
      var breakpointsArray = [];
      spollersMedia.forEach(function (item) {
        var params = item.dataset.spollers;
        var breakpoint = {};
        var paramsArray = params.split(',');
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      }); // Получаем уникальные брейкпоинты

      var mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // Работаем с каждым брейкпоинтом

      mediaQueries.forEach(function (breakpoint) {
        var paramsArray = breakpoint.split(',');
        var mediaBreakpoint = paramsArray[1];
        var mediaType = paramsArray[2];
        var matchMedia = window.matchMedia(paramsArray[0]); // Объекты с нужными условиями

        var spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        }); // Событие

        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    }
  } //SlideToggle


  var _slideUp = function _slideUp(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(function () {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  var _slideDown = function _slideDown(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');

      if (target.hidden) {
        target.hidden = false;
      }

      var height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(function () {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  var _slideToggle = function _slideToggle(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
  /**
   *  app.js
   */


  window.onload = function () {
    //slick - main slider
    $(".main-slider").on("init afterChange", function (e, slick) {
      var activeSlide = $(".main-slider .slick-active");
      var prevSlide = activeSlide.prev().data("slide-num");
      var nextSlide = activeSlide.next().data("slide-num");
      activeSlide.addClass("isActive");

      if (!prevSlide) {
        prevSlide = $('.main-slider .main-slider__slide').last().data("slide-num");
      }

      if (!nextSlide) {
        nextSlide = $('.main-slider .main-slider__slide').first().data("slide-num");
      }

      slick.$prevArrow.text('0' + prevSlide);
      slick.$nextArrow.text('0' + nextSlide);      
    });
    $(".rs-slider__slider").on("beforeChange", function () {
      var activeSlide = $(".main-slider .slick-active");
      activeSlide.removeClass("isActive");
    });

    if ($(".main-slider").length > 0) {
      $(".main-slider").slick({
        infinite: true,
        slidesToShow: 1,
        speed: 100,
        arrows: true,
        dots: false,
        //autoplay: true,
        autoplaySpeed: 5000,
        lazyLoad: "ondemand",
        fade: true,
        cssEase: "linear"
      });
    } //slick - boat slider


    $(".bslider").on("init", function () {
      var activeSlide = $(".bslider .slick-active");
      activeSlide.prev();
      activeSlide.next();
      activeSlide.addClass("isActive");
    });
    $(".bslider").on("beforeChange", function (slider, _ref, current, next) {
      var count = _ref.slideCount;
      console.log(count, current, next);
      $(".bslider .bslider__slide"); //slides[next].addClass('isActive')
      //activeSlide.removeClass('isActive');

      $(".bslider__slide[data-slick-index=".concat(current, "]")).removeClass("isActive");
      $(".bslider__slide[data-slick-index=".concat(next, "]")).addClass("isActive");
    });

    if ($(".bslider").length > 0) {
      $(".bslider").slick({
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        dots: true,
        autoplay: false,
        lazyLoad: "ondemand" //cssEase: 'linear',

      });
    } // slick on resize


    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) {
        destroySlick(".adv-slider");
      } else {
        addSlick(".adv-slider");
      }
    });
    addSlick(".adv-slider");

    function addSlick(name) {
      if ($(name).length > 0) {
        $(name).slick({
          infinite: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px",
          speed: 800,
          dots: false,
          arrows: false,
          autoplay: false,
          mobileFirst: true,
          responsive: [{
            breakpoint: 767,
            settings: "unslick"
          }]
        });
      }
    }

    function destroySlick(name) {
      $(name).slick("unslick");
    } // counter numbers


    function countup(className, options) {
      var countBlockTop = $("." + className).offset().top;
      var windowHeight = window.innerHeight;
      var show = true;
      $(window).scroll(function () {
        if (show && countBlockTop < $(window).scrollTop() + windowHeight - windowHeight / 4) {
          show = false;
          $("." + className).spincrement(options);
        }
      });
    }

    countup("spincrement", {
      from: 1,
      duration: 3000
    }); //forms validate

    if ($("#form-cb").length > 0) {
      $("#form-cb").validate({
        submitHandler: function submitHandler(form) {
          form.submit();
        },
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          lastname: {
            required: true,
            minlength: 2
          },
          tel: {
            required: true,
            minlength: 10
          }
        },
        messages: {
          name: {
            required: "Введите свое имя",
            minlength: "Длина должна быть больше 2-х символов"
          },
          lastname: {
            required: "Введите свою фамилию",
            minlength: "Длина должна быть больше 2-х символов"
          },
          tel: {
            required: "Введите свой телефон",
            minlength: "Введите корректный телефон"
          }
        }
      });
    } //click event handling


    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener("click", documentActions);

    function documentActions(e) {
      var targetElement = e.target; //open-close dropdown menu on touch-screen

      if (window.innerWidth > 991 && isMobile) {
        if (targetElement.closest(".menu__dropdown-arrow")) {
          targetElement.closest(".menu__dropdown").classList.toggle("hover");
        }

        if (!targetElement.closest(".menu__list")) {
          document.querySelectorAll(".menu__dropdown.hover").forEach(function (elem, index) {
            elem.classList.remove("hover");
          });
        }
      } //open-close menu burger


      if (window.innerWidth < 992) {
        if (targetElement.closest(".rs-menu-form__burger")) {
          targetElement.closest(".rs-menu-form__burger").classList.toggle("active");
          document.body.classList.toggle("_lock");
          document.querySelector(".rs-menu-form__menu").classList.toggle("active");
        }
      } //open-close header search


      var form = document.querySelector(".header-search");
      var box = document.querySelector(".header-search__box");
      var input = document.querySelector(".header-search__input");
      var width = document.querySelector(".rs-menu-form__container").offsetWidth - 20;

      if (window.innerWidth < 991) {
        width = width - 30;
      }

      if (targetElement.closest(".header-search__button")) {
        if (form.classList.contains("open")) {
          form.classList.remove("open");
          box.style.width = null;
        } else {
          form.classList.add("open");
          box.style.width = "".concat(width, "px");
          input.focus();
        }
      }

      if (!targetElement.closest(".header-search")) {
        form.classList.remove("open");
        box.style.width = null;
      }
    }
  }; //.window-onload

});