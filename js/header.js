// Mobile header hamburger menu. The desktop dropdown is pure CSS hover.
// The mobile dropdown was React-conditional in the original; the SSR'd HTML
// never includes it, so we construct it on first toggle.

const MOBILE_MENU_HTML = `
<div id="mp-mobile-menu" class="bg-primary text-white ml-4 px-4 py-2 border-1 border-white rounded-md absolute z-50 w-9/10 pb-4" style="display:none;left:0;right:0;">
  <div class="mb-4">
    <div class="font-bold border-b-2 pb-2">Services</div>
    <div class="mt-3 mb-3">
      <div class="font-semibold text-sm text-gray-200 mb-2">Residential</div>
      <ul class="ml-4 space-y-2 flex flex-col">
        <a href="/service/residential">Residential Moving</a>
        <a href="/service/packing">Packing</a>
        <a href="/service/storage">Storage</a>
      </ul>
    </div>
    <div class="border-t border-gray-400 pt-3">
      <div class="font-semibold text-sm text-gray-200 mb-2">Commercial</div>
      <div class="mb-2"><a href="/commercial" class="font-bold ml-4">Commercial Overview</a></div>
      <ul class="ml-4 space-y-2 flex flex-col">
        <a href="/service/warehouse">Warehouse</a>
        <a href="/service/office">Office</a>
        <a href="/service/specialEquipment">Special Equipment</a>
        <a href="/service/art">Art</a>
        <a href="/service/lastmile">Last Mile</a>
      </ul>
    </div>
  </div>
  <div class="mb-4 border-t border-gray-400 pt-3"><a href="/areas-of-service" class="font-bold">Areas of Service</a></div>
  <div class="mb-4"><a href="/reviews" class="font-bold">Reviews</a></div>
  <div class="mb-4"><a href="/blog" class="font-bold">Blogs</a></div>
  <div><a href="/company" class="font-bold">Company</a></div>
</div>`;

// The hamburger is the last <button> in the mobile header that contains an
// SVG (Bars4Icon). Identify it by being inside a `.md:hidden` header and
// having no text content. Simpler heuristic: find the only button with a
// <svg> of width 8 (the h-8 w-8 Bars4Icon).
function findHamburger() {
  const buttons = document.querySelectorAll('button');
  for (const btn of buttons) {
    if (btn.dataset.mpRole === 'hamburger') return btn;
    const svg = btn.querySelector('svg.h-8.w-8');
    if (svg && !btn.textContent.trim()) {
      btn.dataset.mpRole = 'hamburger';
      return btn;
    }
  }
  return null;
}

export function initHeader() {
  const btn = findHamburger();
  if (!btn) return;

  let menu = null;
  let open = false;

  function ensureMenu() {
    if (menu) return menu;
    const wrap = document.createElement('div');
    wrap.innerHTML = MOBILE_MENU_HTML.trim();
    menu = wrap.firstChild;
    // Insert right after the mobile header div (sibling of hamburger's parent).
    const header = btn.closest('.md\\:hidden') || btn.parentElement;
    header.parentElement.insertBefore(menu, header.nextSibling);
    return menu;
  }

  function setOpen(v) {
    open = v;
    if (open) ensureMenu();
    if (menu) menu.style.display = open ? '' : 'none';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!open);
  });

  document.addEventListener('mousedown', (e) => {
    if (!open) return;
    if (menu && menu.contains(e.target)) return;
    if (btn.contains(e.target)) return;
    setOpen(false);
  });
}
