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
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
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
    overlay.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
    const firstLink = overlay.querySelector(".navbar__link");
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    const returnFocus = overlay.contains(document.activeElement);
    nav.classList.remove("navbar--open");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    if (returnFocus) hamburger.focus();
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
    if (e.key === "Tab" && nav.classList.contains("navbar--open")) {
      const focusable = [...overlay.querySelectorAll("a[href]")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
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

/* === 6. CANVA CLICK-TO-LOAD (Selected Work only) ========== */
(function () {
  document.querySelectorAll(".canva-loader").forEach(loader => {
    function load() {
      if (!loader.isConnected) return;
      const iframe = document.createElement("iframe");
      iframe.src = loader.dataset.src;
      iframe.className = "canva-embed-frame";
      iframe.title = loader.getAttribute("aria-label") || "Canva presentation";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      loader.parentElement.replaceChild(iframe, loader);
    }
    loader.addEventListener("click", load);
    loader.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        load();
      }
    });
  });
})();

/* === 7. TALKS IFRAME LAZY-LOAD (IntersectionObserver) ===== */
(function () {
  document.querySelectorAll("iframe[data-src]").forEach(iframe => {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        iframe.src = iframe.dataset.src;
        obs.disconnect();
      }
    }, { rootMargin: "200px" }).observe(iframe);
  });
})();

/* === 8. BOOKING — scheduler embed ========================== */
/*  ONE EDIT switches the whole site on. Paste EITHER kind of link:
 *
 *  A) Google Calendar appointment schedule — no new account needed.
 *     Google Calendar → Create → Appointment schedule → set your hours →
 *     Open the booking page → Share → Website embed → copy the URL.
 *     Looks like:
 *       "https://calendar.google.com/calendar/appointments/schedules/AcZssZ...?gv=true"
 *     Google checks your Gmail calendar for conflicts itself and attaches
 *     a Google Meet link. Free Gmail accounts get one booking page.
 *
 *  B) Cal.com link — use this when you want Zoom and Teams as options
 *     alongside Meet. Just the part after "cal.com/":
 *       "gauraang-malik/30min"
 *
 *  Full walkthrough for both: BOOKING-SETUP.md in the repo root.
 */
const BOOKING = {
  link: "",

  /* Printed in the top bar and the "Pick a time" section. Keep it honest —
     don't advertise Zoom or Teams until they're actually connected. */
  platforms: "Google Meet",
  duration: "30 min"
};

(function () {
  const section  = document.querySelector("[data-booking-section]");
  const inlineEl = document.getElementById("cal-inline");
  const triggers = [...document.querySelectorAll("[data-booking-cta]")];
  if (!triggers.length && !section) return;

  const scrollCta = triggers.filter(el => el.dataset.bookingCta === "inline");
  const modalCta  = triggers.filter(el => el.dataset.bookingCta !== "inline");
  const link      = (BOOKING.link || "").trim();

  /* Not configured yet: drop the calendar section and the button that jumps
     to it rather than shipping anchors to something that isn't there, and
     send the remaining buttons to the contact block. */
  if (!link) {
    if (section) section.remove();
    scrollCta.forEach(el => el.remove());
    modalCta.forEach(el => { el.href = el.getAttribute("href").replace("#book", "#contact"); });
    return;
  }

  const isGoogle = /^https:\/\/calendar\.google\.com\/calendar\/appointments\//.test(link);
  const pageUrl  = isGoogle ? link : "https://cal.com/" + link.replace(/^https?:\/\/cal\.com\//, "");

  if (section) section.hidden = false;

  /* Keep the advertised platforms in step with the config */
  document.querySelectorAll("[data-booking-platforms]").forEach(el => {
    el.textContent = BOOKING.platforms;
  });
  document.querySelectorAll(".bookbar__cta-meta").forEach(el => {
    el.textContent = BOOKING.duration + " · " + BOOKING.platforms;
  });
  document.querySelectorAll("[data-booking-direct]").forEach(a => { a.href = pageUrl; });

  /* Real link on every button first: if an embed is blocked or still
     loading, the click just opens the booking page in a new tab. */
  modalCta.forEach(el => {
    el.href = pageUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  /* ---------- A) Google Calendar appointment schedule ---------- */
  if (isGoogle) {
    const embedSrc = link.includes("gv=true")
      ? link
      : link + (link.includes("?") ? "&" : "?") + "gv=true";

    if (inlineEl) {
      const mount = () => {
        const frame = document.createElement("iframe");
        frame.src = embedSrc;
        frame.title = "Booking calendar";
        frame.loading = "lazy";
        frame.className = "booking__frame";
        inlineEl.innerHTML = "";
        inlineEl.appendChild(frame);
        frame.addEventListener("load", () => inlineEl.setAttribute("aria-busy", "false"));
      };
      new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { obs.disconnect(); mount(); }
      }, { rootMargin: "400px" }).observe(inlineEl);
    }

    /* Google has no popup API of its own, so the buttons open its booking
       page inside a native <dialog> — the visitor stays on the site. */
    let dialog;
    function openDialog(e) {
      if (typeof HTMLDialogElement === "undefined") return;   // let the link through
      e.preventDefault();
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.className = "booking-modal";
        dialog.setAttribute("aria-label", "Book a meeting");
        const close = document.createElement("button");
        close.className = "booking-modal__close";
        close.type = "button";
        close.setAttribute("aria-label", "Close booking");
        close.innerHTML = "&times;";
        close.addEventListener("click", () => dialog.close());
        const frame = document.createElement("iframe");
        frame.src = embedSrc;
        frame.title = "Booking calendar";
        frame.className = "booking-modal__frame";
        dialog.append(close, frame);
        dialog.addEventListener("click", ev => {
          if (ev.target === dialog) dialog.close();          // click the backdrop
        });
        document.body.appendChild(dialog);
      }
      dialog.showModal();
    }
    modalCta.forEach(el => el.addEventListener("click", openDialog));
    return;
  }

  /* ---------- B) Cal.com ---------- */
  const CAL_LINK  = link.replace(/^https?:\/\/cal\.com\//, "");
  const NAMESPACE = "kalkin-booking";
  const root      = document.documentElement;
  const uiConfig  = () => ({
    theme: root.getAttribute("data-theme") === "light" ? "light" : "dark",
    layout: "month_view",
    hideEventTypeDetails: false
  });
  let booted = false;

  modalCta.forEach(el => {
    el.setAttribute("data-cal-link", CAL_LINK);
    el.setAttribute("data-cal-namespace", NAMESPACE);
    el.setAttribute("data-cal-config", JSON.stringify({ layout: "month_view" }));
  });

  function boot() {
    if (booted) return;
    booted = true;

    /* Official Cal.com embed loader */
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    Cal.ns[NAMESPACE]("ui", uiConfig());
    document.addEventListener("themechange", () => Cal.ns[NAMESPACE]("ui", uiConfig()));
  }

  if (inlineEl) {
    const mount = () => {
      boot();
      Cal.ns[NAMESPACE]("inline", {
        elementOrSelector: "#cal-inline",
        calLink: CAL_LINK,
        config: { layout: "month_view" }
      });
      Cal.ns[NAMESPACE]("on", {
        action: "linkReady",
        callback: () => {
          inlineEl.setAttribute("aria-busy", "false");
          const loading = inlineEl.querySelector(".booking__loading");
          if (loading) loading.remove();
        }
      });
    };
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { obs.disconnect(); mount(); }
    }, { rootMargin: "400px" }).observe(inlineEl);
  }

  ["pointerenter", "touchstart", "focus"].forEach(evt => {
    modalCta.forEach(el => el.addEventListener(evt, () => {
      boot();
      Cal.ns[NAMESPACE]("preload", { calLink: CAL_LINK });
    }, { once: true, passive: true }));
  });

  if ("requestIdleCallback" in window) {
    requestIdleCallback(boot, { timeout: 4000 });
  } else {
    setTimeout(boot, 2500);
  }
})();
