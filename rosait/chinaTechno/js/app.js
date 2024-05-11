function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){a=!0,i=e},f:function(){try{s||null==r.return||r.return()}finally{if(a)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}!function(e){"function"==typeof define&&define.amd?define("app",e):e()}((function(){"use strict";$("#scrollTop").on("click",(function(e){e.preventDefault(),$("html,body").animate({scrollTop:0},700)}));var e=document.querySelectorAll("[data-spollers]");if(e.length>0){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach((function(e){e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),r(e),e.addEventListener("click",n)):(e.classList.remove("_init"),r(e,!1),e.removeEventListener("click",n))}))},r=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=e.querySelectorAll("[data-spoller]");r.length>0&&r.forEach((function(e){t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)}))},n=function(e){var t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){var r=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),n=r.closest("[data-spollers]"),i=!!n.hasAttribute("data-one-spoller");n.querySelectorAll("._slide").length||(i&&!r.classList.contains("_active")&&o(n),r.classList.toggle("_active"),u(r.nextElementSibling,500)),e.preventDefault()}},o=function(e){var t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),c(t.nextElementSibling,500))},i=Array.from(e).filter((function(e,t,r){return!e.dataset.spollers.split(",")[0]}));i.length>0&&t(i);var s=Array.from(e).filter((function(e,t,r){return e.dataset.spollers.split(",")[0]}));if(s.length>0){var a=[];s.forEach((function(e){var t={},r=e.dataset.spollers.split(",");t.value=r[0],t.type=r[1]?r[1].trim():"max",t.item=e,a.push(t)}));var l=a.map((function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type}));(l=l.filter((function(e,t,r){return r.indexOf(e)===t}))).forEach((function(e){var r=e.split(","),n=r[1],o=r[2],i=window.matchMedia(r[0]),s=a.filter((function(e){if(e.value===n&&e.type===o)return!0}));i.addListener((function(){t(s,i)})),t(s,i)}))}}var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout((function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t))},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e.hidden?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);var r=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=r+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout((function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t)}}(e,t):c(e,t)};function d(e){return e.value.replace(/\D/g,"")}function p(e){var t=e.target,r=d(t),n="",o=t.selectionStart;if(!r)return t.value="";if(t.value.length==o){if(["7","8","9"].indexOf(r[0])>-1)"9"==r[0]&&(r="7"+r),n=("8"==r[0]?"8":"+7")+" ",r.length>1&&(n+="("+r.substring(1,4)),r.length>=5&&(n+=") "+r.substring(4,7)),r.length>=8&&(n+="-"+r.substring(7,9)),r.length>=10&&(n+="-"+r.substring(9,11));else n="+"+r;t.value=n}else e.data&&/\D/g.test(e.data)&&(t.value=r)}function f(e){var t=e.target;8==e.keyCode&&1==d(t).length&&(t.value="")}function m(e){var t=e.clipboardData||window.clipboardData,r=e.target,n=d(r);if(t){var o=t.getData("Text");/\D/g.test(o)&&(r.value=n)}}var h=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.min=this.$component.dataset.min,this.max=this.$component.dataset.max,this.$slider=this.$component.querySelector(".range-slider__target"),this.inputs=[this.$component.querySelector(".range-slider__value-start"),this.$component.querySelector(".range-slider__value-end")],this.validFormat=wNumb({decimals:0,thousand:" "}),this.render(),this.initInputs()}return _createClass(e,[{key:"initInputs",value:function(){var e=this;this.inputs.forEach((function(t){var r=e;t.addEventListener("input",(function(){this.value=r.validFormat.to(+this.value.replace(/[^\d.]/g,"")),this.value>parseInt(r.max)&&(this.value=this.value.slice(0,-1))}))}))}},{key:"reset",value:function(){this.inputs[0].value=this.min,this.inputs[1].value=this.max,this.$slider.noUiSlider.set([this.inputs[0].value,this.inputs[1].value])}},{key:"render",value:function(){var e=this;noUiSlider.create(this.$slider,{start:[Number(this.min),Number(this.max)],connect:!0,format:this.validFormat,range:{min:Number(this.min),max:Number(this.max)}}),this.inputs.forEach((function(t){var r=e;t.addEventListener("change",(function(e){r.$slider.noUiSlider.set([r.inputs[0].value,r.inputs[1].value])}))})),this.$slider.noUiSlider.on("update",(function(t,r){e.inputs[r].value=t[r],e.inputs[r].dispatchEvent(new Event("input"))}))}}]),e}(),y=document.querySelectorAll(".range-slider"),g=[];y.forEach((function(e,t){g[t]=new h(e)}));var v=document.querySelector(".filter-form");v&&v.addEventListener("reset",(function(){setTimeout((function(){g.forEach((function(e){return e.reset()}))}),10)}));var b=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function _(e){var t=e.target;window.innerWidth>991&&b&&(t.closest(".menu__dropdown-arrow")&&t.closest(".menu__dropdown").classList.toggle("hover"),t.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach((function(e,t){e.classList.remove("hover")}))),window.innerWidth<=991&&(t.closest(".menu-burger")&&(t.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),t.closest(".mobile-menu-close")&&(document.querySelector(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active"))),window.innerWidth<=991&&(t.closest(".filter-show-button")&&document.body.classList.add("filters-opened"),t.closest(".filter-hide-button")&&document.body.classList.remove("filters-opened")),window.innerWidth<=991&&(t.closest(".menu__dropdown-arrow")&&t.nextElementSibling.classList.add("is-active"),t.closest(".switch-back")&&t.parentNode.classList.remove("is-active"));document.querySelector(".header-search");var r=document.querySelector(".header-search__input");t.closest(".header-search-open")&&(document.body.classList.contains("search-is-open")?document.body.classList.remove("search-is-open"):(document.body.classList.add("search-is-open"),r.focus())),document.body.classList.contains("search-is-open")&&(t.closest(".rs-header__search")||document.body.classList.remove("search-is-open"),t.closest(".header-search__reset")&&document.body.classList.remove("search-is-open")),b&&t.closest(".lang-picker")&&t.closest(".lang-picker").classList.toggle("hover")}function w(){var e;(e=document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)'))&&e.forEach((function(e){e.parentElement.classList.add("swiper"),e.classList.add("swiper-wrapper");var t,r=_createForOfIteratorHelper(e.children);try{for(r.s();!(t=r.n()).done;)t.value.classList.add("swiper-slide")}catch(e){r.e(e)}finally{r.f()}})),document.querySelectorAll(".rs-slider").forEach((function(e){new S(e)})),document.querySelectorAll(".catalog-slider, .goods-slider").forEach((function(e){new P(e)})),document.querySelectorAll(".benefit-slider").forEach((function(e){new L(e)}))}var S=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.render()}return _createClass(e,[{key:"render",value:function(){new Swiper(this.$slider,{slidesPerView:1,spaceBetween:0,autoHeight:!1,speed:300,loop:!1,effect:"fade",fadeEffect:{crossFade:!0},autoplay:{delay:5e3},navigation:{nextEl:this.arrowNext,prevEl:this.arrowPrev}})}}]),e}(),P=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.paging=this.$component.querySelector('[class*="-paging"]'),this.render()}return _createClass(e,[{key:"render",value:function(){new Swiper(this.$slider,_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({slidesPerView:"auto",spaceBetween:0},"spaceBetween",20),"autoHeight",!1),"speed",500),"loop",!1),"navigation",{nextEl:this.arrowNext,prevEl:this.arrowPrev}),"pagination",{el:this.paging,type:"progressbar"}),"breakpoints",{768:{spaceBetween:30}}))}}]),e}(),L=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.render()}return _createClass(e,[{key:"render",value:function(){new Swiper(this.$slider,_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({slidesPerView:"auto",spaceBetween:0},"spaceBetween",19),"autoHeight",!1),"speed",900),"loop",!1),"navigation",{nextEl:this.arrowNext,prevEl:this.arrowPrev}))}}]),e}();var E=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.stickyContainer=this.$component.querySelector('[data-sticky="container"]'),this.stickyContent=this.$component.querySelector('[data-sticky="content"]'),this.render()}return _createClass(e,[{key:"render",value:function(){var e=this;gsap.matchMedia().add("(max-width: 991.98px)",(function(){gsap.to(e.stickyContent,{scrollTrigger:{trigger:e.stickyContent,start:"top 87px",end:function(){return"+=".concat(e.stickyContainer.offsetHeight-e.stickyContent.offsetHeight)},pin:!0,scrub:.8,pinSpacing:!1,toggleClass:"is-sticky"}})}))}}]),e}();var x=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$trigger=this.$component.querySelector(".entry"),this.$col1=this.$component.querySelectorAll(".entry__item:nth-child(3n+1)"),this.$col2=this.$component.querySelectorAll(".entry__item:nth-child(3n+2)"),this.$col3=this.$component.querySelectorAll(".entry__item:nth-child(3n+3)"),this.render()}return _createClass(e,[{key:"render",value:function(){var e=this;gsap.matchMedia().add("(min-width: 767.98px)",(function(){var t=gsap.timeline({scrollTrigger:{trigger:e.$trigger,start:"top bottom",end:"center center",scrub:.8},ease:"none"});t.from(e.$col1,{y:100,duration:1},0),t.from(e.$col2,{y:194,duration:1},0),t.from(e.$col3,{y:236,duration:1},0)}))}}]),e}();gsap.registerPlugin(ScrollTrigger,CustomEase,ScrollToPlugin),window.addEventListener("load",(function(e){var t,r,n,o;document.addEventListener("click",_),w(),function(){document.addEventListener("scroll",(function(n){var o=window.pageYOffset;o>t-20?e.classList.add("sticky"):e.classList.remove("sticky"),o<r?e.classList.add("out"):e.classList.remove("out"),r=o}));var e=document.querySelector("header"),t=e.offsetTop,r=0}(),t=document.querySelectorAll("[data-parallax]"),r=document.querySelectorAll("[data-parallax-slider]"),n=document.querySelector(".rs-fos .backstage"),(o=gsap.matchMedia()).add("(min-width: 767.98px)",(function(){t.forEach((function(e){var t=e.querySelector("img, canvas");gsap.to(t,{scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",scrub:!0},yPercent:40,ease:"none"})})),r.forEach((function(e){gsap.to(e,{scrollTrigger:{trigger:e,start:"top top",end:"bottom top",scrub:!0},yPercent:55,ease:"none"})})),n&&gsap.from(n,{scrollTrigger:{trigger:n,start:"bottom bottom",end:"bottom center",scrub:.8},width:"".concat(window.innerWidth,"px"),ease:"none"})})),o.add("(min-width: 991.98px)",(function(){var e=document.querySelector(".rs-product .order"),t=document.querySelector(".rs-product .rs-product__wrapper"),r=document.querySelector(".rs-product .rs-product__order");if(e){var n=function(){r.style.height="".concat(e.offsetHeight,"px")};window.addEventListener("resize",n),n(),gsap.to(e,{scrollTrigger:{trigger:e,start:"bottom+=15px bottom",end:function(){return"+=".concat(t.offsetHeight-e.offsetHeight)},pin:!0,scrub:!0,pinSpacing:!1,toggleClass:"is-sticky"}})}})),document.querySelectorAll(".rs-roll").forEach((function(e){new x(e)})),gsap.utils.toArray("[data-check-view]").forEach((function(e){var t=e.getAttribute("data-check-view")?e.getAttribute("data-check-view"):"20%";gsap.from(e,{scrollTrigger:{start:"".concat(t," bottom"),trigger:e,onEnter:function(){e.classList.add("in-view")}}})})),document.querySelectorAll('[data-sticky="block"]').forEach((function(e){new E(e)})),gsap.utils.toArray("[data-animate]").forEach((function(e){var t;(t=e).style.cssText+="--animateName: ".concat(t.dataset.animate),t.dataset.animateDuration&&(t.style.cssText+="--animateDuration: ".concat(t.dataset.animateDuration,"s")),t.dataset.animateDelay&&(t.style.cssText+="--animateDelay: ".concat(t.dataset.animateDelay,"s")),gsap.from(e,{scrollTrigger:{start:"200px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate-stager]").forEach((function(e){gsap.from(e,{scrollTrigger:{start:"200px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}}),Array.from(e.children).forEach((function(e,t){!function(e,t){if(e.style.cssText+="--animateName: ".concat(e.parentNode.dataset.animateStager,";"),e.parentNode.dataset.animateDuration&&(e.style.cssText+="--animateDuration: ".concat(e.parentNode.dataset.animateDuration,"s")),e.parentNode.dataset.animateDelay){var r=+e.parentNode.dataset.animateDelay+.2*(t+1);e.style.cssText+="--animateDelay: ".concat(r,"s")}else e.style.cssText+="--animateDelay: ".concat(.2*(t+1),"s")}(e,t)}))})),function(){for(var e=document.querySelectorAll("input[data-tel-input]"),t=0;t<e.length;t++){var r=e[t];r.oninput=p,r.onkeydown=f,r.onpaste=m}}(),document.body.classList.add("loaded"),$("#fosForm").length>0&&$("#fosForm").validate({submitHandler:function(e){e.submit()},messages:{fosName:{required:"Введите имя"},fosPhone:{required:"Введите телефон"},fosMail:{required:"Введите E-mail",email:"Введите правильный E-mail"}}}),$(".lettering").lettering("words").children("span").lettering("words"),$('[data-toggle="tab"]').on("click",(function(){setTimeout((function(){ScrollTrigger.refresh(),ScrollTrigger.update()}),300)}))}))}));