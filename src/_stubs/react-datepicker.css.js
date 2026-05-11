// CSS link-tag injector. Idempotent.
const u = "https://esm.sh/react-datepicker@8.3.0/dist/react-datepicker.css";
if (typeof document !== 'undefined' && !document.querySelector('link[data-mp-css="' + u + '"]')) {
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = u;
  l.setAttribute('data-mp-css', u);
  document.head.appendChild(l);
}
export default null;
