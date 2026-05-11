import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import Link from "/src/components/Link.js";
import residential from "/src/images/residentialMovingImg.jpg.js";
import commercial from "/src/images/commercialMovingImg.jpg.js";
import storage from "/src/images/storageImg.jpg.js";
import packing from "/src/images/packingImg.jpg.js";
const LocationIcon = () => /* @__PURE__ */ jsx("div", { className: "bg-primary backdrop-blur-sm p-4 rounded-full w-14 h-14 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
] }) });
const StorageIcon = () => /* @__PURE__ */ jsx("div", { className: "bg-primary backdrop-blur-sm p-4 rounded-full w-14 h-14 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) });
const CommercialIcon = () => /* @__PURE__ */ jsx("div", { className: "bg-primary backdrop-blur-sm p-4 rounded-full w-14 h-14 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) });
const PackingIcon = () => /* @__PURE__ */ jsx("div", { className: "bg-primary backdrop-blur-sm p-4 rounded-full w-14 h-14 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" }) }) });
const EnhancedServicesComponent = ({ from = "toronto" }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileSliderRef = useRef(null);
  const link = from == "toronto" ? "" : "/vancouver";
  const services = [
    {
      title: "Local moving",
      description: "Our local moving service is quick, efficient, and tailored to your schedule, getting you settled into your new home in no time.",
      icon: /* @__PURE__ */ jsx(LocationIcon, {}),
      image: residential.src,
      link: "/service/residential"
    },
    {
      title: "Storage Solutions",
      description: "Need a place to store your belongings? We offer secure, climate-controlled storage options to keep your items safe until you're ready for them.",
      icon: /* @__PURE__ */ jsx(StorageIcon, {}),
      image: storage.src,
      link: "/service/storage"
    },
    {
      title: "Commercial",
      description: "Relocating your business? We specialize in commercial moves, handling your office equipment and furniture with expert care and efficiency.",
      icon: /* @__PURE__ */ jsx(CommercialIcon, {}),
      image: commercial.src,
      link: "/commercial"
    },
    {
      title: "Packing Services",
      description: "Let us take care of the packing for you. Our team expertly packs your belongings with care, ensuring everything is secure and ready for the move.",
      icon: /* @__PURE__ */ jsx(PackingIcon, {}),
      image: packing.src,
      link: "/service/packing"
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
  return /* @__PURE__ */ jsx("div", { className: "w-full py-10  bg-[#F8F5EC]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold text-primary mb-2", children: [
        "Services designed with ",
        /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "you in mind" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 max-w-3xl mx-auto text-base", children: "Moving takes more than muscle, it takes precision, planning, and care. At Moving Papa, Whether it's local move, commercial move, packing, or a storage we handle every aspect to make your transition seamless" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden w-full pb-10 rounded-4xl", children: /* @__PURE__ */ jsxs("div", { className: "w-full text-center relative overflow-hidden mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "w-[280px] h-[400px] mx-auto", children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: mobileSliderRef,
          className: "flex w-full transition-transform duration-500 ease-in-out gap-x-2",
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          children: services.map((service, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "min-w-full w-full flex-shrink-0",
              children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl h-[400px]", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 bg-cover bg-center",
                    style: {
                      backgroundImage: `url(${service.image})`,
                      backgroundPosition: "center"
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/70 to-primary/80" }),
                /* @__PURE__ */ jsxs("div", { className: "relative h-full flex flex-col justify-between p-6 text-white", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    service.icon,
                    /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold mt-4 mb-2", children: service.title })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-base md:text-base text-white", children: service.description }),
                    /* @__PURE__ */ jsxs(Link, { href: link + service.link, className: "inline-flex items-center text-tertiary hover:underline font-medium", children: [
                      "View more ",
                      /* @__PURE__ */ jsx("span", { className: "ml-1", children: "\u2192" })
                    ] })
                  ] })
                ] })
              ] })
            },
            index
          ))
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mt-4 space-x-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrev,
            className: "text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center mr-5",
            "aria-label": "Previous slide",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: services.map((_, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `h-2 w-2 rounded-full ${currentSlide === index ? "bg-tertiary" : "bg-primary bg-opacity-50"}`,
            onClick: () => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
              }
            }
          },
          index
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNext,
            className: "text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center ml-1",
            "aria-label": "Next slide",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-10", children: /* @__PURE__ */ jsx(Link, { href: `${link}/finalstep/residential`, className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg", children: "Get a Quote" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: services.map((service, index) => /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl h-96 group", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110",
          style: {
            backgroundImage: `url(${service.image})`,
            backgroundPosition: "center"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/70 to-primary/80" }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-full flex flex-col justify-between p-6 text-white", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          service.icon,
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mt-4 mb-2", children: service.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-base text-white", children: service.description }),
          /* @__PURE__ */ jsxs(Link, { href: link + service.link, className: "inline-flex items-center text-tertiary hover:underline font-medium", children: [
            "View more ",
            /* @__PURE__ */ jsx("span", { className: "ml-1", children: "\u2192" })
          ] })
        ] })
      ] })
    ] }, index)) })
  ] }) });
};
var service_default = EnhancedServicesComponent;
export {
  service_default as default
};
