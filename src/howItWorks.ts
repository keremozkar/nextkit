/** Technique notes distilled from frontendjoe open-source collections (Instagram + GitHub). */

export type HowItWorks = { summary: string; techniques: string[] }

export const categoryHowItWorks: Record<string, HowItWorks> = {
  buttons: {
    summary:
      'Micro-interactions: split text, sliding layers, and icon morphs driven by hover/transform — rarely by JS.',
    techniques: [
      'Stack two states (`.original` + `.letters`) and slide with `transform` + staggered `transition-delay` on `nth-child`.',
      'Use `overflow: hidden` + absolute layers so only one state is visible at a time.',
      'Prefer `cubic-bezier(0.87, 0, 0.13, 1)` for snappy Instagram-style motion.',
      'Scale demos with `scale: 0.5` so dense grids fit the square reel frame.',
    ],
  },
  loaders: {
    summary:
      'Pure CSS spinners: SVG stroke paths, rotating borders, and staggered pulse bars.',
    techniques: [
      'Animate `stroke-dashoffset` on SVG paths for “travel along track” loaders.',
      'Drive timing with CSS variables (`--uib-speed`, `--uib-color`, `--uib-size`).',
      'Stagger siblings with `animation-delay: calc(var(--uib-speed) / -12 * n)`.',
      'Keep tracks at `rgb(255 255 255 / 8%)` so the moving car reads clearly on dark UI.',
    ],
  },
  inputs: {
    summary:
      'Floating labels, icon adornments, and small JS for clear/search affordances.',
    techniques: [
      'Float labels with `:focus + label` / `:valid + label` and `transform` + `font-size`.',
      'Place Material Symbols as absolute icons inside a relative wrapper.',
      'Tiny JS toggles `.visible` / `.hidden` for clear buttons and search spinners.',
      'Use `required` + `:valid` so empty fields keep the label down without JS.',
    ],
  },
  switches: {
    summary:
      'Checkbox-as-toggle pattern: hide the input, style a sibling `.slider` with `:checked`.',
    techniques: [
      'Structure: `<label><input type="checkbox"><span class="slider"></span></label>`.',
      'Knob via `.slider:before` + `transform: translateX(...)` on `:checked`.',
      'Moon/sun knobs with inset `box-shadow` tricks instead of extra DOM.',
      'Theme with CSS variables (`--primary`, `--background`) for quick palette swaps.',
    ],
  },
  checkboxes: {
    summary:
      'Custom checks: hide native input, animate SVG paths or pseudo-elements on `:checked`.',
    techniques: [
      'Pair `input:checked + .box` or `~` sibling selectors to drive visuals.',
      'Draw checkmarks with SVG `stroke-dasharray` / `stroke-dashoffset` transitions.',
      'Bounce or scale the box on check with short `transform` keyframes.',
      'Keep hit targets large even when the visible control is scaled down for reels.',
    ],
  },
  burgers: {
    summary:
      'Three-line icon → X using one element + `::before` / `::after` transforms.',
    techniques: [
      'Base bar on `.burger`; top/bottom bars as `::before` / `::after` with absolute offsets.',
      'On `.open`: fade/collapse the middle bar; rotate before/after ±45° into an X.',
      'Toggle a class with a few lines of JS (`button.classList.toggle("open")`).',
      'Match duration/easing across all three bars so the morph feels like one motion.',
    ],
  },
  menus: {
    summary: 'Expandable / morphing menu panels with transforms and opacity reveals.',
    techniques: [
      'Clip or translate panels off-canvas, then animate into place on open.',
      'Stagger menu item reveals with `transition-delay` on children.',
      'Use a single open class on a parent to orchestrate nested animations.',
    ],
  },
  modals: {
    summary: 'Centered dialog + backdrop; open/close via class toggles.',
    techniques: [
      'Backdrop: fixed full-viewport layer with translucent dark fill.',
      'Modal: scale/opacity transition from slightly below 1 → 1.',
      'Trap focus in production; demos often only toggle `.open` for clarity.',
    ],
  },
  dropdowns: {
    summary: 'Click-to-open lists with absolute positioning under a trigger.',
    techniques: [
      'Position the menu with `absolute` under a `relative` trigger.',
      'Animate max-height/opacity or transform for open state.',
      'Close on outside click with a document listener in JS demos.',
    ],
  },
  tooltips: {
    summary: 'Pure CSS hover tips with positioned pseudo-elements or sibling spans.',
    techniques: [
      'Show on `:hover` / `:focus-visible` with opacity + translate.',
      'Arrow via `::after` triangle borders.',
      'Prefer `data-tooltip` + attr() only when content is short.',
    ],
  },
  svgs: {
    summary: 'Illustrated UI moments — strokes, fills, and CSS-driven SVG animation.',
    techniques: [
      'Animate `stroke-dashoffset` for draw-on effects.',
      'Tint with `currentColor` so one CSS color drives the whole SVG.',
      'Keep SVG `overflow: visible` when strokes extend past the viewBox.',
    ],
  },
  examples: {
    summary: 'Teaching reels: isolate one CSS idea (transforms, timing, filters, selectors).',
    techniques: [
      'One concept per frame — transforms, easing curves, filters, or child selectors.',
      'Side-by-side comparisons make timing-function differences obvious.',
      'Use the shared `.frame` chrome so every teaching reel feels on-brand.',
    ],
  },
  cards: {
    summary: 'Hover-lift cards, image overlays, and stacked content with soft depth.',
    techniques: [
      'Lift on hover with `transform: translateY(-4px)` + subtle shadow change.',
      'Image zoom via `overflow: hidden` on the media wrapper + `scale` on the img.',
      'Overlay titles with absolute gradients so text stays readable on photos.',
      'Keep radius + spacing consistent across a card family for a kit feel.',
    ],
  },
  navbars: {
    summary: 'Responsive top bars: logo, links, CTA, and mobile burger collapse.',
    techniques: [
      'Flex/grid header with `position: sticky` or fixed + translucent backdrop.',
      'Mobile: hide link row, reveal drawer/overlay when burger gets `.open`.',
      'Underline/indicator animations with `::after` width transitions on hover.',
      'Match burger morph timing with the panel slide for one cohesive open motion.',
    ],
  },
  sidebars: {
    summary: 'Collapsible left rails — icons-only ↔ expanded labels.',
    techniques: [
      'Animate `width` or `translateX` between compact and expanded states.',
      'Fade labels with opacity/width so icons stay anchored while text appears.',
      'Active item: accent bar or background chip on the current route.',
      'Use a single `.open` / `.collapsed` class on the aside to drive all children.',
    ],
  },
  logins: {
    summary: 'Full-bleed auth screens: form column + brand/visual column.',
    techniques: [
      'Split layout: form on one side, atmospheric image/gradient on the other.',
      'Floating labels + primary CTA button with the same motion language as reels.',
      'Social buttons as secondary outline actions under the main submit.',
      'On mobile, stack to a single column and drop or crop the hero image.',
    ],
  },
  signups: {
    summary: 'Registration flows with progressive fields and strong visual anchors.',
    techniques: [
      'Same floating-label + validation patterns as inputs/logins.',
      'Hero imagery or abstract shapes as the brand plane behind the form.',
      'Step indicators when the form is multi-stage (width/scale on active step).',
    ],
  },
  footers: {
    summary: 'Link grids, newsletter fields, and bottom legal rows.',
    techniques: [
      'Multi-column link groups with a clear hierarchy (product / company / legal).',
      'Newsletter: compact input + button sharing the inputs/buttons motion kit.',
      'Optional full-bleed background image with a dark scrim for contrast.',
    ],
  },
  carousels: {
    summary: 'Sliding galleries — track translate + dots/arrows.',
    techniques: [
      'Horizontal track with `transform: translateX(calc(-100% * index))`.',
      'Dots mirror index; arrows wrap or clamp at ends.',
      'Optional autoplay with `setInterval` cleared on hover/focus.',
      'Snap or gap-based slides; prefer transform over left for performance.',
    ],
  },
  accordions: {
    summary: 'Expand/collapse sections — height/grid-template or max-height tricks.',
    techniques: [
      'Modern approach: `grid-template-rows: 0fr` → `1fr` for smooth height.',
      'Rotate chevron with `transform` when the item is open.',
      'Only one open at a time: close siblings in a few lines of JS.',
    ],
  },
  widgets: {
    summary: 'Compact dashboard chips — stats, weather, progress, mini charts.',
    techniques: [
      'Dense layout with clear number hierarchy and muted labels.',
      'Progress via width % or SVG stroke circles.',
      'Reuse the dark surface + accent purple (#8f44fd) language from reels.',
    ],
  },
  dashboards: {
    summary: 'Composed layouts: sidebar + topbar + card grid.',
    techniques: [
      'CSS grid template areas for shell layout.',
      'Cards as content modules — avoid nesting extra card chrome inside cards.',
      'Shared spacing tokens so widgets align on a rhythm.',
    ],
  },
  parallax: {
    summary: 'Depth on scroll — layered backgrounds moving at different rates.',
    techniques: [
      'Listen to scroll and set `translateY` on layers with different multipliers.',
      'Or use libraries (Ukiyo, Paroller) when demos depend on them.',
      'Keep motion subtle; respect `prefers-reduced-motion` in production.',
    ],
  },
  gsap: {
    summary: 'Timeline-driven motion with GSAP (scroll progress, sequenced reveals).',
    techniques: [
      'Prefer timelines for choreography; scrub with ScrollTrigger when scroll-linked.',
      'Animate transforms/opacity; avoid layout properties when possible.',
      'Kill tweens / revert contexts on teardown in SPA usage.',
    ],
  },
  libraries: {
    summary: 'Third-party UI toys wired into the same dark aesthetic.',
    techniques: [
      'Atropos for tilt cards; Lenis/Ukiyo for smooth scroll/parallax.',
      'Isolate library CSS; theme with the same accent and surface tokens.',
      'Load CDN scripts only in demos that need them.',
    ],
  },
  tables: {
    summary: 'Data tables with sticky headers, row hover, and compact controls.',
    techniques: [
      'Sticky `thead` inside an overflow container.',
      'Zebra or hover row backgrounds at low opacity.',
      'Sort/filter controls as small JS enhancements on static markup.',
    ],
  },
  controls: {
    summary: 'Sliders, steppers, and custom range UI.',
    techniques: [
      'Style `input[type=range]` track/thumb with vendor pseudo-elements.',
      'Or rebuild with pointer events + a filled track width %.',
      'Keep keyboard accessible (`Arrow` keys) when custom.',
    ],
  },
  banners: {
    summary: 'Hero / promo strips with CTA and supporting visual.',
    techniques: [
      'Full-bleed background + constrained content column.',
      'One headline, one sentence, one CTA group — avoid clutter.',
      'Motion: fade/slide content once on load or on scroll into view.',
    ],
  },
  sliders: {
    summary: 'Range and content sliders — drag or click to change value/slide.',
    techniques: [
      'Pointer capture for drag; sync filled track to value.',
      'For content sliders, reuse carousel translate patterns.',
    ],
  },
  scrolling: {
    summary: 'Scroll-driven UI: progress indicators, reveal-on-view, pinned sections.',
    techniques: [
      'Update a progress bar from `scrollY / (scrollHeight - innerHeight)`.',
      'IntersectionObserver for enter/leave class toggles.',
      'Pair with Lenis or native smooth scroll carefully (one source of truth).',
    ],
  },
  tricks: {
    summary: 'One-off CSS tricks and micro-demos.',
    techniques: [
      'Isolate the trick in minimal markup so the technique is obvious.',
      'Document the key property (mask, filter, blend-mode, etc.) in a comment.',
    ],
  },
}

export const collectionHowItWorks: Record<string, HowItWorks> = {
  reels: {
    summary:
      'Instagram-format CSS reels: square “Save These” frames packing 4–6 micro UI ideas per post.',
    techniques: [
      'Shared `styles.css` `.frame` + `.grid` chrome for every reel.',
      'Accent `#8f44fd` on near-black `#14171a` / `#333037` surfaces.',
      'Most demos are CSS-only; JS appears for burgers, inputs, toggles.',
      'Source: github.com/frontend-joe/css-reels (explicitly “built for Instagram”).',
    ],
  },
  'css-components': {
    summary: 'Larger HTML/CSS page sections — logins, footers, cards, sidebars, navbars.',
    techniques: [
      'Full-page layouts rather than reel grids.',
      'Heavy use of background imagery + glass/dark panels.',
      'Mostly CSS; minimal JS.',
    ],
  },
  'css-navbars': {
    summary: 'Dedicated responsive navbar cookbook (15 patterns).',
    techniques: [
      'Desktop flex nav + mobile burger drawer variants.',
      'Indicator/underline animations and sticky translucent bars.',
    ],
  },
  'es6-components': {
    summary: 'Interactive components with vanilla ES6 modules + occasional libraries.',
    techniques: [
      'classList toggles, event delegation, carousel indexes.',
      'GSAP / Atropos / Lenis demos when a library is the point.',
    ],
  },
  'js-components': {
    summary: 'Richer JS-driven UI: sidebars, controls, carousels, GSAP pieces.',
    techniques: [
      'More script per demo than css-components.',
      'Same visual language — dark UI, purple accent, Poppins/Material icons.',
    ],
  },
}

export function howItWorksFor(category: string, collection?: string): HowItWorks {
  const fromCat = categoryHowItWorks[category]
  if (fromCat) return fromCat
  if (collection && collectionHowItWorks[collection]) return collectionHowItWorks[collection]
  return {
    summary: 'Open-source frontendjoe demo — inspect Live / HTML / CSS / JS tabs.',
    techniques: [
      'Start from the HTML structure, then read interaction states (`:hover`, `:checked`, keyframes).',
      'Reuse CSS variables for size, speed, and accent color.',
      'Prefer CSS motion; use JS for state toggles and input helpers.',
    ],
  }
}
