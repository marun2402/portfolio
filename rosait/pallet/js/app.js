function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  }; // Dynamic Adapt v.1


  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    var _this2 = this;

    var _this = this; // массив объектов


    this.оbjects = [];
    this.daClassname = '_dynamic_adapt_'; // массив DOM-элементов

    this.nodes = document.querySelectorAll('[data-da]'); // наполнение оbjects объктами

    for (var i = 0; i < this.nodes.length; i++) {
      var node = this.nodes[i];
      var data = node.dataset.da.trim();
      var dataArray = data.split(',');
      var оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects); // массив уникальных медиа-запросов

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + '-width: ' + item.breakpoint + 'px),' + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }); // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске

    var _loop = function _loop(_i) {
      var media = _this2.mediaQueries[_i];
      var mediaSplit = String.prototype.split.call(media, ',');
      var matchMedia = window.matchMedia(mediaSplit[0]);
      var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

      var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });

      _this2.mediaHandler(matchMedia, оbjectsFilter);
    };

    for (var _i = 0; _i < this.mediaQueries.length; _i++) {
      _loop(_i);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (var i = 0; i < оbjects.length; i++) {
        var оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (var _i2 = 0; _i2 < оbjects.length; _i2++) {
        var _оbject = оbjects[_i2];

        if (_оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
        }
      }
    }
  }; // Функция перемещения


  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);

    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }

    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }

    destination.children[place].insertAdjacentElement('beforebegin', element);
  }; // Функция возврата


  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);

    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }; // Функция получения индекса внутри родителя


  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    var array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  }; // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max


  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === 'min') {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }

          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }

          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  var da = new DynamicAdapt('max');
  da.init();

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var wNumb_min = createCommonjsModule(function (module, exports) {
    !function (e) {
      module.exports = e();
    }(function () {
      var o = ["decimals", "thousand", "mark", "prefix", "suffix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];

      function w(e) {
        return e.split("").reverse().join("");
      }

      function h(e, t) {
        return e.substring(0, t.length) === t;
      }

      function f(e, t, n) {
        if ((e[t] || e[n]) && e[t] === e[n]) throw new Error(t);
      }

      function x(e) {
        return "number" == typeof e && isFinite(e);
      }

      function n(e, t, n, r, i, o, f, u, s, c, a, p) {
        var d,
            l,
            h,
            g = p,
            v = "",
            m = "";
        return o && (p = o(p)), !!x(p) && (!1 !== e && 0 === parseFloat(p.toFixed(e)) && (p = 0), p < 0 && (d = !0, p = Math.abs(p)), !1 !== e && (p = function (e, t) {
          return e = e.toString().split("e"), (+((e = (e = Math.round(+(e[0] + "e" + (e[1] ? +e[1] + t : t)))).toString().split("e"))[0] + "e" + (e[1] ? e[1] - t : -t))).toFixed(t);
        }(p, e)), -1 !== (p = p.toString()).indexOf(".") ? (h = (l = p.split("."))[0], n && (v = n + l[1])) : h = p, t && (h = w((h = w(h).match(/.{1,3}/g)).join(w(t)))), d && u && (m += u), r && (m += r), d && s && (m += s), m += h, m += v, i && (m += i), c && (m = c(m, g)), m);
      }

      function r(e, t, n, r, i, o, f, u, s, c, a, p) {
        var d,
            l = "";
        return a && (p = a(p)), !(!p || "string" != typeof p) && (u && h(p, u) && (p = p.replace(u, ""), d = !0), r && h(p, r) && (p = p.replace(r, "")), s && h(p, s) && (p = p.replace(s, ""), d = !0), i && function (e, t) {
          return e.slice(-1 * t.length) === t;
        }(p, i) && (p = p.slice(0, -1 * i.length)), t && (p = p.split(t).join("")), n && (p = p.replace(n, ".")), d && (l += "-"), "" !== (l = (l += p).replace(/[^0-9\.\-.]/g, "")) && (l = Number(l), f && (l = f(l)), !!x(l) && l));
      }

      function i(e, t, n) {
        var r,
            i = [];

        for (r = 0; r < o.length; r += 1) {
          i.push(e[o[r]]);
        }

        return i.push(n), t.apply("", i);
      }

      return function e(t) {
        if (!(this instanceof e)) return new e(t);
        "object" == _typeof(t) && (t = function (e) {
          var t,
              n,
              r,
              i = {};

          for (void 0 === e.suffix && (e.suffix = e.postfix), t = 0; t < o.length; t += 1) {
            if (void 0 === (r = e[n = o[t]])) "negative" !== n || i.negativeBefore ? "mark" === n && "." !== i.thousand ? i[n] = "." : i[n] = !1 : i[n] = "-";else if ("decimals" === n) {
              if (!(0 <= r && r < 8)) throw new Error(n);
              i[n] = r;
            } else if ("encoder" === n || "decoder" === n || "edit" === n || "undo" === n) {
              if ("function" != typeof r) throw new Error(n);
              i[n] = r;
            } else {
              if ("string" != typeof r) throw new Error(n);
              i[n] = r;
            }
          }

          return f(i, "mark", "thousand"), f(i, "prefix", "negative"), f(i, "prefix", "negativeBefore"), i;
        }(t), this.to = function (e) {
          return i(t, n, e);
        }, this.from = function (e) {
          return i(t, r, e);
        });
      };
    });
  });
  /**
   *  app.js
   */

  window.onload = function () {
    //load svg in html inline
    $('.btn-play').map(function (index, elem) {
      $(elem).load('../img/play_button.svg');
    }); // Swiper slider - main

    new Swiper('.main-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      effect: 'fade',
      speed: 500,
      loop: true,
      autoplay: {
        delay: 5000
      }
    }); // Swiper slider - product

    new Swiper('.product-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.2,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      centeredSlides: true,
      loopedSlides: 10,
      navigation: {
        nextEl: '.rs-product__arrow_next',
        prevEl: '.rs-product__arrow_prev'
      },
      pagination: {
        el: '.rs-product__pagination',
        type: 'progressbar'
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          centeredSlides: false
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false
        }
      }
    }); // Swiper slider - reviews

    new Swiper('.reviews-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.2,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      centeredSlides: true,
      loopedSlides: 10,
      navigation: {
        nextEl: '.rs-reviews__arrow_next',
        prevEl: '.rs-reviews__arrow_prev'
      },
      pagination: {
        el: '.rs-reviews__pagination',
        type: 'progressbar'
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          centeredSlides: false
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false
        }
      }
    }); // Swiper slider - news

    new Swiper('.news-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.2,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      centeredSlides: true,
      loopedSlides: 10,
      navigation: {
        nextEl: '.navigation__arrow-news-next',
        prevEl: '.navigation__arrow-news-prev'
      },
      pagination: {
        el: '.navigation__paging_news',
        type: 'progressbar'
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          centeredSlides: false
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false
        }
      }
    }); // Swiper slider - articles

    new Swiper('.articles-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.2,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      centeredSlides: true,
      loopedSlides: 10,
      navigation: {
        nextEl: '.navigation__arrow-articles-next',
        prevEl: '.navigation__arrow-articles-prev'
      },
      pagination: {
        el: '.navigation__paging_articles',
        type: 'progressbar'
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          centeredSlides: false
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false
        }
      }
    }); // Swiper slider - partners

    new Swiper('.partners-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 5000,
      loop: true,
      autoplay: {
        delay: 0
      },
      breakpoints: {
        450: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 5
        },
        1170: {
          slidesPerView: 6
        }
      },
      on: {
        init: function init() {
          var _this3 = this;

          this.el.addEventListener('mouseenter', function () {
            _this3.autoplay.stop();
          });
          this.el.addEventListener('mouseleave', function () {
            _this3.autoplay.start();
          });
        }
      }
    }); // slick on resize

    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        destroySlick('.category-slider');
        destroySlick('.advantage-slider');
        destroySlick('.howto-slider');
      } else {
        addSlick('.category-slider');
        addSlick('.advantage-slider');
        addSlick('.howto-slider');
      }
    });
    addSlick('.category-slider');
    addSlick('.advantage-slider');
    addSlick('.howto-slider');

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
    } // counter numbers


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

    if ($('.spincrement').length > 0) {
      countup('spincrement', {
        from: 1,
        duration: 3000
      });
    } // forms validate


    if ($('#form-cb').length > 0) {
      $('#form-cb').validate({
        submitHandler: function submitHandler(form) {
          form.submit();
        },
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true,
            minlength: 10
          },
          message: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Введите свое имя',
            minlength: 'Длина должна быть больше 2-х символов'
          },
          email: {
            required: 'Введите свой email',
            email: 'Введите корректный email'
          },
          phone: {
            required: 'Введите свой телефон',
            minlength: 'Введите корректный телефон'
          },
          message: {
            required: 'Введите сообщение'
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

      if (targetElement.closest('.rs-menu-form__search-open')) {
        if (document.body.classList.contains('search-is-open')) {
          document.body.classList.remove('search-is-open');
        } else {
          document.body.classList.add('search-is-open');
          input.focus();
        }
      }

      if (document.body.classList.contains('search-is-open')) {
        if (!targetElement.closest('.rs-menu-form')) {
          document.body.classList.remove('search-is-open');
        }
      }
    } // rang slider


    var RangeSlider = /*#__PURE__*/function () {
      function RangeSlider($component) {
        _classCallCheck(this, RangeSlider);

        this.$component = $component;
        this.$slider = this.$component.querySelector('.range-slider__target');
        this.inputs = [this.$component.querySelector('.range-slider__value-start'), this.$component.querySelector('.range-slider__value-end')];
        this.render();
      }

      _createClass(RangeSlider, [{
        key: "render",
        value: function render() {
          var _this4 = this;

          noUiSlider.create(this.$slider, {
            start: [0, 2.5],
            connect: true,
            format: wNumb_min({
              decimals: 1,
              thousand: ' '
            }),
            range: {
              min: 0,
              max: 2.5
            }
          });
          this.$slider.noUiSlider.on('update', function (values, handle) {
            _this4.inputs[handle].value = values[handle];
          });
        }
      }]);

      return RangeSlider;
    }();

    var rangeSliders = document.querySelectorAll('.range-slider');
    rangeSliders.forEach(function (node, index) {
      new RangeSlider(node);
    });
  }; //.window-onload

});