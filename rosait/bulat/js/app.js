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
    // Swiper slider - catalogs
    new Swiper('.rs-catalogs .item__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      speed: 800,
      loop: true,
      navigation: {
        nextEl: '.rs-catalogs .item__slider-arrow_next',
        prevEl: '.rs-catalogs .item__slider-arrow_prev'
      },
      pagination: {
        el: '.rs-catalogs .item__slider-pagination',
        type: 'fraction',
        formatFractionCurrent: addZero,
        formatFractionTotal: addZero
      }
    });

    function addZero(num) {
      return num > 9 ? num : '0' + num;
    } //events handling


    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener('click', documentActions);
    document.addEventListener('scroll', documentScroll);

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
        if (targetElement.closest('.menu-burger')) {
          targetElement.closest('.menu-burger').classList.toggle('active');
          document.body.classList.toggle('_lock');
          document.querySelector('.menu').classList.toggle('active');
          document.querySelector('.menu-overlay').classList.toggle('active');
        }

        if (targetElement.closest('.menu-overlay')) {
          document.querySelector('.menu-burger').classList.remove('active');
          document.body.classList.remove('_lock');
          document.querySelector('.menu').classList.remove('active');
          document.querySelector('.menu-overlay').classList.remove('active');
        }
      }
    }

    var header = document.querySelector('header');
    var menu = document.querySelector('.rs-menu-form');
    var offset = menu.offsetTop;

    function documentScroll(e) {
      //sticky header
      if (window.pageYOffset >= offset) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }; //.window-onload

});