import { jsx, jsxs } from "react/jsx-runtime";
import GetQuote from "/src/app/components/getQuote.js";
import Review from "/src/app/components/review.js";
import reviewtagleft from "/src/images/reviewtagleft.png.js";
import reviewtagright from "/src/images/reviewtagright.png.js";
import Link from "/src/components/Link.js";
import Image from "/src/components/Image.js";
import { Libre_Baskerville } from "/src/shims/font.js";
import Heart from "/src/images/heart-res.webp.js";
import MovingServices from "/src/app/components/service.js";
import dynamic from "/src/shims/dynamic.js";
import LogoCarousel from "/src/app/components/logo.js";
import GetQuoteFooter from "/src/app/components/getQuotefooter.js";
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
  display: "swap"
});
const Footer = dynamic(() => import("/src/app/components/calgary/calFooter.js"));
const PapaAdv = dynamic(() => import("/src/app/components/papaadv.js"));
const MovingServicesGrid = dynamic(() => import("/src/app/components/movingService.js"));
const CurvedStepsFlowFinal = dynamic(() => import("/src/app/components/curveStep.js"));
const VideoReview = dynamic(() => import("/src/app/components/videoReview.js"));
function Home() {
  const questions = [
    "Are you licensed and insured?",
    "When should I start planning for my move?",
    "Do you offer storage services?",
    "What if my moving date changes?"
  ];
  const answers = [
    "Yes, Moving Papa is fully licensed and insured to ensure your peace of mind. We follow all industry regulations and take extra care to protect your belongings and property throughout the entire moving process.",
    "It's best to start planning your move as early as possible, ideally 4-6 weeks in advance. This gives you plenty of time to organize, pack, and secure your preferred moving date. However, if you need a last-minute move, don't worry\u2014Moving Papa can still help with short-notice relocations!",
    "Absolutely! We offer secure, climate-controlled storage options for both short-term and long-term needs. Whether you're between homes or need extra space, we've got you covered with flexible storage solutions tailored to your schedule.",
    "We understand plans can change. With Moving Papa, you can adjust your moving date hassle-free. Just give us a heads-up, and we'll reschedule your move at no extra cost, subject to availability."
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#F8F5EC]", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full z-10000" }),
    /* @__PURE__ */ jsx("div", { className: "w-full hidden md:flex flex-col items-center relative mt-20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1400px] rounded-4xl flex flex-col justify-center items-center py-10 md:pt-5 md:pb-20 mx-2", children: [
      /* @__PURE__ */ jsx("div", { className: " font-bold flex flex-col items-center text-primary", children: /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl text-center ", children: "There are lots of moving companies" }),
        /* @__PURE__ */ jsxs("div", { className: "flex text-3xl md:text-4xl justify-center", children: [
          "But ",
          /* @__PURE__ */ jsx("p", { className: "text-tertiary", children: "\xA0only one Moving Papa" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-base md:text-lg font-regular mt-4 text-center", children: "Moving Papa provides complete moving, packing, unpacking and storage services" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-10/11 max-w-[1200px] md:flex md:mt-5 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center w-18/40", children: /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Image, { src: Heart, alt: "alt" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-20/40", children: /* @__PURE__ */ jsx(GetQuote, { from: "calgary-moving" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:hidden pt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center font-bold text-2xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl text-center ", children: "There are lots of moving companies" }),
          /* @__PURE__ */ jsxs("div", { className: "flex text-xl  justify-center", children: [
            "But ",
            /* @__PURE__ */ jsx("p", { className: "text-tertiary", children: "\xA0only one Moving Papa" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base font-regular", children: "Moving Papa provides complete moving, packing, unpacking and storage services" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-center my-8", children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-15 aspect-[420/740] mr-2", children: /* @__PURE__ */ jsx(Image, { src: reviewtagleft, alt: "Review tag left", fill: true, priority: true, sizes: "" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative h-15", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "w-full h-full flex bg-white px-2  pt-2  rounded-md border-t-1 border-primary pr-3",
            style: {
              borderTop: "4px solid #34A853",
              boxShadow: "-6.552px -3.276px 26.208px rgba(0, 0, 0, 0.08), 32.76px 22.932px 65.521px rgba(0, 0, 0, 0.08)"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "38", height: "38", viewBox: "0 0 34 34", fill: "none", children: [
                /* @__PURE__ */ jsx("path", { d: "M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z", fill: "#4285F4" }),
                /* @__PURE__ */ jsx("path", { d: "M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z", fill: "#34A853" }),
                /* @__PURE__ */ jsx("path", { d: "M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z", fill: "#FBBC05" }),
                /* @__PURE__ */ jsx("path", { d: "M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z", fill: "#EA4335" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-[12px] pl-3 font-bold", children: [
                /* @__PURE__ */ jsx("div", { className: "", children: "Google Top Rated Service" }),
                /* @__PURE__ */ jsxs("div", { className: "text-[#FEA500] text-base flex font-bold", children: [
                  "4.9",
                  /* @__PURE__ */ jsx("div", { className: "flex justify-center pl-2", children: [...Array(5)].map((_, index) => /* @__PURE__ */ jsx(
                    Image,
                    {
                      src: "/star.svg",
                      alt: "Star Rating",
                      width: 20,
                      height: 20
                    },
                    index
                  )) })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "relative h-15 aspect-[420/740] ml-2", children: /* @__PURE__ */ jsx(Image, { src: reviewtagright, alt: "Review tag right", fill: true, priority: true, sizes: "100vw" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-full", children: /* @__PURE__ */ jsx(GetQuote, { from: "calgary-moving" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-center mt-6 md:mt-0", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block w-7xl", children: /* @__PURE__ */ jsxs("div", { className: " pb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "ml-2  pb-2 font-bold text-[16px] md:text-[22px] border-b-1 md:flex text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl md:text-3xl font-bold text-primary", children: "Hear from our Customers, \xA0" }),
          /* @__PURE__ */ jsx("div", { className: "text-xl md:text-3xl font-bold text-tertiary", children: "the heart of our Success." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 mt-4 md:mt-8 gap-1 md:gap-x-4 font-bold  md:w-8/10 mx-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-primary pl-2 flex items-center rounded-lg ", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg", children: /* @__PURE__ */ jsx(Image, { src: "/images/vcaCanada-w.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[14px] md:text-[18px] font-regular text-primary", children: "VCA Canada" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 pl-2 flex items-center  h-[60px] rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg", children: /* @__PURE__ */ jsx(Image, { src: "/images/costco-w.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]", children: "Costco Wholesale" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 pl-2 flex items-center h-[60px] rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg", children: /* @__PURE__ */ jsx(Image, { src: "/images/Loreal-w.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]", children: "L'Oreal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 pl-2 flex items-center  h-[60px]  rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg", children: /* @__PURE__ */ jsx(Image, { src: "/images/theRirtz-w.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]", children: "The Ritz-Carlton" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(LogoCarousel, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center py-5", children: /* @__PURE__ */ jsx(Review, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center pt-5 md:pb-10 bg-primary", children: /* @__PURE__ */ jsx(VideoReview, { from: "/calgary/finalstep/residential" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full pt-8 ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold text-primary mb-6", children: [
          "Trust. ",
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "That's Moving Papa" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-tertiary mx-auto mb-8" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-700 max-w-4xl mx-auto leading-relaxed", children: "Moving Papa has built its reputation on one simple principle: earning and keeping your trust. Every move, every interaction, every promise we make is backed by our unwavering commitment to excellence." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Reliability You Can Count On" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "When we say we'll be there at 9 AM, we're there at 9 AM. When we quote a price, that's what you pay. No surprises, no excuses, just dependable service every time." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Your Belongings Protected" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "Every item is treated like it's our own. Fully licensed, insured, and equipped with the best materials and techniques to ensure your precious belongings arrive exactly as they left." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl  font-bold text-primary mb-4", children: "Proven Track Record" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "Over 1,000 successful moves and a 4.9-star Google rating don't happen by accident. They're the result of consistently delivering excellence, one move at a time." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MovingServices, { from: "calgary" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-white", children: /* @__PURE__ */ jsx(PapaAdv, { from: "residential" }) }),
    /* @__PURE__ */ jsxs("div", { className: "my-5 mb-15", children: [
      /* @__PURE__ */ jsx(CurvedStepsFlowFinal, {}),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: "/calgary/finalstep/residential", className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg", children: "Get a Quote" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my-10 mt-8", children: /* @__PURE__ */ jsx(MovingServicesGrid, { from: "calgary" }) }),
    /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex justify-center bg-cover bg-center md:w-7xl h-[369px] relative rounded-lg mx-4 md:mx-0",
          style: {
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/Rectangle_4.webp')"
          },
          children: /* @__PURE__ */ jsx("div", { className: "flex items-start text-white pt-10 pl-5 md:pl-10 md:w-[1254px]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-4xl font-bold", children: "Leave No Trace" }),
            /* @__PURE__ */ jsx("h1", { className: `${libreBaskerville.className} italic text-2xl md:text-4xl`, children: "Behind." }),
            /* @__PURE__ */ jsx("span", { className: "text-base font-regular mt-4 text-start md:w-[490px] pr-6 md:pr-0", children: "At Moving Papa, we believe every move should leave the smallest footprint possible. We use eco-friendly materials, efficient routes, and sustainable practices to reduce waste and emissions \u2014 without compromising service." })
          ] }) })
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-5", children: [
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold md:w-[1250px] pt-5 md:pt-10 text-primary text-center", children: "Frequently Asked Questions" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center py-5 md:py-10 w-9/10 md:w-7xl", children: /* @__PURE__ */ jsx("div", { className: "w-full flex-col justify-start", children: questions.map((question, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "mb-4 bg-primary text-white border border-black rounded-lg overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "accordion-item rounded-lg", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", id: `faq-${index}`, className: "accordion-toggle hidden" }),
              /* @__PURE__ */ jsxs("div", { className: "accordion-content-wrapper", children: [
                /* @__PURE__ */ jsxs("label", { htmlFor: `faq-${index}`, className: "accordion-header font-bold", children: [
                  /* @__PURE__ */ jsx("span", { className: "accordion-icon plus text-tertiary", children: "+" }),
                  /* @__PURE__ */ jsx("span", { className: "accordion-icon minus text-tertiary", children: "\u2212" }),
                  /* @__PURE__ */ jsx("span", { className: "font-regular", children: question })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "accordion-content font-regular", children: answers[index] })
              ] })
            ] })
          },
          index
        )) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(GetQuoteFooter, { section: "calgary-moving" }),
    /* @__PURE__ */ jsx("div", { className: "px-1 bg-[#06170e]" })
  ] });
}
export {
  Home as default
};
