// next/font shim. Returns a no-op font object with empty className.
// To actually load a Google font, include a <link> in index.html.
function makeFont() {
  return function (_opts) {
    return { className: '', style: {}, variable: '' };
  };
}

export const Libre_Baskerville = makeFont();
export const Inter = makeFont();
export const Roboto = makeFont();
export const Open_Sans = makeFont();
export const Geist = makeFont();
export const Geist_Mono = makeFont();
export default makeFont();
