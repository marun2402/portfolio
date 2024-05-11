function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,n=function(){};return{s:n,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(s)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}!function(e){"function"==typeof define&&define.amd?define("app",e):e()}((function(){"use strict";var e=document.querySelectorAll("[data-spollers]");if(e.length>0){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach((function(e){e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),r(e),e.addEventListener("click",o)):(e.classList.remove("_init"),r(e,!1),e.removeEventListener("click",o))}))},r=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=e.querySelectorAll("[data-spoller]");r.length>0&&r.forEach((function(e){t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)}))},o=function(e){var t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){var r=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),o=r.closest("[data-spollers]"),a=!!o.hasAttribute("data-one-spoller");o.querySelectorAll("._slide").length||(a&&!r.classList.contains("_active")&&n(o),r.classList.toggle("_active"),d(r.nextElementSibling,500)),e.preventDefault()}},n=function(e){var t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),c(t.nextElementSibling,500))},a=Array.from(e).filter((function(e,t,r){return!e.dataset.spollers.split(",")[0]}));a.length>0&&t(a);var i=Array.from(e).filter((function(e,t,r){return e.dataset.spollers.split(",")[0]}));if(i.length>0){var s=[];i.forEach((function(e){var t={},r=e.dataset.spollers.split(",");t.value=r[0],t.type=r[1]?r[1].trim():"max",t.item=e,s.push(t)}));var l=s.map((function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type}));(l=l.filter((function(e,t,r){return r.indexOf(e)===t}))).forEach((function(e){var r=e.split(","),o=r[1],n=r[2],a=window.matchMedia(r[0]),i=s.filter((function(e){if(e.value===o&&e.type===n)return!0}));a.addListener((function(){t(i,a)})),t(i,a)}))}}var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout((function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t))},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e.hidden?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);var r=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=r+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout((function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t)}}(e,t):c(e,t)};function u(e){return e.value.replace(/\D/g,"")}function f(e){var t=e.target,r=u(t),o="",n=t.selectionStart;if(!r)return t.value="";if(t.value.length==n){if(["7","8","9"].indexOf(r[0])>-1)"9"==r[0]&&(r="7"+r),o=("8"==r[0]?"8":"+7")+" ",r.length>1&&(o+="("+r.substring(1,4)),r.length>=5&&(o+=") "+r.substring(4,7)),r.length>=8&&(o+="-"+r.substring(7,9)),r.length>=10&&(o+="-"+r.substring(9,11));else o="+"+r;t.value=o}else e.data&&/\D/g.test(e.data)&&(t.value=r)}function y(e){var t=e.target;8==e.keyCode&&1==u(t).length&&(t.value="")}function m(e){var t=e.clipboardData||window.clipboardData,r=e.target,o=u(r);if(t){var n=t.getData("Text");/\D/g.test(n)&&(r.value=o)}}var p=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function v(e){var t=e.target;window.innerWidth>991&&p&&(t.closest(".menu__dropdown-arrow")&&t.closest(".menu__dropdown").classList.toggle("hover"),t.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach((function(e,t){e.classList.remove("hover")}))),window.innerWidth<=991&&(t.closest(".menu-burger")&&(t.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),t.closest(".mobile-menu-close")&&(document.querySelector(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active"))),window.innerWidth<=991&&(t.closest(".filter-show-button")&&document.body.classList.add("filters-opened"),t.closest(".filter-hide-button")&&document.body.classList.remove("filters-opened")),window.innerWidth<=991&&(t.closest(".menu__dropdown-arrow")&&t.nextElementSibling.classList.add("is-active"),t.closest(".switch-back")&&t.parentNode.classList.remove("is-active"));document.querySelector(".header-search");var r=document.querySelector(".header-search__input");t.closest(".header-search-open")&&(document.body.classList.contains("search-is-open")?document.body.classList.remove("search-is-open"):(document.body.classList.add("search-is-open"),r.focus())),document.body.classList.contains("search-is-open")&&(t.closest(".rs-header__search")||document.body.classList.remove("search-is-open"),t.closest(".header-search__reset")&&document.body.classList.remove("search-is-open")),p&&t.closest(".lang-picker")&&t.closest(".lang-picker").classList.toggle("hover")}function g(){var e;(e=document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)'))&&e.forEach((function(e){e.parentElement.classList.add("swiper"),e.classList.add("swiper-wrapper");var t,r=_createForOfIteratorHelper(e.children);try{for(r.s();!(t=r.n()).done;)t.value.classList.add("swiper-slide")}catch(e){r.e(e)}finally{r.f()}})),document.querySelectorAll(".rs-slider").forEach((function(e){new h(e)}))}var h=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.render()}return _createClass(e,[{key:"render",value:function(){new Swiper(this.$slider,{slidesPerView:1,spaceBetween:0,autoHeight:!1,speed:800,loop:!1,effect:"fade",fadeEffect:{crossFade:!0},autoplay:{delay:7e3}})}}]),e}();gsap.registerPlugin(ScrollTrigger,CustomEase,ScrollToPlugin),window.addEventListener("load",(function(e){document.addEventListener("click",v),g(),function(){document.addEventListener("scroll",(function(o){var n=window.pageYOffset;n>t?e.classList.add("sticky"):e.classList.remove("sticky"),n<r?e.classList.add("out"):e.classList.remove("out"),r=n}));var e=document.querySelector("header"),t=e.offsetTop,r=0}(),gsap.utils.toArray("[data-check-view], .tlt").forEach((function(e){var t=e.getAttribute("data-check-view")?e.getAttribute("data-check-view"):"20%";gsap.from(e,{scrollTrigger:{start:"".concat(t," bottom"),trigger:e,onEnter:function(){e.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate]").forEach((function(e){var t;(t=e).style.cssText+="--animateName: ".concat(t.dataset.animate),t.dataset.animateDuration&&(t.style.cssText+="--animateDuration: ".concat(t.dataset.animateDuration,"s")),t.dataset.animateDelay&&(t.style.cssText+="--animateDelay: ".concat(t.dataset.animateDelay,"s")),gsap.from(e,{scrollTrigger:{start:"150px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate-stager]").forEach((function(e){gsap.from(e,{scrollTrigger:{start:"150px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}}),Array.from(e.children).forEach((function(e,t){!function(e,t){if(e.style.cssText+="--animateName: ".concat(e.parentNode.dataset.animateStager,";"),e.parentNode.dataset.animateDuration&&(e.style.cssText+="--animateDuration: ".concat(e.parentNode.dataset.animateDuration,"s")),e.parentNode.dataset.animateDelay){var r=+e.parentNode.dataset.animateDelay+.2*(t+1);e.style.cssText+="--animateDelay: ".concat(r,"s")}else e.style.cssText+="--animateDelay: ".concat(.2*(t+1),"s")}(e,t)}))})),function(){for(var e=document.querySelectorAll("input[data-tel-input]"),t=0;t<e.length;t++){var r=e[t];r.oninput=f,r.onkeydown=y,r.onpaste=m}}(),document.body.classList.add("loaded");var t=document.querySelectorAll(".marquee");t&&t.forEach((function(e){var t=e.querySelector(".marquee__scroller");Array.from(t.children).forEach((function(e){var r=e.cloneNode(!0);r.setAttribute("aria-hidden",!0),t.insertBefore(r,t.firstElementChild)}))})),$(".main-menu > button").click((function(){$(this).next().slideToggle().toggleClass("active"),$(this).toggleClass("active")}))}))}));