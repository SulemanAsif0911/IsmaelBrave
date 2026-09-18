/* ============================================================
   ISMAEEL MUHAMMAD — A JOURNEY OF SENSES
   Product database (names & price ranges follow the live store)
   ============================================================ */

const ENV = {
  forest: { label: 'The Forest', img: 'assets/img/env/forest-bg.webp', tint: '#0d1f14' },
  ocean:  { label: 'The Ocean',  img: 'assets/img/env/ocean-surface.webp', tint: '#063a52' },
  deep:   { label: 'The Depths', img: 'assets/img/env/oceanbed.webp', tint: '#04121c' },
  attar:  { label: 'The Atelier',img: 'assets/img/env/forest-to-ocean.webp', tint: '#1d1608' },
  set:    { label: 'The Atelier',img: 'assets/img/env/forest-to-ocean.webp', tint: '#1d1608' }
};

const IMG = 'assets/img/bottles/';

const PRODUCTS = [
  {
    slug: 'five-nine', name: 'FIVE-NINE', type: 'Eau de Parfum',
    cat: 'men', env: 'forest', badge: 'BESTSELLER',
    family: 'WOODY · AMBER · SPICY',
    tagline: 'The forest at golden hour — resin, cedar and warm spice.',
    desc: 'Five-Nine is the heart of the forest, bottled. It opens like sunlight breaking through pines, settles into resin and smoked cedar, and leaves a trail of amber and oud that lingers long after you have left the room. Crafted for evenings that deserve to be remembered.',
    price: { '50 ML': 2600, '100 ML': 4400 },
    rating: 5.0, reviewCount: 214,
    notes: {
      top:   ['Bergamot', 'Pink Pepper', 'Cardamom'],
      heart: ['Cedarwood', 'Vetiver', 'Cinnamon'],
      base:  ['Amber', 'Oud', 'Vanilla', 'Musk']
    },
    longevity: 9, projection: 4,
    wear: 'Evenings and autumn winters — dinners, weddings, and cold night air.',
    reviews: [
      { name: 'Ahmed R.', stars: 5, text: 'The forest in a bottle. Wore it to a winter wedding and three people asked me what it was.' },
      { name: 'Bilal K.', stars: 5, text: 'Warm, resinous and it lasted my entire 12-hour shift. This is the one that started my collection.' }
    ]
  },
  {
    slug: 'hopeful', name: 'HOPEFUL', type: 'Eau de Parfum',
    cat: 'men', env: 'forest',
    family: 'GREEN · AROMATIC · FRESH',
    tagline: 'First light through wet leaves — quiet, green, alive.',
    desc: 'Hopeful is the walk home after rain. Green leaves and cold bergamot open into fig, tea and violet, resting on a bed of moss and cedar. A fragrance for the person who finds calm in the quiet parts of the day.',
    price: { '50 ML': 2500, '100 ML': 4400 },
    rating: 4.8, reviewCount: 96,
    notes: {
      top:   ['Green Leaves', 'Bergamot', 'Mint'],
      heart: ['Fig', 'Black Tea', 'Violet Leaf'],
      base:  ['Oakmoss', 'Cedar', 'White Musk']
    },
    longevity: 7, projection: 3,
    wear: 'Daytime, office and spring mornings.',
    reviews: [
      { name: 'Usman T.', stars: 5, text: 'Smells like a morning walk in a wet garden. Clean but never boring.' }
    ]
  },
  {
    slug: 'charming', name: 'CHARMING', type: 'Eau de Parfum',
    cat: 'men', env: 'forest',
    family: 'WOODY · SMOKY · CITRUS',
    tagline: 'Charcoal, cypress and a flash of grapefruit.',
    desc: 'Charming moves through the forest at dusk. Grapefruit and sage cut through smoked cypress and suede-like vetiver — a fragrance that draws people closer without asking for attention.',
    price: { '50 ML': 3000, '100 ML': 5500 },
    rating: 4.9, reviewCount: 143,
    notes: {
      top:   ['Grapefruit', 'Sage', 'Elemi'],
      heart: ['Cypress', 'Geranium', 'Nuttmeg'],
      base:  ['Vetiver', 'Suede', 'Tonka Bean']
    },
    longevity: 8, projection: 4,
    wear: 'Date nights and late evenings, all year round.',
    reviews: [
      { name: 'Faizan M.', stars: 5, text: 'Dark and smooth. The drydown is honestly better than fragrances I paid triple for.' }
    ]
  },
  {
    slug: 'mi-amor', name: 'MI AMOR', type: 'Eau de Parfum',
    cat: 'women', env: 'forest',
    family: 'FLORAL · WARM · MUSKY',
    tagline: 'A rose picked at midnight, wrapped in musk.',
    desc: 'Mi Amor is romance without noise. Pear and pink pepper soften into rose, jasmine and peony, then melt into sandalwood and vanilla. It does not announce itself — it is remembered.',
    price: { '50 ML': 2000, '100 ML': 3800 },
    rating: 4.9, reviewCount: 187,
    notes: {
      top:   ['Pear', 'Pink Pepper', 'Litchi'],
      heart: ['Rose', 'Jasmine', 'Peony'],
      base:  ['White Musk', 'Sandalwood', 'Vanilla']
    },
    longevity: 7, projection: 3,
    wear: 'Evenings, dinners, and every time you want to be unforgettable.',
    reviews: [
      { name: 'Ayesha S.', stars: 5, text: 'Soft, romantic and it stays on my scarf for days. My signature now.' },
      { name: 'Rida F.', stars: 5, text: 'Bought it for my sister and ended up ordering a second bottle for myself.' }
    ]
  },
  {
    slug: 'zesty', name: 'ZESTY', type: 'Eau de Parfum',
    cat: 'men', env: 'ocean',
    family: 'CITRUS · AQUATIC · FRESH',
    tagline: 'Salt on skin, sun on water.',
    desc: 'Zesty is the first ten metres of the dive — bright, sharp and weightless. Lemon and lime over marine notes and ginger, drying down to clean white musk. The closest thing to a cold swim in the afternoon sun.',
    price: { '50 ML': 2200, '100 ML': 4000 },
    rating: 4.7, reviewCount: 121,
    notes: {
      top:   ['Lemon', 'Lime', 'Mandarin'],
      heart: ['Sea Notes', 'Ginger', 'Lavender'],
      base:  ['White Musk', 'Amberwood', 'Cedar']
    },
    longevity: 6, projection: 3,
    wear: 'Daytime, summer, gym and travel.',
    reviews: [
      { name: 'Hamza A.', stars: 5, text: 'My summer bottle. Fresh without smelling like every other aquatic on the shelf.' }
    ]
  },
  {
    slug: 'sophisticated', name: 'SOPHISTICATED', type: 'Eau de Parfum',
    cat: 'men', env: 'ocean', badge: 'BESTSELLER',
    family: 'AMBER · LEATHER · WOODY',
    tagline: 'Depth, quietly worn.',
    desc: 'At twenty metres the light changes — and so does this fragrance. Black pepper and bergamot give way to leather and iris, anchored by oud, amber and patchouli. Sophisticated is not for everyone. That is the point.',
    price: { '50 ML': 2800, '100 ML': 5000 },
    rating: 5.0, reviewCount: 168,
    notes: {
      top:   ['Black Pepper', 'Bergamot', 'Nutmeg'],
      heart: ['Leather', 'Iris', 'Jasmine'],
      base:  ['Oud', 'Amber', 'Patchouli']
    },
    longevity: 10, projection: 4,
    wear: 'Formal evenings, meetings that matter, winter nights.',
    reviews: [
      { name: 'Shahzad I.', stars: 5, text: 'Mature and powerful. Two sprays is genuinely enough.' },
      { name: 'Omar V.', stars: 5, text: 'Smells expensive. Compliments every single time I wear it.' }
    ]
  },
  {
    slug: 'happy', name: 'HAPPY', type: 'Eau de Parfum',
    cat: 'men', env: 'ocean', badge: 'BESTSELLER',
    family: 'FRUITY · FRESH · SWEET',
    tagline: 'Sunlight through blue water.',
    desc: 'Happy floats somewhere between the surface and the deep — pineapple and apple over birch and jasmine, resting on musk and ambergris. Bright enough for noon, warm enough for the night after.',
    price: { '50 ML': 2200, '100 ML': 4000 },
    rating: 4.0, reviewCount: 205,
    notes: {
      top:   ['Pineapple', 'Apple', 'Bergamot'],
      heart: ['Birch', 'Jasmine', 'Patchouli'],
      base:  ['Musk', 'Oakmoss', 'Ambergris']
    },
    longevity: 8, projection: 4,
    wear: 'Day to night — the effortless all-rounder.',
    reviews: [
      { name: 'Danish E.', stars: 4, text: 'Really enjoy it, projection is a beast for the first few hours.' }
    ]
  },
  {
    slug: 'delicious', name: 'DELICIOUS', type: 'Eau de Parfum',
    cat: 'women', env: 'ocean',
    family: 'GOURMAND · FLORAL · WARM',
    tagline: 'Peach skin and warm sugar.',
    desc: 'Delicious is the warmth of the shallows at sunset — peach and orange blossom over praline and jasmine, wrapped in vanilla and sandalwood. A scent that feels like being liked back.',
    price: { '50 ML': 2200, '100 ML': 4000 },
    rating: 4.8, reviewCount: 88,
    notes: {
      top:   ['Peach', 'Orange Blossom', 'Mandarin'],
      heart: ['Praline', 'Jasmine', 'Cinnamon'],
      base:  ['Vanilla', 'Sandalwood', 'Musk']
    },
    longevity: 7, projection: 3,
    wear: 'Casual evenings, autumn walks, cozy nights.',
    reviews: [
      { name: 'Mahnoor J.', stars: 5, text: 'Sweet but grown-up. My friends keep trying to steal it.' }
    ]
  },
  {
    slug: 'king-in-the-north', name: 'KING IN THE NORTH', type: 'Eau de Parfum',
    cat: 'men', env: 'deep', badge: 'MOST WANTED',
    family: 'ICY · SMOKY · OUD',
    tagline: 'The rarest depth in the house.',
    desc: 'Forty metres down, one narrow beam of light remains — and inside it stands King in the North. Frost mint and juniper cut through incense and black pine, descending into dark oud and vetiver. Cold outside, burning inside. The most demanded fragrance we have ever made.',
    price: { '50 ML': 3200, '100 ML': 5800 },
    rating: 5.0, reviewCount: 331,
    notes: {
      top:   ['Frost Mint', 'Juniper', 'Bergamot'],
      heart: ['Incense', 'Black Pine', 'Rose'],
      base:  ['Dark Oud', 'Vetiver', 'Amber']
    },
    longevity: 12, projection: 5,
    wear: 'When you want the room to remember you were there.',
    reviews: [
      { name: 'Talha N.', stars: 5, text: 'Nothing else in my collection comes close. Worth every rupee.' },
      { name: 'Junaid Q.', stars: 5, text: 'Icy opening then a monster drydown. Sold out twice for a reason.' }
    ]
  },
  {
    slug: 'happy-attar', name: 'HAPPY', type: 'Attar Oil',
    img: 'attar',
    cat: 'attars', env: 'attar',
    family: 'ROSE · OUD · TRADITIONAL',
    tagline: 'A rose-and-oud attar in the classical tradition.',
    desc: 'A traditional alcohol-free attar, aged slowly. Rose and saffron fold into deep oud and soft musk — a single drop on the wrist carries the whole day.',
    price: { '6 ML': 500, '12 ML': 900 },
    rating: 4.8, reviewCount: 64,
    notes: { top: ['Saffron', 'Rose'], heart: ['Oud', 'Amber'], base: ['Musk', 'Sandalwood'] },
    longevity: 12, projection: 3,
    wear: 'Friday prayers, weddings, and quiet personal rituals.',
    reviews: [{ name: 'Ibrahim S.', stars: 5, text: 'One drop lasts from morning to night. Beautiful classical rose-oud.' }]
  },
  {
    slug: 'hopeful-attar', name: 'HOPEFUL', type: 'Attar Oil',
    img: 'attar',
    cat: 'attars', env: 'attar',
    family: 'MUSK · AMBER · SOFT',
    tagline: 'White musk and amber, warm as candlelight.',
    desc: 'A soft, skin-close attar of white musk, amber and a whisper of vanilla. Hopeful is the scent of a calm house in the evening.',
    price: { '6 ML': 650, '12 ML': 1100 },
    rating: 4.9, reviewCount: 57,
    notes: { top: ['Bergamot'], heart: ['White Musk', 'Amber'], base: ['Vanilla', 'Cedar'] },
    longevity: 10, projection: 2,
    wear: 'Everyday warmth — layer it over any Eau de Parfum.',
    reviews: [{ name: 'Noor H.', stars: 5, text: 'Gentle and long lasting. Perfect for daily wear.' }]
  },
  {
    slug: 'cheerful-attar', name: 'CHEERFUL', type: 'Attar Oil',
    img: 'attar',
    cat: 'attars', env: 'attar',
    family: 'FLORAL · FRESH · LIGHT',
    tagline: 'A bright floral attar for hot afternoons.',
    desc: 'The lightest of our attars — jasmine, marigold and a clean musk base that stays fresh through the warmest part of the day.',
    price: { '6 ML': 450, '12 ML': 750 },
    rating: 4.7, reviewCount: 41,
    notes: { top: ['Marigold', 'Bergamot'], heart: ['Jasmine', 'Lily'], base: ['Clean Musk'] },
    longevity: 8, projection: 2,
    wear: 'Summer days and layered with florals.',
    reviews: [{ name: 'Sana P.', stars: 5, text: 'Fresh floral attar that does not feel heavy in heat. Lovely.' }]
  },
  {
    slug: 'discovery-set', name: 'DISCOVERY SET', type: 'Sampler Set',
    img: 'discovery',
    cat: 'discovery', env: 'set', badge: 'START HERE',
    family: 'SIX SCENTS · ONE JOURNEY',
    tagline: 'Begin the journey before you commit to it.',
    desc: 'Six 3 ml travel sprays drawn from across the journey — from the forest floor to the deep ocean — presented in a lined gift box. The full price is redeemable against any full-size bottle.',
    price: { '6 × 3 ML': 1500, '12 × 3 ML': 2500 },
    rating: 4.9, reviewCount: 152,
    notes: { top: ['Six signatures'], heart: ['Forest to Ocean'], base: ['Your favourite'] },
    longevity: 8, projection: 3,
    wear: 'The starting point of your collection.',
    reviews: [{ name: 'Ali Z.', stars: 5, text: 'The best way to find your scent. Gifted two already.' }]
  }
];

const CATS = [
  { id: 'all', label: 'ALL' },
  { id: 'men', label: 'MEN' },
  { id: 'women', label: 'WOMEN' },
  { id: 'attars', label: 'ATTARS' },
  { id: 'discovery', label: 'DISCOVERY' },
  { id: 'deals', label: 'DEALS' }
];

const bySlug = s => PRODUCTS.find(p => p.slug === s);
const fmtPrice = n => '₨' + n.toLocaleString('en-PK');
const productImg = p => IMG + (p.img || p.slug) + '.webp';

/* Journey placement */
const JOURNEY = {
  forest: ['five-nine', 'hopeful', 'charming', 'mi-amor'],
  ocean:  ['zesty', 'sophisticated', 'happy'],
  mostWanted: ['king-in-the-north', 'five-nine', 'sophisticated', 'happy']
};
