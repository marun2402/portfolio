$(document).ready(function () {
  //slick - rs-slider
  if ($('.rs-slider-container').length > 0) {
    $('.rs-slider-container').slick({
      infinite: true,
      slidesToShow: 1,
      fade: true,
      speed: 800,
      dots: false,
      autoplay: true,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 0,
          settings: {
            arrows: false,
          },
        },
        {
          breakpoint: 991,
          settings: {
            arrows: true,
          },
        },
      ],
    });
  }

  //slick - rs-news
  if ($('.news-slider').length > 0) {
    $('.news-slider').slick({
      infinite: true,
      speed: 800,
      dots: false,
      arrows: true,
      autoplay: false,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1650,
          settings: {
            slidesToShow: 2.5,
          },
        },
        {
          breakpoint: 2300,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 3500,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    });
  }

  // owl-carousel - rs-partners
  if ($('.partners-slider').length > 0) {
    $('.partners-slider').owlCarousel({
      items: 4,
      margin: 63,
      lazyLoad: true,
      autoplay: false,
      loop: true,
      dots: true,
      nav: false,
      responsiveClass: true,
      autoHeight: true,
      responsive: {
        0: {
          items: 2,
        },
        767: {
          items: 3,
        },
        991: {
          items: 4,
        },
      },
    });
    $('a.partners-next').click(function () {
      $('.partners-slider').trigger('next.owl.carousel');
    });
    $('a.partners-prev').click(function () {
      $('.partners-slider').trigger('prev.owl.carousel');
    });
  }

  // on scroll events
  $(window).bind('scroll', function (e) {
    //parallax
    parallaxScroll();
  });

  // slick on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      destroySlick('.missions-row');
      destroySlick('.reasons-row');
      destroySlick('.concept-row');
    } else {
      addSlick('.missions-row');
      addSlick('.reasons-row');
      addSlick('.concept-row');
    }
  });
  addSlick('.missions-row');
  addSlick('.reasons-row');
  addSlick('.concept-row');
  function addSlick(name) {
    if ($(name).length > 0) {
      $(name).slick({
        infinite: true,
        slidesToShow: 1,
        speed: 800,
        dots: false,
        arrows: false,
        autoplay: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 767,
            settings: 'unslick',
          },
        ],
      });
    }
  }
  function destroySlick(name) {
    $(name).slick('unslick');
  }

  //load svg in html inline
  $('.reason-item--icon').map(function (index, elem) {
    const svgItem = $(elem).data('load');
    $(elem).load(svgItem);
  });

  $('.btn-more').click(function () {
    $('#director-more').slideToggle('slow');
  });
}); //.document-ready

//parallax elements on scroll
function parallaxScroll() {
  var scrolledY = $(window).scrollTop();
  $('.parallaxTranslateXRev').map(function (index, elem) {
    let position = $(elem).offset().top - (scrolledY + $(window).height());
    $(elem).css('transform', 'translateX(' + position * 0.3 + 'px)');
  });
  $('.parallaxTranslateX').map(function (index, elem) {
    let position = $(elem).offset().top - (scrolledY + $(window).height());
    $(elem).css('transform', 'translateX(' + position * -0.3 + 'px)');
  });
  $('.parallaximg').css('marginTop', '' + scrolledY * 0.3 + 'px');  
}
  
function nekoAnimAppear() {
  $('[data-nekoanim]').each(function () {
    var $this = $(this);
    $this.addClass('nekoAnim-invisible');
    if ($(window).width() > 767) {
      $this.appear(
        function () {
          var delay = $this.data('nekodelay') ? $this.data('nekodelay') : 1;
          if (delay > 1) $this.css('animation-delay', delay + 'ms');
          $this.addClass('nekoAnim-animated');
          $this.addClass('nekoAnim-' + $this.data('nekoanim'));
          setTimeout(function () {
            $this.addClass('nekoAnim-visible');
          }, delay);
        },
        { accX: 0, accY: -150 }
      );
    } else {
      $this.animate({ opacity: 1 }, 300, 'easeInOutQuad', function () {});
    }
  });
}

(function ($) {
  var props = ['Width', 'Height'],
    prop;
  while ((prop = props.pop())) {
    (function (natural, prop) {
      $.fn[natural] =
        natural in new Image()
          ? function () {
              return this[0][natural];
            }
          : function () {
              var node = this[0],
                img,
                value;
              if (node.tagName.toLowerCase() === 'img') {
                img = new Image();
                (img.src = node.src), (value = img[prop]);
              }
              return value;
            };
    })('natural' + prop, prop.toLowerCase());
  }
})(jQuery);

//vanila JS
window.onload = function () {
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //click event handling
  document.addEventListener('click', documentActions);
  function documentActions(e) {
    const targetElement = e.target;

    //open dropdown menu on touch-screen
    if (window.innerWidth > 991 && isMobile) {
      if (targetElement.closest('.dropdown-arrow')) {
        targetElement.closest('.dropdown').classList.toggle('_hover');
      }
      if (!targetElement.closest('.navbar-list')) {
        document.querySelectorAll('.dropdown._hover').forEach(function (elem, index) {
          elem.classList.remove('_hover');
        });
      }
    }

    //open menu burger
    if (window.innerWidth < 992) {
      if (targetElement.closest('.mobile-menu-button')) {
        targetElement.closest('.mobile-menu-button').classList.toggle('_active');
        document.body.classList.toggle('_lock');
        document.querySelector('.header-bottom').classList.toggle('_active');
      }
    }
  }

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
};
