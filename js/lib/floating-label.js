// Shim for the CustomInput pattern from the original Next app:
//
//   <input placeholder="" ... />
//   <div class="… pointer-events-none …">Enter Email <span>*</span></div>
//
// The React component hid that sibling div whenever the input was focused
// or had a value. The SSR'd HTML always renders it visible (since the
// React initial state was `!hasValue && !isFocused === true`). Without
// this shim the fake-placeholder text overlays the user's typed input.

export function initFloatingLabels() {
  const inputs = document.querySelectorAll('input[placeholder=""], textarea[placeholder=""]');
  for (const input of inputs) {
    // Find the sibling div that acts as the fake placeholder. Walk forward
    // through immediate siblings and, if needed, the parent's next-sibling
    // chain — the original markup nests the input deeper than the label.
    const label = findLabel(input);
    if (!label) continue;

    function sync() {
      const focused = document.activeElement === input;
      const hasValue = input.value.length > 0;
      label.style.display = (!focused && !hasValue) ? '' : 'none';
    }

    input.addEventListener('focus', sync);
    input.addEventListener('blur', sync);
    input.addEventListener('input', sync);
    sync();
  }
}

function findLabel(input) {
  // Look in the input's parent chain for an absolutely-positioned div with
  // pointer-events-none that comes after the input in document order.
  let node = input;
  for (let i = 0; i < 5 && node; i++) {
    // Check immediate next siblings first.
    let sib = node.nextElementSibling;
    while (sib) {
      if (sib.matches?.('div.pointer-events-none, div[class*="pointer-events-none"]')) return sib;
      sib = sib.nextElementSibling;
    }
    node = node.parentElement;
  }
  return null;
}
