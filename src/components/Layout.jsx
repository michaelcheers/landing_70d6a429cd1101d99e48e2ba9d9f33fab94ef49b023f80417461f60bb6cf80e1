import React, { Suspense, lazy } from 'react';
import Header from '/src/app/components/header.jsx';

// Footer is lazy-loaded — it lives well below the fold on most pages and the
// original Next code dynamic-imported it.
const Footer = lazy(() => import('/src/app/components/footer.jsx'));

// Inline spinner fallback. Reuses .mp-spinner / .mp-loader-inline from
// index.html so we get a consistent loading visual everywhere.
function PageLoading() {
  return (
    <div className="mp-loader-inline" role="status" aria-label="Loading">
      <div className="mp-spinner" />
    </div>
  );
}

// Replaces the Next.js app/layout.jsx that the conversion dropped. Header is
// fixed-positioned (matching the original site's behavior — the city pages
// already include mt-20 on hero content to make room for a fixed header).
export default function Layout({ children }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <Suspense fallback={<PageLoading />}>
        {children}
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
