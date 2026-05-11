import React, { useContext } from 'react';
import { useRouter } from '../router/Router.jsx';

// Drop-in for next/link. Renders <a> and intercepts clicks for SPA navigation.
export default function Link({ href, children, replace, scroll, prefetch, onClick, ...rest }) {
  const router = useRouter();
  const handle = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    const url = typeof href === 'string' ? href : (href && href.pathname) || '/';
    if (/^(https?:)?\/\//.test(url) || url.startsWith('mailto:') || url.startsWith('tel:')) return;
    e.preventDefault();
    if (replace) router.replace(url);
    else router.push(url);
  };
  const hrefStr = typeof href === 'string' ? href : (href && href.pathname) || '/';
  return <a href={hrefStr} onClick={handle} {...rest}>{children}</a>;
}
