/* ============================================================
   v13 AUDIT — CLEAN pickers (no foliage planes, perfume only, centred),
   fully scroll-independent display (no scrub fades anywhere), shore
   picker submerged by the rising water, forest zoom-out preserved
   1440x900 desktop + 390x844 mobile, headless chromium
   Run: bash tools/rig-setup.sh && cd /tmp/pkgtest && cp /home/user/IsmaelBrave/tools/audit-v13.mjs . && node audit-v13.mjs
   ============================================================ */
import { chromium as pwCore } from 'playwright-core';
import fs from 'fs';
import { PNG } from 'pngjs';

const EXEC = '/tmp/chromium';
const ARGS = ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu', '--no-zygote', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'];
const ENV = { ...process.env, LD_LIBRARY_PATH: '/tmp/al2023/lib:/tmp/swiftshader', FONTCONFIG_PATH: '/tmp/fonts' };
const BASE = 'http://127.0.0.1:8000';
const SHOTS = '/tmp/shots';
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0;
const report = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  PASS  ${name}${extra ? '  [' + extra + ']' : ''}`); }
  else { fail++; console.log(`  FAIL  ${name}${extra ? '  [' + extra + ']' : ''}`); }
};

function loadPNG(p) { return PNG.sync.read(fs.readFileSync(p)); }
function meanDiff(a, b, x0 = 0, x1 = a.width, y0 = 0, y1 = a.height) {
  let sum = 0, n = 0;
  for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) {
    const i = (y * a.width + x) * 4;
    sum += Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    n += 3;
  }
  return n ? sum / n : 999;
}
function shiftedDiff(a, b, dy) {
  let sum = 0, n = 0;
  for (let y = 200; y < a.height - 200; y += 2) {
    const ya = y + dy; if (ya < 0 || ya >= a.height) continue;
    for (let x = 60; x < a.width - 60; x += 2) {
      const i = (y * a.width + x) * 4, j = (ya * a.width + x) * 4;
      sum += Math.abs(a.data[j] - b.data[i]) + Math.abs(a.data[j + 1] - b.data[i + 1]) + Math.abs(a.data[j + 2] - b.data[i + 2]);
      n += 3;
    }
  }
  return n ? sum / n : 999;
}
function flatDarkRows(png) {
  let rows = 0;
  for (let y = 120; y <= 850; y += 10) {
    let sum = 0, mn = 999, mx = 0;
    for (let x = 60; x <= 1400; x += 130) {
      const i = (y * png.width + x) * 4;
      const lum = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
      sum += lum; if (lum < mn) mn = lum; if (lum > mx) mx = lum;
    }
    const avg = sum / 11;
    if (avg < 15 && (mx - mn) < 10) rows++;
  }
  return rows;
}
function colorStats(png, x0, y0, x1, y1) {
  let blue = 0, dark = 0, bright = 0, waterish = 0, n = 0;
  for (let y = y0; y < y1; y += 3) for (let x = x0; x < x1; x += 3) {
    const i = (y * png.width + x) * 4;
    const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    n++;
    if (b > 60 && b > r + 12 && b > g + 8) blue++;
    if (r < 28 && g < 28 && b < 34) dark++;
    if (lum > 140) bright++;
    if (b > r + 10 && b > g + 6 && b > 25) waterish++;
  }
  return { blue: blue / n, dark: dark / n, bright: bright / n, waterish: waterish / n };
}
function avgLum(png, x0, y0, x1, y1) {
  let s = 0, n = 0;
  for (let y = y0; y < y1; y += 3) for (let x = x0; x < x1; x += 3) {
    const i = (y * png.width + x) * 4;
    s += 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
    n++;
  }
  return s / n;
}

const browser = await pwCore.launch({ executablePath: EXEC, args: ARGS, env: ENV });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));

await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2800);

const scrollTo = async y => { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(750); };
const shot = async name => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); return loadPNG(`${SHOTS}/${name}.png`); };
const txt = async sel => (await page.locator(sel).first().textContent())?.trim();

const geo = await page.evaluate(() => {
  const top = sel => document.querySelector(sel).getBoundingClientRect().top + window.scrollY;
  return { ih: window.innerHeight, forest: top('#forest'), trans: top('#transition'), ocean: top('#ocean'), mw: top('#mostwanted') };
});
console.log('geometry:', JSON.stringify(geo));

/* ============ 1. HERO ============ */
console.log('\n--- HERO ---');
const crest = await page.evaluate(() => {
  const r = document.querySelector('.hero-emblem').getBoundingClientRect();
  return { w: r.width, ring: document.querySelector('.emblem__ring').textContent };
});
report('crest present', crest.w > 200 && /ISMAEL/.test(crest.ring), `${Math.round(crest.w)}px`);
const heroShot = await shot('v13-hero');
report('hero no dark band', flatDarkRows(heroShot) === 0);

/* ============ 2. THEME / FONT ============ */
console.log('\n--- THEME / FONT ---');
const theme = await page.evaluate(async () => {
  await document.fonts.ready;
  const cs = getComputedStyle(document.documentElement);
  return {
    gold: cs.getPropertyValue('--gold').trim(),
    eyebrow: getComputedStyle(document.querySelector('.hero-copy .eyebrow')).color,
    h1font: getComputedStyle(document.querySelector('.hero-copy h1')).fontFamily,
    bodoni900: document.fonts.check('900 20px "Bodoni Moda"'),
    bodoni700: document.fonts.check('700 20px "Bodoni Moda"'),
    playfairFaces: [...document.fonts].filter(f => /playfair/i.test(f.family)).length
  };
});
report('gold token', theme.gold === '#c9a86a', theme.gold);
report('eyebrow gold', theme.eyebrow === 'rgb(201, 168, 106)', theme.eyebrow);
report('Bodoni Moda 700/900 loaded', theme.bodoni700 && theme.bodoni900);
report('old Playfair gone', theme.playfairFaces === 0);
report('display face is Bodoni', /Bodoni Moda/.test(theme.h1font));
const priceColor = await page.evaluate(() => getComputedStyle(document.querySelector('#mostwanted .pcard__price')).color);
report('prices gold', priceColor === 'rgb(201, 168, 106)', priceColor);

/* ============ 3. PICKER LAYOUT — clean showcase left, card right, brown bar ============ */
console.log('\n--- PICKER LAYOUT ---');
await scrollTo(geo.forest + geo.ih * 1.5);
const layout = await page.evaluate(() => {
  const show = document.querySelector('.picker--forest .pk-show').getBoundingClientRect();
  const card = document.querySelector('.picker--forest .pk-card').getBoundingClientRect();
  const bar = document.querySelector('.picker--forest .pk-bar').getBoundingClientRect();
  const bottle = document.querySelector('.picker--forest .pk-bottlefig');
  const br = bottle.getBoundingClientRect();
  const barStyle = getComputedStyle(document.querySelector('.picker--forest .pk-bar'));
  return {
    showX: show.x, showW: show.width,
    cardX: card.x, cardRight: card.right,
    barY: bar.y, barH: bar.height, barImg: barStyle.backgroundImage.slice(0, 60),
    bottleH: br.height, bottleW: br.width, bottleVis: getComputedStyle(bottle).opacity,
    bottleLoaded: bottle.naturalWidth > 0,
    bottleCentred: Math.abs((br.x + br.width / 2) - (show.x + show.width / 2)) < 40,
    bottleInsideShow: br.x >= show.x - 2 && br.right <= show.right + 2 && br.y >= show.y - 2 && br.bottom <= show.bottom + 2
  };
});
report('showcase LEFT', layout.showX < 150 && layout.showW > 300, `x=${Math.round(layout.showX)} w=${Math.round(layout.showW)}`);
report('description RIGHT', layout.cardX > layout.showX + layout.showW - 40 && layout.cardRight < 1380, `card x=${Math.round(layout.cardX)}`);
report('PERFUME DISPLAYED (big, centred, clean)', layout.bottleLoaded && layout.bottleH > 150 && layout.bottleVis > 0.9 && layout.bottleCentred && layout.bottleInsideShow,
  `${Math.round(layout.bottleW)}x${Math.round(layout.bottleH)}px centred=${layout.bottleCentred}`);
report('brown selection bar at bottom', layout.barY > 780 && layout.barH > 40 && /46, ?32, ?24|2e2018/i.test(layout.barImg), `y=${Math.round(layout.barY)}`);
report('NO foliage model planes in pickers', await page.evaluate(() => document.querySelectorAll('.picker .pk-model').length === 0));
const glowOK = await page.evaluate(() => { const g = document.querySelector('.picker--forest .pk-glow'); const r = g.getBoundingClientRect(); return r.width > 100 && getComputedStyle(g).opacity > 0.9; });
report('clean showcase glow present', glowOK);

/* ============ 4. SCROLL-INDEPENDENCE (selection AND visibility) ============ */
console.log('\n--- SCROLL-INDEPENDENT ---');
await scrollTo(geo.forest + geo.ih * 3.0);
report('scroll does NOT change the fragrance', (await txt('.picker--forest .pk-name')) === 'Five-Nine', await txt('.picker--forest .pk-name'));
await scrollTo(geo.forest + geo.ih * 4.0);
report('still Five-Nine at span end', (await txt('.picker--forest .pk-name')) === 'Five-Nine', await txt('.picker--forest .pk-name'));
const visAt = [];
for (const off of [1.3, 2.0, 2.8, 3.6]) {
  await scrollTo(geo.forest + geo.ih * off);
  visAt.push(await page.evaluate(() => {
    const p = document.querySelector('.picker--forest');
    return getComputedStyle(p).opacity === '1' && getComputedStyle(p).visibility === 'visible';
  }));
}
report('picker visible at EVERY scroll offset', visAt.every(Boolean), visAt.join(','));

/* ============ 5. FOREST PICKER INTERACTIONS ============ */
console.log('\n--- FOREST PICKER ---');
await scrollTo(geo.forest + geo.ih * 1.5);
const fp0 = await shot('v13-forest-p0');
report('slot 0 = Five-Nine', (await txt('.picker--forest .pk-name')) === 'Five-Nine');
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(1100);
report('ArrowRight → Hopeful', (await txt('.picker--forest .pk-name')) === 'Hopeful', await txt('.picker--forest .pk-name'));
report('counter 02 / 04', (await txt('.picker--forest .pk-count')) === '02 / 04', await txt('.picker--forest .pk-count'));
const fp1 = await shot('v13-forest-p1');
const showBox = await page.evaluate(() => { const r = document.querySelector('.picker--forest .pk-show').getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
report('showcase changed (bottle swapped)', meanDiff(fp0, fp1, showBox.x, showBox.x + showBox.w, showBox.y, showBox.y + showBox.h) > 4,
  `diff=${meanDiff(fp0, fp1, showBox.x, showBox.x + showBox.w, showBox.y, showBox.y + showBox.h).toFixed(1)}`);
const bottle2 = await page.evaluate(() => document.querySelector('.picker--forest .pk-bottlefig').src.split('/').pop());
report('bottle swapped to Hopeful', /hopeful/.test(bottle2), bottle2);
await scrollTo(geo.ih * 0.5);
await page.waitForTimeout(600);
await scrollTo(geo.forest + geo.ih * 2.2);
report('selection persists across scrolling', (await txt('.picker--forest .pk-name')) === 'Hopeful', await txt('.picker--forest .pk-name'));
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(1100);
report('ArrowLeft → back', (await txt('.picker--forest .pk-name')) === 'Five-Nine', await txt('.picker--forest .pk-name'));
await page.click('.picker--forest .pk-dots button[data-go="3"]');
await page.waitForTimeout(1100);
report('dot 4 → Mi Amor', (await txt('.picker--forest .pk-name')) === 'Mi Amor', await txt('.picker--forest .pk-name'));

/* ============ 6. SHORE PICKER ============ */
console.log('\n--- SHORE PICKER ---');
await scrollTo(geo.trans + geo.ih * 2.2);
report('shore slot 0 = Zesty', (await txt('.picker--shore .pk-name')) === 'Zesty', await txt('.picker--shore .pk-name'));
const zorder = await page.evaluate(() => {
  const p = getComputedStyle(document.querySelector('#transition .picker')).zIndex;
  const w = getComputedStyle(document.querySelector('.water-rise')).zIndex;
  return { p: +p, w: +w };
});
report('shore picker sits UNDER the water (gets submerged)', zorder.p < zorder.w, `picker z=${zorder.p} < water z=${zorder.w}`);
report('shore picker fully visible (no scrub fade)', await page.evaluate(() => getComputedStyle(document.querySelector('.picker--shore')).opacity === '1'));
const spLayout = await page.evaluate(() => {
  const b = document.querySelector('.picker--shore .pk-bottlefig').getBoundingClientRect();
  return { h: b.height, loaded: document.querySelector('.picker--shore .pk-bottlefig').naturalWidth > 0 };
});
report('shore perfume displayed', spLayout.loaded && spLayout.h > 150, `${Math.round(spLayout.h)}px`);
await shot('v13-shore-p0');
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(1100);
report('shore → Happy', (await txt('.picker--shore .pk-name')) === 'Happy', await txt('.picker--shore .pk-name'));

/* ============ 7. WATER RISE ============ */
console.log('\n--- WATER RISE ---');
const lineAt = async off => {
  await scrollTo(geo.trans + geo.ih * off);
  return page.evaluate(() => {
    const wr = document.querySelector('.water-rise');
    const m = new DOMMatrixReadOnly(getComputedStyle(wr).transform);
    return { y: m.f, h: wr.getBoundingClientRect().height };
  });
};
const l1 = await lineAt(4.15);
const l2 = await lineAt(4.75);
const l3 = await lineAt(5.35);
report('water starts low and climbs', l1.y > l1.h * 0.55 && l2.y < l2.h * 0.45 && Math.abs(l3.y) < 2,
  `line ${Math.round(l1.y)} → ${Math.round(l2.y)} → ${Math.round(l3.y)}px`);
await scrollTo(geo.trans + geo.ih * 4.0);
const risePre = await shot('v13-rise-pre');
await scrollTo(geo.trans + geo.ih * 4.75);
const riseMid = await shot('v13-rise-mid');
const rmTop = colorStats(riseMid, 60, 60, 1400, 260);
report('mid-rise: beach bottom replaced by water', meanDiff(risePre, riseMid, 60, 1400, 600, 870) > 20,
  `diff=${meanDiff(risePre, riseMid, 60, 1400, 600, 870).toFixed(1)}`);
report('mid-rise: sky still bright on top', rmTop.bright > 0.4, `bright=${(rmTop.bright * 100).toFixed(0)}%`);
await scrollTo(geo.trans + geo.ih * 5.45);
const riseDone = await shot('v13-rise-done');
const rdOpen = colorStats(riseDone, 60, 100, 1400, 700);
report('rise complete: water fills the open frame', rdOpen.waterish > 0.5, `waterish=${(rdOpen.waterish * 100).toFixed(0)}%`);
const submerged = await page.evaluate(() => {
  const under = (x, y) => { const el = document.elementFromPoint(x, y); return !!el && !!el.closest('.water-rise'); };
  return under(720, 820) && under(600, 820) && under(840, 820) && under(320, 450) && under(1100, 500);
});
report('rise complete: picker fully submerged under the water', submerged,
  'bar + showcase + card all under .water-rise');
report('rise complete: no dark band', flatDarkRows(riseDone) === 0);

/* ============ 8. FOREST ZOOM-OUT ============ */
console.log('\n--- FOREST ZOOM-OUT ---');
await scrollTo(geo.forest + geo.ih * 3.5);
const zA = await shot('v13-zoom-before');
await scrollTo(geo.forest + geo.ih * 4.45);
const zB = await shot('v13-zoom-mid');
await scrollTo(geo.forest + geo.ih * 4.68);
const zC = await shot('v13-zoom-done');
const lumA = avgLum(zA, 60, 100, 1400, 870), lumB = avgLum(zB, 60, 100, 1400, 870), lumC = avgLum(zC, 60, 100, 1400, 870);
const brightC = colorStats(zC, 60, 100, 1400, 870).bright;
report('zoom opens the frame (brightening)', lumB > lumA * 1.25, `lum ${lumA.toFixed(0)} → ${lumB.toFixed(0)}`);
report('beach occurs (bright scene at zoom end)', lumC > lumA * 1.5 && brightC > 0.45, `lum ${lumC.toFixed(0)} bright=${(brightC * 100).toFixed(0)}%`);
report('zoom frames: no dark band', flatDarkRows(zB) === 0 && flatDarkRows(zC) === 0);

/* ============ 9. OCEAN PICKER ============ */
console.log('\n--- OCEAN PICKER ---');
await scrollTo(geo.ocean + geo.ih * 2.3);
report('ocean slot 0 = Sophisticated', (await txt('.picker--ocean .pk-name')) === 'Sophisticated', await txt('.picker--ocean .pk-name'));
report('ocean picker fully visible (no scrub fade)', await page.evaluate(() => getComputedStyle(document.querySelector('.picker--ocean')).opacity === '1'));
const opLayout = await page.evaluate(() => {
  const b = document.querySelector('.picker--ocean .pk-bottlefig').getBoundingClientRect();
  return { h: b.height, loaded: document.querySelector('.picker--ocean .pk-bottlefig').naturalWidth > 0 };
});
report('ocean perfume displayed', opLayout.loaded && opLayout.h > 150, `${Math.round(opLayout.h)}px`);
const op0 = await shot('v13-ocean-p0');
const op0s = colorStats(op0, 60, 100, 1400, 870);
report('ocean picker underwater', op0s.waterish > 0.5 && flatDarkRows(op0) === 0, `waterish=${(op0s.waterish * 100).toFixed(0)}%`);
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(1100);
report('ocean → King in the North', (await txt('.picker--ocean .pk-name')) === 'King in the North', await txt('.picker--ocean .pk-name'));

/* ============ 10. ONE-FLOW HANDOFFS ============ */
console.log('\n--- ONE-FLOW HANDOFFS ---');
async function handoff(name, yA) {
  await scrollTo(yA);
  const A = await shot(`v13-ho-${name}-a`);
  await scrollTo(yA + 135);
  const B = await shot(`v13-ho-${name}-b`);
  const un = meanDiff(A, B, 60, 1380, 120, 860);
  const sh = shiftedDiff(A, B, 135);
  report(`${name}: no lurch`, un < 40, `unshifted=${un.toFixed(1)}`);
  report(`${name}: really scrolled`, sh > un, `shifted=${sh.toFixed(1)}`);
  report(`${name}: no dark band`, flatDarkRows(A) === 0 && flatDarkRows(B) === 0);
}
await handoff('hero-forest', geo.ih * 2.26);
await handoff('forest-shore', geo.forest + geo.ih * 5.16);
await handoff('shore-ocean', geo.trans + geo.ih * 6.06);

/* ============ 11. DIVE + MOST WANTED ============ */
console.log('\n--- DIVE / MOST WANTED ---');
await scrollTo(geo.trans + geo.ih * 6.2);
const diveDone = await shot('v13-dive-done');
const dd = colorStats(diveDone, 60, 100, 1400, 870);
report('dive: blue dominant', dd.blue > 0.75, `blue=${(dd.blue * 100).toFixed(0)}%`);
await scrollTo(geo.mw + geo.ih * 1.5);
const mwShot = await shot('v13-mostwanted');
const mwS = colorStats(mwShot, 60, 100, 1400, 870);
report('mostwanted renders', mwS.dark < 0.9, `dark=${(mwS.dark * 100).toFixed(0)}%`);

/* ============ 12. MOBILE 390 ============ */
console.log('\n--- MOBILE 390 ---');
const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
const merrors = [];
mp.on('console', m => { if (m.type() === 'error') merrors.push(m.text()); });
mp.on('pageerror', e => merrors.push(String(e)));
await mp.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
await mp.waitForTimeout(2400);
const mgeo = await mp.evaluate(() => ({ ih: innerHeight, forest: document.querySelector('#forest').getBoundingClientRect().top + scrollY, sw: document.documentElement.scrollWidth }));
report('mobile: no horizontal overflow', mgeo.sw <= 391, `sw=${mgeo.sw}`);
await mp.evaluate(v => window.scrollTo(0, v), mgeo.forest + mgeo.ih * 1.5);
await mp.waitForTimeout(900);
const ml = await mp.evaluate(() => {
  const show = document.querySelector('.picker--forest .pk-show').getBoundingClientRect();
  const card = document.querySelector('.picker--forest .pk-card').getBoundingClientRect();
  const bar = document.querySelector('.picker--forest .pk-bar').getBoundingClientRect();
  const b = document.querySelector('.picker--forest .pk-bottlefig').getBoundingClientRect();
  return {
    bottleH: Math.round(b.height),
    fits: show.y >= 60 && show.right <= 391 && card.bottom <= 844 && bar.x >= 0 && bar.right <= 391 && card.y > show.y + show.height - 20
  };
});
report('mobile: showcase + card + bar all fit', ml.fits);
report('mobile: perfume displayed', ml.bottleH > 60, `${ml.bottleH}px`);
await mp.screenshot({ path: `${SHOTS}/v13-mobile-forest.png` });
report('mobile: no dark band', flatDarkRows(loadPNG(`${SHOTS}/v13-mobile-forest.png`)) === 0);
report('mobile: no console errors', merrors.length === 0, merrors[0] || '');
await mp.close();

/* ============ 13. OTHER PAGES ============ */
console.log('\n--- SHOP / PRODUCT ---');
for (const url of ['/shop.html', '/product.html?p=five-nine']) {
  const p2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const err2 = [];
  p2.on('console', m => { if (m.type() === 'error') err2.push(m.text()); });
  p2.on('pageerror', e => err2.push(String(e)));
  await p2.goto(BASE + url, { waitUntil: 'networkidle', timeout: 90000 });
  await p2.waitForTimeout(1100);
  report(`${url}: no console errors`, err2.length === 0, err2[0] || '');
  if (url.includes('shop')) {
    const pc = await p2.evaluate(() => getComputedStyle(document.querySelector('.pcard__price')).color);
    report('shop: gold prices', pc === 'rgb(201, 168, 106)', pc);
  }
  await p2.close();
}

report('journey: no console errors', errors.length === 0, errors.slice(0, 2).join(' | ') || '');

console.log(`\n========== RESULT: ${pass} PASS / ${fail} FAIL ==========`);
await browser.close();
process.exit(fail ? 1 : 0);
