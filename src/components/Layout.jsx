import React, { Suspense } from 'react';

// In the original Next app, each page.tsx renders its own Header/Footer.
// Layout is just a Suspense boundary + outer chrome.
export default function Layout({ children }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
