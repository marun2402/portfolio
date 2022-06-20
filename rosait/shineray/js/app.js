function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    var _this5 = this;

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
      var media = _this5.mediaQueries[_i];
      var mediaSplit = String.prototype.split.call(media, ',');
      var matchMedia = window.matchMedia(mediaSplit[0]);
      var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

      var оbjectsFilter = Array.prototype.filter.call(_this5.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });

      _this5.mediaHandler(matchMedia, оbjectsFilter);
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

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var isIn = elementBottom > viewportTop && elementTop < viewportBottom;

    if (isIn) {
      this.addClass('inViewport');
    } // else {
    //   this.removeClass('inViewport');
    // }


    return isIn;
  };
  /**
    stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
    @version v3.7.4
    @link https://github.com/dollarshaveclub/stickybits#readme
    @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
    @license MIT
  **/


  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /*
    STICKYBITS 💉
    --------
    > a lightweight alternative to `position: sticky` polyfills 🍬
    --------
    - each method is documented above it our view the readme
    - Stickybits does not manage polymorphic functionality (position like properties)
    * polymorphic functionality: (in the context of describing Stickybits)
      means making things like `position: sticky` be loosely supported with position fixed.
      It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
    --------
    defaults 🔌
    --------
    - version = `package.json` version
    - userAgent = viewer browser agent
    - target = DOM element selector
    - noStyles = boolean
    - offset = number
    - parentClass = 'string'
    - scrollEl = window || DOM element selector || DOM element
    - stickyClass = 'string'
    - stuckClass = 'string'
    - useStickyClasses = boolean
    - useFixed = boolean
    - useGetBoundingClientRect = boolean
    - verticalPosition = 'string'
    - applyStyle = function
    --------
    props🔌
    --------
    - p = props {object}
    --------
    instance note
    --------
    - stickybits parent methods return this
    - stickybits instance methods return an instance item
    --------
    nomenclature
    --------
    - target => el => e
    - props => o || p
    - instance => item => it
    --------
    methods
    --------
    - .definePosition = defines sticky or fixed
    - .addInstance = an array of objects for each Stickybits Target
    - .getClosestParent = gets the parent for non-window scroll
    - .getTopPosition = gets the element top pixel position from the viewport
    - .computeScrollOffsets = computes scroll position
    - .toggleClasses = older browser toggler
    - .manageState = manages sticky state
    - .removeInstance = removes an instance
    - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
  */


  var Stickybits = /*#__PURE__*/function () {
    function Stickybits(target, obj) {
      var _this = this;

      var o = typeof obj !== 'undefined' ? obj : {};
      this.version = '3.7.4';
      this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || 'js-stickybit-parent',
        scrollEl: typeof o.scrollEl === 'string' ? document.querySelector(o.scrollEl) : o.scrollEl || window,
        stickyClass: o.stickyClass || 'js-is-sticky',
        stuckClass: o.stuckClass || 'js-is-stuck',
        stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
        useStickyClasses: o.useStickyClasses || false,
        useFixed: o.useFixed || false,
        useGetBoundingClientRect: o.useGetBoundingClientRect || false,
        verticalPosition: o.verticalPosition || 'top',
        applyStyle: o.applyStyle || function (item, style) {
          return _this.applyStyle(item, style);
        }
        /*
        define positionVal after the setting of props, because definePosition looks at the props.useFixed
        ----
        -  uses a computed (`.definePosition()`)
        -  defined the position
        */

      };
      this.props.positionVal = this.definePosition() || 'fixed';
      this.instances = [];
      var _this$props = this.props,
          positionVal = _this$props.positionVal,
          verticalPosition = _this$props.verticalPosition,
          noStyles = _this$props.noStyles,
          stickyBitStickyOffset = _this$props.stickyBitStickyOffset;
      var verticalPositionStyle = verticalPosition === 'top' && !noStyles ? stickyBitStickyOffset + 'px' : '';
      var positionStyle = positionVal !== 'fixed' ? positionVal : '';
      this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in this.els)) this.els = [this.els];

      for (var i = 0; i < this.els.length; i++) {
        var _styles;

        var el = this.els[i];
        var instance = this.addInstance(el, this.props); // set vertical position

        this.props.applyStyle({
          styles: (_styles = {}, _styles[verticalPosition] = verticalPositionStyle, _styles.position = positionStyle, _styles),
          classes: {}
        }, instance);
        this.manageState(instance); // instances are an array of objects

        this.instances.push(instance);
      }
    }
    /*
    setStickyPosition ✔️
    --------
    —  most basic thing stickybits does
    => checks to see if position sticky is supported
    => defined the position to be used
    => stickybits works accordingly
    */


    var _proto = Stickybits.prototype;

    _proto.definePosition = function definePosition() {
      var stickyProp;

      if (this.props.useFixed) {
        stickyProp = 'fixed';
      } else {
        var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
        var test = document.head.style;

        for (var i = 0; i < prefix.length; i += 1) {
          test.position = prefix[i] + 'sticky';
        }

        stickyProp = test.position ? test.position : 'fixed';
        test.position = '';
      }

      return stickyProp;
    };
    /*
    addInstance ✔️
    --------
    — manages instances of items
    - takes in an el and props
    - returns an item object
    ---
    - target = el
    - o = {object} = props
      - scrollEl = 'string' | object
      - verticalPosition = number
      - off = boolean
      - parentClass = 'string'
      - stickyClass = 'string'
      - stuckClass = 'string'
    ---
    - defined later
      - parent = dom element
      - state = 'string'
      - offset = number
      - stickyStart = number
      - stickyStop = number
    - returns an instance object
    */


    _proto.addInstance = function addInstance(el, props) {
      var _this2 = this;

      var item = {
        el: el,
        parent: el.parentNode,
        props: props
      };

      if (props.positionVal === 'fixed' || props.useStickyClasses) {
        this.isWin = this.props.scrollEl === window;
        var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
        this.computeScrollOffsets(item);
        this.toggleClasses(item.parent, '', props.parentClass);
        item.state = 'default';
        item.stateChange = 'default';

        item.stateContainer = function () {
          return _this2.manageState(item);
        };

        se.addEventListener('scroll', item.stateContainer);
      }

      return item;
    };
    /*
    --------
    getParent 👨‍
    --------
    - a helper function that gets the target element's parent selected el
    - only used for non `window` scroll elements
    - supports older browsers
    */


    _proto.getClosestParent = function getClosestParent(el, match) {
      // p = parent element
      var p = match;
      var e = el;
      if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent

      while (e.parentElement !== p) {
        e = e.parentElement;
      } // return parent element


      return p;
    };
    /*
    --------
    getTopPosition
    --------
    - a helper function that gets the topPosition of a Stickybit element
    - from the top level of the DOM
    */


    _proto.getTopPosition = function getTopPosition(el) {
      if (this.props.useGetBoundingClientRect) {
        return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
      }

      var topPosition = 0;

      do {
        topPosition = el.offsetTop + topPosition;
      } while (el = el.offsetParent);

      return topPosition;
    };
    /*
    computeScrollOffsets 📊
    ---
    computeScrollOffsets for Stickybits
    - defines
      - offset
      - start
      - stop
    */


    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === 'fixed';
      var isTop = p.verticalPosition !== 'bottom';
      var scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getTopPosition(parent) - scrollElOffset : this.getTopPosition(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      var parentBottom = stickyStart + parent.offsetHeight;
      it.offset = !isCustom ? scrollElOffset + p.stickyBitStickyOffset : 0;
      it.stickyStart = isTop ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isTop ? parentBottom - (el.offsetHeight + it.offset) : parentBottom - window.innerHeight;
    };
    /*
    toggleClasses ⚖️
    ---
    toggles classes (for older browser support)
    r = removed class
    a = added class
    */


    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(' ');
      if (a && cArray.indexOf(a) === -1) cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1) cArray.splice(rItem, 1);
      e.className = cArray.join(' ');
    };
    /*
    manageState 📝
    ---
    - defines the state
      - normal
      - sticky
      - stuck
    */


    _proto.manageState = function manageState(item) {
      var _this3 = this; // cache object


      var it = item;
      var p = it.props;
      var state = it.state;
      var stateChange = it.stateChange;
      var start = it.stickyStart;
      var change = it.stickyChange;
      var stop = it.stickyStop; // cache props

      var pv = p.positionVal;
      var se = p.scrollEl;
      var sticky = p.stickyClass;
      var stickyChange = p.stickyChangeClass;
      var stuck = p.stuckClass;
      var vp = p.verticalPosition;
      var isTop = vp !== 'bottom';
      var aS = p.applyStyle;
      var ns = p.noStyles;
      /*
      requestAnimationFrame
      ---
      - use rAF
      - or stub rAF
      */

      var rAFStub = function rAFDummy(f) {
        f();
      };

      var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
      /*
      define scroll vars
      ---
      - scroll
      - notSticky
      - isSticky
      - isStuck
      */

      var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
      var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
      var isSticky = isTop && scroll <= start && (state === 'sticky' || state === 'stuck');
      var isStuck = scroll >= stop && state === 'sticky';
      /*
      Unnamed arrow functions within this block
      ---
      - help wanted or discussion
      - view test.stickybits.js
        - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
      */

      if (notSticky) {
        it.state = 'sticky';
      } else if (isSticky) {
        it.state = 'default';
      } else if (isStuck) {
        it.state = 'stuck';
      }

      var isStickyChange = scroll >= change && scroll <= stop;
      var isNotStickyChange = scroll < change / 2 || scroll > stop;

      if (isNotStickyChange) {
        it.stateChange = 'default';
      } else if (isStickyChange) {
        it.stateChange = 'sticky';
      } // Only apply new styles if the state has changed


      if (state === it.state && stateChange === it.stateChange) return;
      rAF(function () {
        var _styles2, _classes, _styles3, _extends2, _classes2, _style$classes;

        var stateStyles = {
          sticky: {
            styles: (_styles2 = {
              position: pv,
              top: '',
              bottom: ''
            }, _styles2[vp] = p.stickyBitStickyOffset + 'px', _styles2),
            classes: (_classes = {}, _classes[sticky] = true, _classes)
          },
          default: {
            styles: (_styles3 = {}, _styles3[vp] = '', _styles3),
            classes: {}
          },
          stuck: {
            styles: _extends((_extends2 = {}, _extends2[vp] = '', _extends2), pv === 'fixed' && !ns || !_this3.isWin ? {
              position: 'absolute',
              top: '',
              bottom: '0'
            } : {}),
            classes: (_classes2 = {}, _classes2[stuck] = true, _classes2)
          }
        };

        if (pv === 'fixed') {
          stateStyles.default.styles.position = '';
        }

        var style = stateStyles[it.state];
        style.classes = (_style$classes = {}, _style$classes[stuck] = !!style.classes[stuck], _style$classes[sticky] = !!style.classes[sticky], _style$classes[stickyChange] = isStickyChange, _style$classes);
        aS(style, item);
      });
    };
    /*
    applyStyle
    ---
    - apply the given styles and classes to the element
    */


    _proto.applyStyle = function applyStyle(_ref, item) {
      var styles = _ref.styles,
          classes = _ref.classes; // cache object

      var it = item;
      var e = it.el;
      var p = it.props;
      var stl = e.style; // cache props

      var ns = p.noStyles;
      var cArray = e.className.split(' '); // Disable due to bug with old versions of eslint-scope and for ... in
      // https://github.com/eslint/eslint/issues/12117
      // eslint-disable-next-line no-unused-vars

      for (var cls in classes) {
        var addClass = classes[cls];

        if (addClass) {
          if (cArray.indexOf(cls) === -1) cArray.push(cls);
        } else {
          var idx = cArray.indexOf(cls);
          if (idx !== -1) cArray.splice(idx, 1);
        }
      }

      e.className = cArray.join(' ');

      if (styles['position']) {
        stl['position'] = styles['position'];
      }

      if (ns) return; // eslint-disable-next-line no-unused-vars

      for (var key in styles) {
        stl[key] = styles[key];
      }
    };

    _proto.update = function update(updatedProps) {
      var _this4 = this;

      if (updatedProps === void 0) {
        updatedProps = null;
      }

      this.instances.forEach(function (instance) {
        _this4.computeScrollOffsets(instance);

        if (updatedProps) {
          // eslint-disable-next-line no-unused-vars
          for (var updatedProp in updatedProps) {
            instance.props[updatedProp] = updatedProps[updatedProp];
          }
        }
      });
      return this;
    };
    /*
    removes an instance 👋
    --------
    - cleanup instance
    */


    _proto.removeInstance = function removeInstance(instance) {
      var _styles4, _classes3;

      var e = instance.el;
      var p = instance.props;
      this.applyStyle({
        styles: (_styles4 = {
          position: ''
        }, _styles4[p.verticalPosition] = '', _styles4),
        classes: (_classes3 = {}, _classes3[p.stickyClass] = '', _classes3[p.stuckClass] = '', _classes3)
      }, instance);
      this.toggleClasses(e.parentNode, p.parentClass);
    };
    /*
    cleanup 🛁
    --------
    - cleans up each instance
    - clears instance
    */


    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];

        if (instance.stateContainer) {
          instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
        }

        this.removeInstance(instance);
      }

      this.manageState = false;
      this.instances = [];
    };

    return Stickybits;
  }();
  /*
    export
    --------
    exports StickBits to be used 🏁
  */


  function stickybits(target, o) {
    return new Stickybits(target, o);
  }

  var HistorySlider = /*#__PURE__*/function () {
    function HistorySlider(node) {
      _classCallCheck(this, HistorySlider);

      this.$component = node;
      this.years = this.$component.querySelector('.years');
      this.list = this.$component.querySelector('.years__right-list');
      this.titles = this.$component.querySelectorAll('.years__right-list-item');
      this.events = this.$component.querySelectorAll('.rs-history__events-block');
      this.progress = this.$component.querySelector('.years__circle rect + rect');
      this.blockEvent = this.$component.querySelector('.rs-history__events');
      this.init();
      this.attachEventHandler();
    }

    _createClass(HistorySlider, [{
      key: "init",
      value: function init() {
        this.stickyOffset = (document.documentElement.clientHeight - this.years.offsetHeight) / 2;
        stickybits('.years', {
          stickyBitStickyOffset: this.stickyOffset
        });
        this.eventsGroups = [];
        this.listY = 0;
        this.activeOffset = this.stickyOffset + this.years.offsetHeight;
        this.startProgress = this.blockEvent.offsetHeight;

        for (var i = 0; i < this.titles.length; i++) {
          this.eventsGroups.push({
            top: 0,
            isActive: false,
            title: this.titles[i],
            event: this.events[i],
            getTop: function getTop() {
              this.top = this.event.getBoundingClientRect().y;
            }
          });
        }
      }
    }, {
      key: "getActive",
      value: function getActive() {
        var startTop = 0;

        for (var i = 0; i < this.eventsGroups.length; i++) {
          if (this.eventsGroups[i].top > startTop && this.eventsGroups[i].top <= this.activeOffset) {
            this.eventsGroups[i - 1] ? this.eventsGroups[i - 1].isActive = false : false;
            this.eventsGroups[i + 1] ? this.eventsGroups[i + 1].isActive = false : false;
            this.eventsGroups[i].isActive = true;
            startTop = this.eventsGroups[i].top;
          }
        }
      }
    }, {
      key: "update",
      value: function update() {
        var _this6 = this;

        this.eventsGroups.forEach(function (item, index) {
          if (item.isActive) {
            var titleTop = item.title.getBoundingClientRect().y;
            var delta = titleTop - item.top;

            if (titleTop > _this6.stickyOffset && item.top < titleTop) {
              if (titleTop - delta < _this6.stickyOffset) {
                delta = titleTop - _this6.stickyOffset;
              }

              _this6.listY = _this6.listY - delta;
            } else if (item.top > titleTop) {
              _this6.listY = _this6.listY - delta;
            }

            var currentProgress = _this6.activeOffset - (_this6.blockEvent.getBoundingClientRect().y + _this6.blockEvent.getBoundingClientRect().height);

            _this6.list.style.transform = "translateY(".concat(_this6.listY, "px)");
            item.title.classList.add('is-active');
            item.event.classList.add('is-active');
            _this6.progress.style.strokeDashoffset = currentProgress / -_this6.startProgress > 0 ? currentProgress / -_this6.startProgress : 0;
          } else {
            item.title.classList.remove('is-active');
            item.event.classList.remove('is-active');
          }
        });
      }
    }, {
      key: "attachEventHandler",
      value: function attachEventHandler() {
        var _this7 = this;

        window.addEventListener('scroll', function () {
          _this7.eventsGroups.forEach(function (item, index) {
            item.getTop();
          });

          _this7.getActive();

          _this7.update();
        });
        window.addEventListener('resize', function () {
          _this7.init();
        });
      }
    }]);

    return HistorySlider;
  }();

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

  var RangeSlider = /*#__PURE__*/function () {
    function RangeSlider($component) {
      _classCallCheck(this, RangeSlider);

      this.$component = $component;
      this.min = this.$component.dataset.min;
      this.max = this.$component.dataset.max;
      this.$slider = this.$component.querySelector('.range-slider__target');
      this.inputs = [this.$component.querySelector('.range-slider__value-start'), this.$component.querySelector('.range-slider__value-end')];
      this.btnReset = this.$component.querySelector('.range-slider__reset');
      this.addEventHandlers();
      this.render();
      this.initInputs();
    }

    _createClass(RangeSlider, [{
      key: "addEventHandlers",
      value: function addEventHandlers() {
        var _this8 = this;

        if (this.btnReset) {
          this.btnReset.addEventListener('click', function () {
            _this8.reset();
          });
        }
      }
    }, {
      key: "initInputs",
      value: function initInputs() {
        var _this9 = this;

        //адаптивная ширина поля ввода
        var buffer = [];

        for (var i = 0; this.inputs.length > i; i++) {
          buffer[i] = document.createElement('div');
          buffer[i].className = 'buffer';
          this.inputs[i].parentNode.insertBefore(buffer[i], this.inputs[i].nextSibling);
          this.inputs[i].nextElementSibling.innerHTML = this.inputs[i].value;
          this.inputs[i].style.width = this.inputs[i].nextElementSibling.clientWidth + 3 + 'px';

          this.inputs[i].oninput = function () {
            this.nextElementSibling.innerHTML = this.value;
            this.style.width = this.nextElementSibling.clientWidth + 3 + 'px';
          };
        } //валидация при вводе в поле ввода


        this.inputs.forEach(function (item) {
          var self = _this9;
          item.addEventListener('input', function (event) {
            this.value = this.value.replace(/[^\d.]/g, '');

            if (this.value > parseInt(self.max)) {
              this.value = this.value.slice(0, -1);
            }
          });
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.inputs[0].value = this.min;
        this.inputs[1].value = this.max;
        this.$slider.noUiSlider.set([this.inputs[0].value, this.inputs[1].value]);
      }
    }, {
      key: "render",
      value: function render() {
        var _this10 = this;

        noUiSlider.create(this.$slider, {
          start: [Number(this.min), Number(this.max)],
          connect: true,
          format: wNumb_min({
            decimals: 0,
            thousand: ' '
          }),
          range: {
            min: Number(this.min),
            max: Number(this.max)
          }
        });
        this.inputs.forEach(function (item) {
          var self = _this10;
          item.addEventListener('change', function (event) {
            self.$slider.noUiSlider.set([self.inputs[0].value, self.inputs[1].value]);
          });
        });
        this.$slider.noUiSlider.on('update', function (values, handle) {
          _this10.inputs[handle].value = values[handle];

          _this10.inputs[handle].dispatchEvent(new Event('input'));
        });
      }
    }]);

    return RangeSlider;
  }();
  /**
   *  app.js
   */


  window.onload = function () {
    //history slider
    var historySliders = document.querySelectorAll('.js-history-slider');
    historySliders.forEach(function (node, index) {
      new HistorySlider(node);
    }); //slick - main slider

    if ($('.main-slider').length > 0) {
      $('.main-slider').on('init afterChange', function (e, slick) {
        var activeSlide = $('.main-slider .slick-active');
        activeSlide.addClass('isActive');
      });
      $('.rs-slider__slider').on('beforeChange', function () {
        var activeSlide = $('.main-slider .slick-active');
        activeSlide.removeClass('isActive');
      });
      $('.main-slider').slick({
        infinite: true,
        slidesToShow: 1,
        speed: 100,
        arrows: false,
        dots: false,
        //autoplay: true,
        autoplaySpeed: 5000,
        lazyLoad: 'ondemand',
        fade: true,
        cssEase: 'linear'
      });
    } //slick - product-slider


    function setProgress(index, name) {
      var calc = (index + 1) / $(".".concat(name)).slick('getSlick').slideCount * 100;
      $(".".concat(name, "-progress")).css('background-size', "".concat(calc, "% 100%"));
    }

    if ($('.product-slider').length > 0) {
      $('.product-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, 'product-slider');
      });
      $('.product-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: false,
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        arrows: true,
        prevArrow: '.product-slider-prev',
        nextArrow: '.product-slider-next',
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    }

    setProgress(0, 'product-slider'); //slick - present-slider

    if ($('.present-slider').length > 0) {
      $('.present-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, 'present-slider');
      });
      $('.present-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: false,
        lazyLoad: false,
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        arrows: true,
        prevArrow: '.present-slider-prev',
        nextArrow: '.present-slider-next',
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 450,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    }

    setProgress(0, 'present-slider'); //slick - category-slider

    if ($('.category-slider').length > 0) {
      $('.category-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, 'category-slider');
      });
      $('.category-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: false,
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        arrows: true,
        prevArrow: '.category-slider-prev',
        nextArrow: '.category-slider-next',
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4
          }
        }]
      });
    }

    setProgress(0, 'category-slider'); //slick - events-slider

    if ($('.events-slider').length > 0) {
      $('.events-slider').on('init reInit', function (event, slick, currentSlide, nextSlide) {
        var slider = document.querySelector('.events-slider');
        var dotsText = slider.querySelectorAll('.rs-card-slider__slide:not(.slick-cloned) .event-card__date');
        var dots = document.querySelectorAll('.events-slider-dots button');
        dotsText.forEach(function (dot, index) {
          dots[index].innerHTML = dot.innerHTML;
        });
      });
      $('.events-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        appendDots: '.events-slider-dots',
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        arrows: true,
        prevArrow: '.events-slider-prev',
        nextArrow: '.events-slider-next',
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 1400,
          settings: {
            slidesToShow: 4
          }
        }]
      });
    } //slick - story-slider


    if ($('.story-slider').length > 0) {
      $('.story-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: false,
        lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
        arrows: true,
        prevArrow: '.story-slider-prev',
        nextArrow: '.story-slider-next',
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    } //show on scroll


    var checkInViewportElements = document.querySelectorAll('.checkInViewport');
    checkInViewportElements.forEach(function (el) {
      $(el).isInViewport();
    });
    $(window).on('resize scroll', function () {
      checkInViewportElements.forEach(function (el) {
        $(el).isInViewport();
      });
    }); // slick on resize

    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        destroySlick('.advantages-slider');
      } else {
        addSlick('.advantages-slider');
      }
    });
    addSlick('.advantages-slider');

    function addSlick(name) {
      if ($(name).length > 0) {
        $(name).slick({
          infinite: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '60px',
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
    } //anchor links smooth scroll


    var anchors = document.querySelectorAll('a[href*="#"].anchor-link');

    if (anchors) {
      var _iterator = _createForOfIteratorHelper(anchors),
          _step;

      try {
        var _loop2 = function _loop2() {
          var anchor = _step.value;
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } //scroll to top


    $('#scroll-top').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    }); // rang slider

    var rangeSliders = document.querySelectorAll('.range-slider');
    var filtersRange = [];
    rangeSliders.forEach(function (node, index) {
      filtersRange[index] = new RangeSlider(node);
    }); // reset filter form

    var filterForm = document.querySelector('.filter-form');

    if (filterForm) {
      filterForm.addEventListener('reset', function () {
        setTimeout(function () {
          filtersRange.forEach(function (filter) {
            return filter.reset();
          });
        }, 10);
      });
    } //events handling


    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener('click', documentActions);
    document.addEventListener('scroll', documentScroll); //sticky header on scroll event

    var header = document.querySelector('header');
    var menu = document.querySelector('.rs-menu-form');
    var offset = menu.offsetTop;

    function documentScroll(e) {
      if (window.pageYOffset > offset) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    } //action on click event


    function documentActions(e) {
      var targetElement = e.target; //open-close dropdown menu on touch-screen

      if (window.innerWidth > 1919 && isMobile) {
        if (targetElement.closest('.menu__dropdown-arrow')) {
          targetElement.closest('.menu__dropdown').classList.toggle('hover');
        }

        if (!targetElement.closest('.menu__list')) {
          document.querySelectorAll('.menu__dropdown.hover').forEach(function (elem, index) {
            elem.classList.remove('hover');
          });
        }
      } //open-close menu burger


      if (window.innerWidth < 1919) {
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
      } //change view of catalog


      if (targetElement.closest('.sort-catalog__grid')) {
        targetElement.closest('.sort-catalog__grid').classList.add('isActive');
        document.querySelector('.sort-catalog__list').classList.remove('isActive');
        document.querySelector('.rs-catalog__items').dataset.view = 'grid';
      }

      if (targetElement.closest('.sort-catalog__list')) {
        targetElement.closest('.sort-catalog__list').classList.add('isActive');
        document.querySelector('.sort-catalog__grid').classList.remove('isActive');
        document.querySelector('.rs-catalog__items').dataset.view = 'list';
      } //open-close search box


      document.querySelector('.header-search');
      var input = document.querySelector('.header-search__input');

      if (targetElement.closest('.rs-menu-form__btn_search')) {
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
      } //reset filter form group this inputs type checkbox


      if (targetElement.closest('.filter-form__group-reset')) {
        var filterFormGroup = targetElement.closest('.filter-form__group-reset').parentNode;
        filterFormGroup.querySelectorAll('input[type=checkbox]').forEach(function (item) {
          return item.checked = false;
        });
      }
    }
  }; //.window-onload

});