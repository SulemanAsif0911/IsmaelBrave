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
      document.querySelectorAll('.picker, .trans-copy .display, .mw-inner > *').forEach(el => { el.style.opacity = 1; el.style.visibility = 'visible'; });
      return;
    }

    document.documentElement.classList.add('cinema');

    /* ============================================================
       01 — HERO
       ============================================================ */
    const heroTl = gsap.timeline({
      scrollTrigger: { trigger: '#hero', start: 'top top', end: () => window.innerHeight * 1.8, scrub: 0.5 }
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
      .fromTo('.leaf--n', { yPercent: 0 }, { yPercent: -18, ease: 'none', immediateRender: false }, 0)
      .fromTo('.hero-emblem-in', { yPercent: 0, scale: 1 }, { yPercent: -7, scale: 0.94, ease: 'none', immediateRender: false }, 0)
      .fromTo('.hero-copy', { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, ease: 'power1.in', duration: 0.28, immediateRender: false }, 0.02)
      .fromTo('.hero-foot', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.18, immediateRender: false }, 0.05)
      .fromTo('.hero-emblem-in', { autoAlpha: 1 }, { autoAlpha: 0, ease: 'power1.in', duration: 0.3, immediateRender: false }, 0.68)
      .fromTo('.stagechip--hero', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, immediateRender: false }, 0.05)
      .fromTo('#hero .p-canvas', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, immediateRender: false }, 0.85)
      /* the forest's own first frame fades in over the scenery — the copy is
         not parallaxed, so by the release the screen already IS the forest */
      .fromTo('.forest-pre', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, immediateRender: false }, 0.88)
      .to({}, { duration: 0.2 });

    /* the handoff into the forest — ONE FLOW, no lurch: the forest's stage is
       already pinned (static) underneath, and the awakening's stage — which by
       now carries the forest's own first frame — simply dissolves into it
       while BOTH are still pinned. The release slide happens afterwards,
       when this stage is already invisible: the screen never jumps up and
       nothing ever rises from the bottom */
    gsap.fromTo('#hero .stage', { autoAlpha: 1 }, {
      autoAlpha: 0, ease: 'none', immediateRender: false,
      scrollTrigger: {
        trigger: '#hero',
        start: () => window.innerHeight * 1.8,
        end: () => window.innerHeight * 2.25,
        scrub: 0.4
      }
    });

    /* one-flow handoff into the shore: the transition's stage is pinned
       under the forest's last stretch (already static when the forest's
       scrub ends), and the forest's stage — showing the shore pre-load —
       dissolves into it while BOTH are pinned. Its release slide happens
       afterwards, when the stage is already invisible */
    const topOf = sel => { const el = document.querySelector(sel); return el.getBoundingClientRect().top + window.scrollY; };
    gsap.fromTo('#forest .stage', { autoAlpha: 1 }, {
      autoAlpha: 0, ease: 'none', immediateRender: false,
      scrollTrigger: {
        trigger: '#forest',
        start: () => topOf('#forest') + window.innerHeight * 4.7,
        end: () => topOf('#forest') + window.innerHeight * 5.15,
        scrub: 0.4
      }
    });
    /* one-flow handoff into the dive: the ocean's stage is pinned under the
       transition's last stretch; the transition's stage (the fully risen
       water) dissolves into the live ocean beneath it */
    gsap.fromTo('#transition .stage', { autoAlpha: 1 }, {
      autoAlpha: 0, ease: 'none', immediateRender: false,
      scrollTrigger: {
        trigger: '#transition',
        start: () => topOf('#transition') + window.innerHeight * 5.6,
        end: () => topOf('#transition') + window.innerHeight * 6.05,
        scrub: 0.4
      }
    });

    /* hero entrance — explicit fromTo ends, so the entrance always finishes
       at the exact final values even if the user scrolls mid-intro */
    gsap.timeline({ delay: 1.15 })
      .fromTo('.hero-copy .eyebrow', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 0)
      .fromTo('.hero-copy h1', { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' }, 0.25)
      .fromTo('.hero-copy .journeysub', { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 0.4)
      .fromTo('.hero-copy p, .hero-copy .btn', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.6)
      .fromTo('.hero-emblem-in', { autoAlpha: 0, scale: 0.9, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power2.out' }, 0.55)
      .fromTo('.leaf--far', { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 2 }, 0.4)
      .fromTo(['.leaf--l', '.leaf--r', '.leaf--n'], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.5, stagger: 0.14, ease: 'power2.out' }, 0.7)
      .fromTo('.hero-foot', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.5)
      .fromTo('.nav', { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0);

    /* mouse parallax on hero */
    if (finePointer) {
      const qx = {}; const qy = {};
      /* the bottle lives on its own inner element — parallax starts from 0,
         follows the cursor subtly, and can never drift (the CSS-centered
         anchor is never touched by GSAP) */
      const planes = ['#hero .stage > .hero-bg', '#hero .stage > .hero-mid', '#hero .stage > .leaf--far', '#hero .hero-emblem-in', '#hero .stage > .leaf--l', '#hero .stage > .leaf--r', '#hero .stage > .leaf--n'];
      const px = [6, 14, 22, 10, 32, 36, 34];
      const py = [4, 9, 14, 8, 19, 21, 24];
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
       02 — FOREST (the fragrance picker)
       timeline units == scroll ih, so picker spans map 1:1
       ============================================================ */
    const forestTl = gsap.timeline({
      scrollTrigger: { trigger: '#forest', start: 'top top', end: () => '+=' + window.innerHeight * 4.7, scrub: 0.6 }
    });

    /* the background is COMMON with the awakening — the very same image at
       the very same scale, offset and brightness, held still for the whole
       forest. Only the models (leaf planes, botanicals) change */
    gsap.set('.forest-bg', { yPercent: 4 });
    /* the awakening's framing (mid model + leaf planes + fog) continues here,
       already at its final hero positions, and dissolves as the picker takes over */
    if (document.querySelector('.forest-frame')) {
      gsap.set('.ff-mid', { yPercent: -5, xPercent: -1.5, scale: 1.1 });
      gsap.set('.ff-far', { yPercent: -8, scale: 1.1 });
      gsap.set('.ff-l', { yPercent: -13, xPercent: -2 });
      gsap.set('.ff-r', { yPercent: -15, xPercent: 2 });
      gsap.set('.ff-n', { yPercent: -18 });
      forestTl
        .to('.forest-frame', { autoAlpha: 0, ease: 'power1.in', duration: 1.1 }, 0.15)
        .to('.ff-mid', { yPercent: -13, ease: 'none', duration: 1.35 }, 0)
        .to('.ff-far', { yPercent: -15, ease: 'none', duration: 1.35 }, 0)
        .to('.ff-l', { yPercent: -23, xPercent: -4, ease: 'none', duration: 1.35 }, 0)
        .to('.ff-r', { yPercent: -25, xPercent: 3, ease: 'none', duration: 1.35 }, 0)
        .to('.ff-n', { yPercent: -29, ease: 'none', duration: 1.35 }, 0);
    }

    /* the beach sits behind the forest world — at the end of the picker the
       world zooms out (the camera pulls back, per the reference vid) and the
       beach occurs around it */
    gsap.set('.beach-pre', { scale: 1.17 });
    /* the picker lives INSIDE the forest world and is never scrub-linked:
       it is simply on stage for the whole scene, and leaves only with the
       scene itself, zooming out inside the world at the handoff */
    forestTl
      .to('.stagechip--forest', { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0.3)
      .to('.stagechip--forest', { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, 3.95)
      /* THE ZOOM-OUT: the whole forest world (scenery + picker) shrinks toward
         the camera's pull-back and dissolves as it recedes — the beach is
         already on screen behind it, settling to the exact frame the shore
         section opens with (one-flow dissolve follows) */
      .to('.forest-world', { scale: 0.34, duration: 0.55, ease: 'power2.in' }, 4.15)
      .to('.forest-world', { autoAlpha: 0, duration: 0.42, ease: 'power1.in' }, 4.2)
      .to('.beach-pre', { scale: 1.14, duration: 0.55, ease: 'power2.out' }, 4.15);

    /* ============================================================
       03 — TRANSITION (forest → shore picker → the water rises)
       timeline units == scroll ih over a 5.6ih scrub
       ============================================================ */
    const transTl = gsap.timeline({
      scrollTrigger: { trigger: '#transition', start: 'top top', end: () => '+=' + window.innerHeight * 5.6, scrub: 0.6 }
    });

    gsap.set('#transition .stagechip', { autoAlpha: 0 });
    gsap.set('.water-rise', { yPercent: 103 });
    /* a clean stage for the picker: the bushes stay hidden while the
       fragrances play (the seam matches the forest's plain beach exactly)
       and return only for the water rise — the required Mi Amor sandwich
       (bushes over water over beach) is preserved where it matters */
    gsap.set('.shore-overlay', { autoAlpha: 0 });

    /* one continuous shore scene:
       3. the beach (sky & sand) is the base layer
       2. the sea water rises in the middle
       1. the Mi Amor models (bushes + leaves) overlay everything on top.
       The picker plays on the beach between the arrival title and the rise —
       its model planes stand in front of a dimmed bushes overlay */
    transTl
      .to('#transition .stagechip', { autoAlpha: 1, duration: 0.4 }, 0.35)
      .to('.trans-beach', { scale: 1.07, ease: 'none', duration: 5.6 }, 0)
      .to('.trans-wash', { opacity: 0.4, duration: 1.0, ease: 'power1.inOut' }, 0.7)
      .to('.trans-wash', { opacity: 0, duration: 1.0 }, 1.9)
      .to('.trans-vignette', { opacity: 0.22, duration: 1.0 }, 1.4)
      /* the bushes return for the water rise (the Mi Amor sandwich) */
      .to('.shore-overlay', { autoAlpha: 1, duration: 0.4, ease: 'power1.inOut' }, 3.7)
      /* the water overlays the beach from the bottom, gradually taking the
         frame (per the reference vid) — and because the picker sits BELOW
         the water layer, the rising water physically submerges the
         showcase, card and bar. No scroll-linked fade anywhere */
      .to('.water-rise', { yPercent: 0, duration: 1.2, ease: 'none' }, 4.15)
      .to('.trans-beach', { scale: 1.13, ease: 'none', duration: 1.2 }, 4.15)
      .to('.trans-vignette', { opacity: 1, duration: 0.6 }, 5.0)
      .to({}, { duration: 0.25 });

    /* ============================================================
       04 — OCEAN (the dive → the deep fragrance picker)
       timeline units == scroll ih over a 4.6ih scrub
       ============================================================ */
    const oceanTl = gsap.timeline({
      scrollTrigger: { trigger: '#ocean', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });
    const depthVal = document.querySelector('.depthmeter .val b');
    const depthPin = document.querySelector('.depthmeter .pin');

    oceanTl
      /* arrival just beneath the risen water — the veil dissolves into the sea bed */
      .fromTo('.ocean-veil', { opacity: 1 }, { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 0)
      /* whole-screen water pushes deeper; the sea-bed model rises past the camera and thins into the dark */
      .to('.ocean-water', { scale: 1.14, ease: 'none', duration: 4.6 }, 0)
      .fromTo('.ocean-bed-model', { yPercent: 7 }, { yPercent: -12, autoAlpha: 0.3, ease: 'none', duration: 4.6 }, 0)
      .to('.ocean-dark', { opacity: 0.78, ease: 'none', duration: 4.6 }, 0)
      .to('.rays', { opacity: 0.12, ease: 'none', duration: 3 }, 0.8)
      .to('.caustics', { opacity: 0, ease: 'none', duration: 2.5 }, 0.5)
      /* the picker is simply on stage for the whole scene (never scrub-
         linked); the depth meter yields to the description card */
      .to('.depthmeter', { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, 0.9)
      .to({}, { duration: 0.45 });

    /* depth readout */
    if (depthVal) {
      oceanTl.to({}, {
        duration: 4.6, ease: 'none',
        onUpdate: function () {
          const t = this.progress();
          const depth = Math.min(42, Math.round(t * 46));
          depthVal.textContent = depth;
          if (depthPin) depthPin.style.top = Math.min(100, t * 108) + '%';
        }
      }, 0);
    }

    /* ============================================================
       THE FRAGRANCE PICKER — racing-game selector engine
       SCROLL-INDEPENDENT (v12): the active fragrance is chosen ONLY by
       the arrows / arrow-keys / dots / a swipe — scrolling never
       changes it. The perfume bottle is displayed INSIDE the foliage
       window of each model layer (the v12 "perfumes not displayed" fix).
       ============================================================ */
    const PICKS = {
      forest: [
        { slug: 'five-nine', name: 'Five-Nine', family: 'Woody · Amber · Spicy', tag: 'The forest at golden hour — resin, cedar and warm spice.', price: 'from ₨2,600' },
        { slug: 'hopeful', name: 'Hopeful', family: 'Green · Aromatic · Fresh', tag: 'First light through wet leaves — quiet, green, alive.', price: 'from ₨2,500' },
        { slug: 'charming', name: 'Charming', family: 'Woody · Smoky · Citrus', tag: 'Charcoal, cypress and a flash of grapefruit.', price: 'from ₨3,000' },
        { slug: 'mi-amor', name: 'Mi Amor', family: 'Floral · Warm · Musky', tag: 'A rose picked at midnight, wrapped in musk.', price: 'from ₨2,000' }
      ],
      shore: [
        { slug: 'zesty', name: 'Zesty', family: 'Citrus · Aquatic · Fresh', tag: 'Salt on skin, sun on water.', price: 'from ₨2,200' },
        { slug: 'happy', name: 'Happy', family: 'Fruity · Fresh · Sweet', tag: 'Sunlight through blue water.', price: 'from ₨2,200' }
      ],
      ocean: [
        { slug: 'sophisticated', name: 'Sophisticated', family: 'Amber · Leather · Woody', tag: 'Depth, quietly worn.', price: 'from ₨2,800' },
        { slug: 'king-in-the-north', name: 'King in the North', family: 'Icy · Smoky · Oud', tag: 'The rarest depth in the house.', price: 'from ₨3,200' }
      ]
    };

    let activePicker = null;

    function setupPicker(scene, key, spanStart, spanEnd) {
      const root = document.querySelector(scene + ' .picker');
      if (!root) return;
      const items = PICKS[key];
      const bottle = root.querySelector('.pk-bottlefig');
      const card = root.querySelector('.pk-card');
      const els = {
        name: root.querySelector('.pk-name'),
        family: root.querySelector('.pk-family'),
        tag: root.querySelector('.pk-tag'),
        price: root.querySelector('.pk-price'),
        count: root.querySelector('.pk-count'),
        link: root.querySelector('.pk-link'),
        add: root.querySelector('.pk-card .chip-btn')
      };
      const dots = root.querySelectorAll('.pk-dots button');
      let idx = 0;
      let anim = null;

      const pad2 = n => String(n + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');

      function apply(i) {
        const it = items[i];
        els.name.textContent = it.name;
        els.family.textContent = it.family;
        els.tag.textContent = it.tag;
        els.price.textContent = it.price;
        els.count.textContent = pad2(i);
        bottle.src = 'assets/img/bottles/' + it.slug + '.webp';
        bottle.alt = it.name + ' perfume bottle';
        els.link.href = 'product.html?p=' + it.slug;
        els.add.setAttribute('data-add', it.slug);
        dots.forEach((d, j) => d.classList.toggle('on', j === i));
      }

      /* the racing-game swap — no scrolling involved: the perfume lifts out,
         the next settles in, the card crossfades its content */
      function render(i, dir) {
        dir = dir || (i > idx ? 1 : -1);
        idx = i;
        if (anim) anim.kill();
        anim = gsap.timeline({ defaults: { overwrite: 'auto' } });
        anim.to(bottle, { autoAlpha: 0, scale: 0.88, y: -22 * dir, duration: 0.2, ease: 'power2.in' }, 0)
            .call(() => apply(i), [], 0.21)
            .fromTo(bottle, { autoAlpha: 0, scale: 0.92, y: 26 * dir }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.26)
            .to(card, { autoAlpha: 0, y: 12 * dir, duration: 0.16, ease: 'power1.in' }, 0)
            .to(card, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.24);
      }

      const api = {
        go: function (d) {
          const j = Math.min(items.length - 1, Math.max(0, idx + d));
          if (j !== idx) render(j, d);
        },
        jump: function (j) { if (j !== idx) render(j, j > idx ? 1 : -1); }
      };

      /* the span only gates which picker owns the arrow keys —
         it never drives the selection */
      ScrollTrigger.create({
        trigger: scene,
        start: spanStart,
        end: spanEnd,
        onToggle: function (self) { activePicker = self.isActive ? api : null; }
      });

      root.querySelector('.pk-arrow--prev').addEventListener('click', () => api.go(-1));
      root.querySelector('.pk-arrow--next').addEventListener('click', () => api.go(1));
      dots.forEach(d => d.addEventListener('click', () => api.jump(+d.dataset.go)));

      /* swipe on touch */
      let tx = 0, ty = 0;
      root.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
      root.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx;
        const dy = e.changedTouches[0].clientY - ty;
        if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.4) api.go(dx < 0 ? 1 : -1);
      }, { passive: true });
    }

    const ih = () => window.innerHeight;
    setupPicker('#forest', 'forest', () => topOf('#forest') + ih() * 1.15, () => topOf('#forest') + ih() * 4.1);
    setupPicker('#transition', 'shore', () => topOf('#transition') + ih() * 1.8, () => topOf('#transition') + ih() * 3.75);
    setupPicker('#ocean', 'ocean', () => topOf('#ocean') + ih() * 1.95, () => topOf('#ocean') + ih() * 3.75);

    /* arrow keys drive whichever picker is currently on stage */
    window.addEventListener('keydown', e => {
      if (!activePicker) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); activePicker.go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); activePicker.go(-1); }
    });

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
