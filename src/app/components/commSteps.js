import { jsx, jsxs } from "react/jsx-runtime";
import Link from "/src/components/Link.js";
const WorkProcess = ({
  steps = [],
  title = "How we do it",
  titleHighlight = "Moving made easy",
  quoteButtonLink = "/finalstep/commercial",
  quoteButtonText = "Get a Quote",
  variant = "primary"
}) => {
  const isWhiteVariant = variant === "white";
  const containerBg = isWhiteVariant ? "bg-[#F8F5EC]" : "bg-primary";
  const titleTextColor = isWhiteVariant ? "text-black" : "text-white";
  return /* @__PURE__ */ jsx("div", { className: `w-full py-6 px-4 mb-10 ${containerBg}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("h2", { className: `text-xl md:text-3xl font-bold md:text-center mb-5 md:mb-10 ${titleTextColor} flex pl-2 md:pl-0`, children: [
      /* @__PURE__ */ jsxs("p", { className: "text-tertiary", children: [
        titleHighlight,
        "\xA0"
      ] }),
      title
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1000px]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-5 left-[14%] right-[14%] border-t-2 border-dashed border-tertiary hidden md:block" }),
      steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden h-8 w-8 md:w-14 md:h-14 bg-tertiary md:rounded-xl md:flex items-center justify-center text-white font-bold text-base md:text-xl z-10 mb-2 md:mb-8", children: step.number }),
        /* @__PURE__ */ jsxs("div", { className: "bg-primary p-6 w-full md:text-center h-full border-1 border-white", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg mb-3 text-white flex md:justify-center", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-tertiary md:hidden", children: [
              index + 1,
              ".\xA0"
            ] }),
            step.title
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-base md:text-base", children: step.description })
        ] })
      ] }, index))
    ] }) }),
    quoteButtonLink && /* @__PURE__ */ jsx("div", { className: "w-full text-center", children: /* @__PURE__ */ jsx(
      Link,
      {
        href: quoteButtonLink,
        className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 mt-10 text-center rainbow-button",
        children: quoteButtonText
      }
    ) })
  ] }) });
};
var commSteps_default = WorkProcess;
export {
  commSteps_default as default
};
