function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,n=function(){};return{s:n,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}!function(e){"function"==typeof define&&define.amd?define("app",e):e()}((function(){"use strict";var e=document.querySelectorAll("[data-spollers]");if(e.length>0){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach((function(e){e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),r(e),e.addEventListener("click",o)):(e.classList.remove("_init"),r(e,!1),e.removeEventListener("click",o))}))},r=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=e.querySelectorAll("[data-spoller]");r.length>0&&r.forEach((function(e){t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)}))},o=function(e){var t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){var r=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),o=r.closest("[data-spollers]"),i=!!o.hasAttribute("data-one-spoller");o.querySelectorAll("._slide").length||(i&&!r.classList.contains("_active")&&n(o),r.classList.toggle("_active"),u(r.nextElementSibling,500)),e.preventDefault()}},n=function(e){var t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),c(t.nextElementSibling,500))},i=Array.from(e).filter((function(e,t,r){return!e.dataset.spollers.split(",")[0]}));i.length>0&&t(i);var a=Array.from(e).filter((function(e,t,r){return e.dataset.spollers.split(",")[0]}));if(a.length>0){var s=[];a.forEach((function(e){var t={},r=e.dataset.spollers.split(",");t.value=r[0],t.type=r[1]?r[1].trim():"max",t.item=e,s.push(t)}));var l=s.map((function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type}));(l=l.filter((function(e,t,r){return r.indexOf(e)===t}))).forEach((function(e){var r=e.split(","),o=r[1],n=r[2],i=window.matchMedia(r[0]),a=s.filter((function(e){if(e.value===o&&e.type===n)return!0}));i.addListener((function(){t(a,i)})),t(a,i)}))}}var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout((function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t))},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e.hidden?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);var r=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=r+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout((function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t)}}(e,t):c(e,t)},d=gsap.utils.toArray("[data-anchor]");d&&d.forEach((function(e){var t=e.getAttribute("href");e.addEventListener("click",(function(e){e.preventDefault(),gsap.to(window,{duration:.8,scrollTo:"#top"==t?0:{y:t,offsetY:107},ease:CustomEase.create("custom","M0,0 C0.5,0 0.546,0.146 0.682,0.358 0.805,0.598 0.929,0.817 1,1 ")})}))})),function(){var e,t,r,o,n={frameRate:150,animationTime:400,stepSize:100,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,fixedBackground:!0,excluded:""},i=n,a=!1,s=!1,l={x:0,y:0},c=!1,u=document.documentElement,d=[],f=/^Mac/.test(navigator.platform),m={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},p={37:1,38:1,39:1,40:1};function y(){if(!c&&document.body){c=!0;var o=document.body,n=document.documentElement,l=window.innerHeight,d=o.scrollHeight;if(u=0<=document.compatMode.indexOf("CSS")?n:o,e=o,i.keyboardSupport&&H("keydown",S),top!=self)s=!0;else if(Q&&l<d&&(o.offsetHeight<=l||n.offsetHeight<=l)){var f,m=document.createElement("div");if(m.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+u.scrollHeight+"px",document.body.appendChild(m),r=function(){f=f||setTimeout((function(){m.style.height="0",m.style.height=u.scrollHeight+"px",f=null}),500)},setTimeout(r,10),H("resize",r),(t=new Y(r)).observe(o,{attributes:!0,childList:!0,characterData:!1}),u.offsetHeight<=l){var p=document.createElement("div");p.style.clear="both",o.appendChild(p)}}i.fixedBackground||a||(o.style.backgroundAttachment="scroll",n.style.backgroundAttachment="scroll")}}var h=[],v=!1,g=Date.now();function w(e,t,r){if(function(e,t){e=0<e?1:-1,t=0<t?1:-1,l.x===e&&l.y===t||(l.x=e,l.y=t,h=[],g=0)}(t,r),1!=i.accelerationMax){var o=Date.now()-g;if(o<i.accelerationDelta){var n=(1+50/o)/2;1<n&&(n=Math.min(n,i.accelerationMax),t*=n,r*=n)}g=Date.now()}if(h.push({x:t,y:r,lastX:t<0?.99:-.99,lastY:r<0?.99:-.99,start:Date.now()}),!v){var a=K(),s=e===a||e===document.body;null==e.$scrollBehavior&&function(e){var t=E(e);if(null==k[t]){var r=getComputedStyle(e,"")["scroll-behavior"];k[t]="smooth"==r}return k[t]}(e)&&(e.$scrollBehavior=e.style.scrollBehavior,e.style.scrollBehavior="auto");I((function o(n){for(var a=Date.now(),l=0,c=0,u=0;u<h.length;u++){var d=h[u],f=a-d.start,m=f>=i.animationTime,p=m?1:f/i.animationTime;i.pulseAlgorithm&&(p=V(p));var y=d.x*p-d.lastX>>0,g=d.y*p-d.lastY>>0;l+=y,c+=g,d.lastX+=y,d.lastY+=g,m&&(h.splice(u,1),u--)}s?window.scrollBy(l,c):(l&&(e.scrollLeft+=l),c&&(e.scrollTop+=c)),t||r||(h=[]),h.length?I(o,e,1e3/i.frameRate+1):(v=!1,null!=e.$scrollBehavior&&(e.style.scrollBehavior=e.$scrollBehavior,e.$scrollBehavior=null))}),e,0),v=!0}}function b(t){c||y();var r=t.target;if(t.defaultPrevented||t.ctrlKey)return!0;if(O(e,"embed")||O(r,"embed")&&/\.pdf/i.test(r.src)||O(e,"object")||r.shadowRoot)return!0;var n=-t.wheelDeltaX||t.deltaX||0,a=-t.wheelDeltaY||t.deltaY||0;f&&(t.wheelDeltaX&&N(t.wheelDeltaX,120)&&(n=t.wheelDeltaX/Math.abs(t.wheelDeltaX)*-120),t.wheelDeltaY&&N(t.wheelDeltaY,120)&&(a=t.wheelDeltaY/Math.abs(t.wheelDeltaY)*-120)),n||a||(a=-t.wheelDelta||0),1===t.deltaMode&&(n*=40,a*=40);var l=D(r);return l?!!function(e){if(e){d.length||(d=[e,e,e]),e=Math.abs(e),d.push(e),d.shift(),clearTimeout(o),o=setTimeout((function(){try{localStorage.SS_deltaBuffer=d.join(",")}catch(e){}}),1e3);var t=120<e&&j(e),r=!j(120)&&!j(100)&&!t;return e<50||r}}(a)||(1.2<Math.abs(n)&&(n*=i.stepSize/120),1.2<Math.abs(a)&&(a*=i.stepSize/120),w(l,n,a),t.preventDefault(),void A()):!s||!W||(Object.defineProperty(t,"target",{value:window.frameElement}),parent.wheel(t))}function S(t){var r=t.target,o=t.ctrlKey||t.altKey||t.metaKey||t.shiftKey&&t.keyCode!==m.spacebar;document.body.contains(e)||(e=document.activeElement);var n=/^(button|submit|radio|checkbox|file|color|image)$/i;if(t.defaultPrevented||/^(textarea|select|embed|object)$/i.test(r.nodeName)||O(r,"input")&&!n.test(r.type)||O(e,"video")||function(e){var t=e.target,r=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do{if(r=t.classList&&t.classList.contains("html5-video-controls"))break}while(t=t.parentNode);return r}(t)||r.isContentEditable||o)return!0;if((O(r,"button")||O(r,"input")&&n.test(r.type))&&t.keyCode===m.spacebar)return!0;if(O(r,"input")&&"radio"==r.type&&p[t.keyCode])return!0;var a=0,l=0,c=D(e);if(!c)return!s||!W||parent.keydown(t);var u=c.clientHeight;switch(c==document.body&&(u=window.innerHeight),t.keyCode){case m.up:l=-i.arrowScroll;break;case m.down:l=i.arrowScroll;break;case m.spacebar:l=-(t.shiftKey?1:-1)*u*.9;break;case m.pageup:l=.9*-u;break;case m.pagedown:l=.9*u;break;case m.home:c==document.body&&document.scrollingElement&&(c=document.scrollingElement),l=-c.scrollTop;break;case m.end:var d=c.scrollHeight-c.scrollTop-u;l=0<d?10+d:0;break;case m.left:a=-i.arrowScroll;break;case m.right:a=i.arrowScroll;break;default:return!0}w(c,a,l),t.preventDefault(),A()}function x(t){e=t.target}var _,L,E=(_=0,function(e){return e.uniqueID||(e.uniqueID=_++)}),T={},P={},k={};function A(){clearTimeout(L),L=setInterval((function(){T=P=k={}}),1e3)}function q(e,t,r){for(var o=r?T:P,n=e.length;n--;)o[E(e[n])]=t;return t}function D(e){var t=[],r=document.body,o=u.scrollHeight;do{var n=P[E(e)];if(n)return q(t,n);if(t.push(e),o===e.scrollHeight){var i=M(u)&&M(r)||B(u);if(s&&C(u)||!s&&i)return q(t,K())}else if(C(e)&&B(e))return q(t,e)}while(e=e.parentElement)}function C(e){return e.clientHeight+10<e.scrollHeight}function M(e){return"hidden"!==getComputedStyle(e,"").getPropertyValue("overflow-y")}function B(e){var t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"scroll"===t||"auto"===t}function H(e,t,r){window.addEventListener(e,t,r||!1)}function $(e,t,r){window.removeEventListener(e,t,r||!1)}function O(e,t){return e&&(e.nodeName||"").toLowerCase()===t.toLowerCase()}if(window.localStorage&&localStorage.SS_deltaBuffer)try{d=localStorage.SS_deltaBuffer.split(",")}catch(b){}function N(e,t){return Math.floor(e/t)==e/t}function j(e){return N(d[0],e)&&N(d[1],e)&&N(d[2],e)}var z,I=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e,t,r){window.setTimeout(e,r||1e3/60)},Y=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,K=(z=document.scrollingElement,function(){if(!z){var e=document.createElement("div");e.style.cssText="height:10000px;width:1px;",document.body.appendChild(e);var t=document.body.scrollTop;document.documentElement.scrollTop,window.scrollBy(0,3),z=document.body.scrollTop!=t?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(e)}return z});function X(e){var t;return((e*=i.pulseScale)<1?e-(1-Math.exp(-e)):(e-=1,(t=Math.exp(-1))+(1-Math.exp(-e))*(1-t)))*i.pulseNormalize}function V(e){return 1<=e?1:e<=0?0:(1==i.pulseNormalize&&(i.pulseNormalize/=X(1)),X(e))}var R=window.navigator.userAgent,F=/Edge/.test(R),W=/chrome/i.test(R)&&!F,U=/safari/i.test(R)&&!F,G=/mobile/i.test(R),J=/Windows NT 6.1/i.test(R)&&/rv:11/i.test(R),Q=U&&(/Version\/8/i.test(R)||/Version\/9/i.test(R)),Z=(W||U||J)&&!G,ee=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){ee=!0}}))}catch(b){}var te=!!ee&&{passive:!1},re="onwheel"in document.createElement("div")?"wheel":"mousewheel";function oe(e){for(var t in e)n.hasOwnProperty(t)&&(i[t]=e[t])}re&&Z&&(H(re,b,te),H("mousedown",x),H("load",y)),oe.destroy=function(){t&&t.disconnect(),$(re,b),$("mousedown",x),$("keydown",S),$("resize",r),$("load",y)},window.SmoothScrollOptions&&oe(window.SmoothScrollOptions),"function"==typeof define&&define.amd?define((function(){return oe})):"object"==("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=oe:window.SmoothScroll=oe}(),SmoothScroll({animationTime:500,stepSize:100,accelerationDelta:50,accelerationMax:3,touchpadSupport:!1});var f=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function m(e){var t=e.target;f&&(t.closest(".menu__dropdown-arrow")&&t.closest(".menu__dropdown").classList.toggle("hover"),t.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach((function(e,t){e.classList.remove("hover")}))),t.closest(".menu-burger")&&(t.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),t.closest(".mobile-menu-close")&&(document.querySelector(".menu-burger").classList.toggle("active"),document.body.classList.toggle("mobile-menu-opened"),document.querySelector(".menu").classList.toggle("active"),document.querySelector("[data-js-overlay]").classList.toggle("active")),t.closest(".menu__dropdown-arrow")&&t.nextElementSibling.classList.add("is-active"),t.closest(".switch-back")&&t.parentNode.classList.remove("is-active");document.querySelector(".header-search");var r=document.querySelector(".header-search input");t.closest(".header-search-open")&&(document.body.classList.contains("search-is-open")?document.body.classList.remove("search-is-open"):(document.body.classList.add("search-is-open"),r.focus())),document.body.classList.contains("search-is-open")&&(t.closest(".rs-header__search")||document.body.classList.remove("search-is-open"),t.closest('.header-search button[type="reset"]')&&document.body.classList.remove("search-is-open")),f&&t.closest(".lang-picker")&&t.closest(".lang-picker").classList.toggle("hover")}var p=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.paging=this.$component.querySelector('[class*="-paging"]'),this.render()}return _createClass(e,[{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:2,spaceBetween:0,autoHeight:!1,speed:500,pagination:{el:this.paging,clickable:!0},navigation:{nextEl:this.arrowNext,prevEl:this.arrowPrev},breakpoints:{767:{slidesPerView:3}}})}}]),e}();var y=function(){function e(t){_classCallCheck(this,e),this.$component=t,this.$slider=this.$component.querySelector('[class*="__slider"]'),this.arrowNext=this.$component.querySelector('[class*="_next"]'),this.arrowPrev=this.$component.querySelector('[class*="_prev"]'),this.paging=this.$component.querySelector('[class*="-paging"]'),this.render()}return _createClass(e,[{key:"render",value:function(){this.swiper=new Swiper(this.$slider,{slidesPerView:2,spaceBetween:28,autoHeight:!1,speed:500,pagination:{el:this.paging,clickable:!0},navigation:{nextEl:this.arrowNext,prevEl:this.arrowPrev},breakpoints:{767:{slidesPerView:3,spaceBetween:58}}})}}]),e}();gsap.registerPlugin(ScrollTrigger,CustomEase,ScrollToPlugin),window.addEventListener("load",(function(e){var t;document.body.classList.add("loaded"),(t=document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)'))&&t.forEach((function(e){e.parentElement.classList.add("swiper"),e.classList.add("swiper-wrapper");var t,r=_createForOfIteratorHelper(e.children);try{for(r.s();!(t=r.n()).done;)t.value.classList.add("swiper-slide")}catch(e){r.e(e)}finally{r.f()}})),document.querySelectorAll(".team-slider").forEach((function(e){new p(e)})),document.querySelectorAll(".feedback-slider").forEach((function(e){new y(e)})),document.addEventListener("click",m),gsap.utils.toArray("[data-animate]").forEach((function(e){var t,r;r=(t=e).dataset.animate.split(":"),t.style.cssText+="--animateName: ".concat(r[0]),r[1]&&(t.style.cssText+="--animateDuration: ".concat(r[1],"ms")),r[2]&&(t.style.cssText+="--animateDelay: ".concat(r[2],"ms")),gsap.from(e,{scrollTrigger:{start:"25% bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}})})),gsap.utils.toArray("[data-animate-stager]").forEach((function(e){Array.from(e.children).forEach((function(e,t){!function(e,t){var r=e.parentNode.dataset.animateStager.split(":");if(e.style.cssText+="--animateName: ".concat(r[0],";"),r[2]&&(e.style.cssText+="--animateDuration: ".concat(r[2],"ms")),r[3]){var o=+r[3]+t*r[1];e.style.cssText+="--animateDelay: ".concat(o,"ms")}else e.style.cssText+="--animateDelay: ".concat(t*r[1],"ms")}(e,t),gsap.from(e,{scrollTrigger:{start:"25% bottom",trigger:e,onEnter:function(){return e.classList.add("in-view")}}})}))})),gsap.matchMedia().add("(min-width: 767.98px)",(function(){document.querySelectorAll("[data-parallax] > img, [data-parallax] > video").forEach((function(e){gsap.to(e,{scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",scrub:.15},yPercent:50,ease:"none"})}))})),function(){var e=document.querySelector(".menu .nav-line"),t=document.querySelectorAll(".menu .menu__list > li"),r=document.querySelector(".menu .menu__list > li.current-menu-item");e.style.width="".concat(r.offsetWidth,"px"),e.style.left="".concat(r.offsetLeft,"px"),t.forEach((function(t){t.addEventListener("mouseenter",(function(t){e.style.width="".concat(t.currentTarget.offsetWidth,"px"),e.style.left="".concat(t.currentTarget.offsetLeft,"px")})),t.addEventListener("mouseleave",(function(){e.style.width="".concat(r.offsetWidth,"px"),e.style.left="".concat(r.offsetLeft,"px")}))}))}(),function(){var e,t=document.querySelector("[data-split-text]");if(t){var r=((e=t).innerHTML=e.textContent.replace(/(\S*)/g,(function(e){return'<div class="word">'+e.replace(/(-|#|@)?\S(-|#|@)?/g,"<div class='letter'>$&</div>")+"</div>"})),e);Array.from(r.querySelectorAll(".letter")).forEach((function(e,t){TweenMax.from(e,.4,{yPercent:100,delay:.02*t,repeat:0})}))}}(),document.querySelectorAll(".rs-footer .js-hover-line").forEach((function(e){!function(e){var t=e.querySelector(".footer-hover-line"),r=e.querySelectorAll("ul > li > a");t.style.top="-31px",r.forEach((function(e){e.addEventListener("mouseenter",(function(e){t.style.top="".concat(e.currentTarget.offsetTop+7,"px")})),e.addEventListener("mouseleave",(function(){t.style.top="-31px"}))}))}(e)}))}))}));