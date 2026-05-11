import React, { Suspense } from 'react';

// In the original Next app, each page.tsx renders its own Header/Footer.
// Layout is just a Suspense boundary + outer chrome.
export default function Layout({ children }) {
  return (
    <Suspense fallback={<div style={{padding:40,textAlign:'center'}}>Loading…</div>}>
      {children}
    </Suspense>
  );
}
