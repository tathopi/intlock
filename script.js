(function () {
  "use strict";

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    };
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("show");
      burger.setAttribute("aria-expanded", String(open));
      mobileMenu.setAttribute("aria-hidden", String(!open));
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Шапка и полоса прогресса при скролле ---------- */
  const header = document.querySelector(".header");
  const progress = document.getElementById("progress");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct.toFixed(2) + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Фото разделов: свой файл или SVG-заглушка «Фото» ----------
     В src лежит assets/dir-access-1.jpg и т. д. (свои фотографии),
     в data-fallback — assets/dir-*.svg. Если файла ещё нет/он не открылся —
     ставим заглушку и показываем подпись «Фото» (.dir-slide-ph). */
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const slide = img.closest(".dir-slide");
    const ph = slide && slide.querySelector(".dir-slide-ph");
    const swap = () => {
      if (img.dataset.fallbackDone) return;
      img.dataset.fallbackDone = "1";
      img.src = img.getAttribute("data-fallback");
    };
    const showPh = () => { if (ph) ph.hidden = false; };
    const hidePh = () => { if (ph) ph.hidden = true; };

    img.addEventListener("error", () => { swap(); showPh(); });
    img.addEventListener("load", hidePh);
    if (img.complete) {
      if (img.naturalWidth === 0) { swap(); showPh(); }
      else hidePh();
    }
  });

  /* ---------- Слайдеры фото в разделах главной ---------- */
  const INTERVAL = 4000; /* ← интервал автопрокрутки (мс) */
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-slider]").forEach((box) => {
    const slides = Array.from(box.querySelectorAll(".dir-slide"));
    if (!slides.length) return;

    const dotsBox = box.querySelector("[data-slider-dots]");
    const prev = box.querySelector("[data-slider-prev]");
    const next = box.querySelector("[data-slider-next]");
    const photoWord = (window.INTLOCK_I18N && window.INTLOCK_I18N.t("slider.photo")) || "Фото";
    /* Точки-кольца (data-slider-progress): по кольцу видно, скоро смена слайда */
    const ring = box.hasAttribute("data-slider-progress");
    if (ring) box.style.setProperty("--slide-int", INTERVAL + "ms");
    let index = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      if (ring) {
        b.className = "dot-ring" + (i === 0 ? " active" : "");
        b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<circle class="ring-bg" cx="12" cy="12" r="10"/>' +
          '<circle class="ring-fg" cx="12" cy="12" r="10"/></svg>';
      } else if (i === 0) {
        b.className = "active";
      }
      b.setAttribute("aria-label", photoWord + " " + (i + 1));
      b.addEventListener("click", () => { go(i); start(); });
      if (dotsBox) dotsBox.appendChild(b);
      return b;
    });

    function go(i) {
      index = ((i % slides.length) + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
      dots.forEach((d, k) => {
        d.classList.toggle("active", k === index);
        d.setAttribute("aria-current", k === index ? "true" : "false");
      });
    }
    function start() {
      stop();
      if (reducedMotion) return; /* уважаем системную настройку «меньше анимации» */
      timer = setInterval(() => { if (!document.hidden) go(index + 1); }, INTERVAL);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener("click", () => { go(index - 1); start(); });
    if (next) next.addEventListener("click", () => { go(index + 1); start(); });

    /* Пауза при наведении/фокусе, возобновление при уходе */
    /* У слайдера в шапке (герой) автопрокрутка не останавливается при наведении курсора */
    if (!box.classList.contains("hero-slider")) {
      box.addEventListener("mouseenter", stop);
      box.addEventListener("mouseleave", start);
      box.addEventListener("focusin", stop);
      box.addEventListener("focusout", start);
    }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    /* Свайп пальцем на телефоне */
    let x0 = null;
    box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); start(); }
      x0 = null;
    });

    /* Подписи точек следуют за языком */
    const labelDots = () => {
      const word = (window.INTLOCK_I18N && window.INTLOCK_I18N.t("slider.photo")) || "Фото";
      dots.forEach((d, i) => d.setAttribute("aria-label", word + " " + (i + 1)));
    };
    document.addEventListener("langchange", labelDots);

    go(0);
    start();
  });

  /* ---------- Видео на главной: data-video="ссылка" → плеер вместо заглушки ---------- */
  document.querySelectorAll("[data-video]").forEach((box) => {
    const url = (box.getAttribute("data-video") || "").trim();
    if (!url) return; /* ссылки нет — остаётся заглушка «Видео» */
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = box.getAttribute("data-video-title") || "INTLOCK video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    box.textContent = "";
    box.appendChild(iframe);
  });

  /* ---------- Появление блоков при скролле ---------- */
  const targets = document.querySelectorAll(
    ".section-head, .bento-card, .dir-slider, .dir-content, .cta-inner"
  );
  if (targets.length) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("reveal-visible"));
    } else {
      targets.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      targets.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Spotlight-подсветка карточек под курсором ---------- */
  const spots = Array.from(document.querySelectorAll(".spotlight"));
  if (spots.length && window.matchMedia("(hover: hover)").matches) {
    spots.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Свет под курсором (только при наличии мыши) ---------- */
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const noExtraMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (finePointer && !noExtraMotion) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
    let targetX = -2000, targetY = -2000, x = -2000, y = -2000, frame = null;
    const draw = () => {
      x += (targetX - x) * 0.14; /* плавность: свет догоняет курсор */
      y += (targetY - y) * 0.14;
      glow.style.transform = "translate(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px)";
      frame = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5
        ? raf(draw)
        : null;
    };
    document.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = "1";
      if (!frame) frame = raf(draw);
    });
    document.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
  }

  /* ---------- Год в подвале ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
