/* ============================================================
   Particle canvas — hero background
   ============================================================ */
(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const PARTICLE_COUNT = 70;
  const LINK_DISTANCE = 130;
  const PARTICLE_SPEED = 0.35;

  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x:   randomBetween(0, W),
      y:   randomBetween(0, H),
      vx:  randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED),
      vy:  randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED),
      r:   randomBetween(1.2, 2.4),
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function getColor() {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light" ? "0, 100, 180" : "0, 212, 255";
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const col = getColor();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col}, 0.55)`;
      ctx.fill();

      // Draw lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DISTANCE) {
          const alpha = (1 - dist / LINK_DISTANCE) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${col}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    cancelAnimationFrame(animId);
    resize();
    init();
    draw();
  }

  // Pause when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      draw();
    }
  });

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  start();
})();
