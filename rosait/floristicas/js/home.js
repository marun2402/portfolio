//------------------------------------------------------ jQuery --------------------------------------------------
$(document).ready(function () {
  //slick - rs-slider
  $('.rs-slider__slider').on('init afterChange', function () {
    let activeSlideElements = $('.rs-slider .slick-active .rs-slider__item-inner').children();
    gsap.to(activeSlideElements, {
      opacity: 1,
      y: 30,
      stagger: 0.4,
      duration: 0.9,
      ease: 'power3.out',
    });
  });
  $('.rs-slider__slider').on('beforeChange', function () {
    let activeSlideElements = $('.rs-slider .slick-active .rs-slider__item-inner').children();
    gsap.to(activeSlideElements, {
      duration: 0.5,
      opacity: 0,
      y: -30,
    });
  });

  if ($('.rs-slider__slider').length > 0) {
    $('.rs-slider__slider').slick({
      infinite: true,
      slidesToShow: 1,
      fade: true,
      speed: 1000,
      arrows: false,
      dots: true,
      appendDots: '.rs-slider__dots',
      autoplay: false,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      customPaging: function (slick, index) {
        var image = $(slick.$slides[index]).find('.rs-slider__image_main source').attr('srcset');
        return `<span style="background-image: url('${image}');"></span>`;
      },
    });
  }

  // on scroll events
  let scrollPrev = 0;
  let header = $('header');
  function stickyHeader() {
    //add sticky for header on scroll
    let scrolled = $('.wrapper-inner').scrollTop();
    if (scrolled > 0) {
      header.addClass('sticky');
    } else {
      header.removeClass('sticky');
    }
    if (scrolled > 67 && scrolled > scrollPrev) {
      header.addClass('out');
    } else {
      header.removeClass('out');
    }
    scrollPrev = scrolled;
  }
  //animate image in howto block
  let elemToAnimate = $('.rs-howto__image');
  function animateOnScroll() {
    let position = elemToAnimate.offset().top - $(window).height() / 2;
    if (position < 0) {
      elemToAnimate.addClass('animate');
    }
  }
  $('.wrapper-inner').bind('scroll', function (e) {
    stickyHeader();
    animateOnScroll();
  });
}); //.document-ready

//------------------------------------------------------ vanila JS --------------------------------------------------
window.onload = function () {
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  //click event handling
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetElement = e.target;
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
    if (window.innerWidth < 992) {
      if (targetElement.closest('.rs-menu-form__burger')) {
        targetElement.closest('.rs-menu-form__burger').classList.add('active');
        document.body.classList.add('ms-panel-left');
      }
      if (!targetElement.closest('.ms-panel') && !targetElement.closest('.rs-menu-form__burger')) {
        document.body.classList.remove('ms-panel-left');
        document.querySelector('.rs-menu-form__burger').classList.remove('active');
      }
    }
    //open-close search box
    let form = document.querySelector('.menu-search-form');
    let box = document.querySelector('.menu-search-form__box');
    let input = document.querySelector('.menu-search-form__input');
    let width = box.getBoundingClientRect().x > 1370 ? 1370 : box.getBoundingClientRect().x;
    if (targetElement.closest('.menu-search-form__button')) {
      if (form.classList.contains('open')) {
        form.classList.remove('open');
        box.style.width = null;
      } else {
        form.classList.add('open');
        box.style.width = `${width}px`;
        input.focus();
      }
    }
    if (!targetElement.closest('.menu-search-form')) {
      form.classList.remove('open');
      box.style.width = null;
    }
  }
}; //.window-onload

//spollers plugin
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(',')[0];
  });
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }
  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0];
  });
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });

    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
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
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
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
  }
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
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
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}
//SlideToggle
let _slideUp = (target, duration = 500) => {
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
    window.setTimeout(() => {
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
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
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
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
