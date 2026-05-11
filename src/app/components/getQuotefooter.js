import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Img_1 from "/src/images/example-4.webp.js";
import GetQuote from "/src/app/components/getQuote.js";
function GetQuoteFooter({ section = "moving" }) {
  const isResidential = section === "moving" || section === "vancouver-moving" || section === "vancouver-storage" || section === "storage" || section === "ottawa-moving" || section === "ottawa-storage" || section === "calgary-moving" || section === "calgary-storage" || section === "edmonton-moving" || section === "edmonton-storage";
  const roundingClasses = isResidential ? {
    leftSide: "md:rounded-l-lg rounded-t-lg md:rounded-t-none",
    rightSide: "md:rounded-r-lg rounded-b-lg md:rounded-bl-none"
  } : {
    leftSide: "",
    rightSide: ""
  };
  const rightSideBgColor = isResidential ? "bg-primary text-black" : "bg-[#F8F5EC] text-black";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-10 gap-0", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-[1250px] flex flex-col md:flex-row", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `text-primary p-6 md:p-12 flex flex-col justify-center md:w-1/2 ${roundingClasses.leftSide} relative overflow-hidden`,
        style: {
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${Img_1.src}")`,
          backgroundSize: "cover",
          backgroundPosition: "0% 0%"
        },
        children: /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold py-15 leading-tight text-white text-center ", children: "Get Your Free Quote Now!" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `${rightSideBgColor}  ${roundingClasses.rightSide}`, children: /* @__PURE__ */ jsx(GetQuote, { from: section }) })
  ] }) }) });
}
export {
  GetQuoteFooter as default
};
