/* ============================================================
   Product detail — data-driven from ?p=slug
   ============================================================ */
(function () {
  'use strict';

  const ENV_TINT = { forest: '#0d1c12', ocean: '#07202e', deep: '#04121c' };
  const SCENE = {
    forest: { hash: '#forest', label: 'the forest', env: 'forest', title: 'Step back into <em>the forest.</em>' },
    ocean:  { hash: '#ocean',  label: 'the ocean',  env: 'ocean',  title: 'Dive back into <em>the ocean.</em>' },
    deep:   { hash: '#mostwanted', label: 'the depths', env: 'deep', title: 'Return to <em>the depths.</em>' }
  };

  function starsOf(r) {
    const full = Math.round(r);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  }

  function catLabel(c) { return ({ men: 'Men', women: 'Women' })[c] || 'Fragrances'; }

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('p') || 'five-nine';
    const p = bySlug(slug) || bySlug('five-nine');
    const env = ENV[p.env];

    /* ---- document head ---- */
    document.title = `${p.name} — ${p.type} | Ismaeel Muhammad`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', `${p.name}: ${p.family.toLowerCase()} ${p.type.toLowerCase()}. ${p.tagline}`);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    const firstSize = Object.keys(p.price)[0];
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Product',
      name: p.name, description: p.desc, brand: 'Ismaeel Muhammad',
      image: location.origin + '/' + productImg(p),
      aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount },
      offers: { '@type': 'Offer', priceCurrency: 'PKR', price: p.price[firstSize], availability: 'https://schema.org/InStock' }
    });
    document.head.appendChild(ld);

    /* ---- hero ---- */
    const $ = id => document.getElementById(id);
    $('pd-env').src = env.img;
    $('pd-bottle').src = productImg(p);
    $('pd-bottle').alt = `${p.name} — ${p.type} bottle`;
    const badge = $('pd-badge');
    if (p.badge) { badge.hidden = false; badge.textContent = p.badge; }
    $('pd-scenechip').innerHTML = `From the journey — <b>${env.label}</b>`;
    $('pd-crumbs').innerHTML = `<a href="index.html">Journey</a><i>/</i><a href="shop.html">Shop</a><i>/</i><a href="shop.html?cat=${p.cat}">${catLabel(p.cat)}</a><i>/</i><span>${p.name}</span>`;
    $('pd-type').textContent = p.type + ' · ' + p.family;
    $('pd-name').textContent = p.name;
    $('pd-stars').innerHTML = `<span class="stars">${starsOf(p.rating)}</span> ${p.rating.toFixed(1)} · ${p.reviewCount} reviews`;
    $('pd-tag').textContent = '“' + p.tagline + '”';
    $('pd-desc').textContent = p.desc;

    /* sizes */
    const sizes = Object.keys(p.price);
    let sel = sizes[0];
    const sizesEl = $('pd-sizes');
    const paintSizes = () => {
      sizesEl.innerHTML = sizes.map(s =>
        `<button class="size ${s === sel ? 'on' : ''}" data-size="${s}" role="radio" aria-checked="${s === sel}">${s} — ${fmtPrice(p.price[s])}</button>`
      ).join('');
      $('pd-price').textContent = fmtPrice(p.price[sel]);
    };
    paintSizes();
    sizesEl.addEventListener('click', e => {
      const b = e.target.closest('.size');
      if (!b) return;
      sel = b.dataset.size;
      paintSizes();
    });

    $('pd-add').addEventListener('click', () => window.IM.cart.add(p.slug, sel));
    $('pd-buy').addEventListener('click', () => {
      window.IM.cart.add(p.slug, sel);
      window.IM.closeCart();
      window.location.href = 'checkout.html';
    });
    const wishBtn = $('pd-wish');
    wishBtn.classList.toggle('is-on', window.IM.wishlist.has(p.slug));
    wishBtn.addEventListener('click', () => window.IM.wishlist.toggle(p.slug));

    const projLabel = ['Intimate', 'Moderate', 'Noticeable', 'Strong', 'Powerful'][p.projection - 1] || 'Moderate';
    $('pd-meta').innerHTML = `
      <div><b>Longevity</b><span>${p.longevity}+ hours</span></div>
      <div><b>Projection</b><span>${projLabel}</span></div>
      <div><b>Family</b><span>${p.family.replace(/ · /g, ' / ')}</span></div>`;

    /* ---- composition ---- */
    const noteMeta = [['I', 'Top Notes', 'top', 'The opening — first 15 minutes'], ['II', 'Heart Notes', 'heart', 'The character — hours 1 to 4'], ['III', 'Base Notes', 'base', 'The memory — the rest of the day']];
    $('pd-notes').innerHTML = noteMeta.map(([no, title, key, hint], i) => `
      <div class="note-col" data-reveal style="--d:${i * 0.1}s">
        <span class="no">${no}</span>
        <h3 class="display">${title}</h3>
        <ul>${p.notes[key].map(n => `<li>${n}</li>`).join('')}</ul>
        <p style="font-size:11px;letter-spacing:.14em;color:rgba(7,11,8,.45);margin-top:16px;text-transform:uppercase">${hint}</p>
      </div>`).join('');

    $('pd-pyramid').innerHTML = `
      <div class="pyr-row"><div class="pyr-block" style="--w:.5"><span class="label">Top</span><div class="val">${p.notes.top.join(' · ')}</div></div></div>
      <div class="pyr-arrow" aria-hidden="true">↓</div>
      <div class="pyr-row"><div class="pyr-block" style="--w:.75"><span class="label">Heart</span><div class="val">${p.notes.heart.join(' · ')}</div></div></div>
      <div class="pyr-arrow" aria-hidden="true">↓</div>
      <div class="pyr-row"><div class="pyr-block" style="--w:1"><span class="label">Base</span><div class="val">${p.notes.base.join(' · ')}</div></div></div>`;

    /* ---- performance ---- */
    $('perf-long-label').textContent = p.longevity + '+ hours';
    $('perf-proj-label').textContent = projLabel;
    $('pd-wear').textContent = p.wear;
    const longBar = $('perf-long'), projBar = $('perf-proj');
    longBar.style.setProperty('--v', Math.min(1, p.longevity / 12));
    projBar.style.setProperty('--v', p.projection / 5);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      longBar.classList.add('sc'); projBar.classList.add('sc');
    }));

    /* ---- reviews ---- */
    $('pd-reviews').innerHTML = p.reviews.map((r, i) => `
      <div class="review" data-reveal style="--d:${i * 0.08}s">
        <span class="stars">${'★★★★★'.slice(0, r.stars)}${'☆☆☆☆☆'.slice(0, 5 - r.stars)}</span>
        <p>“${r.text}”</p>
        <div class="who">${r.name} — Verified buyer</div>
      </div>`).join('');

    /* ---- related ---- */
    const related = PRODUCTS.filter(x => x.slug !== p.slug && (x.cat === p.cat || x.env === p.env)).slice(0, 4);
    if (related.length < 4) {
      PRODUCTS.forEach(x => { if (related.length < 4 && x.slug !== p.slug && !related.includes(x)) related.push(x); });
    }
    $('pd-related').innerHTML = related.map((x, i) => `
      <a class="pcard" href="product.html?p=${x.slug}" data-reveal style="--d:${i * 0.07}s; --tint:${ENV_TINT[x.env]}">
        <div class="pcard__media">
          ${x.badge ? `<span class="pcard__badge">${x.badge}</span>` : ''}
          <img class="env" src="${ENV[x.env].img}" alt="" loading="lazy">
          <img class="bottle" src="${productImg(x)}" alt="${x.name} bottle" loading="lazy">
          <span class="pcard__glow" aria-hidden="true"></span>
          <div class="pcard__actions"><button class="chip-btn" data-add="${x.slug}">Add to cart</button></div>
        </div>
        <div class="pcard__info">
          <div class="pcard__name">${x.name}</div>
          <div class="pcard__family">${x.family}</div>
          <div class="pcard__row"><span class="pcard__price">from ${fmtPrice(Math.min(...Object.values(x.price)))}</span></div>
        </div>
      </a>`).join('');
    $('pd-related').querySelectorAll('[data-add]').forEach(b =>
      b.addEventListener('click', e => { e.preventDefault(); window.IM.cart.add(b.dataset.add); }));

    /* ---- continue journey ---- */
    const sc = SCENE[p.env] || SCENE.forest;
    $('pd-cont-env').src = ENV[sc.env].img;
    $('pd-cont-title').innerHTML = sc.title;
    $('pd-cont-link').href = 'index.html' + sc.hash;

    /* re-observe reveals for injected nodes */
    if (document.documentElement.classList.contains('js-anim') && 'IntersectionObserver' in window) {
      document.querySelectorAll('main [data-reveal]:not(.revealed)').forEach(el => {
        const io = new IntersectionObserver(es => {
          es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        io.observe(el);
      });
    } else {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
    }
  });
})();
