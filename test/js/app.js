function _createForOfIteratorHelper(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a=!0,s=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return a=e.done,e},e:function(e){s=!0,n=e},f:function(){try{a||null==o.return||o.return()}finally{if(s)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}!function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?t(require("lightgallery"),require("lightgallery/plugins/zoom")):"function"==typeof define&&define.amd?define("app",["lightgallery","lightgallery/plugins/zoom"],t):t((e=e||self).lightGallery,e.lgZoom)}(this,(function(e,t){"use strict";function o(e,t){return e.match(t)?e.match(t)[2]:null}e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var r=document.querySelectorAll("[data-spollers]");if(r.length>0){var i=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach((function(e){e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),n(e),e.addEventListener("click",a)):(e.classList.remove("_init"),n(e,!1),e.removeEventListener("click",a))}))},n=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=e.querySelectorAll("[data-spoller]");o.length>0&&o.forEach((function(e){t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)}))},a=function(e){var t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){var o=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),r=o.closest("[data-spollers]"),i=!!r.hasAttribute("data-one-spoller");r.querySelectorAll("._slide").length||(i&&!o.classList.contains("_active")&&s(r),o.classList.toggle("_active"),p(o.nextElementSibling,500)),e.preventDefault()}},s=function(e){var t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),f(t.nextElementSibling,500))},l=Array.from(r).filter((function(e,t,o){return!e.dataset.spollers.split(",")[0]}));l.length>0&&i(l);var c=Array.from(r).filter((function(e,t,o){return e.dataset.spollers.split(",")[0]}));if(c.length>0){var d=[];c.forEach((function(e){var t={},o=e.dataset.spollers.split(",");t.value=o[0],t.type=o[1]?o[1].trim():"max",t.item=e,d.push(t)}));var u=d.map((function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type}));(u=u.filter((function(e,t,o){return o.indexOf(e)===t}))).forEach((function(e){var t=e.split(","),o=t[1],r=t[2],n=window.matchMedia(t[0]),a=d.filter((function(e){if(e.value===o&&e.type===r)return!0}));n.addListener((function(){i(a,n)})),i(a,n)}))}}var f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout((function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t))},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e.hidden?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);var o=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=o+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout((function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t)}}(e,t):f(e,t)};function h(e){return e.value.replace(/\D/g,"")}function m(e){var t=e.target,o=h(t),r="",i=t.selectionStart;if(!o)return t.value="";if(t.value.length==i){if(["7","8","9"].indexOf(o[0])>-1)"9"==o[0]&&(o="7"+o),r=("8"==o[0]?"8":"+7")+" ",o.length>1&&(r+="("+o.substring(1,4)),o.length>=5&&(r+=") "+o.substring(4,7)),o.length>=8&&(r+="-"+o.substring(7,9)),o.length>=10&&(r+="-"+o.substring(9,11));else r="+"+o;t.value=r}else e.data&&/\D/g.test(e.data)&&(t.value=o)}function v(e){var t=e.target;8==e.keyCode&&1==h(t).length&&(t.value="")}function g(e){var t=e.clipboardData||window.clipboardData,o=e.target,r=h(o);if(t){var i=t.getData("Text");/\D/g.test(i)&&(o.value=r)}}var y=document.querySelector(".file-upload");if(y){var _=y.querySelector("label");y.querySelector("input").onchange=function(){var e="";(e=this.files&&this.files.length>1?"Выбрано "+this.files.length+" файла(ов)":this.value.replace(/C:\\fakepath\\/i,""))&&(_.innerHTML=e)}}var b=function(){function e(t,o){_classCallCheck(this,e),this.EL="itc-select",this.EL_SHOW="itc-select_show",this.EL_OPTION="itc-select__option",this.EL_OPTION_SELECTED="itc-select__option_selected",this.DATA="[data-select]",this.DATA_TOGGLE='[data-select="toggle"]',this._el="string"==typeof t?document.querySelector(t):t,this._params=o||{},this._onClickFn=this._onClick.bind(this),this._params.options&&(this._el.innerHTML=this.template(this._params),this._el.classList.add(this.EL)),this._elToggle=this._el.querySelector(this.DATA_TOGGLE),this._el.addEventListener("click",this._onClickFn)}return _createClass(e,[{key:"_onClick",value:function(e){var t=e.target,o=t.closest(this.DATA).dataset.select;"toggle"===o?this.toggle():"option"===o&&this._changeValue(t)}},{key:"_updateOption",value:function(e){var t=e.closest(".".concat(this.EL_OPTION)),o=this._el.querySelector(".".concat(this.EL_OPTION_SELECTED));return o&&o.classList.remove(this.EL_OPTION_SELECTED),t.classList.add(this.EL_OPTION_SELECTED),this._elToggle.textContent=t.textContent,this._elToggle.value=t.dataset.value,this._elToggle.dataset.index=t.dataset.index,this._el.dispatchEvent(new CustomEvent("itc.select.change")),this._params.onSelected&&this._params.onSelected(this,t),t.dataset.value}},{key:"_reset",value:function(){var e=this._el.querySelector(".".concat(this.EL_OPTION_SELECTED));return e&&e.classList.remove(this.EL_OPTION_SELECTED),this._elToggle.textContent="Выберите из списка",this._elToggle.value="",this._elToggle.dataset.index="-1",this._el.dispatchEvent(new CustomEvent("itc.select.change")),this._params.onSelected&&this._params.onSelected(this,null),""}},{key:"_changeValue",value:function(e){e.classList.contains(this.EL_OPTION_SELECTED)||(this._updateOption(e),this.hide())}},{key:"show",value:function(){var e=this;document.querySelectorAll(this.EL_SHOW).forEach((function(t){t.classList.remove(e.EL_SHOW)})),this._el.classList.add("".concat(this.EL_SHOW))}},{key:"hide",value:function(){this._el.classList.remove(this.EL_SHOW)}},{key:"toggle",value:function(){this._el.classList.contains(this.EL_SHOW)?this.hide():this.show()}},{key:"dispose",value:function(){this._el.removeEventListener("click",this._onClickFn)}},{key:"value",get:function(){return this._elToggle.value},set:function(e){var t=this,o=!1;this._el.querySelectorAll(".select__option").forEach((function(r){r.dataset.value===e&&(o=!0,t._updateOption(r))})),o||this._reset()}},{key:"selectedIndex",get:function(){return this._elToggle.dataset.index},set:function(e){var t=this._el.querySelector('.select__option[data-index="'.concat(e,'"]'));t&&this._updateOption(t),this._reset()}}],[{key:"template",value:function(e){var t=this,o=e.name,r=e.options,i=e.targetValue,n=[],a=-1,s="",l="Выберите из списка";return r.forEach((function(e,o){var r="";e[0]===i&&(r=" ".concat(t.EL_OPTION_SELECTED),a=o,s=e[0],l=e[1]),n.push('<li class="itc-select__option'.concat(r,'" data-select="option"\n        data-value="').concat(e[0],'" data-index="').concat(o,'">').concat(e[1],"</li>"))})),'<button type="button" class="itc-select__toggle" name="'.concat(o,'"\n      value="').concat(s,'" data-select="toggle" data-index="').concat(a,'">\n      ').concat(l,'</button><div class="itc-select__dropdown">\n      <ul class="itc-select__options">').concat(n.join(""),"</ul></div>")}},{key:"hideOpenSelect",value:function(){var e=this;document.addEventListener("click",(function(t){t.target.closest(".".concat(e.EL))||document.querySelectorAll(".".concat(e.EL_SHOW)).forEach((function(t){t.classList.remove(e.EL_SHOW)}))}))}},{key:"create",value:function(e,t){return this._el="string"==typeof e?document.querySelector(e):e,this._el?new this(e,t):null}}]),e}();var L=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function E(e){var t=e.target;window.innerWidth>991&&L&&(t.closest(".menu__dropdown-arrow")&&t.closest(".menu__dropdown").classList.toggle("hover"),t.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach((function(e,t){e.classList.remove("hover")}))),window.innerWidth<=991&&t.closest(".menu-burger")&&(t.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),window.innerWidth<=991&&(t.closest(".filter-show")&&document.body.classList.add("filters-opened"),t.closest(".filter-hide")&&document.body.classList.remove("filters-opened")),window.innerWidth<=991&&(t.closest(".menu__dropdown-arrow")&&t.nextElementSibling.classList.add("is-active"),t.closest(".switch-back")&&t.parentNode.classList.remove("is-active"));document.querySelector(".header-search");var o=document.querySelector(".header-search__input");t.closest(".header-search-open")&&(document.body.classList.contains("search-is-open")?document.body.classList.remove("search-is-open"):(document.body.classList.add("search-is-open"),o.focus())),document.body.classList.contains("search-is-open")&&(t.closest(".rs-header__search")||document.body.classList.remove("search-is-open"),t.closest(".header-search__reset")&&document.body.classList.remove("search-is-open")),L&&t.closest(".lang-picker")&&t.closest(".lang-picker").classList.toggle("hover")}function w(){var e;(e=document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)'))&&e.forEach((function(e){e.parentElement.classList.add("swiper"),e.classList.add("swiper-wrapper");var t,o=_createForOfIteratorHelper(e.children);try{for(o.s();!(t=o.n()).done;)t.value.classList.add("swiper-slide")}catch(e){o.e(e)}finally{o.f()}})),document.querySelector(".rs-slider__slider")&&new Swiper(".rs-slider__slider",{slidesPerView:1,spaceBetween:0,autoHeight:!1,speed:500,loop:!1,direction:"vertical",autoplay:{delay:5e3},pagination:{el:".rs-slider__paging .slider-paging",type:"bullets",clickable:!0},on:{init:function(e){e.slides[e.activeIndex].classList.add("is-active")},transitionStart:function(e){e.slides[e.activeIndex].classList.remove("is-active")},transitionEnd:function(e){e.slides[e.activeIndex].classList.add("is-active")}}}),document.querySelectorAll(".gallery-slider").forEach((function(e,t){new S(e)}))}var S=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.render()}return _createClass(e,[{key:"render",value:function(){new Swiper(this.$slider,{slidesPerView:"auto",spaceBetween:10,speed:1e4,loop:!0,allowTouchMove:!1,autoplay:{delay:1e-4},breakpoints:{768:{spaceBetween:30}}})}}]),e}();var T=document.querySelector("header"),x=document.querySelector(".rs-header").offsetTop,O=0;function P(e){var t=window.pageYOffset;t>x&&t>130?T.classList.add("sticky"):T.classList.remove("sticky"),t<O?T.classList.add("out"):T.classList.remove("out"),O=t}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);var k=/safari/.test(function(){var e=navigator.userAgent,t="unkown";switch(t=/ucbrowser/i.test(e)?"UCBrowser":t,t=/edg/i.test(e)?"Edge":t,t=/googlebot/i.test(e)?"GoogleBot":t,t=/chromium/i.test(e)?"Chromium":t,t=/firefox|fxios/i.test(e)&&!/seamonkey/i.test(e)?"Firefox":t,t=/; msie|trident/i.test(e)&&!/ucbrowser/i.test(e)?"IE":t,t=/chrome|crios/i.test(e)&&!/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(e)?"Chrome":t,t=/safari/i.test(e)&&!/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(e)?"Safari":t,t=/opr|opera/i.test(e)?"Opera":t){case"UCBrowser":return"".concat(t,"/").concat(o(e,/(ucbrowser)\/([\d\.]+)/i));case"Edge":return"".concat(t,"/").concat(o(e,/(edge|edga|edgios|edg)\/([\d\.]+)/i));case"GoogleBot":return"".concat(t,"/").concat(o(e,/(googlebot)\/([\d\.]+)/i));case"Chromium":return"".concat(t,"/").concat(o(e,/(chromium)\/([\d\.]+)/i));case"Firefox":return"".concat(t,"/").concat(o(e,/(firefox|fxios)\/([\d\.]+)/i));case"Chrome":return"".concat(t,"/").concat(o(e,/(chrome|crios)\/([\d\.]+)/i));case"Safari":return"".concat(t,"/").concat(o(e,/(safari)\/([\d\.]+)/i));case"Opera":return"".concat(t,"/").concat(o(e,/(opera|opr)\/([\d\.]+)/i));case"IE":var r=o(e,/(trident)\/([\d\.]+)/i);return r?"".concat(t,"/").concat(parseFloat(r)+4):"".concat(t,"/7.0");default:return"unknown/0.0.0.0"}}().toLowerCase());gsap.registerPlugin(ScrollTrigger,CustomEase,ScrollToPlugin),window.addEventListener("load",(function(e){document.addEventListener("click",E),w(),document.addEventListener("scroll",P),function(){var e=gsap.utils.toArray(".numbers-item");e&&gsap.matchMedia().add("(min-width: 991.98px)",(function(){e.forEach((function(e){gsap.from(e,{scrollTrigger:{trigger:e,start:"top bottom",end:"bottom center",scrub:.5},xPercent:-100})}))}));var t=document.querySelectorAll("[data-parallax]");t&&t.forEach((function(e){var t=e.querySelector("img, canvas");gsap.to(t,{scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",pin:!0,scrub:.8},yPercent:-15,ease:"none"})}))}(),gsap.utils.toArray(".tlt").forEach((function(e){gsap.from(e,{scrollTrigger:{start:"100px bottom",trigger:e,onEnter:function(){e.classList.add("in-view"),$(e).textillate({in:{effect:"fadeInUpUp",sequence:!0,delayScale:.2},autoStart:!0,loop:!1})}}})})),gsap.utils.toArray("[data-animate]").forEach((function(e){var t;(t=e).style.cssText+="--animateName: ".concat(t.dataset.animate),t.dataset.animateDuration&&(t.style.cssText+="--animateDuration: ".concat(t.dataset.animateDuration,"s")),t.dataset.animateDelay&&(t.style.cssText+="--animateDelay: ".concat(t.dataset.animateDelay,"s")),gsap.from(e,{scrollTrigger:{start:"200px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate-stager]").forEach((function(e){gsap.from(e,{scrollTrigger:{start:"200px bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}}),Array.from(e.children).forEach((function(e,t){!function(e,t){if(e.style.cssText+="--animateName: ".concat(e.parentNode.dataset.animateStager,";"),e.parentNode.dataset.animateDuration&&(e.style.cssText+="--animateDuration: ".concat(e.parentNode.dataset.animateDuration,"s")),e.parentNode.dataset.animateDelay){var o=+e.parentNode.dataset.animateDelay+.2*(t+1);e.style.cssText+="--animateDelay: ".concat(o,"s")}else e.style.cssText+="--animateDelay: ".concat(.2*(t+1),"s")}(e,t)}))})),function(){for(var e=document.querySelectorAll("input[data-tel-input]"),t=0;t<e.length;t++){var o=e[t];o.oninput=m,o.onkeydown=v,o.onpaste=g}}();var t=null;if(!k){t=new Lenis,requestAnimationFrame((function e(o){t.raf(o),requestAnimationFrame(e)}))}document.body.classList.add("loaded");var o=document.querySelectorAll(".itc-select"),r=[];o.forEach((function(e,t){r[t]=new b(e)}));var i=document.querySelector(".rs-video__video button.mute"),n=document.querySelector(".rs-video__video button.play"),a=document.querySelector(".rs-video__video:not(.mobile) video"),s=document.querySelector(".rs-video__video.mobile video");i&&i.addEventListener("click",(function(){a.muted?(a.muted=!1,i.classList.add("active")):(a.muted=!0,i.classList.remove("active"))})),n&&n.addEventListener("click",(function(){s.paused?(s.play(),n.classList.add("active")):(s.pause(),n.classList.remove("active"))})),$("[data-showmore-button]").click((function(){$(this).prev().slideToggle("slow",tirggerResizeContent).prev().removeClass("masked"),$(this).hide()}));var l=gsap.utils.toArray('[data-anchors] a[href*="#"]');l&&l.forEach((function(e){var t=e.getAttribute("href");e.addEventListener("click",(function(e){e.preventDefault(),gsap.to(window,{duration:.8,scrollTo:t,ease:CustomEase.create("custom","M0,0 C0.5,0 0.546,0.146 0.682,0.358 0.805,0.598 0.929,0.817 1,1 ")})}))})),jQuery.validator.addMethod("fileSize",(function(e,t,o){var r=!0;if(0===t.files.length)return!0;var i,n=_createForOfIteratorHelper(t.files);try{for(n.s();!(i=n.n()).done;){i.value.size>o&&(r=!1)}}catch(e){n.e(e)}finally{n.f()}return r}),"Выберите файл допустимого размера"),$("#fosForm").length>0&&$("#fosForm").validate({submitHandler:function(e){e.submit()},rules:{fosFile:{accept:"text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",fileSize:1e7}},messages:{fosName:{required:"Введите имя"},fosPhone:{required:"Введите телефон"},fosMail:{required:"Введите E-mail",email:"Введите правильный E-mail"},fosMessage:{required:"Введите ваше сообщение"},fosFile:{accept:"Выберите файл допустимого типа"}}}),$("[data-accordion]").click((function(){$(this).next().is(":hidden")&&($(this).next().slideDown(450,(function(){$(this).prev().addClass("active"),$("[data-accordion]:not(.active)").next().slideUp(450,(function(){k||t.resize(),ScrollTrigger.refresh()}))})),$("[data-accordion]").removeClass("active"))}))}))}));