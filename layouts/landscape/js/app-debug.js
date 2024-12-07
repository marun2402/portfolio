function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (factory) {
  typeof define === 'function' && define.amd ? define('app', factory) : factory();
})(function () {
  'use strict';

  //spollers plugin
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
      });

      // Получаем уникальные брейкпоинты
      var mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });
      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach(function (breakpoint) {
        var paramsArray = breakpoint.split(',');
        var mediaBreakpoint = paramsArray[1];
        var mediaType = paramsArray[2];
        var matchMedia = window.matchMedia(paramsArray[0]);

        // Объекты с нужными условиями
        var spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        // Событие
        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    }
  }
  //SlideToggle
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
  function phoneInput() {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');
    for (var _i = 0; _i < phoneInputs.length; _i++) {
      var input = phoneInputs[_i];
      input.oninput = onPhoneInput;
      input.onkeydown = onPhoneKeyDown;
      input.onpaste = onPhonePaste;
      // input.addEventListener('input', onPhoneInput);
      // input.addEventListener('keydown', onPhoneKeyDown);
      // input.addEventListener('paste', onPhonePaste);
    }
  }

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }
  function onPhoneInput(event) {
    var input = event.target;
    var inputNumbersValue = getInputNumbersValue(input);
    var formatedInputValue = '';
    var selectionStart = input.selectionStart;
    if (!inputNumbersValue) {
      return input.value = '';
    }
    if (input.value.length != selectionStart) {
      if (event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }
    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      //Russian phone number
      if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
      var firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
      formatedInputValue = firstSymbols + ' ';
      if (inputNumbersValue.length > 1) {
        formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      //Not Russian phone number
      formatedInputValue = '+' + inputNumbersValue;
    }
    input.value = formatedInputValue;
  }
  function onPhoneKeyDown(event) {
    var input = event.target;
    if (event.keyCode == 8 && getInputNumbersValue(input).length == 1) {
      input.value = '';
    }
  }
  function onPhonePaste(event) {
    var pasted = event.clipboardData || window.clipboardData;
    var input = event.target;
    var inputNumbersValue = getInputNumbersValue(input);
    if (pasted) {
      var pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
  function t(t, e) {
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, "symbol" == _typeof(n = function (t, e) {
        if ("object" != _typeof(t) || null === t) return t;
        var i = t[Symbol.toPrimitive];
        if (void 0 !== i) {
          var o = i.call(t, "string");
          if ("object" != _typeof(o)) return o;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      }(o.key)) ? n : String(n), o);
    }
    var n;
  }
  function e(e, i, o) {
    return i && t(e.prototype, i), o && t(e, o), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function i() {
    return i = Object.assign ? Object.assign.bind() : function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
      }
      return t;
    }, i.apply(this, arguments);
  }
  function o(t, e, i) {
    return Math.max(t, Math.min(e, i));
  }
  var n = /*#__PURE__*/function () {
      function t() {}
      var e = t.prototype;
      return e.advance = function (t) {
        var e, i, n, s;
        if (this.isRunning) {
          var r = !1;
          if (this.lerp) this.value = (i = this.value, n = this.to, (1 - (s = 1 - Math.exp(-60 * this.lerp * t))) * i + s * n), Math.round(this.value) === this.to && (this.value = this.to, r = !0);else {
            this.currentTime += t;
            var l = o(0, this.currentTime / this.duration, 1),
              h = (r = l >= 1) ? 1 : this.easing(l);
            this.value = this.from + (this.to - this.from) * h;
          }
          null == (e = this.onUpdate) || e.call(this, this.value, {
            completed: r
          }), r && this.stop();
        }
      }, e.stop = function () {
        this.isRunning = !1;
      }, e.fromTo = function (t, e, i) {
        var o = i.lerp,
          n = void 0 === o ? .1 : o,
          s = i.duration,
          r = void 0 === s ? 1 : s,
          l = i.easing,
          h = void 0 === l ? function (t) {
            return t;
          } : l,
          a = i.onUpdate;
        this.from = this.value = t, this.to = e, this.lerp = n, this.duration = r, this.easing = h, this.currentTime = 0, this.isRunning = !0, this.onUpdate = a;
      }, t;
    }(),
    s = /*#__PURE__*/function () {
      function t(t) {
        var e,
          i,
          o = this,
          n = void 0 === t ? {} : t,
          s = n.wrapper,
          r = n.content,
          l = n.autoResize,
          h = void 0 === l || l;
        if (this.resize = function () {
          o.onWrapperResize(), o.onContentResize();
        }, this.onWrapperResize = function () {
          o.wrapper === window ? (o.width = window.innerWidth, o.height = window.innerHeight) : (o.width = o.wrapper.clientWidth, o.height = o.wrapper.clientHeight);
        }, this.onContentResize = function () {
          o.scrollHeight = o.content.scrollHeight, o.scrollWidth = o.content.scrollWidth;
        }, this.wrapper = s, this.content = r, h) {
          var a = (e = this.resize, function () {
            var t = arguments,
              o = this;
            clearTimeout(i), i = setTimeout(function () {
              e.apply(o, t);
            }, 250);
          });
          this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(a), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(a), this.contentResizeObserver.observe(this.content);
        }
        this.resize();
      }
      return t.prototype.destroy = function () {
        var t, e;
        null == (t = this.wrapperResizeObserver) || t.disconnect(), null == (e = this.contentResizeObserver) || e.disconnect();
      }, e(t, [{
        key: "limit",
        get: function get() {
          return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
          };
        }
      }]), t;
    }(),
    r = /*#__PURE__*/function () {
      function t() {
        this.events = {};
      }
      var e = t.prototype;
      return e.emit = function (t) {
        for (var e = this.events[t] || [], i = 0, o = e.length; i < o; i++) e[i].apply(e, [].slice.call(arguments, 1));
      }, e.on = function (t, e) {
        var i,
          o = this;
        return (null == (i = this.events[t]) ? void 0 : i.push(e)) || (this.events[t] = [e]), function () {
          var i;
          o.events[t] = null == (i = o.events[t]) ? void 0 : i.filter(function (t) {
            return e !== t;
          });
        };
      }, e.destroy = function () {
        this.events = {};
      }, t;
    }(),
    l = /*#__PURE__*/function () {
      function t(t, e) {
        var i = this,
          n = e.wheelMultiplier,
          s = void 0 === n ? 1 : n,
          l = e.touchMultiplier,
          h = void 0 === l ? 2 : l,
          a = e.normalizeWheel,
          c = void 0 !== a && a;
        this.onTouchStart = function (t) {
          var e = t.targetTouches ? t.targetTouches[0] : t,
            o = e.clientY;
          i.touchStart.x = e.clientX, i.touchStart.y = o, i.lastDelta = {
            x: 0,
            y: 0
          };
        }, this.onTouchMove = function (t) {
          var e = t.targetTouches ? t.targetTouches[0] : t,
            o = e.clientX,
            n = e.clientY,
            s = -(o - i.touchStart.x) * i.touchMultiplier,
            r = -(n - i.touchStart.y) * i.touchMultiplier;
          i.touchStart.x = o, i.touchStart.y = n, i.lastDelta = {
            x: s,
            y: r
          }, i.emitter.emit("scroll", {
            type: "touch",
            deltaX: s,
            deltaY: r,
            event: t
          });
        }, this.onTouchEnd = function (t) {
          i.emitter.emit("scroll", {
            type: "touch",
            inertia: !0,
            deltaX: i.lastDelta.x,
            deltaY: i.lastDelta.y,
            event: t
          });
        }, this.onWheel = function (t) {
          var e = t.deltaX,
            n = t.deltaY;
          i.normalizeWheel && (e = o(-100, e, 100), n = o(-100, n, 100)), i.emitter.emit("scroll", {
            type: "wheel",
            deltaX: e *= i.wheelMultiplier,
            deltaY: n *= i.wheelMultiplier,
            event: t
          });
        }, this.element = t, this.wheelMultiplier = s, this.touchMultiplier = h, this.normalizeWheel = c, this.touchStart = {
          x: null,
          y: null
        }, this.emitter = new r(), this.element.addEventListener("wheel", this.onWheel, {
          passive: !1
        }), this.element.addEventListener("touchstart", this.onTouchStart, {
          passive: !1
        }), this.element.addEventListener("touchmove", this.onTouchMove, {
          passive: !1
        }), this.element.addEventListener("touchend", this.onTouchEnd, {
          passive: !1
        });
      }
      var e = t.prototype;
      return e.on = function (t, e) {
        return this.emitter.on(t, e);
      }, e.destroy = function () {
        this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, {
          passive: !1
        }), this.element.removeEventListener("touchstart", this.onTouchStart, {
          passive: !1
        }), this.element.removeEventListener("touchmove", this.onTouchMove, {
          passive: !1
        }), this.element.removeEventListener("touchend", this.onTouchEnd, {
          passive: !1
        });
      }, t;
    }(),
    h = /*#__PURE__*/function () {
      function t(t) {
        var e = this,
          o = void 0 === t ? {} : t,
          h = o.wrapper,
          a = void 0 === h ? window : h,
          c = o.content,
          u = void 0 === c ? document.documentElement : c,
          p = o.wheelEventsTarget,
          v = void 0 === p ? a : p,
          d = o.smoothWheel,
          m = void 0 === d || d,
          f = o.smoothTouch,
          g = void 0 !== f && f,
          S = o.syncTouch,
          y = void 0 !== S && S,
          w = o.syncTouchLerp,
          T = void 0 === w ? .1 : w,
          b = o.__iosNoInertiaSyncTouchLerp,
          z = void 0 === b ? .4 : b,
          M = o.touchInertiaMultiplier,
          E = void 0 === M ? 35 : M,
          L = o.duration,
          _ = o.easing,
          O = void 0 === _ ? function (t) {
            return Math.min(1, 1.001 - Math.pow(2, -10 * t));
          } : _,
          R = o.lerp,
          W = void 0 === R ? L && .1 : R,
          k = o.infinite,
          x = void 0 !== k && k,
          H = o.orientation,
          j = void 0 === H ? "vertical" : H,
          A = o.gestureOrientation,
          X = void 0 === A ? "vertical" : A,
          Y = o.touchMultiplier,
          D = void 0 === Y ? 1 : Y,
          I = o.wheelMultiplier,
          P = void 0 === I ? 1 : I,
          C = o.normalizeWheel,
          U = void 0 !== C && C,
          N = o.autoResize,
          V = void 0 === N || N;
        this.onVirtualScroll = function (t) {
          var o = t.type,
            n = t.inertia,
            s = t.deltaX,
            r = t.deltaY,
            l = t.event;
          if (!l.ctrlKey) {
            var h = "touch" === o,
              a = "wheel" === o;
            if (!("vertical" === e.options.gestureOrientation && 0 === r || "horizontal" === e.options.gestureOrientation && 0 === s || h && "vertical" === e.options.gestureOrientation && 0 === e.scroll && !e.options.infinite && r <= 0 || l.composedPath().find(function (t) {
              return (null == t || null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent")) || h && (null == t || null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent-touch")) || a && (null == t || null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent-wheel"));
            }))) if (e.isStopped || e.isLocked) l.preventDefault();else {
              if (e.isSmooth = (e.options.smoothTouch || e.options.syncTouch) && h || e.options.smoothWheel && a, !e.isSmooth) return e.isScrolling = !1, void e.animate.stop();
              l.preventDefault();
              var c = r;
              "both" === e.options.gestureOrientation ? c = Math.abs(r) > Math.abs(s) ? r : s : "horizontal" === e.options.gestureOrientation && (c = s);
              var u = h && e.options.syncTouch,
                p = h && n && Math.abs(c) > 1;
              p && (c = e.velocity * e.options.touchInertiaMultiplier), e.scrollTo(e.targetScroll + c, i({
                programmatic: !1
              }, u && {
                lerp: p ? e.syncTouchLerp : e.options.__iosNoInertiaSyncTouchLerp
              }));
            }
          }
        }, this.onScroll = function () {
          if (!e.isScrolling) {
            var t = e.animatedScroll;
            e.animatedScroll = e.targetScroll = e.actualScroll, e.velocity = 0, e.direction = Math.sign(e.animatedScroll - t), e.emit();
          }
        }, window.lenisVersion = "1.0.19", a !== document.documentElement && a !== document.body || (a = window), this.options = {
          wrapper: a,
          content: u,
          wheelEventsTarget: v,
          smoothWheel: m,
          smoothTouch: g,
          syncTouch: y,
          syncTouchLerp: T,
          __iosNoInertiaSyncTouchLerp: z,
          touchInertiaMultiplier: E,
          duration: L,
          easing: O,
          lerp: W,
          infinite: x,
          gestureOrientation: X,
          orientation: j,
          touchMultiplier: D,
          wheelMultiplier: P,
          normalizeWheel: U,
          autoResize: V
        }, this.dimensions = new s({
          wrapper: a,
          content: u,
          autoResize: V
        }), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = !1, this.isSmooth = m || g, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new n(), this.emitter = new r(), this.options.wrapper.addEventListener("scroll", this.onScroll, {
          passive: !1
        }), this.virtualScroll = new l(v, {
          touchMultiplier: D,
          wheelMultiplier: P,
          normalizeWheel: U
        }), this.virtualScroll.on("scroll", this.onVirtualScroll);
      }
      var h = t.prototype;
      return h.destroy = function () {
        this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onScroll, {
          passive: !1
        }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.rootElement.classList.remove("lenis"), this.rootElement.classList.remove("lenis-smooth"), this.rootElement.classList.remove("lenis-scrolling"), this.rootElement.classList.remove("lenis-stopped");
      }, h.on = function (t, e) {
        return this.emitter.on(t, e);
      }, h.off = function (t, e) {
        var i;
        this.emitter.events[t] = null == (i = this.emitter.events[t]) ? void 0 : i.filter(function (t) {
          return e !== t;
        });
      }, h.setScroll = function (t) {
        this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
      }, h.resize = function () {
        this.dimensions.resize();
      }, h.emit = function () {
        this.emitter.emit("scroll", this);
      }, h.reset = function () {
        this.isLocked = !1, this.isScrolling = !1, this.velocity = 0, this.animate.stop();
      }, h.start = function () {
        this.isStopped = !1, this.reset();
      }, h.stop = function () {
        this.isStopped = !0, this.animate.stop(), this.reset();
      }, h.raf = function (t) {
        var e = t - (this.time || t);
        this.time = t, this.animate.advance(.001 * e);
      }, h.scrollTo = function (t, e) {
        var i = this,
          n = void 0 === e ? {} : e,
          s = n.offset,
          r = void 0 === s ? 0 : s,
          l = n.immediate,
          h = void 0 !== l && l,
          a = n.lock,
          c = void 0 !== a && a,
          u = n.duration,
          p = void 0 === u ? this.options.duration : u,
          v = n.easing,
          d = void 0 === v ? this.options.easing : v,
          m = n.lerp,
          f = void 0 === m ? !p && this.options.lerp : m,
          g = n.onComplete,
          S = void 0 === g ? null : g,
          y = n.force,
          w = n.programmatic,
          T = void 0 === w || w;
        if (!this.isStopped || void 0 !== y && y) {
          if (["top", "left", "start"].includes(t)) t = 0;else if (["bottom", "right", "end"].includes(t)) t = this.limit;else {
            var b, z;
            if ("string" == typeof t ? z = document.querySelector(t) : null != (b = t) && b.nodeType && (z = t), z) {
              if (this.options.wrapper !== window) {
                var M = this.options.wrapper.getBoundingClientRect();
                r -= this.isHorizontal ? M.left : M.top;
              }
              var E = z.getBoundingClientRect();
              t = (this.isHorizontal ? E.left : E.top) + this.animatedScroll;
            }
          }
          if ("number" == typeof t) {
            if (t += r, t = Math.round(t), this.options.infinite ? T && (this.targetScroll = this.animatedScroll = this.scroll) : t = o(0, t, this.limit), h) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.emit(), void (null == S || S());
            if (!T) {
              if (t === this.targetScroll) return;
              this.targetScroll = t;
            }
            this.animate.fromTo(this.animatedScroll, t, {
              duration: p,
              easing: d,
              lerp: f,
              onUpdate: function onUpdate(t, e) {
                var o = e.completed;
                c && (i.isLocked = !0), i.isScrolling = !0, i.velocity = t - i.animatedScroll, i.direction = Math.sign(i.velocity), i.animatedScroll = t, i.setScroll(i.scroll), T && (i.targetScroll = t), o && (c && (i.isLocked = !1), requestAnimationFrame(function () {
                  i.isScrolling = !1;
                }), i.velocity = 0, null == S || S()), i.emit();
              }
            });
          }
        }
      }, e(t, [{
        key: "rootElement",
        get: function get() {
          return this.options.wrapper === window ? this.options.content : this.options.wrapper;
        }
      }, {
        key: "limit",
        get: function get() {
          return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
        }
      }, {
        key: "isHorizontal",
        get: function get() {
          return "horizontal" === this.options.orientation;
        }
      }, {
        key: "actualScroll",
        get: function get() {
          return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
        }
      }, {
        key: "scroll",
        get: function get() {
          return this.options.infinite ? (this.animatedScroll % (t = this.limit) + t) % t : this.animatedScroll;
          var t;
        }
      }, {
        key: "progress",
        get: function get() {
          return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
      }, {
        key: "isSmooth",
        get: function get() {
          return this.__isSmooth;
        },
        set: function set(t) {
          this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t), this.__isSmooth = t);
        }
      }, {
        key: "isScrolling",
        get: function get() {
          return this.__isScrolling;
        },
        set: function set(t) {
          this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t), this.__isScrolling = t);
        }
      }, {
        key: "isStopped",
        get: function get() {
          return this.__isStopped;
        },
        set: function set(t) {
          this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t), this.__isStopped = t);
        }
      }]), t;
    }();
  var lenis = null;
  function lenisSmoothScroll() {
    lenis = new h();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  function mainClickActions() {
    document.addEventListener('click', clickActions);
  }
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  function clickActions(event) {
    var targetElement = event.target;

    //open-close dropdown menu on touch-screen
    if (window.innerWidth > 991 && isMobile) {
      if (targetElement.closest('.menu__dropdown-arrow')) {
        targetElement.closest('.menu__dropdown').classList.toggle('hover');
      }
      if (!targetElement.closest('.menu__list')) {
        document.querySelectorAll('.menu__dropdown.hover').forEach(function (elem, index) {
          elem.classList.remove('hover');
        });
      }
    }

    //open-close menu burger
    if (window.innerWidth <= 991) {
      if (targetElement.closest('.menu-burger')) {
        targetElement.closest('.menu-burger').classList.toggle('active');
        document.body.classList.toggle('mobile-menu-opened');
        document.querySelector('[data-js-menu]').classList.toggle('active');
        document.querySelector('[data-js-overlay]').classList.toggle('active');
      }
    }

    //open-close filters
    if (window.innerWidth <= 991) {
      if (targetElement.closest('.filter-show')) {
        document.body.classList.add('filters-opened');
      }
      if (targetElement.closest('.filter-hide')) {
        document.body.classList.remove('filters-opened');
      }
    }

    //open-close dropdown list in menu burger (slider)
    if (window.innerWidth <= 991) {
      if (targetElement.closest('.menu__dropdown-arrow')) {
        targetElement.nextElementSibling.classList.add('is-active');
      }
      if (targetElement.closest('.switch-back')) {
        targetElement.parentNode.classList.remove('is-active');
      }
    }

    //open-close header search box
    var form = document.querySelector('.header-search');
    var input = document.querySelector('.header-search__input');
    if (targetElement.closest('.header-search-open')) {
      if (document.body.classList.contains('search-is-open')) {
        document.body.classList.remove('search-is-open');
      } else {
        document.body.classList.add('search-is-open');
        input.focus();
      }
    }
    if (document.body.classList.contains('search-is-open')) {
      if (!targetElement.closest('.rs-header__search')) {
        document.body.classList.remove('search-is-open');
      }
      if (targetElement.closest('.header-search__reset')) {
        document.body.classList.remove('search-is-open');
      }
    }

    //open-close lang picker
    if (isMobile) {
      if (targetElement.closest('.lang-picker')) {
        targetElement.closest('.lang-picker').classList.toggle('hover');
      }
    }
  }
  function checkViewport() {
    var elements = gsap.utils.toArray('.tlt');
    elements.forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: {
          start: '100px bottom',
          trigger: el,
          //toggleClass: 'in-view',
          onEnter: function onEnter() {
            el.classList.add('in-view');
            $(el).textillate({
              in: {
                effect: 'fadeInUp',
                sequence: true,
                delayScale: 0.5
              },
              autoStart: true,
              loop: false
            });
          }
        }
      });
    });
  }

  // =================== with intersectionObserver =============================
  // const options = {
  // 		root: document,
  // 		threshold: [0.2],
  // 	};

  // 	let observer = new IntersectionObserver(onEntry, options);
  // 	let elements = document.querySelectorAll('.tlt');

  // 	for (let elm of elements) {
  // 		observer.observe(elm);
  // 	}

  // 	function onEntry(entry) {
  // 		entry.forEach(change => {
  // 			if (change.isIntersecting) {
  // 				change.target.classList.add('in-view');
  // 				$(change.target).textillate({
  // 					in: {
  // 						effect: 'fadeInUp',
  // 						sequence: true,
  // 						delayScale: 0.5,
  // 					},
  // 					autoStart: true,
  // 					loop: false,
  // 				});
  // 			}
  // 		});
  // 	}
  //==========================================================================

  // Добавление классов слайдерам
  // swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
  function bildSliders() {
    //BildSlider
    var sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper), [class*="__media-slider-items"]');
    if (sliders) {
      sliders.forEach(function (slider) {
        slider.parentElement.classList.add('swiper');
        slider.classList.add('swiper-wrapper');
        var _iterator = _createForOfIteratorHelper(slider.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var slide = _step.value;
            slide.classList.add('swiper-slide');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
  }

  // Инициализация слайдеров
  function initSliders() {
    bildSliders();

    // ПЕРЕЧЕНЬ СЛАЙДЕРОВ=================================================================================================

    //main slider on index page
    var swiper1 = null;
    var swiper2 = null;
    var headSlider = document.querySelector('.head-slider');
    if (headSlider) {
      var slider = headSlider.querySelector('[class*="__slider"]');
      swiper1 = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 10,
        loop: false,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 7000
        },
        on: {
          init: function init(swiper) {
            swiper.slides[swiper.activeIndex].classList.add('is-active');
            var title = swiper.slides[swiper.activeIndex].querySelector('h1');
            $(title).textillate({
              in: {
                effect: 'fadeInUp',
                sequence: true,
                delayScale: 0.4
              },
              autoStart: true,
              loop: false
            });
          },
          transitionStart: function transitionStart(swiper) {
            swiper.slides[swiper.activeIndex].classList.remove('is-active');
          },
          transitionEnd: function transitionEnd(swiper) {
            swiper.slides[swiper.activeIndex].classList.add('is-active');
            var title = swiper.slides[swiper.activeIndex].querySelector('h1');
            $(title).textillate({
              in: {
                effect: 'fadeInUp',
                sequence: true,
                delayScale: 0.4
              },
              autoStart: true,
              loop: false
            });
          }
        }
      });
    }
    var pictureSlider = document.querySelector('.picture-slider');
    if (pictureSlider) {
      var _slider = pictureSlider.querySelector('[class*="__slider"]');
      swiper2 = new Swiper(_slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,
        loop: false,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        on: {
          init: function init(swiper) {
            swiper.slides[swiper.activeIndex].classList.add('is-active');
          },
          transitionStart: function transitionStart(swiper) {
            swiper.slides[swiper.activeIndex].classList.remove('is-active');
          },
          transitionEnd: function transitionEnd(swiper) {
            swiper.slides[swiper.activeIndex].classList.add('is-active');
          }
        }
      });
    }
    var swipeAllSliders = function swipeAllSliders(index) {
      swiper1.slideTo(index);
      swiper2.slideTo(index);
    };
    if (swiper1 && swiper2) {
      swiper1.on('slideChange', function () {
        return swipeAllSliders(swiper1.activeIndex);
      });
      swiper2.on('slideChange', function () {
        return swipeAllSliders(swiper2.activeIndex);
      });
    }

    //disable-enable slider on mobile screen
    if (document.querySelector('.rs-news')) {
      var disableEnableSlider = function disableEnableSlider(evt) {
        if (evt.matches) {
          if (newsSlider !== undefined) {
            newsSlider.destroy(true, true);
          }
        } else {
          newsSlider = new Swiper('.rs-news__content', {
            slidesPerView: 'auto',
            autoHeight: false,
            spaceBetween: 15,
            speed: 500,
            loop: false
          });
        }
      };
      var mediaQueryList = window.matchMedia('(min-width: 767.98px)');
      mediaQueryList.addListener(function () {
        disableEnableSlider(mediaQueryList);
      });
      disableEnableSlider(mediaQueryList);
      var newsSlider;
    }

    //same sliders
    var servicesSliders = document.querySelectorAll('.styles-slider');
    servicesSliders.forEach(function (node, _) {
      new stylesSlider(node);
    });
  }

  //same sliders	objects ==================================================================================================
  var stylesSlider = /*#__PURE__*/function () {
    function stylesSlider($component) {
      _classCallCheck(this, stylesSlider);
      this.$component = $component;
      this.$slider = this.$component.querySelector('[class*="__slider"]');
      this.$arrowNext = this.$component.querySelector('[class*="_next"]');
      this.$arrowPrev = this.$component.querySelector('[class*="_prev"]');
      this.render();
    }
    _createClass(stylesSlider, [{
      key: "render",
      value: function render() {
        new Swiper(this.$slider, {
          slidesPerView: 'auto',
          spaceBetween: 30,
          speed: 500,
          navigation: {
            nextEl: this.$arrowNext,
            prevEl: this.$arrowPrev
          }
        });
      }
    }]);
    return stylesSlider;
  }();
  /*!
   * lightgallery | 2.7.1 | January 11th 2023
   * http://www.lightgalleryjs.com/
   * Copyright (c) 2020 Sachin Neravath;
   * @license GPLv3
   */
  function initLgPolyfills() {
    (function () {
      if (typeof window.CustomEvent === 'function') return false;
      function CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: null
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      window.CustomEvent = CustomEvent;
    })();
    (function () {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
    })();
  }
  var lgQuery = /** @class */function () {
    function lgQuery(selector) {
      this.cssVenderPrefixes = ['TransitionDuration', 'TransitionTimingFunction', 'Transform', 'Transition'];
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    lgQuery.generateUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    };
    lgQuery.prototype._getSelector = function (selector, context) {
      if (context === void 0) {
        context = document;
      }
      if (typeof selector !== 'string') {
        return selector;
      }
      context = context || document;
      var fl = selector.substring(0, 1);
      if (fl === '#') {
        return context.querySelector(selector);
      } else {
        return context.querySelectorAll(selector);
      }
    };
    lgQuery.prototype._each = function (func) {
      if (!this.selector) {
        return this;
      }
      if (this.selector.length !== undefined) {
        [].forEach.call(this.selector, func);
      } else {
        func(this.selector, 0);
      }
      return this;
    };
    lgQuery.prototype._setCssVendorPrefix = function (el, cssProperty, value) {
      // prettier-ignore
      var property = cssProperty.replace(/-([a-z])/gi, function (s, group1) {
        return group1.toUpperCase();
      });
      if (this.cssVenderPrefixes.indexOf(property) !== -1) {
        el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
        el.style['webkit' + property] = value;
        el.style['moz' + property] = value;
        el.style['ms' + property] = value;
        el.style['o' + property] = value;
      } else {
        el.style[property] = value;
      }
    };
    lgQuery.prototype._getFirstEl = function () {
      if (this.selector && this.selector.length !== undefined) {
        return this.selector[0];
      } else {
        return this.selector;
      }
    };
    lgQuery.prototype.isEventMatched = function (event, eventName) {
      var eventNamespace = eventName.split('.');
      return event.split('.').filter(function (e) {
        return e;
      }).every(function (e) {
        return eventNamespace.indexOf(e) !== -1;
      });
    };
    lgQuery.prototype.attr = function (attr, value) {
      if (value === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.getAttribute(attr);
      }
      this._each(function (el) {
        el.setAttribute(attr, value);
      });
      return this;
    };
    lgQuery.prototype.find = function (selector) {
      return $LG(this._getSelector(selector, this.selector));
    };
    lgQuery.prototype.first = function () {
      if (this.selector && this.selector.length !== undefined) {
        return $LG(this.selector[0]);
      } else {
        return $LG(this.selector);
      }
    };
    lgQuery.prototype.eq = function (index) {
      return $LG(this.selector[index]);
    };
    lgQuery.prototype.parent = function () {
      return $LG(this.selector.parentElement);
    };
    lgQuery.prototype.get = function () {
      return this._getFirstEl();
    };
    lgQuery.prototype.removeAttr = function (attributes) {
      var attrs = attributes.split(' ');
      this._each(function (el) {
        attrs.forEach(function (attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    };
    lgQuery.prototype.wrap = function (className) {
      if (!this.firstElement) {
        return this;
      }
      var wrapper = document.createElement('div');
      wrapper.className = className;
      this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
      this.firstElement.parentNode.removeChild(this.firstElement);
      wrapper.appendChild(this.firstElement);
      return this;
    };
    lgQuery.prototype.addClass = function (classNames) {
      if (classNames === void 0) {
        classNames = '';
      }
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.add(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.removeClass = function (classNames) {
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.remove(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.hasClass = function (className) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.classList.contains(className);
    };
    lgQuery.prototype.hasAttribute = function (attribute) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.hasAttribute(attribute);
    };
    lgQuery.prototype.toggleClass = function (className) {
      if (!this.firstElement) {
        return this;
      }
      if (this.hasClass(className)) {
        this.removeClass(className);
      } else {
        this.addClass(className);
      }
      return this;
    };
    lgQuery.prototype.css = function (property, value) {
      var _this = this;
      this._each(function (el) {
        _this._setCssVendorPrefix(el, property, value);
      });
      return this;
    };
    // Need to pass separate namespaces for separate elements
    lgQuery.prototype.on = function (events, listener) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      events.split(' ').forEach(function (event) {
        if (!Array.isArray(lgQuery.eventListeners[event])) {
          lgQuery.eventListeners[event] = [];
        }
        lgQuery.eventListeners[event].push(listener);
        _this.selector.addEventListener(event.split('.')[0], listener);
      });
      return this;
    };
    // @todo - test this
    lgQuery.prototype.once = function (event, listener) {
      var _this = this;
      this.on(event, function () {
        _this.off(event);
        listener(event);
      });
      return this;
    };
    lgQuery.prototype.off = function (event) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      Object.keys(lgQuery.eventListeners).forEach(function (eventName) {
        if (_this.isEventMatched(event, eventName)) {
          lgQuery.eventListeners[eventName].forEach(function (listener) {
            _this.selector.removeEventListener(eventName.split('.')[0], listener);
          });
          lgQuery.eventListeners[eventName] = [];
        }
      });
      return this;
    };
    lgQuery.prototype.trigger = function (event, detail) {
      if (!this.firstElement) {
        return this;
      }
      var customEvent = new CustomEvent(event.split('.')[0], {
        detail: detail || null
      });
      this.firstElement.dispatchEvent(customEvent);
      return this;
    };
    // Does not support IE
    lgQuery.prototype.load = function (url) {
      var _this = this;
      fetch(url).then(function (res) {
        return res.text();
      }).then(function (html) {
        _this.selector.innerHTML = html;
      });
      return this;
    };
    lgQuery.prototype.html = function (html) {
      if (html === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.innerHTML;
      }
      this._each(function (el) {
        el.innerHTML = html;
      });
      return this;
    };
    lgQuery.prototype.append = function (html) {
      this._each(function (el) {
        if (typeof html === 'string') {
          el.insertAdjacentHTML('beforeend', html);
        } else {
          el.appendChild(html);
        }
      });
      return this;
    };
    lgQuery.prototype.prepend = function (html) {
      this._each(function (el) {
        el.insertAdjacentHTML('afterbegin', html);
      });
      return this;
    };
    lgQuery.prototype.remove = function () {
      this._each(function (el) {
        el.parentNode.removeChild(el);
      });
      return this;
    };
    lgQuery.prototype.empty = function () {
      this._each(function (el) {
        el.innerHTML = '';
      });
      return this;
    };
    lgQuery.prototype.scrollTop = function (scrollTop) {
      if (scrollTop !== undefined) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
    };
    lgQuery.prototype.scrollLeft = function (scrollLeft) {
      if (scrollLeft !== undefined) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }
    };
    lgQuery.prototype.offset = function () {
      if (!this.firstElement) {
        return {
          left: 0,
          top: 0
        };
      }
      var rect = this.firstElement.getBoundingClientRect();
      var bodyMarginLeft = $LG('body').style().marginLeft;
      // Minus body margin - https://stackoverflow.com/questions/30711548/is-getboundingclientrect-left-returning-a-wrong-value
      return {
        left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
        top: rect.top + this.scrollTop()
      };
    };
    lgQuery.prototype.style = function () {
      if (!this.firstElement) {
        return {};
      }
      return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
    };
    // Width without padding and border even if box-sizing is used.
    lgQuery.prototype.width = function () {
      var style = this.style();
      return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    };
    // Height without padding and border even if box-sizing is used.
    lgQuery.prototype.height = function () {
      var style = this.style();
      return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    };
    lgQuery.eventListeners = {};
    return lgQuery;
  }();
  function $LG(selector) {
    initLgPolyfills();
    return new lgQuery(selector);
  }

  /*!
   * lightgallery | 2.7.1 | January 11th 2023
   * http://www.lightgalleryjs.com/
   * Copyright (c) 2020 Sachin Neravath;
   * @license GPLv3
   */

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };
  var zoomSettings = {
    scale: 1,
    zoom: true,
    actualSize: true,
    showZoomInOutIcons: false,
    actualSizeIcons: {
      zoomIn: 'lg-zoom-in',
      zoomOut: 'lg-zoom-out'
    },
    enableZoomAfter: 300,
    zoomPluginStrings: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      viewActualSize: 'View actual size'
    }
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var ZOOM_TRANSITION_DURATION = 500;
  var Zoom = /** @class */function () {
    function Zoom(instance, $LG) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      this.settings = _assign(_assign({}, zoomSettings), this.core.settings);
      return this;
    }
    // Append Zoom controls. Actual size, Zoom-in, Zoom-out
    Zoom.prototype.buildTemplates = function () {
      var zoomIcons = this.settings.showZoomInOutIcons ? "<button id=\"" + this.core.getIdName('lg-zoom-in') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-in lg-icon\"></button><button id=\"" + this.core.getIdName('lg-zoom-out') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-out lg-icon\"></button>" : '';
      if (this.settings.actualSize) {
        zoomIcons += "<button id=\"" + this.core.getIdName('lg-actual-size') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['viewActualSize'] + "\" class=\"" + this.settings.actualSizeIcons.zoomIn + " lg-icon\"></button>";
      }
      this.core.outer.addClass('lg-use-transition-for-zoom');
      this.core.$toolbar.first().append(zoomIcons);
    };
    /**
     * @desc Enable zoom option only once the image is completely loaded
     * If zoomFromOrigin is true, Zoom is enabled once the dummy image has been inserted
     *
     * Zoom styles are defined under lg-zoomable CSS class.
     */
    Zoom.prototype.enableZoom = function (event) {
      var _this = this;
      // delay will be 0 except first time
      var _speed = this.settings.enableZoomAfter + event.detail.delay;
      // set _speed value 0 if gallery opened from direct url and if it is first slide
      if (this.$LG('body').first().hasClass('lg-from-hash') && event.detail.delay) {
        // will execute only once
        _speed = 0;
      } else {
        // Remove lg-from-hash to enable starting animation.
        this.$LG('body').first().removeClass('lg-from-hash');
      }
      this.zoomableTimeout = setTimeout(function () {
        if (!_this.isImageSlide(_this.core.index)) {
          return;
        }
        _this.core.getSlideItem(event.detail.index).addClass('lg-zoomable');
        if (event.detail.index === _this.core.index) {
          _this.setZoomEssentials();
        }
      }, _speed + 30);
    };
    Zoom.prototype.enableZoomOnSlideItemLoad = function () {
      // Add zoomable class
      this.core.LGel.on(lGEvents.slideItemLoad + ".zoom", this.enableZoom.bind(this));
    };
    Zoom.prototype.getDragCords = function (e) {
      return {
        x: e.pageX,
        y: e.pageY
      };
    };
    Zoom.prototype.getSwipeCords = function (e) {
      var x = e.touches[0].pageX;
      var y = e.touches[0].pageY;
      return {
        x: x,
        y: y
      };
    };
    Zoom.prototype.getDragAllowedAxises = function (scale, scaleDiff) {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first().get();
      var height = 0;
      var width = 0;
      var rect = $image.getBoundingClientRect();
      if (scale) {
        height = $image.offsetHeight * scale;
        width = $image.offsetWidth * scale;
      } else if (scaleDiff) {
        height = rect.height + scaleDiff * rect.height;
        width = rect.width + scaleDiff * rect.width;
      } else {
        height = rect.height;
        width = rect.width;
      }
      var allowY = height > this.containerRect.height;
      var allowX = width > this.containerRect.width;
      return {
        allowX: allowX,
        allowY: allowY
      };
    };
    Zoom.prototype.setZoomEssentials = function () {
      this.containerRect = this.core.$content.get().getBoundingClientRect();
    };
    /**
     * @desc Image zoom
     * Translate the wrap and scale the image to get better user experience
     *
     * @param {String} scale - Zoom decrement/increment value
     */
    Zoom.prototype.zoomImage = function (scale, scaleDiff, reposition, resetToMax) {
      if (Math.abs(scaleDiff) <= 0) return;
      var offsetX = this.containerRect.width / 2 + this.containerRect.left;
      var offsetY = this.containerRect.height / 2 + this.containerRect.top + this.scrollTop;
      var originalX;
      var originalY;
      if (scale === 1) {
        this.positionChanged = false;
      }
      var dragAllowedAxises = this.getDragAllowedAxises(0, scaleDiff);
      var allowY = dragAllowedAxises.allowY,
        allowX = dragAllowedAxises.allowX;
      if (this.positionChanged) {
        originalX = this.left / (this.scale - scaleDiff);
        originalY = this.top / (this.scale - scaleDiff);
        this.pageX = offsetX - originalX;
        this.pageY = offsetY - originalY;
        this.positionChanged = false;
      }
      var possibleSwipeCords = this.getPossibleSwipeDragCords(scaleDiff);
      var x;
      var y;
      var _x = offsetX - this.pageX;
      var _y = offsetY - this.pageY;
      if (scale - scaleDiff > 1) {
        var scaleVal = (scale - scaleDiff) / Math.abs(scaleDiff);
        _x = (scaleDiff < 0 ? -_x : _x) + this.left * (scaleVal + (scaleDiff < 0 ? -1 : 1));
        _y = (scaleDiff < 0 ? -_y : _y) + this.top * (scaleVal + (scaleDiff < 0 ? -1 : 1));
        x = _x / scaleVal;
        y = _y / scaleVal;
      } else {
        var scaleVal = (scale - scaleDiff) * scaleDiff;
        x = _x * scaleVal;
        y = _y * scaleVal;
      }
      if (reposition) {
        if (allowX) {
          if (this.isBeyondPossibleLeft(x, possibleSwipeCords.minX)) {
            x = possibleSwipeCords.minX;
          } else if (this.isBeyondPossibleRight(x, possibleSwipeCords.maxX)) {
            x = possibleSwipeCords.maxX;
          }
        } else {
          if (scale > 1) {
            if (x < possibleSwipeCords.minX) {
              x = possibleSwipeCords.minX;
            } else if (x > possibleSwipeCords.maxX) {
              x = possibleSwipeCords.maxX;
            }
          }
        }
        // @todo fix this
        if (allowY) {
          if (this.isBeyondPossibleTop(y, possibleSwipeCords.minY)) {
            y = possibleSwipeCords.minY;
          } else if (this.isBeyondPossibleBottom(y, possibleSwipeCords.maxY)) {
            y = possibleSwipeCords.maxY;
          }
        } else {
          // If the translate value based on index of beyond the viewport, utilize the available space to prevent image being cut out
          if (scale > 1) {
            //If image goes beyond viewport top, use the minim possible translate value
            if (y < possibleSwipeCords.minY) {
              y = possibleSwipeCords.minY;
            } else if (y > possibleSwipeCords.maxY) {
              y = possibleSwipeCords.maxY;
            }
          }
        }
      }
      this.setZoomStyles({
        x: x,
        y: y,
        scale: scale
      });
      this.left = x;
      this.top = y;
      if (resetToMax) {
        this.setZoomImageSize();
      }
    };
    Zoom.prototype.resetImageTranslate = function (index) {
      if (!this.isImageSlide(index)) {
        return;
      }
      var $image = this.core.getSlideItem(index).find('.lg-image').first();
      this.imageReset = false;
      $image.removeClass('reset-transition reset-transition-y reset-transition-x');
      this.core.outer.removeClass('lg-actual-size');
      $image.css('width', 'auto').css('height', 'auto');
      setTimeout(function () {
        $image.removeClass('no-transition');
      }, 10);
    };
    Zoom.prototype.setZoomImageSize = function () {
      var _this = this;
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      setTimeout(function () {
        var actualSizeScale = _this.getCurrentImageActualSizeScale();
        if (_this.scale >= actualSizeScale) {
          $image.addClass('no-transition');
          _this.imageReset = true;
        }
      }, ZOOM_TRANSITION_DURATION);
      setTimeout(function () {
        var actualSizeScale = _this.getCurrentImageActualSizeScale();
        if (_this.scale >= actualSizeScale) {
          var dragAllowedAxises = _this.getDragAllowedAxises(_this.scale);
          $image.css('width', $image.get().naturalWidth + 'px').css('height', $image.get().naturalHeight + 'px');
          _this.core.outer.addClass('lg-actual-size');
          if (dragAllowedAxises.allowX && dragAllowedAxises.allowY) {
            $image.addClass('reset-transition');
          } else if (dragAllowedAxises.allowX && !dragAllowedAxises.allowY) {
            $image.addClass('reset-transition-x');
          } else if (!dragAllowedAxises.allowX && dragAllowedAxises.allowY) {
            $image.addClass('reset-transition-y');
          }
        }
      }, ZOOM_TRANSITION_DURATION + 50);
    };
    /**
     * @desc apply scale3d to image and translate to image wrap
     * @param {style} X,Y and scale
     */
    Zoom.prototype.setZoomStyles = function (style) {
      var $imageWrap = this.core.getSlideItem(this.core.index).find('.lg-img-wrap').first();
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var $dummyImage = this.core.outer.find('.lg-current .lg-dummy-img').first();
      this.scale = style.scale;
      $image.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      $dummyImage.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      var transform = 'translate3d(' + style.x + 'px, ' + style.y + 'px, 0)';
      $imageWrap.css('transform', transform);
    };
    /**
     * @param index - Index of the current slide
     * @param event - event will be available only if the function is called on clicking/taping the imags
     */
    Zoom.prototype.setActualSize = function (index, event) {
      var _this = this;
      var currentItem = this.core.galleryItems[this.core.index];
      this.resetImageTranslate(index);
      setTimeout(function () {
        // Allow zoom only on image
        if (!currentItem.src || _this.core.outer.hasClass('lg-first-slide-loading')) {
          return;
        }
        var scale = _this.getCurrentImageActualSizeScale();
        var prevScale = _this.scale;
        if (_this.core.outer.hasClass('lg-zoomed')) {
          _this.scale = 1;
        } else {
          _this.scale = _this.getScale(scale);
        }
        _this.setPageCords(event);
        _this.beginZoom(_this.scale);
        _this.zoomImage(_this.scale, _this.scale - prevScale, true, true);
        setTimeout(function () {
          _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
        }, 10);
      }, 50);
    };
    Zoom.prototype.getNaturalWidth = function (index) {
      var $image = this.core.getSlideItem(index).find('.lg-image').first();
      var naturalWidth = this.core.galleryItems[index].width;
      return naturalWidth ? parseFloat(naturalWidth) : $image.get().naturalWidth;
    };
    Zoom.prototype.getActualSizeScale = function (naturalWidth, width) {
      var _scale;
      var scale;
      if (naturalWidth >= width) {
        _scale = naturalWidth / width;
        scale = _scale || 2;
      } else {
        scale = 1;
      }
      return scale;
    };
    Zoom.prototype.getCurrentImageActualSizeScale = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var width = $image.get().offsetWidth;
      var naturalWidth = this.getNaturalWidth(this.core.index) || width;
      return this.getActualSizeScale(naturalWidth, width);
    };
    Zoom.prototype.getPageCords = function (event) {
      var cords = {};
      if (event) {
        cords.x = event.pageX || event.touches[0].pageX;
        cords.y = event.pageY || event.touches[0].pageY;
      } else {
        var containerRect = this.core.$content.get().getBoundingClientRect();
        cords.x = containerRect.width / 2 + containerRect.left;
        cords.y = containerRect.height / 2 + this.scrollTop + containerRect.top;
      }
      return cords;
    };
    Zoom.prototype.setPageCords = function (event) {
      var pageCords = this.getPageCords(event);
      this.pageX = pageCords.x;
      this.pageY = pageCords.y;
    };
    Zoom.prototype.manageActualPixelClassNames = function () {
      var $actualSize = this.core.getElementById('lg-actual-size');
      $actualSize.removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
    };
    // If true, zoomed - in else zoomed out
    Zoom.prototype.beginZoom = function (scale) {
      this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
      if (scale > 1) {
        this.core.outer.addClass('lg-zoomed');
        this.manageActualPixelClassNames();
      } else {
        this.resetZoom();
      }
      return scale > 1;
    };
    Zoom.prototype.getScale = function (scale) {
      var actualSizeScale = this.getCurrentImageActualSizeScale();
      if (scale < 1) {
        scale = 1;
      } else if (scale > actualSizeScale) {
        scale = actualSizeScale;
      }
      return scale;
    };
    Zoom.prototype.init = function () {
      var _this = this;
      if (!this.settings.zoom) {
        return;
      }
      this.buildTemplates();
      this.enableZoomOnSlideItemLoad();
      var tapped = null;
      this.core.outer.on('dblclick.lg', function (event) {
        if (!_this.$LG(event.target).hasClass('lg-image')) {
          return;
        }
        _this.setActualSize(_this.core.index, event);
      });
      this.core.outer.on('touchstart.lg', function (event) {
        var $target = _this.$LG(event.target);
        if (event.touches.length === 1 && $target.hasClass('lg-image')) {
          if (!tapped) {
            tapped = setTimeout(function () {
              tapped = null;
            }, 300);
          } else {
            clearTimeout(tapped);
            tapped = null;
            event.preventDefault();
            _this.setActualSize(_this.core.index, event);
          }
        }
      });
      this.core.LGel.on(lGEvents.containerResize + ".zoom " + lGEvents.rotateRight + ".zoom " + lGEvents.rotateLeft + ".zoom " + lGEvents.flipHorizontal + ".zoom " + lGEvents.flipVertical + ".zoom", function () {
        if (!_this.core.lgOpened || !_this.isImageSlide(_this.core.index) || _this.core.touchAction) {
          return;
        }
        var _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
        _this.top = 0;
        _this.left = 0;
        _this.setZoomEssentials();
        _this.setZoomSwipeStyles(_LGel, {
          x: 0,
          y: 0
        });
        _this.positionChanged = true;
      });
      // Update zoom on resize and orientationchange
      this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, function () {
        if (!_this.core.lgOpened) return;
        _this.scrollTop = _this.$LG(window).scrollTop();
      });
      this.core.getElementById('lg-zoom-out').on('click.lg', function () {
        // Allow zoom only on image
        if (!_this.isImageSlide(_this.core.index)) {
          return;
        }
        var timeout = 0;
        if (_this.imageReset) {
          _this.resetImageTranslate(_this.core.index);
          timeout = 50;
        }
        setTimeout(function () {
          var scale = _this.scale - _this.settings.scale;
          if (scale < 1) {
            scale = 1;
          }
          _this.beginZoom(scale);
          _this.zoomImage(scale, -_this.settings.scale, true, true);
        }, timeout);
      });
      this.core.getElementById('lg-zoom-in').on('click.lg', function () {
        _this.zoomIn();
      });
      this.core.getElementById('lg-actual-size').on('click.lg', function () {
        _this.setActualSize(_this.core.index);
      });
      this.core.LGel.on(lGEvents.beforeOpen + ".zoom", function () {
        _this.core.outer.find('.lg-item').removeClass('lg-zoomable');
      });
      this.core.LGel.on(lGEvents.afterOpen + ".zoom", function () {
        _this.scrollTop = _this.$LG(window).scrollTop();
        // Set the initial value center
        _this.pageX = _this.core.outer.width() / 2;
        _this.pageY = _this.core.outer.height() / 2 + _this.scrollTop;
        _this.scale = 1;
      });
      // Reset zoom on slide change
      this.core.LGel.on(lGEvents.afterSlide + ".zoom", function (event) {
        var prevIndex = event.detail.prevIndex;
        _this.scale = 1;
        _this.positionChanged = false;
        _this.resetZoom(prevIndex);
        _this.resetImageTranslate(prevIndex);
        if (_this.isImageSlide(_this.core.index)) {
          _this.setZoomEssentials();
        }
      });
      // Drag option after zoom
      this.zoomDrag();
      this.pinchZoom();
      this.zoomSwipe();
      // Store the zoomable timeout value just to clear it while closing
      this.zoomableTimeout = false;
      this.positionChanged = false;
    };
    Zoom.prototype.zoomIn = function () {
      // Allow zoom only on image
      if (!this.isImageSlide(this.core.index)) {
        return;
      }
      var scale = this.scale + this.settings.scale;
      scale = this.getScale(scale);
      this.beginZoom(scale);
      this.zoomImage(scale, Math.min(this.settings.scale, scale - this.scale), true, true);
    };
    // Reset zoom effect
    Zoom.prototype.resetZoom = function (index) {
      this.core.outer.removeClass('lg-zoomed lg-zoom-drag-transition');
      var $actualSize = this.core.getElementById('lg-actual-size');
      var $item = this.core.getSlideItem(index !== undefined ? index : this.core.index);
      $actualSize.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn);
      $item.find('.lg-img-wrap').first().removeAttr('style');
      $item.find('.lg-image').first().removeAttr('style');
      this.scale = 1;
      this.left = 0;
      this.top = 0;
      // Reset pagx pagy values to center
      this.setPageCords();
    };
    Zoom.prototype.getTouchDistance = function (e) {
      return Math.sqrt((e.touches[0].pageX - e.touches[1].pageX) * (e.touches[0].pageX - e.touches[1].pageX) + (e.touches[0].pageY - e.touches[1].pageY) * (e.touches[0].pageY - e.touches[1].pageY));
    };
    Zoom.prototype.pinchZoom = function () {
      var _this = this;
      var startDist = 0;
      var pinchStarted = false;
      var initScale = 1;
      var prevScale = 0;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.outer.on('touchstart.lg', function (e) {
        $item = _this.core.getSlideItem(_this.core.index);
        if (!_this.isImageSlide(_this.core.index)) {
          return;
        }
        if (e.touches.length === 2) {
          e.preventDefault();
          if (_this.core.outer.hasClass('lg-first-slide-loading')) {
            return;
          }
          initScale = _this.scale || 1;
          _this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
          _this.setPageCords(e);
          _this.resetImageTranslate(_this.core.index);
          _this.core.touchAction = 'pinch';
          startDist = _this.getTouchDistance(e);
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.touches.length === 2 && _this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          var endDist = _this.getTouchDistance(e);
          var distance = startDist - endDist;
          if (!pinchStarted && Math.abs(distance) > 5) {
            pinchStarted = true;
          }
          if (pinchStarted) {
            prevScale = _this.scale;
            var _scale = Math.max(1, initScale + -distance * 0.02);
            _this.scale = Math.round((_scale + Number.EPSILON) * 100) / 100;
            var diff = _this.scale - prevScale;
            _this.zoomImage(_this.scale, Math.round((diff + Number.EPSILON) * 100) / 100, false, false);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          pinchStarted = false;
          startDist = 0;
          if (_this.scale <= 1) {
            _this.resetZoom();
          } else {
            var actualSizeScale = _this.getCurrentImageActualSizeScale();
            if (_this.scale >= actualSizeScale) {
              var scaleDiff = actualSizeScale - _this.scale;
              if (scaleDiff === 0) {
                scaleDiff = 0.01;
              }
              _this.zoomImage(actualSizeScale, scaleDiff, false, true);
            }
            _this.manageActualPixelClassNames();
            _this.core.outer.addClass('lg-zoomed');
          }
          _this.core.touchAction = undefined;
        }
      });
    };
    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY, touchDuration) {
      var distanceXnew = endCoords.x - startCoords.x;
      var distanceYnew = endCoords.y - startCoords.y;
      var speedX = Math.abs(distanceXnew) / touchDuration + 1;
      var speedY = Math.abs(distanceYnew) / touchDuration + 1;
      if (speedX > 2) {
        speedX += 1;
      }
      if (speedY > 2) {
        speedY += 1;
      }
      distanceXnew = distanceXnew * speedX;
      distanceYnew = distanceYnew * speedY;
      var _LGel = this.core.getSlideItem(this.core.index).find('.lg-img-wrap').first();
      var distance = {};
      distance.x = this.left + distanceXnew;
      distance.y = this.top + distanceYnew;
      var possibleSwipeCords = this.getPossibleSwipeDragCords();
      if (Math.abs(distanceXnew) > 15 || Math.abs(distanceYnew) > 15) {
        if (allowY) {
          if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
            distance.y = possibleSwipeCords.minY;
          } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
            distance.y = possibleSwipeCords.maxY;
          }
        }
        if (allowX) {
          if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
            distance.x = possibleSwipeCords.minX;
          } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
            distance.x = possibleSwipeCords.maxX;
          }
        }
        if (allowY) {
          this.top = distance.y;
        } else {
          distance.y = this.top;
        }
        if (allowX) {
          this.left = distance.x;
        } else {
          distance.x = this.left;
        }
        this.setZoomSwipeStyles(_LGel, distance);
        this.positionChanged = true;
      }
    };
    Zoom.prototype.getZoomSwipeCords = function (startCoords, endCoords, allowX, allowY, possibleSwipeCords) {
      var distance = {};
      if (allowY) {
        distance.y = this.top + (endCoords.y - startCoords.y);
        if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
          var diffMinY = possibleSwipeCords.minY - distance.y;
          distance.y = possibleSwipeCords.minY - diffMinY / 6;
        } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
          var diffMaxY = distance.y - possibleSwipeCords.maxY;
          distance.y = possibleSwipeCords.maxY + diffMaxY / 6;
        }
      } else {
        distance.y = this.top;
      }
      if (allowX) {
        distance.x = this.left + (endCoords.x - startCoords.x);
        if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
          var diffMinX = possibleSwipeCords.minX - distance.x;
          distance.x = possibleSwipeCords.minX - diffMinX / 6;
        } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
          var difMaxX = distance.x - possibleSwipeCords.maxX;
          distance.x = possibleSwipeCords.maxX + difMaxX / 6;
        }
      } else {
        distance.x = this.left;
      }
      return distance;
    };
    Zoom.prototype.isBeyondPossibleLeft = function (x, minX) {
      return x >= minX;
    };
    Zoom.prototype.isBeyondPossibleRight = function (x, maxX) {
      return x <= maxX;
    };
    Zoom.prototype.isBeyondPossibleTop = function (y, minY) {
      return y >= minY;
    };
    Zoom.prototype.isBeyondPossibleBottom = function (y, maxY) {
      return y <= maxY;
    };
    Zoom.prototype.isImageSlide = function (index) {
      var currentItem = this.core.galleryItems[index];
      return this.core.getSlideType(currentItem) === 'image';
    };
    Zoom.prototype.getPossibleSwipeDragCords = function (scale) {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var bottom = this.core.mediaContainerPosition.bottom;
      var imgRect = $image.get().getBoundingClientRect();
      var imageHeight = imgRect.height;
      var imageWidth = imgRect.width;
      if (scale) {
        imageHeight = imageHeight + scale * imageHeight;
        imageWidth = imageWidth + scale * imageWidth;
      }
      var minY = (imageHeight - this.containerRect.height) / 2;
      var maxY = (this.containerRect.height - imageHeight) / 2 + bottom;
      var minX = (imageWidth - this.containerRect.width) / 2;
      var maxX = (this.containerRect.width - imageWidth) / 2;
      var possibleSwipeCords = {
        minY: minY,
        maxY: maxY,
        minX: minX,
        maxX: maxX
      };
      return possibleSwipeCords;
    };
    Zoom.prototype.setZoomSwipeStyles = function (LGel, distance) {
      LGel.css('transform', 'translate3d(' + distance.x + 'px, ' + distance.y + 'px, 0)');
    };
    Zoom.prototype.zoomSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime = new Date();
      var endTime = new Date();
      var possibleSwipeCords;
      var _LGel;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.$inner.on('touchstart.lg', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide(_this.core.index)) {
          return;
        }
        $item = _this.core.getSlideItem(_this.core.index);
        if ((_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) && e.touches.length === 1 && _this.core.outer.hasClass('lg-zoomed')) {
          e.preventDefault();
          startTime = new Date();
          _this.core.touchAction = 'zoomSwipe';
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(0);
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (allowX || allowY) {
            startCoords = _this.getSwipeCords(e);
          }
          possibleSwipeCords = _this.getPossibleSwipeDragCords();
          // reset opacity and transition duration
          _this.core.outer.addClass('lg-zoom-dragging lg-zoom-drag-transition');
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.touches.length === 1 && _this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          _this.core.touchAction = 'zoomSwipe';
          endCoords = _this.getSwipeCords(e);
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            isMoved = true;
            _this.setZoomSwipeStyles(_LGel, distance);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          _this.core.touchAction = undefined;
          _this.core.outer.removeClass('lg-zoom-dragging');
          if (!isMoved) {
            return;
          }
          isMoved = false;
          endTime = new Date();
          var touchDuration = endTime.valueOf() - startTime.valueOf();
          _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration);
        }
      });
    };
    Zoom.prototype.zoomDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDragging = false;
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime;
      var endTime;
      var possibleSwipeCords;
      var _LGel;
      this.core.outer.on('mousedown.lg.zoom', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide(_this.core.index)) {
          return;
        }
        var $item = _this.core.getSlideItem(_this.core.index);
        if (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) {
          startTime = new Date();
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(0);
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (_this.core.outer.hasClass('lg-zoomed')) {
            if (_this.$LG(e.target).hasClass('lg-object') && (allowX || allowY)) {
              e.preventDefault();
              startCoords = _this.getDragCords(e);
              possibleSwipeCords = _this.getPossibleSwipeDragCords();
              isDragging = true;
              _this.core.outer.removeClass('lg-grab').addClass('lg-grabbing lg-zoom-drag-transition lg-zoom-dragging');
              // reset opacity and transition duration
            }
          }
        }
      });

      this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          isMoved = true;
          endCoords = _this.getDragCords(e);
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          _this.setZoomSwipeStyles(_LGel, distance);
        }
      });
      this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          endTime = new Date();
          isDragging = false;
          _this.core.outer.removeClass('lg-zoom-dragging');
          // Fix for chrome mouse move on click
          if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
            endCoords = _this.getDragCords(e);
            var touchDuration = endTime.valueOf() - startTime.valueOf();
            _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration);
          }
          isMoved = false;
        }
        _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
      });
    };
    Zoom.prototype.closeGallery = function () {
      this.resetZoom();
    };
    Zoom.prototype.destroy = function () {
      // Unbind all events added by lightGallery zoom plugin
      this.$LG(window).off(".lg.zoom.global" + this.core.lgId);
      this.core.LGel.off('.lg.zoom');
      this.core.LGel.off('.zoom');
      clearTimeout(this.zoomableTimeout);
      this.zoomableTimeout = false;
    };
    return Zoom;
  }();
  var header = document.querySelector('header');
  var menu = document.querySelector('.rs-header');
  var offset = menu.offsetTop;
  function gsapAnimations() {
    var parallaxElements = document.querySelectorAll('.parallax');
    var mm = gsap.matchMedia();
    mm.add('(min-width: 767.98px)', function () {
      parallaxElements.forEach(function (element) {
        var animElem = element.querySelector('img');
        gsap.to(animElem, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          },
          y: 200
        });
      });
    });
  }

  // scroll block to left
  // const block = document.querySelector('.rs-scope');
  // if (block) {
  // 	const items = block.querySelector('.rs-scope__items');
  // 	let tl = gsap.timeline({
  // 		scrollTrigger: {
  // 			trigger: block,
  // 			start: 'top top',
  // 			end: '+=1500px',
  // 			pin: true,
  // 			scrub: 0.8,
  // 		},
  // 		ease: "none",
  // 	});
  // 	tl.to(items, {
  // 		x: () => {
  // 			const containerWidth = document.querySelector('.rs-header__container').offsetWidth;
  // 			const scrollWidth = items.offsetWidth - containerWidth;
  // 			return -scrollWidth;
  // 		},
  // 	});
  // }

  // gsap.fromTo(animElem, {scale: 1, opacity: 0}, {
  // 	scale: 1.3, opacity: 1,
  // 	scrollTrigger: {
  // 		trigger: animElem,
  // 	},
  // });

  //parallax
  // const parallaxElements = document.querySelectorAll('.rs-parallax');
  // parallaxElements.forEach(element => {
  // 	const animElem = element.querySelector('.rs-parallax__wrapper img');
  // 	gsap.from(animElem, {
  // 		scrollTrigger: {
  // 			trigger: element,
  // 			start: 'top bottom',
  // 			end: 'top top',
  // 			scrub: 0.8,
  // 		},
  // 		scale: 1.3,
  // 		transformOrigin: 'left top'
  // 	});
  // });

  // const pathElements = gsap.utils.toArray('.walkthrough-line svg path');
  // const spanElements = gsap.utils.toArray('.walkthrough-line span');

  // pathElements.forEach(element => {
  // 	const len = element.getTotalLength();
  // 	gsap.set(element, {strokeDasharray: len, strokeDashoffset: len});
  // });

  // let tl = gsap.timeline({
  // 	scrollTrigger: {
  // 		trigger: '.rs-services',
  // 		scrub: 0.5,
  // 		start: '+=200 bottom',
  // 		end: 'bottom center',
  // 	},
  // });
  // tl.to(pathElements[0], {strokeDashoffset: 0});
  // tl.to(pathElements[1], {strokeDashoffset: 0}, '<');
  // tl.to(pathElements[2], {strokeDashoffset: 0}, '<');
  // tl.to(spanElements[0], {height: '100%'});
  // tl.to(spanElements[1], {height: '100%'}, '<');
  // tl.to(spanElements[2], {height: '100%'}, '<');
  // tl.to(pathElements[3], {strokeDashoffset: 0});
  // tl.to(pathElements[4], {strokeDashoffset: 0}, '<');
  // tl.to(pathElements[5], {strokeDashoffset: 0}, '<');
  // tl.to(pathElements[6], {strokeDashoffset: 0});
  // tl.to(pathElements[7], {strokeDashoffset: 0}, '<');

  // const trigger = document.querySelector('.product-banners-wrapper');
  // const elements = gsap.utils.toArray('.rs-product-banner');

  // if (trigger && window.innerWidth > 767) {
  // 	let tl = gsap.timeline({
  // 		scrollTrigger: {
  // 			trigger: trigger,
  // 			start: 'top top',
  // 			end: '+=2000px',
  // 			pin: true,
  // 			scrub: 0.8,
  // 		},
  // 		ease: 'none',
  // 	});

  // 	tl.to(elements[0], {
  // 		scale: 0.7,
  // 	});
  // 	tl.to(elements[1], {
  // 		yPercent: -100,
  // 	});
  // 	tl.to(elements[1], {
  // 		scale: 0.75,
  // 	});
  // }

  function animatePage() {
    var elements = gsap.utils.toArray('[data-animate]');
    elements.forEach(function (el) {
      animateNamed(el);
      gsap.from(el, {
        scrollTrigger: {
          start: '200px bottom',
          trigger: el,
          onEnter: function onEnter() {
            return el.classList.add('in-view');
          }
        }
      });
    });

    //data animate stager
    var stagerElements = gsap.utils.toArray('[data-animate-stager]');
    stagerElements.forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: {
          start: '200px bottom',
          trigger: el,
          onEnter: function onEnter() {
            return el.classList.add('in-view');
          }
        }
      });
      var stagerChildrens = Array.from(el.children);
      stagerChildrens.forEach(function (children, index) {
        animateStagerNamed(children, index);
      });
    });
  }
  function animateNamed(element) {
    element.style.cssText += "--animateName: ".concat(element.dataset.animate);
    if (element.dataset.animateDuration) {
      element.style.cssText += "--animateDuration: ".concat(element.dataset.animateDuration, "s");
    }
    if (element.dataset.animateDelay) {
      element.style.cssText += "--animateDelay: ".concat(element.dataset.animateDelay, "s");
    }
  }
  function animateStagerNamed(element, index) {
    element.style.cssText += "--animateName: ".concat(element.parentNode.dataset.animateStager, ";");
    if (element.parentNode.dataset.animateDuration) {
      element.style.cssText += "--animateDuration: ".concat(element.parentNode.dataset.animateDuration, "s");
    }
    if (element.parentNode.dataset.animateDelay) {
      var delay = +element.parentNode.dataset.animateDelay + (index + 1) * 0.2;
      element.style.cssText += "--animateDelay: ".concat(delay, "s");
    } else {
      element.style.cssText += "--animateDelay: ".concat((index + 1) * 0.2, "s");
    }
  }

  // GSAP SCROLL TIRGGER
  // const elements = gsap.utils.toArray('[data-animate]');
  // elements.forEach(el => {
  // 	animateNamed(el);
  // 	gsap.from(el, {
  // 		scrollTrigger: {
  // 			start: '150px bottom',
  // 			trigger: el,
  // 			onEnter: () => el.classList.add('in-view'),
  // 		},
  // 	});
  // });
  //data animate stager
  // const stagerElements = gsap.utils.toArray('[data-animate-stager]');
  // stagerElements.forEach(el => {
  // 	gsap.from(el, {
  // 		scrollTrigger: {
  // 			start: '150px bottom',
  // 			trigger: el,
  // 			onEnter: () => el.classList.add('in-view'),
  // 		},
  // 	});

  // 	const stagerChildrens = Array.from(el.children);
  // 	stagerChildrens.forEach((children, index) => {
  // 		animateStagerNamed(children, index);
  // 	});
  // });

  // INTERSECTIONOBSERVER
  // const options = {
  // 	root: document,
  // 	threshold: [0.2],
  // };
  // let observer = new IntersectionObserver(onEntry, options);

  // // data animate
  // let elements = document.querySelectorAll('[data-animate]');
  // let elementsStager = document.querySelectorAll('[data-animate-stager]');

  // for (let elm of elements) {
  // 	observer.observe(elm);
  // 	animateNamed(elm);
  // }

  // for (let elm of elementsStager) {
  // 	observer.observe(elm);
  // 	const stagerChildrens = Array.from(elm.children);
  // 	stagerChildrens.forEach((children, index) => {
  // 		animateStagerNamed(children, index);
  // 	});
  // }

  // function onEntry(entry) {
  // 	entry.forEach(change => {
  // 		if (change.isIntersecting) {
  // 			change.target.classList.add('in-view');
  // 		}
  // 	});
  // }

  //import './libs/anchor-links';

  //import {HistorySlider} from './plugins//HistorySlider.js';

  var isMobile$1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //const is_safari = /safari/.test(getBrowser().toLowerCase());
  // if (is_safari) {
  // 	document.body.classList.remove('page-animate');
  // }

  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener('load', function (e) {
    mainClickActions();
    initSliders();
    //stickyHeader();
    gsapAnimations();
    //initGallery();
    //preloader();
    //customCursor();
    phoneInput();
    animatePage();
    checkViewport();
    //stickyContent();
    //countdownTimer();
    lenisSmoothScroll();
    document.body.classList.add('loaded');

    // play video
    var playBtn = document.querySelector('.rs-video__video button');
    var video = document.querySelector('.rs-video__video video');
    if (playBtn) {
      playBtn.addEventListener('click', play);
    }
    function play() {
      if (video.paused) {
        //video.setAttribute('controls', true);
        video.play();
        playBtn.classList.add('o');
      } else {
        video.pause();
        playBtn.classList.remove('o');
      }
    }
    $('[data-showmore-button]').click(function () {
      $(this).prev().slideToggle('slow', tirggerResizeContent).prev().removeClass('masked');
      $(this).hide();
    });
  });
  function tirggerResizeContent() {
    lenis.resize();
    ScrollTrigger.refresh();
  }
});