import { jsx } from "react/jsx-runtime";
import { useRouter } from "/src/router/Router.js";
function Link({ href, children, replace, scroll, prefetch, onClick, ...rest }) {
  const router = useRouter();
  const handle = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    const url = typeof href === "string" ? href : href && href.pathname || "/";
    if (/^(https?:)?\/\//.test(url) || url.startsWith("mailto:") || url.startsWith("tel:")) return;
    e.preventDefault();
    if (replace) router.replace(url);
    else router.push(url);
  };
  const hrefStr = typeof href === "string" ? href : href && href.pathname || "/";
  return /* @__PURE__ */ jsx("a", { href: hrefStr, onClick: handle, ...rest, children });
}
export {
  Link as default
};
