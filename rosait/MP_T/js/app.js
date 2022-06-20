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
  'use strict';

  var ProjectSlider = /*#__PURE__*/function () {
    function ProjectSlider($component) {
      _classCallCheck(this, ProjectSlider);

      this.$component = $component;
      this.$slider = $component.querySelector('.projects-slider');
      this.$labels = this.$slider.querySelectorAll('.projects-item__label');
      this.$arrowNext = this.$component.querySelector('.rs-projects__arrow_next');
      this.$arrowPrev = this.$component.querySelector('.rs-projects__arrow_prev');
      this.$paging = this.$component.querySelector('.rs-projects__paging');
      this.render();
    }

    _createClass(ProjectSlider, [{
      key: "render",
      value: function render() {
        var _this = this;

        new Swiper(this.$slider, {
          observer: true,
          observeParents: true,
          slidesPerView: 1,
          spaceBetween: 55,
          speed: 800,
          loop: false,
          simulateTouch: false,
          navigation: {
            nextEl: this.$arrowNext,
            prevEl: this.$arrowPrev
          },
          pagination: {
            el: this.$paging,
            clickable: true,
            bulletActiveClass: 'active',
            bulletClass: 'rs-projects__pagging-bullet',
            renderBullet: function renderBullet(index, className) {
              return "<span class=\"".concat(className, " rs-projects__pagging-bullet\">").concat(_this.$labels[index].innerHTML, "</span>");
            }
          }
        });
      }
    }]);

    return ProjectSlider;
  }();

  var ProjectItemSlider = /*#__PURE__*/function () {
    function ProjectItemSlider($component) {
      _classCallCheck(this, ProjectItemSlider);

      this.$component = $component;
      this.$slider = $component.querySelector('.projects-item-slider');
      this.$arrowNext = this.$component.querySelector('.projects-item__arrow_next');
      this.$arrowPrev = this.$component.querySelector('.projects-item__arrow_prev');
      this.render();
    }

    _createClass(ProjectItemSlider, [{
      key: "render",
      value: function render() {
        new Swiper(this.$slider, {
          slidesPerView: 1,
          speed: 800,
          navigation: {
            nextEl: this.$arrowNext,
            prevEl: this.$arrowPrev
          }
        });
      }
    }]);

    return ProjectItemSlider;
  }();

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var simpleParallax = createCommonjsModule(function (module, exports) {
    !function (t, e) {
      module.exports = e();
    }(window, function () {
      return function (t) {
        var e = {};

        function n(i) {
          if (e[i]) return e[i].exports;
          var o = e[i] = {
            i: i,
            l: !1,
            exports: {}
          };
          return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
        }

        return n.m = t, n.c = e, n.d = function (t, e, i) {
          n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
          });
        }, n.r = function (t) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(t, "__esModule", {
            value: !0
          });
        }, n.t = function (t, e) {
          if (1 & e && (t = n(t)), 8 & e) return t;
          if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
          var i = Object.create(null);
          if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: t
          }), 2 & e && "string" != typeof t) for (var o in t) {
            n.d(i, o, function (e) {
              return t[e];
            }.bind(null, o));
          }
          return i;
        }, n.n = function (t) {
          var e = t && t.__esModule ? function () {
            return t.default;
          } : function () {
            return t;
          };
          return n.d(e, "a", e), e;
        }, n.o = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }, n.p = "", n(n.s = 0);
      }([function (t, e, n) {
        n.r(e), n.d(e, "default", function () {
          return x;
        });

        var i = function i() {
          return Element.prototype.closest && "IntersectionObserver" in window;
        };

        function o(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
          }
        }

        var s = new (function () {
          function t() {
            !function (t, e) {
              if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.positions = {
              top: 0,
              bottom: 0,
              height: 0
            };
          }

          var e, n;
          return e = t, (n = [{
            key: "setViewportTop",
            value: function value(t) {
              return this.positions.top = t ? t.scrollTop : window.pageYOffset, this.positions;
            }
          }, {
            key: "setViewportBottom",
            value: function value() {
              return this.positions.bottom = this.positions.top + this.positions.height, this.positions;
            }
          }, {
            key: "setViewportAll",
            value: function value(t) {
              return this.positions.top = t ? t.scrollTop : window.pageYOffset, this.positions.height = t ? t.clientHeight : document.documentElement.clientHeight, this.positions.bottom = this.positions.top + this.positions.height, this.positions;
            }
          }]) && o(e.prototype, n), t;
        }())(),
            r = function r(t) {
          return NodeList.prototype.isPrototypeOf(t) || HTMLCollection.prototype.isPrototypeOf(t) ? Array.from(t) : "string" == typeof t || t instanceof String ? document.querySelectorAll(t) : [t];
        },
            a = function () {
          for (var t, e = "transform webkitTransform mozTransform oTransform msTransform".split(" "), n = 0; void 0 === t;) {
            t = void 0 !== document.createElement("div").style[e[n]] ? e[n] : void 0, n += 1;
          }

          return t;
        }(),
            l = function l(t) {
          return "video" === t.tagName.toLowerCase() || !!t && !!t.complete && (void 0 === t.naturalWidth || 0 !== t.naturalWidth);
        };

        function u(t) {
          return function (t) {
            if (Array.isArray(t)) return c(t);
          }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
          }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return c(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(t, e);
          }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function c(t, e) {
          (null == e || e > t.length) && (e = t.length);

          for (var n = 0, i = new Array(e); n < e; n++) {
            i[n] = t[n];
          }

          return i;
        }

        function h(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
          }
        }

        var f = function () {
          function t(e, n) {
            var i = this;
            !function (t, e) {
              if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.element = e, this.elementContainer = e, this.settings = n, this.isVisible = !0, this.isInit = !1, this.oldTranslateValue = -1, this.init = this.init.bind(this), l(e) ? this.init() : this.element.addEventListener("load", function () {
              setTimeout(function () {
                i.init(!0);
              }, 50);
            });
          }

          var e, n;
          return e = t, (n = [{
            key: "init",
            value: function value(t) {
              var e = this;
              this.isInit || (t && (this.rangeMax = null), this.element.closest(".simpleParallax") || (!1 === this.settings.overflow && this.wrapElement(this.element), this.setTransformCSS(), this.getElementOffset(), this.intersectionObserver(), this.getTranslateValue(), this.animate(), this.settings.delay > 0 && setTimeout(function () {
                e.setTransitionCSS();
              }, 10), this.isInit = !0));
            }
          }, {
            key: "wrapElement",
            value: function value() {
              var t = this.settings.customWrapper && this.element.closest(this.settings.customWrapper),
                  e = this.element.closest("picture") || this.element,
                  n = document.createElement("div");
              t && (n = this.element.closest(this.settings.customWrapper)), n.classList.add("simpleParallax"), n.style.overflow = "hidden", t || (e.parentNode.insertBefore(n, e), n.appendChild(e)), this.elementContainer = n;
            }
          }, {
            key: "unWrapElement",
            value: function value() {
              var t = this.elementContainer;
              this.settings.customWrapper && this.element.closest(this.settings.customWrapper) ? (t.classList.remove("simpleParallax"), t.style.overflow = "") : t.replaceWith.apply(t, u(t.childNodes));
            }
          }, {
            key: "setTransformCSS",
            value: function value() {
              !1 === this.settings.overflow && (this.element.style[a] = "scale(".concat(this.settings.scale, ")")), this.element.style.willChange = "transform";
            }
          }, {
            key: "setTransitionCSS",
            value: function value() {
              this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition);
            }
          }, {
            key: "unSetStyle",
            value: function value() {
              this.element.style.willChange = "", this.element.style[a] = "", this.element.style.transition = "";
            }
          }, {
            key: "getElementOffset",
            value: function value() {
              var t = this.elementContainer.getBoundingClientRect();

              if (this.elementHeight = t.height, this.elementTop = t.top + s.positions.top, this.settings.customContainer) {
                var e = this.settings.customContainer.getBoundingClientRect();
                this.elementTop = t.top - e.top + s.positions.top;
              }

              this.elementBottom = this.elementHeight + this.elementTop;
            }
          }, {
            key: "buildThresholdList",
            value: function value() {
              for (var t = [], e = 1; e <= this.elementHeight; e++) {
                var n = e / this.elementHeight;
                t.push(n);
              }

              return t;
            }
          }, {
            key: "intersectionObserver",
            value: function value() {
              var t = {
                root: null,
                threshold: this.buildThresholdList()
              };
              this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), t), this.observer.observe(this.element);
            }
          }, {
            key: "intersectionObserverCallback",
            value: function value(t) {
              var e = this;
              t.forEach(function (t) {
                t.isIntersecting ? e.isVisible = !0 : e.isVisible = !1;
              });
            }
          }, {
            key: "checkIfVisible",
            value: function value() {
              return this.elementBottom > s.positions.top && this.elementTop < s.positions.bottom;
            }
          }, {
            key: "getRangeMax",
            value: function value() {
              var t = this.element.clientHeight;
              this.rangeMax = t * this.settings.scale - t;
            }
          }, {
            key: "getTranslateValue",
            value: function value() {
              var t = ((s.positions.bottom - this.elementTop) / ((s.positions.height + this.elementHeight) / 100)).toFixed(1);
              return t = Math.min(100, Math.max(0, t)), 0 !== this.settings.maxTransition && t > this.settings.maxTransition && (t = this.settings.maxTransition), this.oldPercentage !== t && (this.rangeMax || this.getRangeMax(), this.translateValue = (t / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0), this.oldTranslateValue !== this.translateValue && (this.oldPercentage = t, this.oldTranslateValue = this.translateValue, !0));
            }
          }, {
            key: "animate",
            value: function value() {
              var t,
                  e = 0,
                  n = 0;
              (this.settings.orientation.includes("left") || this.settings.orientation.includes("right")) && (n = "".concat(this.settings.orientation.includes("left") ? -1 * this.translateValue : this.translateValue, "px")), (this.settings.orientation.includes("up") || this.settings.orientation.includes("down")) && (e = "".concat(this.settings.orientation.includes("up") ? -1 * this.translateValue : this.translateValue, "px")), t = !1 === this.settings.overflow ? "translate3d(".concat(n, ", ").concat(e, ", 0) scale(").concat(this.settings.scale, ")") : "translate3d(".concat(n, ", ").concat(e, ", 0)"), this.element.style[a] = t;
            }
          }]) && h(e.prototype, n), t;
        }();

        function m(t) {
          return function (t) {
            if (Array.isArray(t)) return y(t);
          }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
          }(t) || d(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function p(t, e) {
          return function (t) {
            if (Array.isArray(t)) return t;
          }(t) || function (t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
            var n = [],
                i = !0,
                o = !1,
                s = void 0;

            try {
              for (var r, a = t[Symbol.iterator](); !(i = (r = a.next()).done) && (n.push(r.value), !e || n.length !== e); i = !0) {
                ;
              }
            } catch (t) {
              o = !0, s = t;
            } finally {
              try {
                i || null == a.return || a.return();
              } finally {
                if (o) throw s;
              }
            }

            return n;
          }(t, e) || d(t, e) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function d(t, e) {
          if (t) {
            if ("string" == typeof t) return y(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(t, e) : void 0;
          }
        }

        function y(t, e) {
          (null == e || e > t.length) && (e = t.length);

          for (var n = 0, i = new Array(e); n < e; n++) {
            i[n] = t[n];
          }

          return i;
        }

        function v(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
          }
        }

        var g,
            b,
            w = !1,
            T = [],
            x = function () {
          function t(e, n) {
            if (function (t, e) {
              if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), e && i()) {
              if (this.elements = r(e), this.defaults = {
                delay: 0,
                orientation: "up",
                scale: 1.3,
                overflow: !1,
                transition: "cubic-bezier(0,0,0,1)",
                customContainer: !1,
                customWrapper: !1,
                maxTransition: 0
              }, this.settings = Object.assign(this.defaults, n), this.settings.customContainer) {
                var o = p(r(this.settings.customContainer), 1);
                this.customContainer = o[0];
              }

              this.lastPosition = -1, this.resizeIsDone = this.resizeIsDone.bind(this), this.refresh = this.refresh.bind(this), this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this), this.init();
            }
          }

          var e, n;
          return e = t, (n = [{
            key: "init",
            value: function value() {
              var t = this;
              s.setViewportAll(this.customContainer), T = [].concat(m(this.elements.map(function (e) {
                return new f(e, t.settings);
              })), m(T)), w || (this.proceedRequestAnimationFrame(), window.addEventListener("resize", this.resizeIsDone), w = !0);
            }
          }, {
            key: "resizeIsDone",
            value: function value() {
              clearTimeout(b), b = setTimeout(this.refresh, 200);
            }
          }, {
            key: "proceedRequestAnimationFrame",
            value: function value() {
              var t = this;
              s.setViewportTop(this.customContainer), this.lastPosition !== s.positions.top ? (s.setViewportBottom(), T.forEach(function (e) {
                t.proceedElement(e);
              }), g = window.requestAnimationFrame(this.proceedRequestAnimationFrame), this.lastPosition = s.positions.top) : g = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
            }
          }, {
            key: "proceedElement",
            value: function value(t) {
              (this.customContainer ? t.checkIfVisible() : t.isVisible) && t.getTranslateValue() && t.animate();
            }
          }, {
            key: "refresh",
            value: function value() {
              s.setViewportAll(this.customContainer), T.forEach(function (t) {
                t.getElementOffset(), t.getRangeMax();
              }), this.lastPosition = -1;
            }
          }, {
            key: "destroy",
            value: function value() {
              var t = this,
                  e = [];
              T = T.filter(function (n) {
                return t.elements.includes(n.element) ? (e.push(n), !1) : n;
              }), e.forEach(function (e) {
                e.unSetStyle(), !1 === t.settings.overflow && e.unWrapElement();
              }), T.length || (window.cancelAnimationFrame(g), window.removeEventListener("resize", this.refresh));
            }
          }]) && v(e.prototype, n), t;
        }();
      }]).default;
    });
  });
  var simpleParallax$1 = unwrapExports(simpleParallax);
  simpleParallax.simpleParallax;
  /**
   *  app.js
   */

  window.onload = function () {
    $(".service-item__logo").load("img/service/logo2005.svg");
    var image1 = document.querySelectorAll('.rs-career__img:nth-child(1) img');
    var image2 = document.querySelectorAll('.rs-career__img:nth-child(2) img');
    new simpleParallax$1(image1, {
      overflow: true,
      delay: 2,
      orientation: 'up',
      maxTransition: 100,
      transition: 'cubic-bezier(0,0,0,1)'
    });
    new simpleParallax$1(image2, {
      overflow: true,
      delay: 2,
      orientation: 'down',
      maxTransition: 100,
      transition: 'cubic-bezier(0,0,0,1)'
    });
    var controller = new ScrollMagic.Controller(); //baner title

    if (document.querySelector('.rs-baner')) {
      var tl1 = gsap.timeline();
      tl1.to('.rs-baner__title h1', {
        duration: 1,
        y: 0
      });
      tl1.to('.rs-baner__text', {
        duration: 0.5,
        opacity: 1,
        y: 0
      }, '-=0.5');
      tl1.to('.rs-baner__title span', {
        duration: 0.5,
        opacity: 0.2
      }, '-=0.5');
    } //about title


    if (document.querySelector('.rs-about')) {
      var tl2 = gsap.timeline({
        paused: true
      });
      tl2.to('.rs-about__inner .section-title h2', {
        duration: 1,
        y: 0
      });
      tl2.to('.rs-about__text', {
        duration: 0.5,
        opacity: 1,
        y: 0
      }, '-=0.5');
      tl2.to('.rs-about__inner .section-title span', {
        duration: 0.5,
        opacity: 0.2
      }, '-=0.5');
      var jqBar = $('.rs-about');
      var jqBarStatus = true;
      $(window).scroll(function () {
        var scrollEvent = $(window).scrollTop() > jqBar.position().top - $(window).height();

        if (scrollEvent && jqBarStatus) {
          jqBarStatus = false;
          tl2.play();
        }
      });
    } //side-scroll


    if (document.querySelector('.rs-service')) {
      var width = 4470 - $(window).width();
      var tween = TweenMax.to('.rs-service__items', {
        x: -width
      });
      new ScrollMagic.Scene({
        triggerElement: '.rs-service',
        duration: 3000,
        triggerHook: 0
      }).setTween(tween).setPin('.rs-service').addTo(controller);
    } // rs-about line


    if (document.querySelector('.rs-about')) {
      var tween2 = TweenMax.from('.rs-about__path-img', {
        height: 0
      });
      new ScrollMagic.Scene({
        triggerElement: '.rs-about',
        triggerHook: 0.5,
        duration: '100%',
        tweenChanges: true
      }).setTween(tween2).addTo(controller);
    } // rs-metrics line


    if (document.querySelector('.rs-metrics')) {
      var tween3 = TweenMax.from('.rs-metrics__path-img', {
        height: 0
      });
      new ScrollMagic.Scene({
        triggerElement: '.rs-metrics',
        triggerHook: 0.8,
        duration: '100%',
        tweenChanges: true
      }).setTween(tween3).addTo(controller);
    } // rs-service line


    if (document.querySelector('.rs-service')) {
      var tl = gsap.timeline();
      tl.from('.rs-service__path-img', {
        width: 0
      });
      tl.from('.rs-service__path2-img', {
        width: 0
      });
      new ScrollMagic.Scene({
        triggerElement: '.rs-service',
        triggerHook: 0,
        duration: '1800',
        tweenChanges: true
      }).setTween(tl).addTo(controller);
    } // Swiper slider - photostory


    if (document.querySelector('.photostory-slider')) {
      new Swiper('.photostory-slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 15000,
        loop: true,
        autoplay: {
          delay: 0
        },
        on: {
          init: function init() {
            var _this2 = this;

            this.el.addEventListener('mouseenter', function () {
              _this2.autoplay.stop();
            });
            this.el.addEventListener('mouseleave', function () {
              _this2.autoplay.start();
            });
          }
        }
      });
    } //map


    if (document.querySelector('.map')) {
      var points = document.querySelectorAll('.map__points circle');
      var currentPoint = 0;
      setInterval(function () {
        points[currentPoint].classList.remove('hide');
        currentPoint = Math.floor(Math.random() * points.length);
        points[currentPoint].classList.add('hide');
      }, 250);
    } //advantage


    if (document.querySelector('.rs-advantage')) {
      var advantageBlock = document.querySelector('.rs-advantage');
      var advantageItems = advantageBlock.querySelectorAll('.rs-advantage__item');
      advantageItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
          this.classList.add('active');
        });
        item.addEventListener('mouseleave', function () {
          this.classList.remove('active');
        });
      });
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

    if (document.querySelector('.spincrement')) {
      countup('spincrement', {
        from: 1,
        duration: 3000
      });
    }

    if (document.querySelector('.spincrement-plus')) {
      countup('spincrement-plus', {
        from: 1,
        duration: 1000,
        complete: function complete(e) {
          e.text(e.text() + '+');
        }
      });
    } //anchor links smooth scroll


    var anchors = document.querySelectorAll('.rs-anchor-links a[href*="#"]');

    if (anchors) {
      var _iterator = _createForOfIteratorHelper(anchors),
          _step;

      try {
        var _loop = function _loop() {
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
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // Swiper slider - projects


    var projectSliders = document.querySelectorAll('.rs-projects');
    projectSliders.forEach(function (node, index) {
      new ProjectSlider(node);
    });
    var projectItemSliders = document.querySelectorAll('.projects-item');
    projectItemSliders.forEach(function (node, index) {
      new ProjectItemSlider(node);
    }); //click event handling

    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener('click', documentActions);

    function documentActions(e) {
      var targetElement = e.target; //open-close menu burger

      if (window.innerWidth < 992) {
        if (targetElement.closest('.rs-menu-form__burger')) {
          targetElement.closest('.rs-menu-form__burger').classList.toggle('active');
          document.body.classList.toggle('_lock');
          document.querySelector('.rs-menu-form__menu').classList.toggle('active');
        }
      }
    }
  }; //.window-onload

});