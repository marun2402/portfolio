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


  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementTop < viewportBottom;
  };

  window.onload = function () {
    //load svg in html inline
    $('#slider-container').load('img/slider/slider_animated.svg').removeClass('dn').addClass('start');
    var serviceContainer = false;
    $(window).bind('scroll', function (e) {
      if ($('#service-container').isInViewport() && !serviceContainer) {
        if ($(window).width() > 1920) {
          $('#service-container').load('img/service/bg_animated.svg').removeClass('dn').addClass('start');
        } else {
          $('#service-container').load('img/service/bg.svg').removeClass('dn');
        }

        serviceContainer = true;
      }
    }); //slick - rs-slider

    if ($('.rs-slider__slider').length > 0) {
      $('.rs-slider__slider').slick({
        infinite: true,
        slidesToShow: 1,
        speed: 1000,
        arrows: false,
        dots: false,
        autoplay: false,
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        mobileFirst: true,
        responsive: [{
          breakpoint: 0,
          settings: {
            arrows: false
          }
        }, {
          breakpoint: 991,
          settings: {
            arrows: true
          }
        }]
      });
    } //slick - rs-product


    if ($('.product-slider').length > 0) {
      $('.product-slider').slick({
        infinite: true,
        slidesToShow: 2,
        speed: 800,
        dots: true,
        arrows: false,
        autoplay: false,
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        mobileFirst: true,
        responsive: [{
          breakpoint: 0,
          settings: {
            slidesToShow: 1
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    } // slick on resize


    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        destroySlick('.catatog-slider');
        destroySlick('.service-slider');
        destroySlick('.choose-slider');
        destroySlick('.news-slider');
      } else {
        addSlick('.catatog-slider');
        addSlick('.service-slider');
        addSlick('.choose-slider');
        addSlick('.news-slider');
      }
    });
    addSlick('.catatog-slider');
    addSlick('.service-slider');
    addSlick('.choose-slider');
    addSlick('.news-slider');

    function addSlick(name) {
      if ($(name).length > 0) {
        $(name).slick({
          infinite: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
          speed: 800,
          dots: false,
          arrows: false,
          autoplay: false,
          mobileFirst: true,
          responsive: [{
            breakpoint: 767,
            settings: 'unslick'
          }]
        });
      }
    }

    function destroySlick(name) {
      $(name).slick('unslick');
    } // forms validate


    if ($('#footer-form').length > 0) {
      $('#footer-form').validate({
        submitHandler: function submitHandler(form) {
          form.submit();
        },
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: {
            required: true,
            minlength: 10
          }
        },
        messages: {
          name: {
            required: 'Введите свое имя',
            minlength: 'Длина должна быть больше 2-х символов'
          },
          phone: {
            required: 'Введите свой телефон',
            minlength: 'Введите корректный телефон'
          }
        }
      });
    } //click event handling


    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener('click', documentActions);

    function documentActions(e) {
      var targetElement = e.target; //open-close dropdown menu on touch-screen

      if (window.innerWidth > 991 && isMobile) {
        if (targetElement.closest('.menu__dropdown-arrow')) {
          targetElement.closest('.menu__dropdown').classList.toggle('hover');
        }

        if (!targetElement.closest('.menu__list')) {
          document.querySelectorAll('.menu__dropdown.hover').forEach(function (elem, index) {
            elem.classList.remove('hover');
          });
        }
      } //open-close menu burger


      if (window.innerWidth < 992) {
        if (targetElement.closest('.rs-menu-form__burger')) {
          targetElement.closest('.rs-menu-form__burger').classList.toggle('active');
          document.body.classList.toggle('_lock');
          document.querySelector('.rs-menu-form__menu').classList.toggle('active');
        }
      } //open-close search box


      document.querySelector('.header-search');
      var input = document.querySelector('.header-search__input');

      if (targetElement.closest('.rs-top-header__search-open')) {
        if (document.body.classList.contains('search-is-open')) {
          document.body.classList.remove('search-is-open');
        } else {
          document.body.classList.add('search-is-open');
          input.focus();
        }
      }

      if (document.body.classList.contains('search-is-open')) {
        if (!targetElement.closest('.rs-top-header')) {
          document.body.classList.remove('search-is-open');
        }
      }
    }

    $('.service-item').on('mouseenter', function (e) {
      var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
      $(this).find('span').css({
        top: relY,
        left: relX
      });
    }).on('mouseout', function (e) {
      var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
      $(this).find('span').css({
        top: relY,
        left: relX
      });
    }).on('click', function (e) {
      var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
      $(this).find('span').css({
        top: relY,
        left: relX
      });
    });
  }; //.window-onload

});