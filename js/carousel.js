// Vanilla port of the prev/next carousel arrows used by Review and
// VideoReview components. Both render the same desktop structure:
//
//   <div class="flex items-center ...">
//     <button class="... mr-4"><svg arrow-left></svg></button>
//     <div class="overflow-hidden flex-1">
//       <div style="transform:translateX(-X%)">
//         <div style="width:33.333%">...slide 0...</div>
//         <div style="width:33.333%">...slide 1...</div>
//         ...
//       </div>
//     </div>
//     <button class="... ml-4"><svg arrow-right></svg></button>
//   </div>
//
// Three slides are visible at once. Initial currentSlide is 2 in the SSR
// (rendered as translateX(-66.666%)). We hook the buttons to mutate the
// transform and clamp at slide-0 (prev) and (total - 3) (next).

export function initCarousels() {
  initDesktopCarousels();
  initMobileCarousels();
}

// ---- Desktop: three-up reviews + video reviews --------------------------

function initDesktopCarousels() {
  const sliders = document.querySelectorAll('[style*="translateX"]');
  for (const slider of sliders) {
    if (slider.dataset.mpCarousel) continue;
    // Each child must be a slide (33.333% wide). If not, skip — this
    // isn't the desktop reviews carousel.
    const items = Array.from(slider.children);
    if (items.length < 4) continue;
    if (!items.every(c => /width:\s*33\.333%/.test(c.getAttribute('style') || ''))) continue;

    const viewport = slider.parentElement;
    if (!viewport || !viewport.classList.contains('overflow-hidden')) continue;

    // Prev/next are the buttons flanking the viewport in the row. Walk
    // left and right past any non-button siblings (placeholder spacers).
    const prev = findButton(viewport, 'previousElementSibling');
    const next = findButton(viewport, 'nextElementSibling');

    slider.dataset.mpCarousel = '1';
    wire(slider, items.length, prev, next);
  }
}

function findButton(start, dir) {
  let n = start[dir];
  while (n && n.tagName !== 'BUTTON') n = n[dir];
  return n;
}

function wire(slider, itemCount, prev, next) {
  const visibleCount = 3;
  let current = readCurrent(slider) ?? 0;

  function paint() {
    slider.style.transform = `translateX(-${(current * 33.333).toFixed(3)}%)`;
    if (prev) prev.style.visibility = current > 0 ? 'visible' : 'hidden';
    if (next) next.style.visibility = current + visibleCount < itemCount ? 'visible' : 'hidden';
  }

  if (prev) prev.addEventListener('click', (e) => {
    e.preventDefault();
    if (current > 0) { current--; paint(); }
  });
  if (next) next.addEventListener('click', (e) => {
    e.preventDefault();
    if (current + visibleCount < itemCount) { current++; paint(); }
  });

  paint();
}

function readCurrent(slider) {
  const m = (slider.getAttribute('style') || '').match(/translateX\(-([\d.]+)%\)/);
  if (!m) return null;
  return Math.round(parseFloat(m[1]) / 33.333);
}

// ---- Mobile: one-up review + video review carousels ---------------------
//
// Different DOM shape from desktop: the React useEffect sets
// translateX(-${currentSlide * 103}%) after mount, so the SSR has no
// inline transform yet — we have to detect by class and apply the
// initial position ourselves. Behavior: wraparound on next/prev, jump
// on pagination-dot click, swipe gestures for touch.

function initMobileCarousels() {
  const sliders = document.querySelectorAll(
    'div.flex.w-full.transition-transform.gap-x-2',
  );
  for (const slider of sliders) {
    if (slider.dataset.mpCarousel) continue;
    const items = Array.from(slider.children);
    if (items.length < 2) continue;
    // Slide items should be full-width — same heuristic as the React source
    // (.min-w-full .w-full .flex-shrink-0).
    if (!items.every(c => c.classList.contains('min-w-full'))) continue;

    slider.dataset.mpCarousel = '1';
    wireMobile(slider, items.length);
  }
}

function wireMobile(slider, itemCount) {
  // Initial slide. React's useState starts at 2 (third item).
  let current = 2;
  if (current >= itemCount) current = 0;

  // Find the navigation controls block: a sibling flex row containing
  // h-10 w-10 buttons (the round mobile arrows) and h-2 w-2 dots. The
  // controls live below the slider's wrapping container, so walk up.
  const controls = findMobileControls(slider);
  const prevBtn = controls?.querySelector('button[aria-label="Previous slide"]');
  const nextBtn = controls?.querySelector('button[aria-label="Next slide"]');
  const dots = controls ? Array.from(controls.querySelectorAll('div.h-2.w-2.rounded-full')) : [];

  function paint() {
    // 103% rather than 100% to account for the gap-x-2 between slides.
    slider.style.transform = `translateX(-${(current * 103).toFixed(3)}%)`;
    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('bg-tertiary', active);
      d.classList.toggle('bg-primary', !active);
      d.classList.toggle('bg-opacity-50', !active);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    current = current === 0 ? itemCount - 1 : current - 1;
    paint();
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    current = (current + 1) % itemCount;
    paint();
  });
  dots.forEach((d, i) => d.addEventListener('click', (e) => {
    e.preventDefault();
    current = i;
    paint();
  }));

  // Touch swipe (>75px in either direction triggers a slide).
  let touchStart = 0, touchEnd = 0;
  slider.addEventListener('touchstart', (e) => { touchStart = e.targetTouches[0].clientX; }, { passive: true });
  slider.addEventListener('touchmove',  (e) => { touchEnd   = e.targetTouches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   () => {
    if (touchEnd === 0) return;
    if (touchStart - touchEnd > 75) {
      current = (current + 1) % itemCount;
      paint();
    } else if (touchEnd - touchStart > 75) {
      current = current === 0 ? itemCount - 1 : current - 1;
      paint();
    }
    touchStart = 0; touchEnd = 0;
  }, { passive: true });

  paint();
}

// The mobile slider sits inside a wrapper that's a sibling of the
// nav-controls row. Walk up until we find an ancestor that contains a
// button[aria-label="Previous slide"]; that ancestor is the wrapper,
// and the nav-controls row is one of its descendants.
function findMobileControls(slider) {
  let n = slider.parentElement;
  for (let i = 0; i < 6 && n; i++) {
    const prev = n.querySelector('button[aria-label="Previous slide"]');
    if (prev) return prev.parentElement;
    n = n.parentElement;
  }
  return null;
}
