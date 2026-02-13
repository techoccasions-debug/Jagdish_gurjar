/* ===============================
   MODERN SCROLL ANIMATIONS
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------
     Smooth Scroll (No jQuery)
  -------------------------------- */
  document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });

      document.querySelector(".navbar-collapse")?.classList.remove("show");
    });
  });

  /* --------------------------------
     ScrollSpy (Pure JS)
  -------------------------------- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#sideNav .nav-link");

  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => spyObserver.observe(section));

  /* --------------------------------
     GLOBAL REVEAL OBSERVER
  -------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    ".resume-section, .resume-item .card, .social-impact-box, .award"
  ).forEach(el => {
    el.classList.add("animate");
    revealObserver.observe(el);
  });

  /* --------------------------------
     STAGGER: EXPERIENCE CARDS
  -------------------------------- */
  const experienceSection = document.querySelector("#experience");
  if (experienceSection) {
    const cards = experienceSection.querySelectorAll(".resume-item .card");

    const expObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add("animate-in"), i * 150);
        });
        expObserver.disconnect();
      }
    }, { threshold: 0.3 });

    expObserver.observe(experienceSection);
  }

  /* --------------------------------
     STAGGER: AWARDS TIMELINE
  -------------------------------- */
  const awardsSection = document.querySelector("#awards");
  if (awardsSection) {
    const awards = awardsSection.querySelectorAll(".award");

    const awardsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        awards.forEach((award, i) => {
          setTimeout(() => award.classList.add("animate-in"), i * 120);
        });
        awardsObserver.disconnect();
      }
    }, { threshold: 0.3 });

    awardsObserver.observe(awardsSection);
  }

  /* --------------------------------
     Hover Lift (No jQuery)
  -------------------------------- */
  document.querySelectorAll(
    ".resume-item .card, .social-impact-box, .award"
  ).forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("hover-lift"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover-lift"));
  });

});
/* =====================================
   AWARD HOVER INTERACTION (SMART)
===================================== */

(function ($) {
  "use strict";

  const isDesktop = () => window.innerWidth > 768;

  $('.award').each(function () {
    const $award = $(this);
    const $detail = $award.find('.award-detail');

    if (!$detail.length) return;

    // Desktop hover behavior
    $award.on('mouseenter', function () {
      if (!isDesktop()) return;

      $('.award-detail').not($detail).removeClass('active');
      $detail.addClass('active');
    });

    $award.on('mouseleave', function () {
      if (!isDesktop()) return;
      $detail.removeClass('active');
    });
  });

  // Optional: ESC closes any open panel
  $(document).on('keydown', function (e) {
    if (e.key === "Escape") {
      $('.award-detail').removeClass('active');
    }
  });

})(jQuery);

