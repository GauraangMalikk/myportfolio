/* ============================================================
   Le Laboratoire Kalkin — app.js
   ============================================================ */

/* === 1. THEME TOGGLE ====================================== */
(function () {
  const btn    = document.getElementById("theme-toggle");
  const root   = document.documentElement;
  const MOON   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const SUN    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  if (!btn) return;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    btn.innerHTML = theme === "dark" ? MOON : SUN;
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // Init on load
  setTheme(localStorage.getItem("theme") || "dark");
})();

/* === 3. MOBILE NAVBAR ===================================== */
(function () {
  const nav        = document.querySelector(".navbar");
  const hamburger  = document.querySelector(".navbar__hamburger");
  const overlay    = document.querySelector(".nav-overlay");
  if (!hamburger || !overlay) return;

  function openNav() {
    nav.classList.add("navbar--open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("navbar--open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    nav.classList.contains("navbar--open") ? closeNav() : openNav();
  });

  // Close on link click or Escape
  overlay.querySelectorAll(".navbar__link").forEach(link => {
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeNav();
  });
})();

/* === 4. TABS (about page) ================================= */
(function () {
  const tabsContainer = document.querySelector(".tabs");
  const moreAbout     = document.querySelector(".more-about");
  if (!tabsContainer || !moreAbout) return;

  tabsContainer.addEventListener("click", e => {
    const item = e.target.closest(".tab-item");
    if (!item || item.classList.contains("active")) return;

    tabsContainer.querySelector(".active").classList.remove("active");
    item.classList.add("active");

    const target = item.getAttribute("data-target");
    moreAbout.querySelector(".tab-content.active").classList.remove("active");
    moreAbout.querySelector(target).classList.add("active");
  });
})();

/* === 5. SCROLL REVEAL (IntersectionObserver) ============== */
(function () {
  const els = document.querySelectorAll(".section-label, .section-title");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* === 6. CANVA CLICK-TO-LOAD =============================== */
(function () {
  document.querySelectorAll(".canva-loader").forEach(loader => {
    function load() {
      const src    = loader.dataset.src;
      const parent = loader.parentElement;
      const iframe = document.createElement("iframe");
      iframe.src              = src;
      iframe.className        = "canva-embed-frame";
      iframe.allowFullscreen  = true;
      iframe.loading          = "lazy";
      iframe.title            = "Canva presentation";
      parent.replaceChild(iframe, loader);
    }
    loader.addEventListener("click", load);
    loader.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") load(); });
  });
})();
