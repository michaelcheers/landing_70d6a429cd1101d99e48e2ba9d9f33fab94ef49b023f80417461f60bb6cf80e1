import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import Link from "/src/components/Link.js";
import Image from "/src/components/Image.js";
import comm from "/src/images/commercialMovingImg.jpg.js";
import office from "/src/images/office_img1.webp.js";
import local from "/src/images/comm_move.webp.js";
import special from "/src/images/lastmile_img1.webp.js";
import art from "/src/images/pexels-tiger-lily-4483610.webp.js";
function CommercialServices({ className = "", from = "toronto" }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileSliderRef = useRef(null);
  const link = from === "toronto" ? "/finalstep/residential" : "/vancouver/finalstep/residential";
  const services = [
    {
      id: 1,
      title: "Warehouse Moving",
      description: "We relocate warehouses of all sizes with precision and care. Our specialized team handles machinery, inventory, and equipment transport efficiently.",
      backgroundImage: comm.src,
      // Add your warehouse image path
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-10 w-10 md:h-10 md:w-10 text-primary",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            }
          )
        }
      ),
      link: "/service/warehouse"
    },
    {
      id: 2,
      title: "Office Moving",
      description: "We move offices with minimal interruption to your business. From workstations to IT equipment, we handle everything with precision and care.",
      backgroundImage: office.src,
      // Add your office image path
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-10 w-10 md:h-10 md:w-10 text-primary",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            }
          )
        }
      ),
      link: "/service/office"
    },
    {
      id: 3,
      title: "Local Delivery",
      description: "Fast, secure delivery services designed to move your equipment, inventory, or supplies exactly where and when you need them.",
      backgroundImage: local.src,
      // Add your delivery image path
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-10 w-10 md:h-10 md:w-10 text-primary",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            }
          )
        }
      ),
      link: "/service/lastmile"
    },
    {
      id: 4,
      title: "Special Equipment",
      description: "From sensitive electronics to heavy machinery, we move specialized equipment safely with the right tools and expert handling.",
      backgroundImage: special.src,
      // Add your equipment image path
      icon: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-10 w-10 md:h-10 md:w-10 text-primary",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              }
            )
          ]
        }
      ),
      link: "/service/specialEquipment"
    },
    {
      id: 5,
      title: "Art Moving",
      description: "Valuable artwork requires exceptional care. Our art specialists are trained in proper handling, packaging, and transportation of fine art pieces.",
      backgroundImage: art.src,
      // Add your art image path
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-10 w-10 md:h-10 md:w-10 text-primary",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
            }
          )
        }
      ),
      link: "/service/art"
    }
  ];
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(
      (prev) => prev === 0 ? services.length - 1 : prev - 1
    );
  };
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!isAnimating) {
      if (touchStart - touchEnd > 75) {
        handleNext();
      }
      if (touchEnd - touchStart > 75) {
        handlePrev();
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    if (mobileSliderRef.current) {
      mobileSliderRef.current.style.transform = `translateX(-${currentSlide * 103}%)`;
    }
    return () => clearTimeout(timer);
  }, [currentSlide]);
  return /* @__PURE__ */ jsx("div", { className: `flex justify-center py-8 pt-10 md:px-0 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1254px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col pl-4 md:pl-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-sm font-bold pb-5", children: "SERVICES WE OFFER" }),
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsxs("h1", { className: "flex flex-col leading-none font-bold text-xl md:text-3xl", children: [
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "TAILORED MOVING" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "FOR EVERY BUSINESS" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "md:text-base text-base w-full md:w-1/4", children: [
          /* @__PURE__ */ jsx("br", {}),
          "Moving your business takes more than muscle, it takes precision, planning, and care.",
          /* @__PURE__ */ jsx("br", {}),
          "At Moving Papa, we specialize in commercial relocations of all sizes, helping businesses move forward with minimal disruption and maximum professionalism."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-3 gap-8 mt-10", children: services.slice(0, 3).map((service) => /* @__PURE__ */ jsxs("div", { className: "relative bg-primary overflow-hidden group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
        Image,
        {
          src: service.backgroundImage,
          alt: `${service.title} background`,
          fill: true,
          className: "object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-8 flex flex-col items-center text-center h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md", children: service.icon }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-white", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white mb-8", children: service.description }),
        /* @__PURE__ */ jsx(Link, { href: service.link, className: "mt-auto bg-white text-primary py-3 px-8 border border-primary font-bold hover:bg-tertiary hover:text-white transition duration-300", children: "More information" })
      ] })
    ] }, service.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full text-center relative overflow-hidden mb-4", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "w-[280px] h-[300px] mx-auto", children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: mobileSliderRef,
          className: "flex w-full transition-transform duration-500 ease-in-out",
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          children: services.map((service, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "min-w-full w-full flex-shrink-0 mx-1",
              children: /* @__PURE__ */ jsxs("div", { className: "relative bg-primary overflow-hidden h-[300px] group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
                  Image,
                  {
                    src: service.backgroundImage,
                    alt: `${service.title} background`,
                    fill: true,
                    className: "object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-6 flex flex-col items-center text-center h-full", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md", children: service.icon }),
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-white", children: service.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-white mb-6 text-sm flex-grow", children: service.description }),
                  /* @__PURE__ */ jsx(Link, { href: service.link, className: "mt-auto bg-white text-primary py-2 px-6 border border-primary font-bold hover:bg-tertiary hover:text-white transition duration-300 text-sm rounded-lg", children: "More information" })
                ] })
              ] })
            },
            index
          ))
        }
      ) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrev,
            className: "bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center",
            "aria-label": "Previous service",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: services.map((_, index) => /* @__PURE__ */ jsx(
          "button",
          {
            className: `h-3 w-3 rounded-full ${currentSlide === index ? "bg-tertiary" : "bg-primary bg-opacity-50"}`,
            onClick: () => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
              }
            },
            "aria-label": `Go to service ${index + 1}`
          },
          index
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNext,
            className: "bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center",
            "aria-label": "Next service",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 gap-8 mt-8 md:mt-12", children: services.slice(3, 5).map((service) => /* @__PURE__ */ jsxs("div", { className: "relative bg-primary overflow-hidden group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
        Image,
        {
          src: service.backgroundImage,
          alt: `${service.title} background`,
          fill: true,
          className: "object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-8 flex flex-col items-center text-center h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md", children: service.icon }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-white", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white mb-8", children: service.description }),
        /* @__PURE__ */ jsx(Link, { href: service.link, className: "mt-auto bg-white text-primary py-3 px-8 border border-primary font-bold hover:bg-tertiary hover:text-white transition duration-300", children: "More information" })
      ] })
    ] }, service.id)) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center pr-3 md:px-0 mt-10", children: /* @__PURE__ */ jsx(Link, { href: link, className: "rainbow-button w-19/20 md:w-full flex justify-center items-center font-bold", children: "Get a Quote" }) })
  ] }) });
}
export {
  CommercialServices as default
};
