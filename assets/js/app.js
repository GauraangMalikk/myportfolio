/* ──────────────────────────────────────────────────────────
   1.  Custom cursor grow / shrink
   ────────────────────────────────────────────────────────── */
   const mouseCursor = document.querySelector(".cursor-effect");
   const ctaLinks    = document.querySelectorAll(
     ".about-content a, .footer-links a, .more-about a"
   );
   const projectIcons = document.querySelectorAll(".project-box__link a ion-icon");
   
   window.addEventListener("mousemove", e => {
     mouseCursor.style.top  = `${e.pageY}px`;
     mouseCursor.style.left = `${e.pageX}px`;
   });
   
   [...ctaLinks, ...projectIcons].forEach(link => {
     link.addEventListener("mouseover", ()  => mouseCursor.classList.add("link-grow"));
     link.addEventListener("mouseleave", () => mouseCursor.classList.remove("link-grow"));
   });
   
   /* ──────────────────────────────────────────────────────────
      2.  GSAP intro animations (unchanged)
      ────────────────────────────────────────────────────────── */
   function fadeOut () {
     TweenMax.to(".intro-btn", 1, { opacity:0, y:-100 });
     TweenMax.to(".text"     , 1, { y:"-100%"            });
     TweenMax.to(".slider"   , 2, { y:"-100%", delay:1,   ease:Expo.easeInOut });
     TweenMax.to(".slider-2" , 2, { y:"-100%", delay:1.4, ease:Power2.easeInOut });
     TweenMax.to(".intro"    , 2, { y:"-100%", delay:2,   ease:Power2.easeInOut },"-=.5");
     TweenMax.to(".content"  , 2, { y:0,                  ease:Power2.easeInOut });
   }
   
   const tl = gsap.timeline({ defaults:{ ease:"power1.out" }});
   tl.to(".text",{ y:"0%", duration:1, stagger:0.4 });
   tl.from(".services-heading h2",{ y:300, opacity:0, duration:1 },"-=1");
   tl.fromTo(".landing-text h1",{ opacity:0 },{ opacity:1, duration:.5, stagger:.5 });
   tl.fromTo(".landing-text h5",{ opacity:0 },{ opacity:1, duration:1  });
   [".effect-1",".effect-2",".effect-3",".effect-4",".inner"]
     .forEach(sel => tl.fromTo(sel,{ opacity:0 },{ opacity:1, duration:1 }));
   
   /* ──────────────────────────────────────────────────────────
      3.  Theme toggle  (persist to localStorage)
      ────────────────────────────────────────────────────────── */
   const themeToggle = document.querySelector("input[name=theme]");
   const rootEl      = document.documentElement;
   
   /* Helper: apply theme value ("light" | "dark") */
   function setTheme(theme){
     rootEl.setAttribute("data-theme", theme);
     localStorage.setItem("theme", theme);
     themeToggle.checked = theme === "light";         // sync checkbox
   }
   
   /* a)  initialise on first load */
   (() => {
     const saved = localStorage.getItem("theme");
     if (saved){
       setTheme(saved);
     }else{
       setTheme(rootEl.getAttribute("data-theme") || "dark"); // default in HTML
     }
   })();
   
   /* b)  respond to checkbox changes */
   themeToggle.addEventListener("change", () =>
     setTheme(themeToggle.checked ? "light" : "dark")
   );
   
   /* optional: listen to system-pref change, if you wish
   matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
     if(!localStorage.getItem("theme")) setTheme(e.matches ? 'dark' : 'light');
   });
   */
   