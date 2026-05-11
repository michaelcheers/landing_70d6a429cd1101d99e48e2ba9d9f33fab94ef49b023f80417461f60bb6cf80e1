import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Image from "/src/components/Image.js";
import caraImage from "/src/images/cara.webp.js";
import uniqueImage from "/src/images/unique.webp.js";
import karenImage from "/src/images/karen.webp.js";
import sulaimanImage from "/src/images/sulaiman.webp.js";
import annaImage from "/src/images/anna.webp.js";
import aarronImage from "/src/images/aaron.webp.js";
import libbyImage from "/src/images/libby.webp.js";
import josephImage from "/src/images/joseph.webp.js";
import riddhiImage from "/src/images/riddhi.webp.js";
import keaImage from "/src/images/kea.webp.js";
import gregoryImage from "/src/images/greg.webp.js";
import paulineImage from "/src/images/pauline.webp.js";
import elyseImage from "/src/images/elyse.webp.js";
import onurImage from "/src/images/onur.webp.js";
import aneesaImage from "/src/images/aneesa.webp.js";
function Review() {
  const carouselItems = [
    {
      id: 4,
      text: "I am always hesitant when selecting a moving company but I was suggested Moving Papa a lot and oh I am very glad that I chose them.",
      author: "Unique Basnet",
      image: uniqueImage
    },
    {
      id: 5,
      text: "Highly recommend! These guys made my move so smooth, even with the unexpected challenge of no elevator access from the back.",
      author: "Karen Padilla",
      image: karenImage
    },
    {
      id: 3,
      text: "Sheldon & Kevin came to the rescue!! I will say, regardless of any ups and down. Moving Papa came through.",
      author: "Cara Dorion",
      image: caraImage
    },
    {
      id: 7,
      text: "Luis and Able and Adrian did. Great job moving my place. Highly recommended!",
      author: "Sulaiman Mangal",
      image: sulaimanImage
    },
    {
      id: 8,
      text: "So, the move is a nervous thing in itself. In Toronto traffic on a Saturday evening is more so. But the guys were extremely efficient and helped wrap all the furniture and fragile stuff.....",
      author: "Anna Ermolaeva",
      image: annaImage
    },
    {
      id: 9,
      text: "Edwin, Kevin, Jackson, Mrefu, were a fantastic team that that assist us in what we thought would have been a nightmare. They were grateful enough to come up with a solution at every turn...",
      author: "Aaron Azur",
      image: aarronImage
    },
    {
      id: 10,
      text: "Kevin, Jordan, and Gurman were awesome with moving us to our new home. Thank you so much! We recommend Moving Papa to anyone looking for great caring service.",
      author: "Libby Hanna",
      image: libbyImage
    },
    {
      id: 11,
      text: "Hello, Toronto I would like to recommend Jackson and Moses for moving needs to use Moving Papa. These are professional movers they fast and efficient for handling your stuff. I will use them again for moving.",
      author: "Joseph Birikundavi",
      image: josephImage
    },
    {
      id: 12,
      text: "Joel and Joseph were very professional and helped us with the move. Thank you so much for a seamless move. I'd 100% recommend Moving Papa for your big move :)",
      author: "Riddhi Vaiude",
      image: riddhiImage
    },
    {
      id: 13,
      text: "We are so glad to have found Moving Papa for our recent move and couldn\u2019t be happier with the experience. Patrick and Edwin were fantastic, incredibly efficient, careful with our belongings ....",
      author: "Kea",
      image: keaImage
    },
    {
      id: 14,
      text: "Gurman and Patrick were great and efficient!",
      author: "Gregory Jackson",
      image: gregoryImage
    },
    {
      id: 15,
      text: "I had a smooth moving experience from this professional and effective team. I recommend them for your moving. Thumbs up Jackson, Lukean, Patrick and Shane!!!",
      author: "Pauline Firka",
      image: paulineImage
    },
    {
      id: 16,
      text: "Thank you so much Moving Papa. These 3 guys did a great job. Very professional and efficient. Definitely would recommend if you're moving! Paulo is great driver!",
      author: "Elyse Thomson",
      image: elyseImage
    },
    {
      id: 17,
      text: "Thanks to Kelly and Jagdeep. They are so professional.",
      author: "Onur YilMaz",
      image: onurImage
    },
    {
      id: 18,
      text: "If you're moving and looking for a company to help, I highly recommend Moving Papa. From start to finish this company made our moving process so much easier and stress free. I spoke to .... ",
      author: "Aneesa",
      image: aneesaImage
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(2);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const mobileSliderRef = useRef(null);
  const handleNext = () => {
    if (isAnimating) return;
    if (currentSlide + 3 >= carouselItems.length) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (isAnimating || currentSlide === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
  };
  const handleNext2 = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };
  const handlePrev2 = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(
      (prev) => prev === 0 ? carouselItems.length - 1 : prev - 1
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
        handleNext2();
      }
      if (touchEnd - touchStart > 75) {
        handlePrev2();
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center flex-col", children: /* @__PURE__ */ jsx("div", { className: "pb-10 w-[1250px] mx-auto rounded-4xl border-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full max-w-[1150px]", children: [
      currentSlide > 0 && /* @__PURE__ */ jsx("button", { onClick: handlePrev, className: "text-primary cursor-pointer flex-shrink-0 mr-4", children: /* @__PURE__ */ jsx(ArrowLeftCircleIcon, { className: "h-12 w-12" }) }),
      currentSlide === 0 && /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 mr-4" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden flex-1", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex transition-transform duration-500 ease-in-out",
          style: {
            transform: `translateX(-${currentSlide * 33.333}%)`
          },
          children: carouselItems.map((item, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex-shrink-0 px-2",
              style: { width: "33.333%" },
              children: /* @__PURE__ */ jsx("div", { className: "border-1 border-primary rounded-4xl flex flex-col h-[400px] bg-primary", children: /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col h-full", children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: item.author }) }),
                /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, starIndex) => /* @__PURE__ */ jsx(
                  Image,
                  {
                    src: "/star.svg",
                    alt: "Star Rating",
                    width: 18,
                    height: 18
                  },
                  starIndex
                )) }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-reg pt-4 flex-grow text-sm", children: /* @__PURE__ */ jsx("p", { children: item.text }) }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 w-full h-[200px] relative", children: /* @__PURE__ */ jsx(
                  Image,
                  {
                    src: item.image,
                    alt: item.author,
                    fill: true,
                    sizes: "100%",
                    style: { objectFit: "cover" },
                    className: "rounded-4xl",
                    loading: "lazy"
                  }
                ) })
              ] }) })
            },
            index
          ))
        }
      ) }),
      currentSlide < carouselItems.length - 3 && /* @__PURE__ */ jsx("button", { onClick: handleNext, className: "text-primary cursor-pointer flex-shrink-0 ml-4", children: /* @__PURE__ */ jsx(ArrowRightCircleIcon, { className: "h-12 w-12" }) }),
      currentSlide >= carouselItems.length - 3 && /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 ml-4" })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden w-full pb-10 rounded-4xl", children: /* @__PURE__ */ jsxs("div", { className: "w-full text-center relative overflow-hidden mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "w-[280px] h-[400px] mx-auto", children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: mobileSliderRef,
          className: "flex w-full transition-transform duration-500 ease-in-out gap-x-2",
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          children: carouselItems.map((item, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "min-w-full w-full flex-shrink-0",
              children: /* @__PURE__ */ jsxs("div", { className: "border-1 border-primary rounded-4xl p-4 flex flex-col h-[400px] bg-primary", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-base", children: item.author }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-1", children: [...Array(5)].map((_, index2) => /* @__PURE__ */ jsx(
                    Image,
                    {
                      src: "/star.svg",
                      alt: "Star Rating",
                      width: 23,
                      height: 23
                    },
                    index2
                  )) })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-white text-sm mb-4", children: item.text }),
                /* @__PURE__ */ jsx("div", { className: "relative w-full h-[200px] mt-auto", children: /* @__PURE__ */ jsx(
                  Image,
                  {
                    src: item.image,
                    alt: item.author,
                    fill: true,
                    style: { objectFit: "cover" },
                    className: "rounded-4xl"
                  }
                ) })
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
            onClick: handlePrev2,
            className: "text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center mr-5",
            "aria-label": "Previous slide",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: carouselItems.map((_, index) => /* @__PURE__ */ jsx(
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
            onClick: handleNext2,
            className: "text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center ml-1",
            "aria-label": "Next slide",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Review as default
};
