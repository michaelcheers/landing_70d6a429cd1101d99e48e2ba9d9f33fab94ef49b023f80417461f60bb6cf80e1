import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import Link from "/src/components/Link.js";
import heart from "/src/images/example-3.webp.js";
const Schedule = ({
  title = "Virtual Estimates",
  image = heart,
  // Default image path, replace with your image
  description1 = "Our goal is to make moving as simple as possible. We offer free virtual estimates to give you an accurate quote without having to schedule an in-home visit.",
  description2 = "If you're ready to get started with your move, click the button below to request your free video estimate today.",
  buttonText = "Schedule Video Estimate",
  buttonLink = "https://calendly.com/hello-movingpapa/30min"
}) => {
  return /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center md:py-8 px-5 mt-4 md:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[1250px] flex flex-col md:flex-row items-center gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 relative h-[300px] md:h-[450px] rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: image,
        alt: "Moving professional",
        fill: true,
        className: "object-cover rounded-4xl",
        priority: true,
        style: {
          // Move image much higher up for mobile (-2000%)
          objectPosition: "50% -1000%",
          transform: "scale(1.00)"
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 flex flex-col justify-center md:ml-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-3xl font-bold text-white mb-6 text-center md:text-start", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-base text-white mb-6", children: description1 }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-regular text-white mb-8", children: description2 }),
      /* @__PURE__ */ jsx(Link, { href: buttonLink, children: /* @__PURE__ */ jsx("button", { className: "rainbow-button text-white font-bold py-3 px-6 !rounded-lg w-full md:w-auto md:px-10 flex justify-center items-center", children: buttonText }) })
    ] })
  ] }) });
};
var schedule_default = Schedule;
export {
  schedule_default as default
};
