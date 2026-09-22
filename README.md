# Ismaeel Muhammad --- Immersive 3D Fragrance Website

## Project Overview

This project is a complete ground-up redesign of the **Ismaeel
Muhammad** perfume e-commerce website.

The goal is to transform the existing conventional online store into a
**premium, cinematic, scroll-driven fragrance experience** where
visitors do not simply browse products --- they move through
environments that visually communicate the feeling, ingredients, mood,
and character of each fragrance.

The central creative concept is:

> **A Journey of Senses**

The homepage should behave like a continuous visual journey:

**Forest → Open Landscape → Ocean → Deep Ocean → Most Wanted Fragrances
→ Brand Story → Collections → Shop**

The experience should feel highly polished, precise, immersive,
responsive, and comparable to a high-end luxury fragrance campaign
website.

------------------------------------------------------------------------

# 1. Core Experience

The website is based around **scroll-controlled storytelling**.

As the user scrolls:

-   The camera/environment moves.
-   The perfume bottle animation progresses.
-   Foreground and background layers create depth.
-   New fragrance products appear.
-   The environment changes according to the scent.
-   The visitor gradually transitions from a forest into an ocean.
-   The ocean section becomes progressively deeper.
-   The most-demanded fragrances are revealed at greater depth.
-   The experience eventually transitions into the brand story and
    conventional shopping experience.

The scroll should feel like **one continuous cinematic sequence**, not a
collection of unrelated website sections.

------------------------------------------------------------------------

# 2. Homepage Structure

## Phase 01 --- The Forest / Hero

### Purpose

Introduce the brand and establish the immersive visual language.

### Visual

-   Full-screen cinematic forest.
-   Dense trees and foliage.
-   Atmospheric mist.
-   Volumetric sunlight.
-   Moss-covered foreground.
-   Floating particles.
-   The Muhammad Ismael crest — a circular seal with the MI monogram in
    Bodoni Moda 900, ring lettering ("MUHAMMAD ISMAEL / EAU DE
    PARFUM"), a gold diamond and sage laurel sprigs — positioned
    prominently where the bottle used to stand (per the client's
    requirement; swap in the official logo file when it lands).
-   Subtle crest float animation.
-   Layered foreground leaves for depth.

### Suggested Copy

**MORE THAN A SCENT**

# A JOURNEY OF SENSES

Crafted for those who seek more --- timeless fragrances inspired by
nature, heritage and emotion.

**EXPLORE FRAGRANCE →**

Bottom navigation:

**01 / 07**

**SCROLL TO ENTER**

------------------------------------------------------------------------

# 3. Phase 02 --- The Forest Collection

The forest continues as the primary environment.

Different fragrance products appear as the visitor scrolls.

## Interaction

Each scroll segment can reveal:

-   New botanical elements.
-   New lighting.
-   Different atmospheric effects.
-   A different perfume bottle.
-   Product name.
-   Fragrance family.
-   Short description.
-   Discover button.

Example:

``` text
THE FOREST

FIVE-NINE

WOODY · AMBER · SPICY

DISCOVER →
```

The product itself should be clickable.

Clicking a product must navigate to its corresponding product detail
page.

------------------------------------------------------------------------

# 4. Layered Scene System

The forest should be constructed from multiple visual layers instead of
one flat image.

Recommended structure:

``` text
Layer 01 — Distant Forest
Layer 02 — Atmospheric Fog
Layer 03 — Background Trees
Layer 04 — Midground Vegetation
Layer 05 — Product / Perfume Bottle
Layer 06 — Foreground Branches
Layer 07 — Foreground Leaves
Layer 08 — Particles / Dust
Layer 09 — Lighting Effects
```

Each layer should respond differently to scroll and/or mouse movement.

This creates a pseudo-3D environment even when the primary assets are 2D
images.

------------------------------------------------------------------------

# 5. Phase 03 --- Forest to Ocean Transition

The forest should not disappear abruptly.

The transition should happen progressively.

### Sequence

``` text
Dense Forest
      ↓
Sparse Forest
      ↓
Open Landscape
      ↓
Mountains
      ↓
Water / Horizon
      ↓
Ocean Surface
      ↓
Underwater
```

The color and lighting should gradually evolve.

### Forest

-   Deep green
-   Black
-   Moss
-   Amber

### Transition

-   Stone
-   Beige
-   Warm sunlight
-   Pale atmosphere

### Ocean

-   Navy
-   Cyan
-   Deep blue
-   Black

The visitor should feel that the camera is physically travelling through
the environment.

------------------------------------------------------------------------

# 6. Phase 04 --- The Ocean

## Concept

**Beneath the Surface**

The visitor enters the ocean.

Scrolling downward represents diving deeper.

### Surface

-   Bright water.
-   Strong sunlight.
-   Visible surface.
-   Floating particles.
-   First ocean fragrance.

### 10m

-   Reduced sunlight.
-   More bubbles.
-   Increased blue tones.
-   Product reveal.

### 20m

-   Darker environment.
-   Less sunlight.
-   Product reveal.

### 30m

-   Deep navy.
-   Strong atmospheric depth.
-   Product reveal.

### 40m

-   Very dark environment.
-   Narrow light beams.
-   Premium/high-demand product reveal.

Suggested copy:

> **DEEPER YOU GO, RARER IT BECOMES.**

------------------------------------------------------------------------

# 7. Phase 05 --- Most Wanted Fragrances

The deepest section should reveal the fragrances that are most demanded.

The products should appear suspended underwater.

The reveal should feel special rather than like a standard product grid.

Suggested heading:

# THE DEPTHS REVEAL WHAT PEOPLE CHOOSE MOST.

Products can appear one at a time as the scroll progresses.

Each product should be clickable.

------------------------------------------------------------------------

# 8. Product Interaction

Every perfume displayed anywhere in the cinematic experience must
function as a product entry point.

### On hover

Recommended effects:

-   Slight scale increase.
-   Subtle glow/reflection.
-   Bottle rotation.
-   Environment reacts slightly.
-   Product information fades in.

### On click

Navigate to:

``` text
/product/{product-slug}
```

The product detail page should maintain the same visual identity.

------------------------------------------------------------------------

# 9. Product Detail Page

## Hero

Large perfume product visual.

Supporting information:

``` text
PRODUCT NAME

EAU DE PARFUM

★★★★★

PRICE

SHORT DESCRIPTION

[ ADD TO CART ]
[ BUY NOW ]
```

## Product Information

Include:

-   Fragrance description.
-   Top notes.
-   Heart notes.
-   Base notes.
-   Fragrance family.
-   Size.
-   Longevity.
-   Projection.
-   Recommended occasions.
-   Customer reviews.
-   Related products.

## Fragrance Pyramid

``` text
           TOP NOTES
               ↓
          HEART NOTES
               ↓
           BASE NOTES
```

Use elegant visual transitions rather than a basic table wherever
possible.

------------------------------------------------------------------------

# 10. Brand Story

After the ocean experience, transition into a warmer and more intimate
environment.

Suggested heading:

# WHERE LOVE BECOMES PASSION

The section should communicate:

-   Founder story.
-   Passion for fragrance.
-   Brand philosophy.
-   Fragrance journey.
-   Craft and quality.
-   Future vision.

Use editorial photography, subtle parallax, typography animation, and
atmospheric lighting.

------------------------------------------------------------------------

# 11. Collections

Create a dedicated collection area after the story.

Recommended categories:

-   Men
-   Women
-   Attars
-   Discovery Set
-   Fragrances
-   Deals

Each collection should have a large editorial visual.

Example:

``` text
EXPLORE OUR

COLLECTIONS

MEN
WOODY & TIMELESS

WOMEN
ELEGANT & RADIANT

ATTARS
TRADITIONAL & PURE

DISCOVERY SET
EXPLORE THE SPECTRUM
```

------------------------------------------------------------------------

# 12. Shop Page

The Shop page should provide efficient e-commerce browsing while
preserving the cinematic brand language.

## Structure

``` text
FRAGRANCES

ALL
MEN
WOMEN
ATTARS
DISCOVERY
DEALS

--------------------------------

PRODUCT GRID
```

Recommended product-card behavior:

-   Large product photography.
-   Minimal information.
-   Smooth hover animation.
-   Quick view.
-   Wishlist.
-   Add to cart.
-   Product detail navigation.

Avoid overly dense UI.

------------------------------------------------------------------------

# 13. About Page

The About page should feel like a luxury editorial experience.

Suggested sections:

1.  Hero --- The Story Behind the Scent
2.  The Beginning
3.  The Passion
4.  The Craft
5.  The Brand
6.  The Future

Use:

-   Large photography.
-   Full-width imagery.
-   Elegant typography.
-   Scroll animations.
-   Horizontal image movement.
-   Subtle text reveals.

------------------------------------------------------------------------

# 14. Journal

The Journal should provide editorial content related to:

-   Fragrance education.
-   Scent guides.
-   Perfume recommendations.
-   Fragrance notes.
-   Behind-the-scenes content.
-   Brand stories.
-   New launches.

The journal should use a magazine/editorial layout rather than a basic
blog list.

------------------------------------------------------------------------

# 15. Contact Page

Minimal and premium.

Suggested structure:

``` text
LET'S TALK

Questions about your fragrance?

EMAIL

CUSTOMER SUPPORT

SOCIAL

LOCATION

CONTACT FORM
```

Keep the interface clean with generous spacing.

------------------------------------------------------------------------

# 16. Cart

The cart should remain visually consistent with the main website.

Include:

-   Product image.
-   Product name.
-   Size.
-   Quantity.
-   Price.
-   Remove.
-   Subtotal.
-   Shipping.
-   Total.
-   Checkout button.

Recommended behavior:

-   Slide-in cart drawer.
-   Smooth opening/closing animation.
-   Product thumbnail.
-   Cart count in navigation.

------------------------------------------------------------------------

# 17. Checkout

Checkout should prioritize usability over visual experimentation.

Required:

-   Customer information.
-   Shipping address.
-   Delivery information.
-   Payment method.
-   Order summary.
-   Secure checkout messaging.

The checkout should remain lightweight and fast.

------------------------------------------------------------------------

# 18. Navigation

The navigation should be minimal.

Recommended desktop navigation:

``` text
ISMAEEL MUHAMMAD

HOME
SHOP
FRAGRANCES
ABOUT
JOURNAL

                 SEARCH
                 ACCOUNT
                 CART
```

The navigation can become transparent over cinematic scenes and switch
to a solid background when necessary for readability.

------------------------------------------------------------------------

# 19. Typography

Recommended typography pairing:

### Display

Elegant high-contrast serif.

Possible choices:

-   Cormorant Garamond
-   DM Serif Display
-   Bodoni Moda  ← shipped (the classic fashion didone)

### Interface / Body

Modern sans-serif.

Possible choices:

-   Inter
-   Manrope
-   Helvetica Neue

Typography should use:

-   Large editorial headlines.
-   Wide letter spacing for labels.
-   Small uppercase metadata.
-   High contrast between display and body text.

------------------------------------------------------------------------

# 20. Color System

The color system should change according to the environment.

  Environment     Visual Direction
  --------------- --------------------------------
  Hero Forest     Black / Forest Green / Amber
  Forest          Moss / Emerald / Brown
  Transition      Sand / Stone / Warm Beige
  Ocean Surface   Blue / Cyan
  Deep Ocean      Navy / Black
  Brand Story     Ivory / Brown / Warm Black
  Shop            Charcoal / Ivory
  Product         Product-specific accent colors

Avoid using gold everywhere.

Gold should primarily appear as a luxury accent.

------------------------------------------------------------------------

# 21. Animation System

The website should be controlled by a central scroll timeline.

Concept:

``` text
Scroll Progress
      │
      ├── 0.00
      │    Hero
      │
      ├── 0.10
      │    Bottle Animation
      │
      ├── 0.20
      │    Forest Movement
      │
      ├── 0.30
      │    Product 01
      │
      ├── 0.40
      │    Product 02
      │
      ├── 0.50
      │    Forest → Land
      │
      ├── 0.60
      │    Land → Ocean
      │
      ├── 0.70
      │    Dive
      │
      ├── 0.80
      │    Product 03
      │
      ├── 0.90
      │    Most Wanted
      │
      └── 1.00
           Brand / Shop
```

------------------------------------------------------------------------

# 22. Recommended Technology

## Frontend

-   HTML5
-   CSS3
-   JavaScript / TypeScript
-   React or Next.js

## Animation

-   GSAP
-   ScrollTrigger
-   Lenis or equivalent smooth-scroll solution

## 3D / WebGL

Use selectively:

-   Three.js
-   WebGL shaders
-   Particle systems
-   Depth effects

Do not use WebGL for everything.

The experience should use the simplest technology capable of producing
the desired visual result.

------------------------------------------------------------------------

# 23. Asset Strategy

Use a hybrid asset system.

### Video

Best for:

-   Perfume bottle rotation.
-   Liquid movement.
-   Hero product animation.
-   High-quality cinematic sequences.

### Transparent PNG/WebP

Best for:

-   Leaves.
-   Flowers.
-   Branches.
-   Product cutouts.
-   Floating elements.

### Background images/video

Best for:

-   Forest.
-   Mountains.
-   Landscape.
-   Ocean.

### CSS / WebGL

Best for:

-   Particles.
-   Depth.
-   Atmospheric effects.
-   Subtle distortion.
-   Mouse interaction.

------------------------------------------------------------------------

# 24. Performance Requirements

The website must look premium without becoming unusably slow.

Requirements:

-   Lazy-load below-the-fold assets.
-   Use WebP/AVIF where appropriate.
-   Compress videos.
-   Provide mobile-specific assets.
-   Avoid unnecessarily huge transparent images.
-   Use responsive image sizes.
-   Preload only critical hero assets.
-   Avoid excessive WebGL complexity.
-   Respect `prefers-reduced-motion`.
-   Provide graceful fallbacks for low-power devices.

------------------------------------------------------------------------

# 25. Responsive Design

The cinematic desktop experience should be adapted rather than simply
scaled down.

## Desktop

-   Full-screen environments.
-   Large bottle visuals.
-   Multiple depth layers.
-   Advanced parallax.
-   Scroll-driven transitions.

## Tablet

-   Reduced number of layers.
-   Simplified effects.
-   Optimized video.

## Mobile

Use a simplified cinematic version:

-   Portrait-oriented scenes.
-   Smaller product assets.
-   Reduced particles.
-   Shorter animation sequences.
-   Touch-friendly controls.
-   Faster asset loading.

The core story must remain intact.

------------------------------------------------------------------------

# 26. Accessibility

The website must remain usable without animation.

Include:

-   Keyboard navigation.
-   Visible focus states.
-   Semantic HTML.
-   Accessible buttons and links.
-   Alt text.
-   Proper heading hierarchy.
-   Sufficient text contrast.
-   Reduced-motion mode.
-   Non-animation fallback for product discovery.

------------------------------------------------------------------------

# 27. SEO

Every product must have:

-   Unique URL.
-   Unique title.
-   Meta description.
-   Product structured data.
-   Product image.
-   Price.
-   Availability.
-   Reviews where applicable.

Recommended URL structure:

``` text
/shop
/fragrances
/men
/women
/attars
/discovery-set
/deals
/product/product-name
/about
/journal
/contact
```

------------------------------------------------------------------------

# 28. Suggested Folder Structure

``` text
ismaeel-muhammad/
│
├── public/
│   ├── images/
│   ├── products/
│   ├── environments/
│   ├── transparent/
│   ├── videos/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   ├── ProductCard/
│   │   ├── ProductViewer/
│   │   ├── ScrollIndicator/
│   │   └── Footer/
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   ├── Forest/
│   │   ├── Transition/
│   │   ├── Ocean/
│   │   ├── MostWanted/
│   │   ├── BrandStory/
│   │   └── Collections/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Shop/
│   │   ├── Product/
│   │   ├── About/
│   │   ├── Journal/
│   │   ├── Contact/
│   │   ├── Cart/
│   │   └── Checkout/
│   │
│   ├── animations/
│   │   ├── heroTimeline/
│   │   ├── forestTimeline/
│   │   ├── oceanTimeline/
│   │   └── transitions/
│   │
│   ├── data/
│   │   └── products/
│   │
│   ├── styles/
│   └── utils/
│
└── README.md
```

------------------------------------------------------------------------

# 29. Development Phases

## Phase 1 --- Design System

-   Typography.
-   Colors.
-   Buttons.
-   Navigation.
-   Product cards.
-   Spacing.
-   Responsive rules.

## Phase 2 --- Hero

Build:

-   Forest environment.
-   Bottle video.
-   Layered depth.
-   Scroll indicator.
-   Hero typography.

## Phase 3 --- Forest Journey

Build:

-   Product reveals.
-   Botanical layers.
-   Scroll timeline.
-   Product interaction.

## Phase 4 --- Transition

Build:

-   Forest → landscape.
-   Landscape → ocean.
-   Color transitions.
-   Camera movement.

## Phase 5 --- Ocean

Build:

-   Surface.
-   Diving animation.
-   Depth markers.
-   Underwater products.
-   Particle system.

## Phase 6 --- Most Wanted

Build:

-   Deep-ocean reveal.
-   Product interaction.
-   Collection navigation.

## Phase 7 --- Brand

Build:

-   Story.
-   About.
-   Journal.
-   Collections.

## Phase 8 --- Commerce

Build:

-   Shop.
-   Product pages.
-   Cart.
-   Checkout.
-   Account.

## Phase 9 --- Optimization

Test:

-   Desktop.
-   Mobile.
-   Tablet.
-   Low-power devices.
-   Slow networks.
-   Accessibility.
-   SEO.

------------------------------------------------------------------------

# 30. Final Creative Principle

The redesign should follow one fundamental rule:

> **Do not make the user feel like they are scrolling through a website.
> Make them feel like they are travelling through a fragrance.**

Every transition, animation, product reveal, image, sound opportunity,
and interaction should support that idea.

The final experience should combine:

**Luxury + Nature + Fragrance + Cinematic Storytelling + E-commerce +
Interactive 3D Depth**

rather than becoming a generic 3D website.

------------------------------------------------------------------------

## Design Reference

The homepage visual concept follows this sequence:

``` text
01 — THE FOREST
        ↓
02 — FOREST FRAGRANCES
        ↓
03 — FOREST → OPEN LAND
        ↓
04 — OCEAN / DIVE
        ↓
05 — MOST WANTED
        ↓
06 — BRAND STORY
        ↓
07 — COLLECTIONS
        ↓
       FOOTER
```

**Project Name:** Ismaeel Muhammad --- A Journey of Senses\
**Project Type:** Immersive Luxury Fragrance E-commerce\
**Primary Interaction:** Scroll-driven cinematic storytelling\
**Visual Direction:** Premium / Cinematic / Natural / Minimal /
Editorial\
**Primary Environments:** Forest → Land → Ocean

---

# IMPLEMENTATION — What Was Built

This repository now contains a working implementation of the concept above:
a **static, dependency-light, cinematic scroll experience** built to run
anywhere (no build step, no server-side rendering required).

## Pages

| File            | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `index.html`    | The full cinematic journey — 6 scroll-driven scenes                    |
| `shop.html`     | Dark editorial shop with category filters (`?cat=men\|women\|attars…`) |
| `product.html`  | Data-driven product page (`?p=slug`) with notes, pyramid, reviews       |
| `about.html`    | Editorial story — The Beginning / Passion / Craft / Brand / Future      |
| `contact.html`  | Contact + FAQ / shipping / returns                                      |
| `checkout.html` | Order form with COD / bank / card options and order confirmation        |

## The journey (index.html)

1. **01 — The Awakening** — layered forest hero: background + midground
   model + a four-plane leaf system built from the beat models (the
   Hopeful far botanical framing the shot, left strip,
   right strip, bottom strip) each with its own scroll parallax, mouse
   depth and gentle sway. Fog, sun shaft, canvas dust, camera push-in.
   The perfume model rides above every model plane (top layer, z6).
2. **02 — The Forest (fragrance picker)** — the background is COMMON with
   the awakening: the very same forest image at the same scale, offset and
   brightness, held still. The four forest fragrances (Five-Nine, Hopeful,
   Charming, Mi Amor) play as a racing-game style SELECTOR, fully
   SCROLL-INDEPENDENT: the showcase panel on the LEFT frames the model
   layer (the same cut-outs the Hopeful beat used) with the perfume
   bottle displayed INSIDE the layer's foliage window (mapped exactly
   through the object-fit cover math, mirrored for flipped variants);
   the description card (name, family, tagline, price, Discover +
   Add-to-cart) sits on the RIGHT; and the arrows live in the brown
   selection bar at the bottom (with the dots and the ←/→ key hint).
   The fragrance changes ONLY via the arrows, the ←/→ arrow keys, the
   dots, or a swipe — scrolling never changes it, and a manual selection
   persists as you scroll away and back. The handoff into the forest is
   ONE FLOW: the forest's stage is pinned underneath the awakening's
   last stretch (a −150vh overlap in cinema mode), and the awakening's
   stage — by then carrying the forest's own first frame (`.forest-pre`,
   not mouse-parallaxed, pixel-identical) — simply dissolves into it
   while BOTH stages stay pinned; the awakening's framing then dissolves
   into the picker. At the end of the picker THE FOREST ZOOMS OUT (per
   the reference video in `vids/`): the whole forest world shrinks toward
   the camera's pull-back and dissolves as it recedes, while the beach —
   pre-loaded behind the world — occurs around it, settling to the exact
   frame the shore section opens with.
3. **03 — The Shore (fragrance picker)** — one continuous scene in three
   layers:
   1. the Mi Amor models (bushes + leaves) as the overlay on top,
   2. the sea water that pops up and rises in between,
   3. the sky/sand beach as the background.
   One arrival title ("Trees give way to the horizon.") in bold white
   Bodoni, then the same racing-game selector plays on the beach with
   the shore fragrances (Zesty, Happy): the bushes dim behind the picker
   and return for the water rise. After the picker the water overlays
   the beach from the bottom in a steady linear climb (per the reference
   video — the water line measured at 784 → 300 → 0px through the rise,
   bright sky still on top) and the dive begins. The handoff into the shore is the same one-flow dissolve as
   the awakening → forest one, and the dive handoff repeats the pattern
   once more (the ocean pins under the shore's last stretch, the
   fully-risen water dissolves into the live ocean). The overlapping
   sections carry no background of their own — a background on an
   overlapping section would paint a flat band over the pinned scene
   beneath it (the transition's old black background did exactly that
   over the ocean); their stages' own layers are fully opaque.
4. **04 — The Sea Bed (fragrance picker)** — the ocean fills the whole
   screen (open-water surface, no sky) with god rays, caustics, rising
   bubbles and a live depth meter (0 → 42 m). After the "Down to the sea
   bed" arrival, the same selector returns underwater with the deep
   fragrances (Sophisticated, King in the North) — the showcase panel
   and its perfume carry an aquatic grade so they sit in the water, the
   card scrim goes deep-sea navy, and the depth meter steps aside while
   the description card is on stage. The transparent sea-bed
   picture is overlaid as a model layer at the bottom of the water and
   slowly drifts up past the camera, thinning into the dark as the dive
   deepens. Its opening is a one-flow dissolve from the fully-risen water
   (see scene 03).
5. **05 — The Depths** — near-black Most Wanted reveal with a volumetric
   light beam and four floating product cards.
6. **06 — Collections** — portals illustrated with the real product
   photographs from ismaeelmuhammad.pk (Men / Women / Most Wanted /
   Attars / Discovery Set / All Fragrances) linking into the shop.

The former "Where love becomes passion" story section has been removed
completely; the brand story lives on `about.html`.

Global: progress bar, scene rail (right side), film grain, slide-in cart
drawer (localStorage), wishlist, toasts, mobile menu, page transitions.

## Technology

- **Vanilla HTML/CSS/JS** — no framework, no build step.
- **GSAP + ScrollTrigger** (vendored locally in `assets/vendor/`) for the
  scrubbed scroll timelines. Scenes use CSS `position: sticky` stages
  (robust pinning without layout jitter).
- **Lenis** (vendored) for smooth scrolling, integrated with the GSAP ticker.
- **Canvas** particle systems (hero dust, ocean bubbles) that pause when
  off-screen.
- **Self-hosted fonts** — Bodoni Moda 400/700/900 (+ italics), the classic
  high-contrast fashion didone, for the
  bold editorial display voice, Cormorant Garamond (accents) + Inter (UI),
  all in `assets/fonts/`. The hero title is set in Bodoni Moda 900 with a
  warm metallic gold gradient.
- **Progressive enhancement** — with JavaScript disabled or with
  `prefers-reduced-motion`, the site degrades to a readable, stacked
  document. All content remains accessible (semantic HTML, alt text,
  keyboard-focusable products, aria labels).

## Assets

- `assets/img/collections/` — the real product thumbnails downloaded from
  ismaeelmuhammad.pk (Five-Nine, King in the North, Charming, Hopeful,
  Delicious, Discovery Set) used on the collection portals.
- `assets/img/env/` — environments (WebP):
  - `forest-bg.webp` — from `background Forest.png`
  - `model-mid.webp` — from `MODEL1.png` (midground layer, transparent
    window; also the "bushes" half of the Mi Amor shore overlay)
  - `model-fore.webp` — from `MODEL2.png` (foreground framing layer; also
    the blurred far plane of the hero/forest leaf system)
  - `leaf-right.webp` — right-edge leaf strip (the left strip is this same
    image mirrored in CSS)
  - `leaf-near.webp` — keyed botanical cluster (near-leaf plane; also the
    "leaves" half of the Mi Amor shore overlay)
  - `leaf-far`, `leaf-bottom`, `leaf-left` — retired; the far plane and the
    bottom strip are the beat models themselves, so only the four approved
    model-leaf assets are used anywhere
  - `beach.webp` — the sky-styled shore scene
  - `forest-to-ocean.webp` — the trees of the forest edge, white backdrop
    keyed to transparency (opaque master kept in `src/`); used on the shop
    page head and the about page
  - `ocean-surface.webp` (the whole-screen ocean water, also used by the
    rising water), `oceanbed.webp` (the transparent sea-bed model overlay)
  - `main-idea.webp` — the original journey storyboard master (kept as an
    asset; the former story section that showed it has been removed)
- `assets/img/bottles/` — the 8 signature bottles (generated on pure black,
  then black-keyed to transparent WebP via border flood-fill).
  `src/` keeps the original renders as masters.
- Product data (`assets/js/data.js`) contains **only the 8 journey models**:
  Five-Nine, Hopeful, Charming, Mi Amor, Zesty, Sophisticated, Happy and
  King in the North — no extra catalog data.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works. No environment variables, no database.

## Cart & commerce (demo)

Cart and wishlist persist in `localStorage`. Checkout renders the real
cart contents and shows an order confirmation — wire the `PLACE ORDER`
handler in `checkout.html` to a real backend (or WooCommerce) to go live.

## Verified

Headless-Chromium test suite (`tools/audit-v13.mjs`, 64 checks, 1440×900
desktop + 390×844 mobile) confirms for v13: zero JS errors; the gold
theme (`#c9a86a`) and **Bodoni Moda** display face are unchanged from
v12.

**The perfume display is now CLEAN.** There are zero foliage model
planes left in the pickers (asserted directly against the DOM): each
showcase is a framed panel with the perfume bottle centred at full size
(204×397px desktop, 186px on mobile) over a soft radial gold glow —
perfume only, nothing else.

**Every perfume model is fully independent of scrolling.** No scrub
timeline touches the pickers anymore: the forest picker lives inside
`.forest-world` (it arrives through the hero dissolve and zooms out with
the scene), the shore picker sits on its stage the whole scene (below
the water layer, so the rising water physically submerges showcase,
card and bar — DOM-verified under `.water-rise` at the rise end), and
the ocean picker is on stage for its entire scene until the next
section slides over. Measured: the picker's computed opacity is exactly
1 at four different scroll offsets deep inside the forest scene, and
scrolling never changes the selected fragrance.

Selection remains fully interactive and persistent: arrows / arrow-keys
/ dots / swipe swap the bottle with the lift-and-settle crossfade
(Five-Nine → Hopeful → Charming → Mi Amor; Zesty → Happy; Sophisticated
→ King in the North, counters and dots in sync), and a selection
persists across scrolling away and back.

The scene work is unchanged from v12 and re-verified: forest → beach
zoom-out (frame luminance 70 → 124 → 233, no dark bands), beach → ocean
linear bottom-up water climb (line at 784 → 300 → 0px, bright sky on
top, full coverage at the end) with the Mi Amor bushes-and-leaves
sandwich preserved during the rise, one-flow handoffs everywhere
(unshifted drift 0.7–11.7 vs 31.4–38.8 for a shifted frame), the dive
lands blue-dominant, mobile fits with no overflow, and shop / product
pages load error-free. The audit rig rebuilds with `tools/rig-setup.sh`.

**Demo notice:** prices, the cart, and the checkout order confirmation
are front-end demo data. Wire the `PLACE ORDER` handler in
`checkout.html` to a real backend (or WooCommerce) to go live.
