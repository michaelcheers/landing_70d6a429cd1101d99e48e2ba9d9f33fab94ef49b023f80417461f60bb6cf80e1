import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import "/src/app/landingcomm.css.js";
import { Libre_Baskerville } from "/src/shims/font.js";
import dynamic from "/src/shims/dynamic.js";
import CommGetQuote from "/src/app/components/commGetQuote.js";
import StepsComm from "/src/app/components/commSteps.js";
import heart from "/src/images/heart.webp.js";
import PapaAdv from "/src/app/components/papaadv.js";
import CommercialServices from "/src/app/components/commService.js";
const Review = dynamic(() => import("/src/app/components/commReview.js"), {
  loading: () => /* @__PURE__ */ jsx("div", { className: "h-40 w-full bg-gray-100" })
});
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
  display: "swap"
});
async function Home() {
  const questions = [
    "Can you move our business outside of regular hours?",
    "How do you handle sensitive equipment and technology?",
    "Do you offer packing and unpacking services for offices?",
    "What if our move dates change or the project is delayed?"
  ];
  const answers = [
    "Absolutely. We offer flexible scheduling, including evenings, weekends, and holidays, to minimize disruption to your operations.",
    "We treat sensitive equipment and technology with the highest level of care. Before moving, we create a customized plan to secure and protect every item, using proper packing materials, padding, and handling techniques. Our team is trained in transporting everything from servers and computers to medical and manufacturing equipment, ensuring it arrives safely and in perfect working condition. If needed, we also offer onsite visits before moving day to assess the best approach for your space and equipment.",
    "Yes. We can pack, label, transport, and unpack everything from desks and files to electronics, ensuring a seamless transition into your new space.",
    "We understand that commercial projects can shift. Just give us as much notice as possible, and we&apos;ll adjust your moving schedule at no additional cost, based on availability."
  ];
  const steps = [
    {
      number: 1,
      title: "Start with a Quote",
      description: "Tell us about your move, and we'll provide a clear, upfront quote based on your specific needs. No hidden fees, no surprises \u2014 just honest pricing you can count on."
    },
    {
      number: 2,
      title: "Plan Every Detail",
      description: "We work closely with your team to plan the move from start to finish. That includes creating inventory maps, labeling, coordinating timelines, and making sure every piece of the move is organized before moving day."
    },
    {
      number: 3,
      title: "Move and Settle In",
      description: "On moving day, our trained crew handles all the heavy lifting. We pack, transport, unload, and help set up your new space \u2014 so you can get back to business with zero headaches."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center pt-[60px] bg-primary", children: /* @__PURE__ */ jsxs("div", { className: "w-full px-3 md:px-0 md:w-[1440px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full pb-5 grid grid-cols-1 md:grid-cols-2 md:pl-5 md:pt-10 ", children: [
        /* @__PURE__ */ jsx("div", { className: "pb-0 mb-0", children: /* @__PURE__ */ jsxs("div", { className: "cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-white font-bold text-2xl md:text-[32px]", children: [
            "Commercial Moving ",
            /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "You Can Rely On" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-white w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] ", children: [
            "When you're moving a business, the stakes are high. You need a team that's organized, dependable, and committed to protecting what you've built.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "That's where Moving Papa comes in"
          ] }),
          /* @__PURE__ */ jsx(CommGetQuote, { from: "vancouver-home" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-end", children: /* @__PURE__ */ jsx("div", { className: "flex items-end h-8/10 w-8/10", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: heart,
            alt: "Rectangle Photoroom",
            priority: true
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-white pb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-white ml-2 md:ml-25 w-4/5 pb-2 font-bold text-[16px] md:text-[22px] border-b-1", children: "Trusted By Industry Leading Brands" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row mx-2 md:ml-25 mt-4 md:mt-8 gap-3 md:gap-x-4 font-bold pr-2 md:pr-0 md:w-8/10", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#051A12] border-1 pl-2 flex items-center w-full md:w-1/4 h-[60px] ", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-white w-[40px] h-[40px] relative", children: /* @__PURE__ */ jsx(Image, { src: "/images/vcaCanada.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[16px] md:text-[14px]", children: "VCA Canada" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#051A12] border-1 pl-2 flex items-center w-full md:w-1/4 h-[60px] md:h-[60px]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-white w-[40px] h-[40px] relative", children: /* @__PURE__ */ jsx(Image, { src: "/images/costco.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[16px] md:text-[14px]", children: "Costco Wholesale" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#051A12] border-1 pl-2 flex items-center w-full md:w-1/4 h-[60px] md:h-[60px]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-white w-[40px] h-[40px] relative", children: /* @__PURE__ */ jsx(Image, { src: "/images/Loreal.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[16px] md:text-[14px]", children: "L'Oreal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#051A12] border-1 pl-2 flex items-center w-full md:w-1/4 h-[60px] md:h-[60px]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-white w-[40px] h-[40px] relative", children: /* @__PURE__ */ jsx(Image, { src: "/images/theRirtz.png", alt: "", fill: true, sizes: "100%", style: { objectFit: "contain" } }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-3 md:ml-2 text-[16px] md:text-[14px]", children: "The Ritz-Carlton" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CommercialServices, { from: "vancouver" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-[#f2f2f2] ", children: /* @__PURE__ */ jsx(Review, { from: "vancouver" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(PapaAdv, { from: "commercial" }) }),
    /* @__PURE__ */ jsx(StepsComm, { steps, variant: "primary", quoteButtonLink: "/vancouver/finalstep/commercial" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex justify-center bg-cover bg-center max-w-[1254px] h-[369px] relative",
        style: {
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/Rectangle_4.webp')"
        },
        children: /* @__PURE__ */ jsx("div", { className: "flex items-start text-white pt-10 pl-5 md:pl-10 md:w-[1254px]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-4xl font-bold", children: "Leave No Trace" }),
          /* @__PURE__ */ jsx("h1", { className: `${libreBaskerville.className} italic text-xl md:text-4xl`, children: "Behind." }),
          /* @__PURE__ */ jsx("span", { className: "text-base font-regular mt-4 text-start md:w-[490px] pr-6 md:pr-0", children: "At Moving Papa, we believe every move should leave the smallest footprint possible. We use eco-friendly materials, efficient routes, and sustainable practices to reduce waste and emissions \u2014 without compromising service." })
        ] }) })
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold md:w-[1250px] pt-5 md:pt-10 text-primary text-center", children: "Frequently Asked Questions" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center py-5 md:py-10 w-9/10 md:w-7xl", children: /* @__PURE__ */ jsx("div", { className: "w-full flex-col justify-start", children: questions.map((question, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "mb-4 bg-primary text-white border border-black overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", { className: "accordion-item", children: [
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
  ] });
}
export {
  Home as default
};
