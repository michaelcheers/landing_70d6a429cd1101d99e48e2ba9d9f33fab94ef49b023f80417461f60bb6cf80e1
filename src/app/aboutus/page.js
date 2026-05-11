import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import "/src/app/landing.css.js";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.js";
import Img_1 from "/src/images/img_1.webp.js";
function AboutUs() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-primary", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white w-screen flex flex-col items-center ", children: [
      /* @__PURE__ */ jsx(BackgroundAboutUs, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-25", children: /* @__PURE__ */ jsxs("div", { className: "text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px]", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold py-8", children: "The Moving Papa Story" }),
        /* @__PURE__ */ jsx("p", { className: "text-regular font-bold", children: "From Your First Box to Your Final Piece, We Move With Purpose." })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap w-full md:w-[1250px] justify-center  my-10 ", children: [
        /* @__PURE__ */ jsx("div", { className: "w=1/3 hidden md:flex", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: Img_1,
            alt: "",
            width: 3024,
            height: 4032,
            className: "w-[386px] h-[419px] object-cover custom-shadow-primary rounded-4xl"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 md:pl-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-primary font-bold text-3xl py-6 p-6", children: [
            "Our Story-",
            /* @__PURE__ */ jsx("p", { className: "text-tertiary", children: "Built by Hard Work, Grown by Trust" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-black text-reg px-6", children: [
            "Moving Papa started the way most good things do \u2014 small, simple, and fueled by a lot of heart.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "We didn't launch with a fleet of trucks or a fancy office. It began with just one rented truck, a few helping hands, and a promise to treat every move like it mattered.",
            /* @__PURE__ */ jsx("br", {}),
            "No cutting corners. No disappearing halfway through. Just showing up, working hard, and doing the job right \u2014 the way we'd want it done for our own families.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "In those early days, it was about more than moving boxes. It was about showing people they could actually trust their movers.",
            /* @__PURE__ */ jsx("br", {}),
            `Word spread fast, not through ads or big campaigns, but through real people telling their friends, "You should call Moving Papa. They'll take care of you."`,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "As we grew, we never forgot why we started.",
            /* @__PURE__ */ jsx("br", {}),
            "Today, with a fleet of trucks, a full team of dedicated pros, and thousands of successful moves behind us, our mission is still the same:Move with care.",
            /* @__PURE__ */ jsx("br", {}),
            "Move with purpose. Move like it matters.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "At Moving Papa, every move is personal.",
            /* @__PURE__ */ jsx("br", {}),
            "Because we know behind every box, every truckload, and every delivery \u2014 there's someone's hard work, memories, and future.",
            /* @__PURE__ */ jsx("br", {}),
            "And that's something we'll never take lightly."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap w-full md:w-[1250px] justify-center  my-10 ", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-tertiary font-bold text-3xl py-6", children: "Our Values" }),
        /* @__PURE__ */ jsxs("p", { className: "text-white text-reg md:w-4/5", children: [
          "At Moving Papa, everything we do is built on trust. We believe integrity is non-negotiable. Honest quotes, clear communication, and following through on what we promise are the foundation of how we operate \u2014 from the first phone call to the final handshake.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Reliability is more than just showing up on time. It's about being there when it matters most, handling every move with care, and making sure our customers feel confident and supported every step of the way. When we say we'll be there, we are.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "We take our responsibility to the planet seriously. Sustainability isn't an afterthought \u2014 it's built into how we operate. From reusable moving materials to smarter route planning that cuts emissions, we're always looking for ways to move better for the world we share.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Our people are the heart of Moving Papa. We believe a great company starts with a great team. That's why we invest in training, create a work culture built on respect and pride, and make sure every mover knows they're valued \u2014 because when our team wins, our customers win too.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "At the center of everything is the customer. No two moves are the same, and we never treat them that way. We listen first, build plans around your needs, and stay flexible when life changes. Moving is personal \u2014 and we make sure it feels that way. Finally, safety is in everything we do. Protecting your belongings, your property, and our team is not negotiable. Proper equipment, careful planning, and attention to detail are just part of the job.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "These are the values that built Moving Papa. They're what keep us growing. And they're what you can expect every time you move with us."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w=1/3 hidden md:flex", children: /* @__PURE__ */ jsx(
        Image,
        {
          src: Img_1,
          alt: "",
          width: 3024,
          height: 4032,
          className: "w-[386px] h-[419px] object-cover custom-shadow-white rounded-4xl"
        }
      ) })
    ] })
  ] });
}
export {
  AboutUs as default
};
