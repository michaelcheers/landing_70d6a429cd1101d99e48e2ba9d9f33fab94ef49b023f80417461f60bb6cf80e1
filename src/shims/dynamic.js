import React, { Suspense } from 'react';

// next/dynamic replacement. Returns a lazy component that resolves the
// supplied loader (which should return a promise of { default: Component }).
export default function dynamic(loader, opts) {
  const Lazy = React.lazy(loader);
  const Loading = opts && opts.loading ? opts.loading : null;
  function DynamicWrap(props) {
    return React.createElement(Suspense, { fallback: Loading ? React.createElement(Loading) : null },
      React.createElement(Lazy, props));
  }
  return DynamicWrap;
}
