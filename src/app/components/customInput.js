import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
const CustomInput = ({ type, id, name, value, onChange, placeholder, required, icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    onChange(e);
    setHasValue(e.target.value.length > 0);
  };
  const placeholderText = placeholder.replace(" *", "");
  const hasAsterisk = placeholder.includes("*");
  return /* @__PURE__ */ jsx("div", { className: "relative w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative items-center flex w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 z-10", children: icon }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        id,
        name,
        value,
        onChange: handleChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        className: "floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10 w-full",
        placeholder: "",
        required
      }
    ),
    !hasValue && !isFocused && /* @__PURE__ */ jsxs("div", { className: "absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-300", children: [
      /* @__PURE__ */ jsx("span", { children: placeholderText }),
      hasAsterisk && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-1", children: "*" })
    ] })
  ] }) });
};
var customInput_default = CustomInput;
export {
  customInput_default as default
};
