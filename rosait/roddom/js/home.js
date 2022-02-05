$(document).ready(function () {
  /*==================================
     Parallax
     ====================================*/

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Detect Mobile User // No parallax
    $('.parallaximg').addClass('ismobile');
  } else {
    // All Desktop
    $(window).bind('scroll', function (e) {
      parallaxScroll();
    });

    function parallaxScroll() {
      var scrolledY = $(window).scrollTop();
      var sc = scrolledY * 0.3 + 'px';
      $('.parallaximg').css('marginTop', '' + scrolledY * 0.3 + 'px');
    }
  }

  /*==================================
     Slick
     ====================================*/

  if ($('.rs-slider-container').length > 0) {
    $('.rs-slider-container').slick({
      infinite: true,
      slidesToShow: 1,
      speed: 800,
      dots: true,
      autoplay: true,
      lazyLoad: 'ondemand',
      cssEase: 'cubic-bezier(0.845, 0.045, 0.355, 1)',
    });
  }

  if ($('.news-slider').length > 0) {
    $('.news-slider').slick({
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

  if ($('.team-slider').length > 0) {
    $('.team-slider').slick({
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
          settings: 'unslick',
        },
      ],
    });
  }
  // slick on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
      $('.news-slider').slick('unslick');
      sliderIsLive = false;
    } else {
      if (!sliderIsLive) {
        $('.news-slider').slick({
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
          ],
        });
        sliderIsLive = true;
      }
    }
    if (window.innerWidth > 767) {
      $('.team-slider').slick('unslick');
      sliderIsLive = false;
    } else {
      if (!sliderIsLive) {
        $('.team-slider').slick({
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
          ],
        });
        sliderIsLive = true;
      }
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      $('.team-slider').slick('unslick');
      sliderIsLive = false;
    } else {
      if (!sliderIsLive) {
        $('.team-slider').slick({
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
          ],
        });
        sliderIsLive = true;
      }
    }
  });
  /*==================================
     OwlCarousel
     ====================================*/
  if ($('.reviews-slider').length > 0) {
    $('.reviews-slider').owlCarousel({
      items: 1,
      margin: 10,
      lazyLoad: true,
      autoplay: false,
      loop: true,
      dots: false,
      nav: false,
      responsiveClass: true,
      autoHeight: true,
      responsive: {
        0: {
          items: 1,
          lazyLoad: true,
          autoplay: false,
          loop: true,
          dots: false,
          nav: false,
          responsiveClass: true,
          autoHeight: true,
        },
      },
    });
    $('a.reviews-next').click(function () {
      $('.reviews-slider').trigger('next.owl.carousel');
    });
    $('a.reviews-prev').click(function () {
      $('.reviews-slider').trigger('prev.owl.carousel');
    });
  }

  if ($('.partners-slider').length > 0) {
    $('.partners-slider').owlCarousel({
      items: 4,
      margin: 10,
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

  //stop video on modal close
  $('#video').on('hidden.bs.modal', function (e) {
    $('#video iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });

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

  //Validate
  if ($('#contact-form').length > 0) {
    $('#contact-form').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },

        email: {
          required: true,
          email: true,
        },

        phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        email: {
          required: 'Введите email',
          email: 'Введите корректный email',
        },
        phone: {
          required: 'Введите телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }

  if ($('#order-call .form-order').length > 0) {
    $('#order-call .form-order').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },

        email: {
          required: true,
          email: true,
        },

        phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        email: {
          required: 'Введите свой email',
          email: 'Введите корректный email',
        },
        phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }

  if ($('#order-call2 .form-order').length > 0) {
    $('#order-call2 .form-order').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },

        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        email: {
          required: 'Введите свой email',
          email: 'Введите корректный email',
        },
      },
    });
  }

  if ($('#order-call3 .form-order').length > 0) {
    $('#order-call3 .form-order').validate({
      submitHandler: function (form) {
        form.submit();
      },
      rules: {
        name: {
          required: true,
          minlength: 2,
        },

        phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: {
          required: 'Введите свое имя',
          minlength: 'Длина должна быть больше 2-х символов',
        },
        phone: {
          required: 'Введите свой телефон',
          minlength: 'Введите корректный телефон',
        },
      },
    });
  }

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
