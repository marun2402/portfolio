$(document).ready(function () {
  // open side-area
  if ($('#side-area-open').length > 0) {
    $('#side-area-open').click(function (e) {
      $('.side-area').addClass('opened');
    });
  }

  // close side-area
  if ($('#side-area-close').length > 0) {
    $('#side-area-close').click(function (e) {
      $('.side-area').removeClass('opened');
    });
  }

  //slick slider - full page block slider
  if ($('.rs-slider').length > 0) {
    $('.rs-slider .slider-container').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 10000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear',
      speed: 800,
      dots: true,
      arrows: false,
      appendDots: $('.slider-dots'),
      customPaging: function (slider, i) {
        return '<div class="bullet"><svg class="svg-circle"><circle cx="50%" cy="50%" r="45%"></circle></svg></div>';
      },
    });
  }

  // scroll to anchor
  $('.rs-17 .rs-header .nav a, .rs-17 .slider-button').click(function () {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top - 50;
    jQuery('html:not(:animated),body:not(:animated)').animate({ scrollTop: destination }, 500);
    return false;
  });

  //Slick - items feature block slider
  if ($('.feature-slider').length > 0) {
    $('.feature-slider').slick({
      infinite: true,
      slidesToShow: 3,
      speed: 800,
      dots: false,
      arrows: false,
      autoplay: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },

        {
          breakpoint: 991,
          settings: 'unslick',
        },
      ],
    });
  }

  // owl-carousel - steps block slider
  var stepsSlider = $('.steps-slider-items');
  if (stepsSlider.length > 0) {
    stepsSlider.owlCarousel({
      items: 2,
      margin: 30,
      dots: true,

      nav: false,
      lazyLoad: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 2,
        },
      },
    });
    $('.rs-steps .owl-next').click(function () {
      stepsSlider.trigger('next.owl.carousel');
    });
    $('.rs-steps .owl-prev').click(function () {
      stepsSlider.trigger('prev.owl.carousel');
    });
  }

  // open fancybox on click button
  $('#december-btn').on('click', function (e) {
    e.preventDefault();
    $('#december').click();
  });

  // on scroll events
  $(window).bind('scroll', function (e) {
    //add sticky for header on scroll
    if ($(window).scrollTop() > 0) {
      $('.rs-header').addClass('sticky');
    } else {
      $('.rs-header').removeClass('sticky');
    }
    //parallax
    parallaxScroll();
  });

  function parallaxScroll() {
    var scrolledY = $(window).scrollTop();
    $('.parallaximg').map(function (index, elem) {
      let position = $(elem).offset().top - (scrolledY + $(window).height());
      $(elem).css('marginTop', '' + position * 0.3 + 'px');
    });
    $('.parallaximg-rev').map(function (index, elem) {
      let position = $(elem).offset().top - (scrolledY + $(window).height());
      $(elem).css('marginTop', '' + position * -0.3 + 'px');
    });
    $('.parallaximg-y').map(function (index, elem) {
      let position = $(elem).offset().top - (scrolledY + $(window).height());
      $(elem).css('marginBottom', '' + position * -0.1 + 'px');
    });
    $('.parallaximg-rotate').css('transform', 'rotate(' + scrolledY * 0.2 + 'deg)');
  }

  // validate contacts form
  if ($('.contacts-form').length > 0) {
    $('.contacts-form').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        contacts_name: {
          required: true,
          minlength: 2,
        },

        contacts_email: {
          required: true,
          email: true,
        },

        contacts_phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        contacts_name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        contacts_email: {
          required: 'Введите свой email',
          email: 'Введите корректный email',
        },
        contacts_phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }
  // validate footer form
  if ($('.footer-form').length > 0) {
    $('.footer-form').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        contacts_name: {
          required: true,
          minlength: 2,
        },

        contacts_phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        contacts_name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        contacts_phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }

  //NekoAnim
  $(function () {
    if ($('.activateAppearAnimation').length > 0) {
      nekoAnimAppear();
      $('.reloadAnim').click(function (e) {
        $(this).parent().parent().find('img[data-nekoanim]').attr('class', '').addClass('img-responsive');
        nekoAnimAppear();
        e.preventDefault();
      });
    }
  });

  // SVG animation this vivus.js
  let featureIcons = document.querySelectorAll('.feature-item--icon');
  if (featureIcons.length > 0) {
    featureIcons.forEach((icon) => {
      new Vivus(icon.firstElementChild.id, { duration: 200 });
    });
  }
}); //ready function

//AOS.js
AOS.init({
  offset: 120,
  delay: 100,
  duration: 400,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

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
