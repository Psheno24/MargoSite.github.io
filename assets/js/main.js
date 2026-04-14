/**
 * Сайт Маргариты Волковой — меню, модалка, тарифы, отзывы, карусели, EmailJS.
 *
 * EmailJS: шаблон с полями {{name}}, {{email}}, {{phone}}, {{interest}}, {{message}}
 */
(function () {
  "use strict";

  var EMAILJS_PUBLIC_KEY = "zq7v07VJEBawgYzDZ";
  var EMAILJS_SERVICE = "service_cs9p1tr";
  var EMAILJS_TEMPLATE = "template_z0w7jzg";

  var eduImages = [
    "assets/images/edu1.jpg",
    "assets/images/edu2.jpg",
    "assets/images/edu3.jpeg",
    "assets/images/edu4.jpeg",
    "assets/images/edu5.jpg",
    "assets/images/edu6.jpg",
    "assets/images/edu7.jpeg",
    "assets/images/edu8.jpg",
  ];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Моб. герой: один снимок при полной загрузке страницы (viewport + размеры контента в px).
     Без пересчёта при скрытии панели браузера / resize / смене ориентации. При уходе с
     мобильного брейкпоинта снимок сбрасывается. */
  var heroViewportMql = window.matchMedia("(max-width: 899px)");
  var heroSnapshotApplied = false;
  var heroSnapshotStarted = false;

  function lockHeroSnapshotStyles(hero) {
    function lock(el, propNames) {
      if (!el) return;
      var cs = getComputedStyle(el);
      propNames.forEach(function (name) {
        el.style.setProperty(name, cs.getPropertyValue(name));
      });
    }
    lock(hero, ["padding-top", "padding-left", "padding-right"]);
    lock(hero.querySelector(".hero__title"), [
      "font-size",
      "margin-bottom",
      "line-height",
    ]);
    lock(hero.querySelector(".hero__lead"), [
      "font-size",
      "margin-bottom",
      "line-height",
    ]);
    lock(hero.querySelector(".hero__grid"), ["gap", "row-gap", "column-gap"]);
    lock(hero.querySelector(".hero__middle"), ["padding-top", "padding-bottom"]);
    lock(hero.querySelector(".hero__visual"), ["max-width"]);
    lock(hero.querySelector(".hero__img"), [
      "max-width",
      "max-height",
      "width",
      "height",
    ]);
    lock(hero.querySelector(".hero__actions--mobile"), [
      "gap",
      "padding-top",
      "padding-bottom",
    ]);
    $all(".hero__actions--mobile .btn", hero).forEach(function (btn) {
      lock(btn, [
        "font-size",
        "line-height",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
      ]);
    });
  }

  function clearHeroSnapshotStyles(hero) {
    function clear(el, propNames) {
      if (!el) return;
      propNames.forEach(function (name) {
        el.style.removeProperty(name);
      });
    }
    clear(hero, ["padding-top", "padding-left", "padding-right"]);
    clear(hero.querySelector(".hero__title"), [
      "font-size",
      "margin-bottom",
      "line-height",
    ]);
    clear(hero.querySelector(".hero__lead"), [
      "font-size",
      "margin-bottom",
      "line-height",
    ]);
    clear(hero.querySelector(".hero__grid"), ["gap", "row-gap", "column-gap"]);
    clear(hero.querySelector(".hero__middle"), ["padding-top", "padding-bottom"]);
    clear(hero.querySelector(".hero__visual"), ["max-width"]);
    clear(hero.querySelector(".hero__img"), [
      "max-width",
      "max-height",
      "width",
      "height",
    ]);
    clear(hero.querySelector(".hero__actions--mobile"), [
      "gap",
      "padding-top",
      "padding-bottom",
    ]);
    $all(".hero__actions--mobile .btn", hero).forEach(function (btn) {
      clear(btn, [
        "font-size",
        "line-height",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
      ]);
    });
  }

  function applyHeroInitialSnapshot() {
    if (heroSnapshotStarted || heroSnapshotApplied || !heroViewportMql.matches) {
      return;
    }
    var hero = document.querySelector(".hero");
    if (!hero) return;

    heroSnapshotStarted = true;

    var innerH = window.innerHeight;
    document.documentElement.style.setProperty(
      "--hero-viewport-h",
      innerH + "px"
    );
    var header = document.querySelector(".site-header");
    var hh = header ? Math.round(header.getBoundingClientRect().height) : 0;
    if (!hh) {
      hh = 72;
    }
    var band = Math.max(0, Math.round(innerH) - hh);
    hero.style.minHeight = band + "px";
    hero.style.height = band + "px";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (!heroViewportMql.matches) {
          heroSnapshotStarted = false;
          return;
        }
        lockHeroSnapshotStyles(hero);
        heroSnapshotApplied = true;
      });
    });
  }

  function onHeroViewportMqlChange() {
    if (!heroViewportMql.matches) {
      document.documentElement.style.removeProperty("--hero-viewport-h");
      var hero = document.querySelector(".hero");
      if (hero) {
        hero.style.minHeight = "";
        hero.style.height = "";
        if (heroSnapshotApplied) {
          clearHeroSnapshotStyles(hero);
        }
      }
      heroSnapshotApplied = false;
      heroSnapshotStarted = false;
    }
  }

  function scheduleHeroSnapshotOnLoad() {
    if (!heroViewportMql.matches) return;
    if (document.readyState === "complete") {
      applyHeroInitialSnapshot();
    } else {
      window.addEventListener("load", applyHeroInitialSnapshot);
    }
  }
  scheduleHeroSnapshotOnLoad();

  if (heroViewportMql.addEventListener) {
    heroViewportMql.addEventListener("change", onHeroViewportMqlChange);
  } else if (heroViewportMql.addListener) {
    heroViewportMql.addListener(onHeroViewportMqlChange);
  }

  /* ---------- Тарифы: подсветка выбранной карточки ---------- */
  function syncTariffCardVisual() {
    $all('input[name="tariff"]').forEach(function (r) {
      var lbl = r.closest(".price-card--selectable");
      if (!lbl) return;
      lbl.classList.toggle("price-card--selected", r.checked);
    });
  }

  $all('input[name="tariff"]').forEach(function (r) {
    r.addEventListener("change", syncTariffCardVisual);
  });
  syncTariffCardVisual();

  /* ---------- Логотип → самый верх страницы ---------- */
  var siteLogo = $(".site-logo");
  if (siteLogo) {
    siteLogo.addEventListener("click", function (e) {
      var href = siteLogo.getAttribute("href") || "";
      if (href === "#top" || href.endsWith("#top")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.history && window.history.replaceState) {
          var path = window.location.pathname + window.location.search;
          window.history.replaceState(null, "", path);
        }
      }
    });
  }

  /* ---------- Навигация ---------- */
  var navToggle = $("#nav-toggle");
  var navMobile = $("#nav-mobile");

  function setNavOpen(open) {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute(
      "aria-label",
      open ? "Закрыть меню" : "Открыть меню"
    );
    document.body.classList.toggle("nav-open", open);
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") !== "true";
      setNavOpen(open);
    });
  }

  if (navMobile) {
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
    navMobile.querySelectorAll(".js-open-modal").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  /* ---------- Модальное окно ---------- */
  var modal = $("#contact-modal");
  var modalClose = $("#modal-close");
  var interestSelect = $("#cf-interest");

  function resetInterestSelect() {
    if (!interestSelect) return;
    interestSelect.selectedIndex = 0;
  }

  function applyTariffFromPricing() {
    var checked = document.querySelector('input[name="tariff"]:checked');
    if (!checked || !interestSelect) return;
    var v = checked.value;
    interestSelect.value = v;
    if (interestSelect.value !== v) {
      for (var i = 0; i < interestSelect.options.length; i++) {
        if (interestSelect.options[i].value === v) {
          interestSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  function openModal(fromPricing) {
    if (!modal) return;
    if (fromPricing) {
      applyTariffFromPricing();
    } else {
      resetInterestSelect();
    }
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    var first =
      $("#cf-name") ||
      modal.querySelector(
        "#contact-form input, #contact-form select, #contact-form textarea"
      );
    if (first) first.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  $all(".js-open-modal").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var fromPricing = btn.classList.contains("js-open-modal--pricing");
      openModal(fromPricing);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
      setNavOpen(false);
    }
  });

  /* ---------- Форма ---------- */
  var form = $("#contact-form");
  var consent = $("#cf-consent");
  var submitBtn = form ? form.querySelector(".form-submit") : null;
  var phoneInput = $("#cf-phone");

  function syncSubmit() {
    if (!submitBtn || !consent) return;
    submitBtn.disabled = !consent.checked;
  }

  if (consent) {
    consent.addEventListener("change", syncSubmit);
    syncSubmit();
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var v = phoneInput.value;
      var cleaned = v.replace(/[^\d+]/g, "");
      if (cleaned.indexOf("+") > 0) {
        cleaned = cleaned.replace(/\+/g, "");
        cleaned = "+" + cleaned;
      }
      if (phoneInput.value !== cleaned) phoneInput.value = cleaned;
    });
  }

  /* ---------- Отзывы: раскрытие только своей карточки + скрыть ---------- */
  $all(".review").forEach(function (card) {
    var more = card.querySelector(".review__more");
    var less = card.querySelector(".review__less");
    if (!more || !less) return;

    more.addEventListener("click", function () {
      card.classList.add("is-expanded");
      more.setAttribute("hidden", "");
      less.removeAttribute("hidden");
    });

    less.addEventListener("click", function () {
      card.classList.remove("is-expanded");
      less.setAttribute("hidden", "");
      more.removeAttribute("hidden");
    });
  });

  /* ---------- Карусель отзывов (по 3 на экране) ---------- */
  var reviewsTrack = $("#reviews-track");
  var reviewsSlides = $all("[data-reviews-slide]");
  var reviewsPrev = $("#reviews-prev");
  var reviewsNext = $("#reviews-next");
  var reviewsCounter = $("#reviews-counter");
  var reviewsIdx = 0;

  function updateReviewsCarousel() {
    if (!reviewsTrack || !reviewsSlides.length) return;
    var n = reviewsSlides.length;
    reviewsIdx = ((reviewsIdx % n) + n) % n;
    reviewsTrack.style.transform = "translateX(" + -reviewsIdx * 100 + "%)";
    if (reviewsCounter) {
      reviewsCounter.textContent = reviewsIdx + 1 + " / " + n;
    }
  }

  if (reviewsPrev) {
    reviewsPrev.addEventListener("click", function () {
      reviewsIdx -= 1;
      updateReviewsCarousel();
    });
  }
  if (reviewsNext) {
    reviewsNext.addEventListener("click", function () {
      reviewsIdx += 1;
      updateReviewsCarousel();
    });
  }
  updateReviewsCarousel();

  var revViewport = reviewsTrack ? reviewsTrack.closest(".reviews-carousel__viewport") : null;
  if (revViewport) {
    var rx0 = 0;
    revViewport.addEventListener(
      "touchstart",
      function (e) {
        rx0 = e.touches[0].clientX;
      },
      { passive: true }
    );
    revViewport.addEventListener("touchend", function (e) {
      var x = e.changedTouches[0].clientX;
      var d = rx0 - x;
      if (d > 50) {
        reviewsIdx += 1;
        updateReviewsCarousel();
      } else if (d < -50) {
        reviewsIdx -= 1;
        updateReviewsCarousel();
      }
    });
  }

  /* ---------- Карусель образования ---------- */
  var eduImg = $("#edu-slide-img");
  var eduCounter = $("#edu-counter");
  var eduPrev = $("#edu-prev");
  var eduNext = $("#edu-next");
  var eduIndex = 0;

  function renderEdu() {
    if (!eduImg || !eduImages.length) return;
    eduIndex = (eduIndex + eduImages.length) % eduImages.length;
    eduImg.src = eduImages[eduIndex];
    if (eduCounter) {
      eduCounter.textContent = eduIndex + 1 + " / " + eduImages.length;
    }
  }

  if (eduPrev) {
    eduPrev.addEventListener("click", function () {
      eduIndex -= 1;
      renderEdu();
    });
  }
  if (eduNext) {
    eduNext.addEventListener("click", function () {
      eduIndex += 1;
      renderEdu();
    });
  }
  renderEdu();

  /* ---------- EmailJS ---------- */
  var toastOk = $("#toast-ok");
  var toastErr = $("#toast-err");

  function showToast(el, text, ms) {
    if (!el) return;
    el.textContent = text;
    el.classList.add("is-visible");
    window.setTimeout(function () {
      el.classList.remove("is-visible");
    }, ms || 4000);
  }

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!consent || !consent.checked) return;
      if (typeof emailjs === "undefined") {
        showToast(
          toastErr,
          "Не удалось загрузить сервис отправки. Проверьте соединение."
        );
        return;
      }

      var payload = {
        name: ($("#cf-name") && $("#cf-name").value) || "",
        email: ($("#cf-email") && $("#cf-email").value) || "",
        phone: ($("#cf-phone") && $("#cf-phone").value) || "",
        interest: ($("#cf-interest") && $("#cf-interest").value) || "",
        message: ($("#cf-message") && $("#cf-message").value) || "",
      };

      if (submitBtn) submitBtn.disabled = true;

      emailjs
        .send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, payload)
        .then(function () {
          closeModal();
          form.reset();
          syncSubmit();
          resetInterestSelect();
          showToast(toastOk, "Заявка отправлена! Скоро свяжусь с вами.");
        })
        .catch(function (err) {
          console.error(err);
          showToast(
            toastErr,
            "Ошибка отправки. Напишите в Telegram или на почту."
          );
        })
        .finally(function () {
          if (submitBtn && consent && consent.checked) {
            submitBtn.disabled = false;
          }
        });
    });
  }
})();
