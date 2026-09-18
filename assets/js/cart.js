/* ============================================================
   Cart — localStorage store + slide-in drawer + toast
   ============================================================ */
(function () {
  'use strict';

  const KEY = 'im_cart_v1';
  const WISHLIST_KEY = 'im_wishlist_v1';

  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = items => localStorage.setItem(KEY, JSON.stringify(items));

  const Cart = {
    items: read(),
    save() { write(this.items); this.emit(); },
    add(slug, size) {
      const p = bySlug(slug);
      if (!p) return;
      size = size || Object.keys(p.price)[0];
      const found = this.items.find(i => i.slug === slug && i.size === size);
      if (found) found.qty++;
      else this.items.push({ slug, size, qty: 1 });
      this.save();
      toast(p.name + ' — added to your cart');
      renderDrawer();
      openCart();
    },
    setQty(slug, size, qty) {
      const it = this.items.find(i => i.slug === slug && i.size === size);
      if (!it) return;
      it.qty = Math.max(0, qty);
      if (it.qty === 0) this.items = this.items.filter(i => i !== it);
      this.save();
      renderDrawer();
    },
    remove(slug, size) {
      this.items = this.items.filter(i => !(i.slug === slug && i.size === size));
      this.save();
      renderDrawer();
    },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    lineTotal(i) { const p = bySlug(i.slug); return p ? p.price[i.size] * i.qty : 0; },
    subtotal() { return this.items.reduce((s, i) => s + this.lineTotal(i), 0); },
    shipping() { return (this.items.length === 0 || this.subtotal() >= 5000) ? 0 : 250; },
    total() { return this.subtotal() + this.shipping(); },
    clear() { this.items = []; this.save(); renderDrawer(); },
    listeners: [],
    emit() { this.listeners.forEach(fn => fn(this)); },
    onChange(fn) { this.listeners.push(fn); }
  };

  /* ---- wishlist ---- */
  const Wishlist = {
    read() { try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; } },
    has(slug) { return this.read().includes(slug); },
    toggle(slug) {
      let list = this.read();
      if (list.includes(slug)) { list = list.filter(s => s !== slug); toast('Removed from wishlist'); }
      else { list.push(slug); toast('Saved to your wishlist'); }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
      document.querySelectorAll('[data-wish="' + slug + '"]').forEach(b => b.classList.toggle('is-on', list.includes(slug)));
    }
  };

  /* ---- drawer markup ---- */
  function injectDrawer() {
    if (document.getElementById('im-cart')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="cart-scrim" data-cart-close></div>
      <aside class="cart" id="im-cart" aria-label="Shopping cart">
        <div class="cart__head">
          <div class="cart__title">Your Cart</div>
          <button class="cart__close" data-cart-close>CLOSE</button>
        </div>
        <div class="cart__body"></div>
        <div class="cart__foot">
          <div class="cart__row"><span>Subtotal</span><b class="c-sub">₨0</b></div>
          <div class="cart__row"><span>Shipping</span><b class="c-ship">—</b></div>
          <div class="cart__row total"><span>Total</span><b class="c-tot">₨0</b></div>
          <a class="btn-solid gold" href="checkout.html">Checkout</a>
          <div class="cart__note">Free shipping on orders over ₨5,000 · Ships across Pakistan</div>
        </div>
      </aside>
      <div class="toast" role="status"><span class="dot"></span><span class="t-msg"></span></div>`;
    document.body.appendChild(wrap);
    wrap.querySelectorAll('[data-cart-close]').forEach(el => el.addEventListener('click', closeCart));
  }

  function renderDrawer() {
    const body = document.querySelector('.cart__body');
    const sub = document.querySelector('.c-sub');
    const ship = document.querySelector('.c-ship');
    const tot = document.querySelector('.c-tot');
    if (!body) return;

    if (Cart.items.length === 0) {
      body.innerHTML = `
        <div class="cart__empty">
          <div class="display">The cart is empty</div>
          <p style="font-size:13px">Your journey has not begun yet.</p>
          <a class="btn" href="shop.html" style="margin-top:22px">Explore fragrances <span class="arr">→</span></a>
        </div>`;
    } else {
      body.innerHTML = Cart.items.map(i => {
        const p = bySlug(i.slug);
        if (!p) return '';
        return `
        <div class="citem">
          <a class="citem__img" href="product.html?p=${p.slug}"><img src="${productImg(p)}" alt="${p.name}"></a>
          <div>
            <div class="citem__name">${p.name}</div>
            <div class="citem__meta">${p.type} · ${i.size}</div>
            <div class="citem__ctrl">
              <span class="qty">
                <button data-dec="${p.slug}" data-size="${i.size}" aria-label="Decrease quantity">−</button>
                <span>${i.qty}</span>
                <button data-inc="${p.slug}" data-size="${i.size}" aria-label="Increase quantity">+</button>
              </span>
            </div>
            <button class="citem__rm" data-rm="${p.slug}" data-size="${i.size}">REMOVE</button>
          </div>
          <div class="citem__price">${fmtPrice(Cart.lineTotal(i))}</div>
        </div>`;
      }).join('');

      body.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => {
        const it = Cart.items.find(x => x.slug === b.dataset.inc && x.size === b.dataset.size);
        if (it) Cart.setQty(b.dataset.inc, b.dataset.size, it.qty + 1);
      }));
      body.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => {
        const it = Cart.items.find(x => x.slug === b.dataset.dec && x.size === b.dataset.size);
        if (it) Cart.setQty(b.dataset.dec, b.dataset.size, it.qty - 1);
      }));
      body.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => Cart.remove(b.dataset.rm, b.dataset.size)));
    }

    if (sub) sub.textContent = fmtPrice(Cart.subtotal());
    if (ship) ship.textContent = Cart.items.length === 0 ? '—' : (Cart.shipping() === 0 ? 'Free' : fmtPrice(Cart.shipping()));
    if (tot) tot.textContent = fmtPrice(Cart.total());
    updateBadge();
  }

  function updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.dataset.empty = n === 0 ? '1' : '0';
    });
  }

  function openCart() { document.body.classList.add('cart-open'); }
  function closeCart() { document.body.classList.remove('cart-open'); }

  let toastTimer;
  function toast(msg) {
    const t = document.querySelector('.toast');
    if (!t) return;
    t.querySelector('.t-msg').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---- global API ---- */
  window.IM = {
    cart: Cart,
    wishlist: Wishlist,
    toast,
    openCart,
    closeCart,
    renderDrawer,
    updateBadge
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectDrawer();
    renderDrawer();
    document.querySelectorAll('[data-add]').forEach(b => {
      b.addEventListener('click', e => {
        e.preventDefault();
        Cart.add(b.dataset.add, b.dataset.size || null);
      });
    });
    document.querySelectorAll('[data-wish]').forEach(b => {
      b.classList.toggle('is-on', Wishlist.has(b.dataset.wish));
      b.addEventListener('click', e => {
        e.preventDefault();
        Wishlist.toggle(b.dataset.wish);
      });
    });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
  });
})();
