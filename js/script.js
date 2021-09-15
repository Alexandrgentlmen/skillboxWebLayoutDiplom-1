$(document).ready(function() {
  $('body').addClass('load')
});

$(document).ready(function() {
  $('.gallery').slick({
    infinite: true,
    slidesToShow: 3,
    prevArrow: '<button class="prev arrow"></button>',
    nextArrow: '<button class="next arrow"></button>',
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1470,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1250,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1170,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 1,
        dots: true
      }
    }, {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 1,
        dots: true
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        dots: true
      }
    }]
  });
});

let popupOverlay = $('.overlay-popup')
let popupToggle = $('.btn')
let popupClose = $('.popup__button_close')
let popupConfirm = $('.confirm-popup')
let buttonConfirm = $('.book_cite')
let widthDoc = $(window).outerWidth();
let w = $(document).innerWidth();

let paddingOffset = widthDoc - w + 'px';

popupToggle.on('click', function() {
  popupOverlay.fadeToggle(300);
  $('body').css('paddingRight', paddingOffset);
  disableScroll();

});

popupClose.on('click', function() {
  popupOverlay.hide();
  enableScroll();
  $("#reset_form")[0].reset();
});

$(document).on('click', function(e) {
  if (e.target == popupOverlay[0]) {
    enableScroll();
    popupOverlay.hide();
    $("#reset_form")[0].reset();
  }
});

$(document).on('click', function(e) {
  if (e.target == popupConfirm[0]) {
    enableScroll();
    popupConfirm.hide();
    popupOverlay.hide();
    $("#reset_form")[0].reset();
  }
});


popupClose.on('click', function() {
  popupConfirm.hide();
  enableScroll();
  $("#reset_form")[0].reset();
});


function disableScroll() {
  let widthDoc = $(window).outerWidth();
  let w = $(document).innerWidth();

  let paddingOffset = widthDoc - w + 'px';

  $('body').css('paddingRight', paddingOffset);
  $('.fix-Block').css('paddingRight', paddingOffset);
  $('body').addClass('disable-scroll');
}

function enableScroll() {

  $('body').removeClass('disable-scroll');
  $('body').css('paddingRight', 0);
  $('.fix-Block').css('paddingRight', 0);
}


$(document).ready(function() {
  $("#phone").mask("+7 (999) 99-99-999");
});

$(function() {

  var $mt = $('.header__nav .nav__btn_burger');
  var $menu = $('.header__nav .nav__list');

  $(window).resize(function() {

    const windowSize = $(window).width();

    if ($menu.css('display') == 'none' && windowSize > 1240) {
      $menu.show();
    }
  });
  $mt.click(function() {
    $menu.slideToggle(500);
  });
});

const links = $('.nav__link');

links.on('click', function(e) {
  let href = $(this).attr('href');

  let currentElement = $(href);

  let offset = currentElement.offset().top;

  $('html, body').animate({
    scrollTop: offset
  });
});
$(document).ready(function(){
  $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
    $(this).toggleClass('open');
  });
});

$('form').each(function () {

  $(this).validate({
    errorPlacement(error, element) {
      return true;
    },
    focusInvalid: false,
    rules: {
      Телефон: {
        required: true,
      },
      Твоёимя: {
        required: true,
        maxlength: 10,
      }
    },
    submitHandler(form) {
      let th = $(form);
      let popupConfirm = $('.confirm-popup');
      let buttonConfirm = $('.book_cite');
      $.ajax({
        type: 'POST',
        url: 'mail.php',
        data: th.serialize(),

      }).done(() => {

        popupConfirm.show();
        buttonConfirm.on('click', function() {
          popupOverlay.hide();
          enableScroll();
          $("#reset_form")[0].reset();
        });

        th.trigger('reset');
      });
      return false;
    }
  });
});
