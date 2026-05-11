function makeFont() {
  return function(_opts) {
    return { className: "", style: {}, variable: "" };
  };
}
const Libre_Baskerville = makeFont();
const Inter = makeFont();
const Roboto = makeFont();
const Open_Sans = makeFont();
const Geist = makeFont();
const Geist_Mono = makeFont();
var font_default = makeFont();
export {
  Geist,
  Geist_Mono,
  Inter,
  Libre_Baskerville,
  Open_Sans,
  Roboto,
  font_default as default
};
