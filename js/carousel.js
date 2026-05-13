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
    const row = viewport.parentElement;
    if (!row) continue;

    // Prev/next are the buttons flanking the viewport in the row. Walk
    // left and right past any non-button siblings (placeholder spacer
    // divs).
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
