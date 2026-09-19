/* ============================================================
   THE JOURNEY — scroll-driven cinematic experience
   GSAP ScrollTrigger + Lenis + canvas particles
   ============================================================ */
(function () {
  'use strict';

  if (document.body.dataset.page !== 'journey') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const mobile = window.matchMedia('(max-width: 900px)').matches;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    /* ---------------- Lenis smooth scroll ---------------- */
    let lenis = null;
    if (!reduced && window.Lenis) {
      lenis = new Lenis({ duration: 1.25, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* ---------------- progress bar ---------------- */
    gsap.to('.progressbar', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });

    /* ---------------- scene rail ---------------- */
    const railItems = document.querySelectorAll('.rail__item');
    document.querySelectorAll('[data-rail]').forEach(sec => {
      ScrollTrigger.create({
        trigger: sec, start: 'top center', end: 'bottom center',
        onToggle: st => {
          if (!st.isActive) return;
          railItems.forEach(it => it.classList.toggle('active', it.dataset.rail === sec.dataset.rail));
        }
      });
    });

    if (reduced) {
      /* readable stacked fallback — everything visible, no timelines */
      document.querySelectorAll('.beat, .trans-copy .display, .mw-inner > *').forEach(el => { el.style.opacity = 1; el.style.visibility = 'visible'; });
      return;
    }

    document.documentElement.classList.add('cinema');

    /* ============================================================
       01 — HERO
       ============================================================ */
    const heroTl = gsap.timeline({
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 0.5 }
    });
    /* every tween the entrance also touches uses explicit fromTo values,
       so a scroll during the entrance can never lock in half-animated
       start states (the "content gone when scrolling back to top" bug) */
    heroTl
      .fromTo('.hero-bg', { scale: 1.06, yPercent: 0 }, { scale: 1.0, yPercent: 4, ease: 'none', immediateRender: false }, 0)
      .fromTo('.hero-mid', { yPercent: 0, xPercent: 0 }, { yPercent: -5, xPercent: -1.5, ease: 'none', immediateRender: false }, 0)
      .fromTo('.leaf--far', { yPercent: 0, scale: 1 }, { yPercent: -8, scale: 1.1, ease: 'none', immediateRender: false }, 0)
      .fromTo('.leaf--l', { yPercent: 0, xPercent: 0 }, { yPercent: -13, xPercent: -2, ease: 'none', immediateRender: false }, 0)
      .fromTo('.leaf--r', { yPercent: 0, xPercent: 0 }, { yPercent: -15, xPercent: 2, ease: 'none', immediateRender: false }, 0)
      .fromTo('.leaf--b', { yPercent: 0 }, { yPercent: -18, ease: 'none', immediateRender: false }, 0)
      .fromTo('.hero-bottle-in', { yPercent: 0, scale: 1 }, { yPercent: -7, scale: 0.94, ease: 'none', immediateRender: false }, 0)
      .fromTo('.hero-copy', { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, ease: 'power1.in', duration: 0.28, immediateRender: false }, 0.02)
      .fromTo('.hero-foot', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.18, immediateRender: false }, 0.05)
      .fromTo('.hero-bottle-in', { autoAlpha: 1 }, { autoAlpha: 0, ease: 'power1.in', duration: 0.3, immediateRender: false }, 0.68)
      .fromTo('.stagechip--hero', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, immediateRender: false }, 0.05)
      .to({}, { duration: 0.2 });

    /* hero entrance — explicit fromTo ends, so the entrance always finishes
       at the exact final values even if the user scrolls mid-intro */
    gsap.timeline({ delay: 1.15 })
      .fromTo('.hero-copy .eyebrow', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 0)
      .fromTo('.hero-copy h1', { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' }, 0.25)
      .fromTo('.hero-copy .journeysub', { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 0.4)
      .fromTo('.hero-copy p, .hero-copy .btn', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.6)
      .fromTo('.hero-bottle-in', { autoAlpha: 0, scale: 0.92, filter: 'blur(10px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power2.out' }, 0.55)
      .fromTo('.leaf--far', { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 2 }, 0.4)
      .fromTo(['.leaf--l', '.leaf--r', '.leaf--b'], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.5, stagger: 0.14, ease: 'power2.out' }, 0.7)
      .fromTo('.hero-foot', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.5)
      .fromTo('.nav', { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0);

    /* mouse parallax on hero */
    if (finePointer) {
      const qx = {}; const qy = {};
      /* the bottle lives on its own inner element — parallax starts from 0,
         follows the cursor subtly, and can never drift (the CSS-centered
         anchor is never touched by GSAP) */
      const planes = ['.hero-bg', '.hero-mid', '.leaf--far', '.hero-bottle-in', '.leaf--l', '.leaf--r', '.leaf--b'];
      const px = [6, 14, 22, 10, 32, 36, 42];
      const py = [4, 9, 14, 8, 19, 21, 26];
      planes.forEach((sel, i) => {
        qx[sel] = gsap.quickTo(sel, 'x', { duration: 0.9, ease: 'power2.out' });
        qy[sel] = gsap.quickTo(sel, 'y', { duration: 0.9, ease: 'power2.out' });
        qx[sel].par = px[i];
        qy[sel].par = py[i];
      });
      document.querySelector('#hero .stage').addEventListener('pointermove', e => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ry = (e.clientY / window.innerHeight - 0.5) * 2;
        Object.keys(qx).forEach(sel => { qx[sel](rx * qx[sel].par); qy[sel](ry * qy[sel].par); });
      });
    }

    /* ============================================================
       02 — FOREST (four product beats)
       ============================================================ */
    const beats = gsap.utils.toArray('#forest .beat');
    const forestTl = gsap.timeline({
      scrollTrigger: { trigger: '#forest', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });

    gsap.set(beats, { autoAlpha: 0 });
    /* the background is COMMON with the awakening — the very same image at
       the very same scale, offset and brightness, held still for the whole
       forest. Only the models (leaf planes, botanicals, bottles) change */
    gsap.set('.forest-bg', { yPercent: 4 });
    /* the awakening's framing (mid model + leaf planes + fog) continues here,
       already at its final hero positions, and dissolves upward as beat 1 begins */
    if (document.querySelector('.forest-frame')) {
      gsap.set('.ff-mid', { yPercent: -5, xPercent: -1.5, scale: 1.1 });
      gsap.set('.ff-far', { yPercent: -8, scale: 1.1 });
      gsap.set('.ff-l', { yPercent: -13, xPercent: -2 });
      gsap.set('.ff-r', { yPercent: -15, xPercent: 2 });
      gsap.set('.ff-b', { yPercent: -18 });
      forestTl
        .to('.forest-frame', { autoAlpha: 0, ease: 'power1.in', duration: 1.15 }, 0.2)
        .to('.ff-mid', { yPercent: -13, ease: 'none', duration: 1.5 }, 0)
        .to('.ff-far', { yPercent: -15, ease: 'none', duration: 1.5 }, 0)
        .to('.ff-l', { yPercent: -23, xPercent: -4, ease: 'none', duration: 1.5 }, 0)
        .to('.ff-r', { yPercent: -25, xPercent: 3, ease: 'none', duration: 1.5 }, 0)
        .to('.ff-b', { yPercent: -29, ease: 'none', duration: 1.5 }, 0);
    }

    const SEG = 1; // duration units per beat
    beats.forEach((beat, i) => {
      const at = i * SEG;
      const bot = beat.querySelector('.beat__botanical');
      const leaf = beat.querySelector('.bleaf');
      const fig = beat.querySelector('.beat__figure');
      const copy = beat.querySelector('.beat__copy');
      const fromX = i % 2 === 0 ? 9 : -9;

      if (i === 0) {
        forestTl.fromTo(beat, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'power1.out' }, at);
      } else {
        forestTl.fromTo(beat, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'power1.inOut' }, at + 0.02);
      }
      if (bot) forestTl.fromTo(bot, { xPercent: fromX }, { xPercent: fromX / 2.6, ease: 'none', duration: SEG }, at);
      if (leaf) forestTl.fromTo(leaf, { xPercent: fromX * 1.9, yPercent: 4 }, { xPercent: fromX * 1.15, yPercent: -3, ease: 'none', duration: SEG }, at);
      if (fig) forestTl.fromTo(fig, { y: 90, scale: 0.9 }, { y: 0, scale: 1, ease: 'none', duration: SEG * 0.8 }, at);
      if (copy) forestTl.fromTo(copy, { y: 60 }, { y: -34, ease: 'none', duration: SEG }, at);
      if (i < beats.length - 1) {
        forestTl.to(beat, { autoAlpha: 0, duration: 0.18, ease: 'power1.inOut' }, at + SEG - 0.2);
      } else {
        forestTl.to(beat, { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, at + SEG - 0.3);
      }
    });

    /* ============================================================
       03 — TRANSITION (forest → land → water)
       ============================================================ */
    const transTl = gsap.timeline({
      scrollTrigger: { trigger: '#transition', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });
    const titles = gsap.utils.toArray('.trans-copy .tt');
    const transSteps = gsap.utils.toArray('.trans-steps span');
    const stepsWrap = document.querySelector('.trans-steps');

    gsap.set(titles, { autoAlpha: 0, y: 44 });
    gsap.set(titles[0], { autoAlpha: 1, y: 0 });
    gsap.set('.water-rise', { yPercent: 103 });

    /* one continuous shore scene:
       3. the beach (sky & sand) is the base layer
       2. the sea water rises in the middle
       1. the Mi Amor models (bushes + leaves) overlay everything on top */
    transTl
      .to('.trans-beach', { scale: 1.07, ease: 'none', duration: 5.45 }, 0)
      .fromTo('.shore-overlay', { xPercent: 6 }, { xPercent: 1, ease: 'none', duration: 5.45 }, 0)
      .to('.trans-wash', { opacity: 0.4, duration: 1.2, ease: 'power1.inOut' }, 0.8)
      .to('.trans-wash', { opacity: 0, duration: 1.2 }, 2.1)
      .to('.trans-vignette', { opacity: 0.22, duration: 1.2 }, 1.8)
      /* the water pops up in between the leaves and the beach — no voice-over,
         the ocean itself takes the screen and the dive begins */
      .to('.trans-vignette', { opacity: 1, duration: 1.2 }, 3.3)
      .to('.water-rise', { yPercent: 0, duration: 2.05, ease: 'power2.in' }, 3.4)
      .to('.trans-beach', { scale: 1.13, ease: 'none', duration: 2.05 }, 3.4)
      /* titles — two beats: the trees give way, then the shore */
      .to(titles[0], { autoAlpha: 0, y: -44, duration: 0.75, ease: 'power1.in' }, 1.35)
      .to(titles[1], { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power1.out' }, 1.85)
      .to(titles[1], { autoAlpha: 0, y: -44, duration: 0.65, ease: 'power1.in' }, 2.95)
      .to('.trans-copy', { autoAlpha: 0, duration: 0.6, ease: 'power1.in' }, 5.0)
      .to({}, { duration: 0.25 });

    transSteps.forEach((st, i) => {
      transTl.call(() => {
        transSteps.forEach((x, j) => x.classList.toggle('on', j <= i));
        if (stepsWrap) stepsWrap.classList.toggle('i', i === 2);
      }, [], [0.2, 1.85, 3.4][i]);
    });

    /* ============================================================
       04 — OCEAN (the dive)
       ============================================================ */
    const oceanTl = gsap.timeline({
      scrollTrigger: { trigger: '#ocean', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });
    const obeats = gsap.utils.toArray('#ocean .beat');
    const depthVal = document.querySelector('.depthmeter .val b');
    const depthPin = document.querySelector('.depthmeter .pin');

    gsap.set(obeats, { autoAlpha: 0 });
    oceanTl
      /* arrival just beneath the risen water — the veil dissolves into the sea bed */
      .fromTo('.ocean-veil', { opacity: 1 }, { opacity: 0, duration: 1.8, ease: 'power1.inOut' }, 0)
      /* whole-screen water pushes deeper; the sea-bed model rises past the camera and thins into the dark */
      .to('.ocean-water', { scale: 1.14, ease: 'none', duration: 9 }, 0)
      .fromTo('.ocean-bed-model', { yPercent: 7 }, { yPercent: -12, autoAlpha: 0.3, ease: 'none', duration: 9 }, 0)
      .to('.ocean-dark', { opacity: 0.78, ease: 'none', duration: 9 }, 0)
      .to('.rays', { opacity: 0.12, ease: 'none', duration: 6 }, 1.5)
      .to('.caustics', { opacity: 0, ease: 'none', duration: 5 }, 1)
      .fromTo('.ocean-head', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power1.out' }, 0.25)
      .to('.ocean-head', { autoAlpha: 0, y: -50, duration: 0.9, ease: 'power1.in' }, 1.6);

    const OSEG = 2.4;
    obeats.forEach((beat, i) => {
      const at = 2.6 + i * OSEG;
      const fig = beat.querySelector('.beat__figure');
      const copy = beat.querySelector('.beat__copy');
      oceanTl
        .fromTo(beat, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.inOut' }, at)
        .fromTo(fig, { y: -70, scale: 0.92 }, { y: 40, scale: 1.02, ease: 'none', duration: OSEG }, at)
        .fromTo(copy, { y: 40 }, { y: -30, ease: 'none', duration: OSEG }, at)
        .to(beat, { autoAlpha: 0, duration: 0.4, ease: 'power1.inOut' }, at + OSEG - 0.42);
    });

    /* depth readout */
    if (depthVal) {
      oceanTl.to({}, {
        duration: 9, ease: 'none',
        onUpdate: function () {
          const t = this.progress();
          const depth = Math.min(42, Math.round(t * 46));
          depthVal.textContent = depth;
          if (depthPin) depthPin.style.top = Math.min(100, t * 108) + '%';
        }
      }, 0);
    }

    /* ============================================================
       05 — MOST WANTED
       ============================================================ */
    const mwTl = gsap.timeline({
      scrollTrigger: { trigger: '#mostwanted', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });
    mwTl
      .fromTo('.beam', { opacity: 0, scaleY: 0.6 }, { opacity: 1, scaleY: 1, duration: 1.4, ease: 'power2.out', transformOrigin: 'top center' }, 0)
      .fromTo('.mw-inner .eyebrow', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
      .fromTo('.mw-inner h2', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 0.45)
      .fromTo('.mw-inner .sub', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.0)
      .fromTo('.mw-grid .pcard', { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.22, ease: 'power2.out' }, 1.2)
      .fromTo('.mw-foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 2.4)
      .to({}, { duration: 0.6 });

    /* ============================================================
       particles — hero dust + ocean bubbles
       ============================================================ */
    if (!mobile) {
      particleField('#hero .p-canvas', { count: 55, mode: 'dust', color: 'rgba(232,222,190,', rMax: 2.1 });
      particleField('#ocean .p-canvas', { count: 70, mode: 'bubbles', color: 'rgba(190,228,242,', rMax: 3.4 });
    } else {
      particleField('#hero .p-canvas', { count: 26, mode: 'dust', color: 'rgba(232,222,190,', rMax: 1.8 });
      particleField('#ocean .p-canvas', { count: 34, mode: 'bubbles', color: 'rgba(190,228,242,', rMax: 2.6 });
    }

    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ============================================================
     canvas particle field (dust / bubbles)
     ============================================================ */
  function particleField(sel, opts) {
    const canvas = document.querySelector(sel);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, raf = null, running = false;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const P = [];
    function spawn(p) {
      p.x = Math.random() * w;
      p.y = opts.mode === 'bubbles' ? h + Math.random() * h * 0.3 : Math.random() * h;
      p.r = 0.4 + Math.random() * opts.rMax;
      p.vy = opts.mode === 'bubbles' ? -(0.25 + Math.random() * 0.75) : -(0.05 + Math.random() * 0.16);
      p.vx = (Math.random() - 0.5) * 0.22;
      p.a = 0.12 + Math.random() * 0.4;
      p.sw = Math.random() * Math.PI * 2;
      p.swv = 0.004 + Math.random() * 0.012;
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * DPR; canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.sw += p.swv;
        p.x += p.vx + Math.sin(p.sw) * 0.35;
        p.y += p.vy;
        if (p.y < -8 || p.y > h + 14) spawn(p);
        if (p.x < -8) p.x = w + 6; if (p.x > w + 8) p.x = -6;
        const glow = opts.mode === 'bubbles' ? 0.5 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = opts.color + (p.a * glow).toFixed(3) + ')';
        ctx.fill();
        if (opts.mode === 'bubbles' && p.r > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,.35)';
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    }

    function start() { if (!running) { running = true; tick(); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    for (let i = 0; i < opts.count; i++) { const p = {}; spawn(p); P.push(p); }

    window.addEventListener('resize', () => { resize(); });

    /* run only while its scene is on screen */
    ScrollTrigger.create({
      trigger: canvas.closest('.scene') || canvas,
      start: 'top bottom', end: 'bottom top',
      onToggle: st => st.isActive ? start() : stop()
    });
  }
})();
