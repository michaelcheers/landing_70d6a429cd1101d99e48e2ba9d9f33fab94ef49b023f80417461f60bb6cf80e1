import React, { Suspense, lazy } from 'react';
import Header from '/src/app/components/header.jsx';

// Footer is lazy-loaded — it lives well below the fold on most pages and the
// original Next code dynamic-imported it. Keeping that here avoids paying for
// it on first paint.
const Footer = lazy(() => import('/src/app/components/footer.jsx'));

// Inline spinner fallback. Reuses the .mp-spinner / .mp-loader-inline CSS
// defined in index.html so we get the same visual everywhere a Suspense
// boundary fires.
function PageLoading() {
  return (
    <div className="mp-loader-inline" role="status" aria-label="Loading">
      <div className="mp-spinner" />
    </div>
  );
}

// In the original Next app, the page chrome (Header + Footer) lived in
// app/layout.jsx and wrapped every route automatically. This Layout replicates
// that so individual page files don't need to render Header/Footer themselves.
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoading />}>
        {children}
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
