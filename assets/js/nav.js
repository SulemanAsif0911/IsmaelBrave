/* ============================================================
   Shared: nav, veil, reveals, menu, transitions
   ============================================================ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    if (!reduced) html.classList.add('js-anim');

    /* ---- veil ---- */
    const veil = document.querySelector('.veil');
    if (veil) {
      const done = () => veil.classList.add('gone');
      if (reduced) done();
      else setTimeout(done, 1350);
    }

    /* ---- nav scrolled state ---- */
    const nav = document.querySelector('.nav');
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- mobile menu ---- */
    const burger = document.querySelector('.burger');
    const closeMenu = () => document.body.classList.remove('menu-open');
    if (burger) {
      burger.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
      });
      document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
      window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    }

    /* ---- active nav link ---- */
    const page = document.body.dataset.page;
    if (page) {
      document.querySelectorAll('.nav__links a, .mobile-menu a').forEach(a => {
        if (a.dataset.nav === page) a.style.color = 'var(--gold)';
      });
    }

    /* ---- fade-out transition on internal links ---- */
    if (!reduced) {
      document.querySelectorAll('a[href$=".html"], a[href^="./"]').forEach(a => {
        a.addEventListener('click', e => {
          const href = a.getAttribute('href');
          if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;
          if (!href || href.startsWith('#') || href.includes('#')) return;
          e.preventDefault();
          document.body.style.transition = 'opacity .35s ease';
          document.body.style.opacity = '0';
          setTimeout(() => { window.location.href = href; }, 340);
        });
      });
    }

    /* ---- reveal on scroll ---- */
    const reveals = document.querySelectorAll('[data-reveal]');
    if (html.classList.contains('js-anim') && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('revealed');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(el => io.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('revealed'));
    }

    /* ---- smooth in-page anchors (works with or without Lenis) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0, duration: 1.6 });
        else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  });
})();
