!function(e){"function"==typeof define&&define.amd?define("app",e):e()}(function(){"use strict";var e=document.querySelectorAll("[data-spollers]");if(e.length>0){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach(function(e){e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),o(e),e.addEventListener("click",r)):(e.classList.remove("_init"),o(e,!1),e.removeEventListener("click",r))})},o=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=e.querySelectorAll("[data-spoller]");o.length>0&&o.forEach(function(e){t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)})},r=function(e){var t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){var o=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),r=o.closest("[data-spollers]"),s=!!r.hasAttribute("data-one-spoller");r.querySelectorAll("._slide").length||(s&&!o.classList.contains("_active")&&i(r),o.classList.toggle("_active"),c(o.nextElementSibling,500)),e.preventDefault()}},i=function(e){var t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),d(t.nextElementSibling,500))},s=Array.from(e).filter(function(e,t,o){return!e.dataset.spollers.split(",")[0]});s.length>0&&t(s);var n=Array.from(e).filter(function(e,t,o){return e.dataset.spollers.split(",")[0]});if(n.length>0){var l=[];n.forEach(function(e){var t={},o=e.dataset.spollers.split(",");t.value=o[0],t.type=o[1]?o[1].trim():"max",t.item=e,l.push(t)});var a=l.map(function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type});(a=a.filter(function(e,t,o){return o.indexOf(e)===t})).forEach(function(e){var o=e.split(","),r=o[1],i=o[2],s=window.matchMedia(o[0]),n=l.filter(function(e){if(e.value===r&&e.type===i)return!0});s.addListener(function(){t(n,s)}),t(n,s)})}}var d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout(function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")},t))},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e.hidden?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);var o=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=o+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout(function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")},t)}}(e,t):d(e,t)};document.addEventListener("scroll",function(e){var t=window.pageYOffset;window.pageYOffset>m?u.classList.add("sticky"):u.classList.remove("sticky");t>161&&t>v?u.classList.add("out"):u.classList.remove("out");v=t});var u=document.querySelector("header"),m=document.querySelector(".rs-header").offsetTop,v=0;window.onload=function(){var e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);document.addEventListener("click",function(t){var o=t.target;window.innerWidth>991&&e&&(o.closest(".menu__dropdown-arrow")&&o.closest(".menu__dropdown").classList.toggle("hover"),o.closest(".menu__list")||document.querySelectorAll(".menu__dropdown.hover").forEach(function(e,t){e.classList.remove("hover")}));window.innerWidth<=991&&(o.closest(".menu-burger")&&(o.closest(".menu-burger").classList.toggle("active"),document.body.classList.toggle("_lock"),document.querySelector(".menu").classList.toggle("active"),document.querySelector(".menu-overlay").classList.toggle("active")),o.closest(".menu-overlay")&&(document.querySelector(".menu-burger").classList.remove("active"),document.body.classList.remove("_lock"),document.querySelector(".menu").classList.remove("active"),document.querySelector(".menu-overlay").classList.remove("active")));window.innerWidth>991&&e&&o.closest(".catalog-menu")&&o.closest(".catalog-menu").classList.toggle("hover")})}});