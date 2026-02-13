(function($) {
  "use strict";

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70) // Adjust for fixed navbar
        }, 1200, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav',
    offset: 80
  });

  // 🔥 SCROLL ANIMATIONS & REVEALS
  function animateOnScroll() {
    $('.resume-section, .social-impact-box, .impact-item').each(function() {
      var elementTop = $(this).offset().top;
      var elementVisible = 150;
      
      if ($(window).scrollTop() + $(window).height() > elementTop + elementVisible) {
        $(this).addClass('animate-in');
      }
    });
  }

  // Trigger animations on scroll
  $(window).scroll(animateOnScroll);
  animateOnScroll(); // Initial check

  // 🔥 COUNTER ANIMATIONS (Leadership Impact)
  function startCounters() {
    if ($('.counter').hasClass('animated')) return;
    
    $('.counter').each(function() {
      var $this = $(this);
      var elementTop = $this.closest('.impact-item, #impact').offset().top;
      
      if ($(window).scrollTop() + $(window).height() > elementTop) {
        $this.counterUp({
          delay: 10,
          time: 2000,
          beginAt: 0
        });
        $this.addClass('animated');
      }
    });
  }

  $(window).scroll(startCounters);
  $(window).on('load', startCounters);

  // 🔥 STAGGERED SOCIAL IMPACT BOXES
  function staggerSocialBoxes() {
    $('.social-impact-box').each(function(index) {
      var $box = $(this);
      if (!$box.hasClass('animated')) {
        setTimeout(() => {
          $box.addClass('animate-in');
        }, index * 200);
      }
    });
  }

  // Trigger stagger on scroll into view
  $('.social-impact-box').each(function() {
    var $box = $(this);
    var elementTop = $box.offset().top;
    
    if ($(window).scrollTop() + $(window).height() > elementTop) {
      staggerSocialBoxes();
    }
  });

  // 🔥 HOVER EFFECTS
  $('.resume-item .card, .social-impact-box, .award').hover(
    function() {
      $(this).addClass('hover-lift');
    },
    function() {
      $(this).removeClass('hover-lift');
    }
  );

  // 🔥 EXPERIENCE CARDS STAGGER
  function staggerExperienceCards() {
    $('.resume-item').each(function(index) {
      var $card = $(this).find('.card');
      if (!$card.hasClass('animated')) {
        setTimeout(() => {
          $card.addClass('animate-in');
        }, index * 150);
      }
    });
  }

  // Trigger on scroll
  $('#experience').waypoint(function() {
    staggerExperienceCards();
  }, { offset: '80%' });

  // 🔥 AWARDS STAGGER
  $('#awards').waypoint(function() {
    $('.award').each(function(index) {
      var $award = $(this);
      setTimeout(() => {
        $award.addClass('animate-in');
      }, index * 100);
    });
  }, { offset: '80%' });

})(jQuery);
