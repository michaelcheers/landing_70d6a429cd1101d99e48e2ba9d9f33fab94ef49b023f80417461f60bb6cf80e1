import { useEffect } from 'react';

// Imperatively sets document.title, meta description, OG tags, and canonical
// based on per-route metadata supplied by routes.js.
export default function Head({ meta, pathname }) {
  useEffect(() => {
    const m = meta || {};
    if (m.title) document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('name', 'keywords', m.keywords);
    setMeta('property', 'og:title', m.ogTitle || m.title);
    setMeta('property', 'og:description', m.ogDescription || m.description);
    setMeta('property', 'og:url', 'https://www.movingpapa.com' + pathname);
    setMeta('property', 'og:type', m.ogType || 'website');
    setMeta('property', 'og:image', m.ogImage);
    setMeta('name', 'twitter:card', m.twitterCard || 'summary_large_image');
    setMeta('name', 'twitter:title', m.twitterTitle || m.title);
    setMeta('name', 'twitter:description', m.twitterDescription || m.description);
    setCanonical(m.canonical || ('https://www.movingpapa.com' + pathname));
  }, [meta, pathname]);
  return null;
}

function setMeta(attr, name, value) {
  if (!value) return;
  let el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}
