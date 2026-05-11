import React, { Suspense } from "react";
function dynamic(loader, opts) {
  const Lazy = React.lazy(loader);
  const Loading = opts && opts.loading ? opts.loading : null;
  function DynamicWrap(props) {
    return React.createElement(
      Suspense,
      { fallback: Loading ? React.createElement(Loading) : null },
      React.createElement(Lazy, props)
    );
  }
  return DynamicWrap;
}
export {
  dynamic as default
};
