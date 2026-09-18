/* ============================================================
   Shop — filterable editorial grid
   ============================================================ */
(function () {
  'use strict';

  const ENV_TINT = { forest: '#0d1c12', ocean: '#07202e', deep: '#04121c' };

  function inCat(p, cat) {
    if (cat === 'all') return true;
    return p.cat === cat;
  }

  function starsOf(r) {
    const full = Math.round(r);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  }

  function card(p, i) {
    const from = Math.min(...Object.values(p.price));
    return `
    <a class="pcard" href="product.html?p=${p.slug}" data-reveal style="--d:${(i % 4) * 0.07}s; --tint:${ENV_TINT[p.env] || '#10161a'}">
      <div class="pcard__media">
        ${p.badge ? `<span class="pcard__badge">${p.badge}</span>` : ''}
        <img class="env" src="${ENV[p.env].img}" alt="" loading="lazy">
        <img class="bottle" src="${productImg(p)}" alt="${p.name} — ${p.type}" loading="lazy">
        <span class="pcard__glow" aria-hidden="true"></span>
        <div class="pcard__actions">
          <button class="chip-btn" data-add="${p.slug}" aria-label="Add ${p.name} to cart">Add to cart</button>
          <button class="chip-btn" data-wish="${p.slug}" aria-label="Save ${p.name} to wishlist">♡</button>
        </div>
      </div>
      <div class="pcard__info">
        <div class="pcard__name">${p.name}</div>
        <div class="pcard__family">${p.family}</div>
        <div class="pcard__row">
          <span class="pcard__price">from ${fmtPrice(from)}</span>
          <span class="pcard__stars">${starsOf(p.rating)} <span style="opacity:.6">${p.rating.toFixed(1)}</span></span>
        </div>
      </div>
    </a>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('shop-grid');
    const filtersEl = document.getElementById('filters');
    const countEl = document.getElementById('shop-count');
    if (!grid) return;

    const params = new URLSearchParams(location.search);
    let active = CATS.some(c => c.id === params.get('cat')) ? params.get('cat') : 'all';

    filtersEl.innerHTML = CATS.map(c =>
      `<button class="filter ${c.id === active ? 'on' : ''}" data-cat="${c.id}" role="tab" aria-selected="${c.id === active}">${c.label}</button>`
    ).join('');

    function render() {
      const list = PRODUCTS.filter(p => inCat(p, active));
      grid.innerHTML = list.length
        ? list.map(card).join('')
        : `<div class="shop-empty"><p class="display" style="font-size:26px">Nothing here yet.</p></div>`;
      countEl.textContent = `${list.length} fragrance${list.length === 1 ? '' : 's'}`;
      filtersEl.querySelectorAll('.filter').forEach(b => {
        b.classList.toggle('on', b.dataset.cat === active);
        b.setAttribute('aria-selected', b.dataset.cat === active);
      });
      /* re-bind add/wish + reveal for new nodes */
      grid.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', e => {
        e.preventDefault(); window.IM.cart.add(b.dataset.add);
      }));
      grid.querySelectorAll('[data-wish]').forEach(b => {
        b.classList.toggle('is-on', window.IM.wishlist.has(b.dataset.wish));
        b.addEventListener('click', e => { e.preventDefault(); window.IM.wishlist.toggle(b.dataset.wish); });
      });
      if (document.documentElement.classList.contains('js-anim')) {
        grid.querySelectorAll('[data-reveal]').forEach(el => {
          const io = new IntersectionObserver(es => {
            es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); } });
          }, { threshold: 0.1 });
          io.observe(el);
        });
      } else {
        grid.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
      }
    }

    filtersEl.addEventListener('click', e => {
      const b = e.target.closest('.filter');
      if (!b) return;
      active = b.dataset.cat;
      history.replaceState(null, '', active === 'all' ? 'shop.html' : 'shop.html?cat=' + active);
      render();
    });

    render();
  });
})();
