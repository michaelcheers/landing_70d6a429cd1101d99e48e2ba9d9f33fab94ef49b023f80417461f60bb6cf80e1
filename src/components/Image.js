import { jsx } from "react/jsx-runtime";
function Image({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  priority,
  quality,
  placeholder,
  blurDataURL,
  loader,
  fill,
  sizes,
  loading,
  unoptimized,
  ...rest
}) {
  const finalStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style;
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: typeof src === "string" ? src : src && src.src || "",
      alt,
      width,
      height,
      className,
      style: finalStyle,
      loading: loading || (priority ? "eager" : "lazy"),
      decoding: "async",
      sizes,
      ...rest
    }
  );
}
export {
  Image as default
};
