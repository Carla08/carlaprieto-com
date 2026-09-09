(function () {
  "use strict";

  // Ease-out-back: overshoots slightly then settles, a restrained "bounce".
  function easeOutBack(t) {
    var c1 = 1.35, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function animatedScrollTo(targetY, duration) {
    // If the tab is backgrounded, requestAnimationFrame gets throttled or
    // paused by the browser, which can stall the animation. Skip straight
    // to an instant scroll in that case so navigation always works.
    if (document.hidden) {
      window.scrollTo(0, targetY);
      return;
    }
    var startY = window.pageYOffset;
    var distance = targetY - startY;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutBack(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  function scrollToHash(hash) {
    if (!hash || hash === "#") return;
    var target = document.querySelector(hash);
    if (!target) return;
    var navEl = document.querySelector(".site-nav");
    var offset = navEl ? navEl.offsetHeight + 4 : 0;
    var targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
    animatedScrollTo(Math.max(targetY, 0), 850);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Intercept same-page anchor navigation for the bounce effect.
    document.querySelectorAll('a[href*="#"]').forEach(function (link) {
      var url;
      try { url = new URL(link.href, window.location.href); } catch (e) { return; }
      var samePage = url.pathname === window.location.pathname;
      if (!samePage || !url.hash) return;
      link.addEventListener("click", function (e) {
        var target = document.querySelector(url.hash);
        if (!target) return; // let it fall through to normal navigation
        e.preventDefault();
        history.pushState(null, "", url.hash);
        scrollToHash(url.hash);
      });
    });

    // Back-to-top buttons.
    document.querySelectorAll(".back-to-top").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        history.pushState(null, "", window.location.pathname);
        animatedScrollTo(0, 900);
      });
    });

    // If the page loaded with a hash, do the bounce scroll after layout settles.
    if (window.location.hash) {
      window.setTimeout(function () {
        scrollToHash(window.location.hash);
      }, 60);
    }

    // Background section: Education / Experience tabs.
    document.querySelectorAll(".tabs").forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll(".tab-btn");
      var container = tabGroup.parentElement;
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab");
          buttons.forEach(function (b) {
            b.classList.toggle("active", b === btn);
            b.setAttribute("aria-selected", b === btn ? "true" : "false");
          });
          container.querySelectorAll(".tab-panel").forEach(function (panel) {
            panel.hidden = panel.getAttribute("data-panel") !== target;
          });
        });
      });
    });

    // "See more" full-page experience overlay.
    document.querySelectorAll(".see-more-btn").forEach(function (btn) {
      var overlayId = btn.getAttribute("data-overlay-target");
      var overlay = overlayId ? document.getElementById(overlayId) : null;
      if (!overlay) return;
      btn.addEventListener("click", function () {
        overlay.hidden = false;
        document.body.style.overflow = "hidden";
        window.requestAnimationFrame(function () {
          overlay.classList.add("is-open");
        });
      });
    });
    document.querySelectorAll(".overlay-close").forEach(function (btn) {
      var overlay = btn.closest(".full-overlay");
      function close() {
        if (!overlay) return;
        overlay.classList.remove("is-open");
        document.body.style.overflow = "";
        window.setTimeout(function () { overlay.hidden = true; }, 320);
      }
      btn.addEventListener("click", close);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay && !overlay.hidden) close();
      });
    });

    // Active nav-link highlighting via IntersectionObserver.
    var sections = document.querySelectorAll("main .section[id]");
    var navLinks = document.querySelectorAll(".site-nav .links a[href*='#']");
    if (sections.length && navLinks.length && "IntersectionObserver" in window) {
      var byId = {};
      navLinks.forEach(function (a) {
        var h = a.getAttribute("href").split("#")[1];
        if (h) byId[h] = a;
      });
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var link = byId[entry.target.id];
            if (!link) return;
            if (entry.isIntersecting) {
              navLinks.forEach(function (a) { a.classList.remove("active"); });
              link.classList.add("active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) { observer.observe(s); });
    }
  });
})();
