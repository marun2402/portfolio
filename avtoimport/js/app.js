function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,_toPropertyKey(r.key),r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){var e=_toPrimitive(t,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _createForOfIteratorHelper(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,o=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){o=!0,a=t},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw a}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}!function(t){"function"==typeof define&&define.amd?define("app",t):t()}((function(){"use strict";var t=function(){return t=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},t.apply(this,arguments)},e=function(){function e(e,n,r){var i=this;this.endVal=n,this.options=r,this.version="2.8.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(t){i.startTime||(i.startTime=t);var e=t-i.startTime;i.remaining=i.duration-e,i.useEasing?i.countDown?i.frameVal=i.startVal-i.easingFn(e,0,i.startVal-i.endVal,i.duration):i.frameVal=i.easingFn(e,i.startVal,i.endVal-i.startVal,i.duration):i.frameVal=i.startVal+(i.endVal-i.startVal)*(e/i.duration);var n=i.countDown?i.frameVal<i.endVal:i.frameVal>i.endVal;i.frameVal=n?i.endVal:i.frameVal,i.frameVal=Number(i.frameVal.toFixed(i.options.decimalPlaces)),i.printValue(i.frameVal),e<i.duration?i.rAF=requestAnimationFrame(i.count):null!==i.finalEndVal?i.update(i.finalEndVal):i.options.onCompleteCallback&&i.options.onCompleteCallback()},this.formatNumber=function(t){var e,n,r,a,s=t<0?"-":"";e=Math.abs(t).toFixed(i.options.decimalPlaces);var o=(e+="").split(".");if(n=o[0],r=o.length>1?i.options.decimal+o[1]:"",i.options.useGrouping){a="";for(var l=3,c=0,u=0,d=n.length;u<d;++u)i.options.useIndianSeparators&&4===u&&(l=2,c=1),0!==u&&c%l==0&&(a=i.options.separator+a),c++,a=n[d-u-1]+a;n=a}return i.options.numerals&&i.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return i.options.numerals[+t]})),r=r.replace(/[0-9]/g,(function(t){return i.options.numerals[+t]}))),s+i.options.prefix+n+r+i.options.suffix},this.easeOutExpo=function(t,e,n,r){return n*(1-Math.pow(2,-10*t/r))*1024/1023+e},this.options=t(t({},this.defaults),r),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof e?document.getElementById(e):e,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined","undefined"!=typeof window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,e):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return i.handleScroll(i)})),window.onscroll=function(){window.onScrollFns.forEach((function(t){return t()}))},this.handleScroll(this)))}return e.prototype.handleScroll=function(t){if(t&&window&&!t.once){var e=window.innerHeight+window.scrollY,n=t.el.getBoundingClientRect(),r=n.top+window.pageYOffset,i=n.top+n.height+window.pageYOffset;i<e&&i>window.scrollY&&t.paused?(t.paused=!1,setTimeout((function(){return t.start()}),t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):(window.scrollY>i||r>e)&&!t.paused&&t.reset()}},e.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;if(Math.abs(e)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},e.prototype.start=function(t){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),t&&(this.options.onCompleteCallback=t),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},e.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},e.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},e.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},e.prototype.printValue=function(t){var e;if(this.el){var n=this.formattingFn(t);if(null===(e=this.options.plugin)||void 0===e?void 0:e.render)this.options.plugin.render(this.el,n);else if("INPUT"===this.el.tagName)this.el.value=n;else"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=n:this.el.innerHTML=n}},e.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},e.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},e.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},e}();document.querySelectorAll(".counter").forEach((function(t){var n,r=t.textContent,i=null===(n=r.toString().match(/\.(\d+)/))||void 0===n?void 0:n[1].length;new e(t,r,{decimalPlaces:i||0,useGrouping:!0,useIndianSeparators:!1,separator:" ",decimal:",",enableScrollSpy:!0,scrollSpyOnce:!0,duration:2})}));var n=gsap.utils.toArray("[data-anchor]");function r(t){return t.value.replace(/\D/g,"")}function i(t){var e=t.target,n=r(e),i="",a=e.selectionStart;if(!n)return e.value="";if(e.value.length==a){if(["7","8","9"].indexOf(n[0])>-1)"9"==n[0]&&(n="7"+n),i=("8"==n[0]?"8":"+7")+" ",n.length>1&&(i+="("+n.substring(1,4)),n.length>=5&&(i+=") "+n.substring(4,7)),n.length>=8&&(i+="-"+n.substring(7,9)),n.length>=10&&(i+="-"+n.substring(9,11));else i="+"+n;e.value=i}else t.data&&/\D/g.test(t.data)&&(e.value=n)}function a(t){var e=t.target;8==t.keyCode&&1==r(e).length&&(e.value="")}function s(t){var e=t.clipboardData||window.clipboardData,n=t.target,i=r(n);if(e){var a=e.getData("Text");/\D/g.test(a)&&(n.value=i)}}n&&n.forEach((function(t){var e=t.getAttribute("href");t.addEventListener("click",(function(t){t.preventDefault(),gsap.to(window,{duration:.8,scrollTo:"#top"==e?0:{y:e,offsetY:107},ease:CustomEase.create("custom","M0,0 C0.5,0 0.546,0.146 0.682,0.358 0.805,0.598 0.929,0.817 1,1 ")})}))}));var o=document.querySelectorAll("[data-spollers]");if(o.length>0){var l=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.forEach((function(t){t=e?t.item:t,e.matches||!e?(t.classList.add("_init"),c(t),t.addEventListener("click",u)):(t.classList.remove("_init"),c(t,!1),t.removeEventListener("click",u))}))},c=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t.querySelectorAll("[data-spoller]");n.length>0&&n.forEach((function(t){e?(t.removeAttribute("tabindex"),t.classList.contains("_active")||(t.nextElementSibling.hidden=!0)):(t.setAttribute("tabindex","-1"),t.nextElementSibling.hidden=!1)}))},u=function(t){var e=t.target;if(e.hasAttribute("data-spoller")||e.closest("[data-spoller]")){var n=e.hasAttribute("data-spoller")?e:e.closest("[data-spoller]"),r=n.closest("[data-spollers]"),i=!!r.hasAttribute("data-one-spoller");r.querySelectorAll("._slide").length||(i&&!n.classList.contains("_active")&&d(r),n.classList.toggle("_active"),y(n.nextElementSibling,500)),t.preventDefault()}},d=function(t){var e=t.querySelector("[data-spoller]._active");e&&(e.classList.remove("_active"),g(e.nextElementSibling,500))},p=Array.from(o).filter((function(t,e,n){return!t.dataset.spollers.split(",")[0]}));p.length>0&&l(p);var h=Array.from(o).filter((function(t,e,n){return t.dataset.spollers.split(",")[0]}));if(h.length>0){var f=[];h.forEach((function(t){var e={},n=t.dataset.spollers.split(",");e.value=n[0],e.type=n[1]?n[1].trim():"max",e.item=t,f.push(e)}));var m=f.map((function(t){return"("+t.type+"-width: "+t.value+"px),"+t.value+","+t.type}));(m=m.filter((function(t,e,n){return n.indexOf(t)===e}))).forEach((function(t){var e=t.split(","),n=e[1],r=e[2],i=window.matchMedia(e[0]),a=f.filter((function(t){if(t.value===n&&t.type===r)return!0}));i.addListener((function(){l(a,i)})),l(a,i)}))}}var g=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;t.classList.contains("_slide")||(t.classList.add("_slide"),t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.height=t.offsetHeight+"px",t.offsetHeight,t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,window.setTimeout((function(){t.hidden=!0,t.style.removeProperty("height"),t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property"),t.classList.remove("_slide")}),e))},y=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return t.hidden?function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!t.classList.contains("_slide")){t.classList.add("_slide"),t.hidden&&(t.hidden=!1);var n=t.offsetHeight;t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,t.offsetHeight,t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.height=n+"px",t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),window.setTimeout((function(){t.style.removeProperty("height"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property"),t.classList.remove("_slide")}),e)}}(t,e):g(t,e)};var v=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function w(t){var e=t.target;v&&(e.closest(".menu__dropdown-arrow")&&e.closest(".menu__dropdown").classList.toggle("hover"),e.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach((function(t,e){t.classList.remove("hover")}))),e.closest(".menu-burger")&&(e.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),e.closest(".mobile-menu-close")&&(document.querySelector(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),e.closest(".menu__dropdown-arrow")&&e.nextElementSibling.classList.add("is-active"),e.closest(".switch-back")&&e.parentNode.classList.remove("is-active");document.querySelector(".header-search");var n=document.querySelector(".header-search input");e.closest(".header-search-open")&&(document.body.classList.contains("search-is-open")?document.body.classList.remove("search-is-open"):(document.body.classList.add("search-is-open"),n.focus())),document.body.classList.contains("search-is-open")&&(e.closest(".rs-header__search")||document.body.classList.remove("search-is-open"),e.closest('.header-search button[type="reset"]')&&document.body.classList.remove("search-is-open")),v&&e.closest(".lang-picker")&&e.closest(".lang-picker").classList.toggle("hover")}function b(){var t;(t=document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)'))&&t.forEach((function(t){t.parentElement.classList.add("swiper"),t.classList.add("swiper-wrapper");var e,n=_createForOfIteratorHelper(t.children);try{for(n.s();!(e=n.n()).done;)e.value.classList.add("swiper-slide")}catch(t){n.e(t)}finally{n.f()}})),document.querySelectorAll(".hero-slider").forEach((function(t){new S(t)})),document.querySelectorAll(".benefit-slider").forEach((function(t){new E(t)})),document.querySelectorAll(".steps-slider").forEach((function(t){new V(t)})),document.querySelectorAll(".catalog-slider").forEach((function(t){new _(t)}))}var S=function(){function t(e){_classCallCheck(this,t),this.$component=e,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.paging=this.$component.querySelector('[class*="-paging"]'),this.render()}return _createClass(t,[{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:1,spaceBetween:0,autoHeight:!1,speed:500,loop:!0,effect:"fade",fadeEffect:{crossFade:!0},autoplay:{delay:7e3},pagination:{bulletClass:"hero-slider-bullet",bulletActiveClass:"hero-slider-bullet-active",el:this.paging,clickable:!0,renderBullet:function(t,e){var n=document.querySelectorAll(".hero-slider .slide:not(.swiper-slide-duplicate)")[t].dataset.title,r=t+1<10?"0"+(t+1):t+1;return'<div class="'.concat(e,'">\n\t\t\t\t\t\t\t\t\t\t<span class="num">').concat(r,'</span>\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<span class="title">').concat(n,"</span>\n\t\t\t\t\t\t\t\t\t</div>")}},navigation:{nextEl:this.arrowNext,prevEl:this.arrowPrev}})}}]),t}(),E=function(){function t(e){_classCallCheck(this,t),this.$component=e,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.renderPaging(),this.render()}return _createClass(t,[{key:"renderPaging",value:function(){var t=this;this.$cardsPaging=this.$component.querySelectorAll(".benefit-card .benefit-card__paging"),this.$cardsPaging.forEach((function(e,n){for(var r=0;r<t.$cardsPaging.length;r++){var i=document.createElement("span");n>=r&&i.classList.add("active"),e.append(i)}}))}},{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:"auto",spaceBetween:15,autoHeight:!1,speed:500,loop:!1,autoplay:{delay:7e3},breakpoints:{767.98:{spaceBetween:40}}})}}]),t}(),V=function(){function t(e){_classCallCheck(this,t),this.$component=e,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.render()}return _createClass(t,[{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:"auto",spaceBetween:15,autoHeight:!1,speed:500,loop:!1,breakpoints:{767.98:{spaceBetween:40}}})}}]),t}(),_=function(){function t(e){_classCallCheck(this,t),this.$component=e,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.renderPaging(),this.render()}return _createClass(t,[{key:"renderPaging",value:function(){var t=this;this.$cardsPaging=this.$component.querySelectorAll(".catalog-card .catalog-card__paging"),this.$cardsPaging.forEach((function(e,n){for(var r=0;r<t.$cardsPaging.length;r++){var i=document.createElement("span");n>=r&&i.classList.add("active"),e.append(i)}}))}},{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:"auto",spaceBetween:15,autoHeight:!1,speed:500,loop:!1,autoplay:{delay:7e3},breakpoints:{767.98:{spaceBetween:40}}})}}]),t}();gsap.registerPlugin(ScrollTrigger,CustomEase,ScrollToPlugin),window.addEventListener("load",(function(t){document.body.classList.add("loaded"),document.addEventListener("click",w),b(),function(){document.addEventListener("scroll",(function(r){var i=window.pageYOffset;i>n+e&&t.classList.add("sticky"),i<=n+e&&t.classList.remove("sticky"),i>848&&document.body.classList.add("sticky-header-display"),i<=848&&document.body.classList.remove("sticky-header-display")}));var t=document.querySelector("header"),e=t.offsetTop,n=t.offsetHeight}(),gsap.utils.toArray("[data-animate]").forEach((function(t){var e,n;n=(e=t).dataset.animate.split(":"),e.style.cssText+="--animateName: ".concat(n[0]),n[1]&&(e.style.cssText+="--animateDuration: ".concat(n[1],"ms")),n[2]&&(e.style.cssText+="--animateDelay: ".concat(n[2],"ms")),gsap.from(t,{scrollTrigger:{start:"25% bottom",trigger:t,onEnter:function(){return t.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate-stager]").forEach((function(t){Array.from(t.children).forEach((function(t,e){!function(t,e){var n=t.parentNode.dataset.animateStager.split(":");if(t.style.cssText+="--animateName: ".concat(n[0],";"),n[2]&&(t.style.cssText+="--animateDuration: ".concat(n[2],"ms")),n[3]){var r=+n[3]+e*n[1];t.style.cssText+="--animateDelay: ".concat(r,"ms")}else t.style.cssText+="--animateDelay: ".concat(e*n[1],"ms")}(t,e),gsap.from(t,{scrollTrigger:{start:"25% bottom",trigger:t,onEnter:function(){return t.classList.add("in-view")}}})}))})),function(){for(var t=document.querySelectorAll("input[data-tel-input]"),e=0;e<t.length;e++){var n=t[e];n.oninput=i,n.onkeydown=a,n.onpaste=s}}(),gsap.utils.toArray("[data-check-view]").forEach((function(t){var e=t.getAttribute("data-check-view")?t.getAttribute("data-check-view"):"15%";gsap.from(t,{scrollTrigger:{start:"".concat(e," bottom"),trigger:t,onEnter:function(){t.classList.add("in-view")}}})})),gsap.matchMedia().add("(min-width: 1024.98px)",(function(){document.querySelectorAll("[data-parallax]").forEach((function(t){gsap.to(t,{scrollTrigger:{trigger:t,start:"top bottom",end:"bottom top",scrub:1.25},y:-145,ease:"none"})}))}))}))}));