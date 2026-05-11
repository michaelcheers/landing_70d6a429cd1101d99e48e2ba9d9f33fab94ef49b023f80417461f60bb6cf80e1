import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Link from "/src/components/Link.js";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import jakeImage from "/src/images/jake.png.js";
import arezouImage from "/src/images/arezou.png.js";
import tiyamImage from "/src/images/tiyam.png.js";
import julieImage from "/src/images/julie.png.js";
import lyImage from "/src/images/ly.png.js";
import rajatImage from "/src/images/rajat.png.js";
import ilanaImage from "/src/images/ilana.png.js";
import riyaazImage from "/src/images/riyaaz.png.js";
import geraldineImage from "/src/images/geraldine.png.js";
import suharaImage from "/src/images/suhara.png.js";
import chelseyImage from "/src/images/chelsey.png.js";
function VideoReview({ from }) {
  const carouselItems = [
    {
      id: 1,
      text: "Ankush and Anmol were amazing, helpful, absolutely very quick in their work.! 5/5 would recommend",
      author: "Jake Jolliffe",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/jake.mp4",
      thumbnail: jakeImage
    },
    {
      id: 2,
      text: "Patrick, Gurman, Shane were absolutely amazing!!! They made our move so seamless and handled all our furniture with such care. I can't stress how wonderful they were so accommodating for last minute changes and were so professional and pleasant! Can't recommend them enough for all their help!! 1000/10!!",
      author: "Arezou A",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/arezou.mp4",
      thumbnail: arezouImage
    },
    {
      id: 4,
      text: "Jackson,Shane and Kevin worked very hard today! They were very methodical, careful, neat and a very nice team!",
      author: "Julie Durante",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/julie.mp4",
      thumbnail: julieImage
    },
    {
      id: 5,
      text: "Kelli, Anmol, Saksham did a great job today with our big move! We had a lot of boxes and they managed everything well. Instructions were followed! Highly recommend moving papa for your next move!",
      author: "Ly Pham",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/ly.mp4",
      thumbnail: lyImage
    },
    {
      id: 6,
      text: "Great guys Aniket and Deepak, Great Company. Highly recommend. 5 stars :)",
      author: "Rajat Vindu Singh",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/rajat.mp4",
      thumbnail: rajatImage
    },
    {
      id: 3,
      text: "Patrick and Harjeet were amazing! Highly reccomend if you're in need of movers. 5 stars!",
      author: "Tiyam Shiribabadi",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/tiyam.mp4",
      thumbnail: tiyamImage
    },
    {
      id: 7,
      text: "Paulo, Jacob and Edwin did a fantastic job - worked super hard on a long hot day and took great care of our stuff. Thanks!",
      author: "Ilana Cohen",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/ilana.mp4",
      thumbnail: ilanaImage
    },
    {
      id: 8,
      text: "Gurman and Dave are superstars! Friendly, efficient and overall perfect service! Would definitely recommend and would use Moving Papa again!",
      author: "Riyaaz Dindar",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/riyaaz.mp4",
      thumbnail: riyaazImage
    },
    {
      id: 9,
      text: "Excellent service! Highly recommend! Had the service of Depanshu and Anik. They were very professional and efficient. Hard workers that drove 2.5 hours to reach me for a short move. Very appreciated.",
      author: "Geraldine Huynh",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/geraldine.mp4",
      thumbnail: geraldineImage
    },
    {
      id: 10,
      text: "Rohit, Jackson, Isaac and Deepak were such a great help! Thanks Moving Papa!! Highly recommend.",
      author: "Suhara Abd Hamid",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/suhara.mp4",
      thumbnail: suharaImage
    },
    {
      id: 11,
      text: "Joel, Jackson, Isaac, and Ambrose were all amazing helping us with our move! They were all very friendly, helpful, and careful with our belongings. We have a lot of heavy furniture but moving papa made it a breeze, highly recommend!",
      author: "Chelsey Sterling",
      video: "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/chelsey.mp4",
      thumbnail: chelseyImage
    }
  ];
  const roundingClasses = from.includes("commercial") ? {
    round: "",
    bgcolor: "bg-primary",
    text: "text-white"
  } : {
    round: "rounded-2xl",
    bgcolor: "bg-primary",
    text: "text-white"
  };
  const [currentSlide, setCurrentSlide] = useState(2);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const mobileSliderRef = useRef(null);
  const cardVideoRefs = useRef({});
  const handlePlayCardVideo = (cardId) => {
    setPlayingVideos((prev) => ({ ...prev, [cardId]: true }));
    if (cardVideoRefs.current[cardId]) {
      cardVideoRefs.current[cardId].play();
    }
  };
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
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex justify-center flex-col w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "pb-10 w-[1250px] mx-auto max-w-[1250px] rounded-4xl", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full max-w-[1150px]", children: [
        currentSlide > 0 && /* @__PURE__ */ jsx("button", { onClick: handlePrev, className: "text-white cursor-pointer flex-shrink-0 mr-4", children: /* @__PURE__ */ jsx(ArrowLeftCircleIcon, { className: "h-12 w-12" }) }),
        currentSlide === 0 && /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 mr-4" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden flex-1 max-w-[1050px]", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex transition-transform duration-500 ease-in-out",
            style: {
              transform: `translateX(-${currentSlide * 33.333}%)`
            },
            children: carouselItems.map((item, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex-shrink-0 px-2 max-w-[350px]",
                style: { width: "33.333%" },
                children: /* @__PURE__ */ jsx("div", { className: "border-1 border-primary rounded-4xl flex flex-col h-[550px] bg-[#06170e]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[350px] rounded-t-4xl overflow-hidden mb-3", children: [
                    /* @__PURE__ */ jsxs(
                      "video",
                      {
                        ref: (el) => {
                          cardVideoRefs.current[item.id] = el;
                        },
                        className: "w-full h-full object-cover rounded-t-4xl",
                        controls: playingVideos[item.id],
                        preload: "metadata",
                        playsInline: true,
                        onClick: !playingVideos[item.id] ? () => handlePlayCardVideo(item.id) : void 0,
                        poster: item.thumbnail.src,
                        onPlay: () => setPlayingVideos((prev) => ({ ...prev, [item.id]: true })),
                        onPause: () => setPlayingVideos((prev) => ({ ...prev, [item.id]: false })),
                        crossOrigin: "anonymous",
                        children: [
                          /* @__PURE__ */ jsx("source", { src: item.video, type: "video/mp4" }),
                          "Your browser does not support the video tag."
                        ]
                      }
                    ),
                    !playingVideos[item.id] && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => handlePlayCardVideo(item.id),
                        className: "group relative",
                        "aria-label": "Play video",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              className: "w-6 h-6 text-primary ml-0.5",
                              fill: "currentColor",
                              viewBox: "0 0 24 24",
                              children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7L8 5z" })
                            }
                          ) }),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-12 h-12 rounded-full border-2 border-white/50 animate-pulse" })
                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm", children: item.author }) }),
                    /* @__PURE__ */ jsx("div", { className: "flex mb-2", children: [...Array(5)].map((_, starIndex) => /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-4 h-4 text-yellow-400 fill-current",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
                      },
                      starIndex
                    )) }),
                    /* @__PURE__ */ jsx("div", { className: "text-white font-regular flex-grow text-xs leading-relaxed overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-4", children: item.text }) })
                  ] })
                ] }) })
              },
              index
            ))
          }
        ) }),
        currentSlide < carouselItems.length - 3 && /* @__PURE__ */ jsx("button", { onClick: handleNext, className: "text-white cursor-pointer flex-shrink-0 ml-4", children: /* @__PURE__ */ jsx(ArrowRightCircleIcon, { className: "h-12 w-12" }) }),
        currentSlide >= carouselItems.length - 3 && /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 ml-4" })
      ] }) }) }) }),
      from != "thankyou" && /* @__PURE__ */ jsxs("div", { className: "text-center mt-8", children: [
        /* @__PURE__ */ jsx("p", { className: `text-base md:text-lg  ${roundingClasses.text} mb-6`, children: "Ready to make your move stress-free?" }),
        /* @__PURE__ */ jsx(Link, { href: from, className: "bg-tertiary hover:bg-tertiary/90 font-bold text-white px-8 py-3 !rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg rainbow-button", children: "Get Your Free Quote Today" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden w-full pb-10 rounded-4xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full text-center relative overflow-hidden mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "w-[320px] mx-auto", children: /* @__PURE__ */ jsx(
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
                children: /* @__PURE__ */ jsx("div", { className: "border-1 border-primary rounded-4xl flex flex-col h-[500px] bg-[#06170e] p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "relative w-full h-[300px] rounded-lg overflow-hidden mb-3",
                      onTouchStart: (e) => e.stopPropagation(),
                      onTouchMove: (e) => e.stopPropagation(),
                      onTouchEnd: (e) => e.stopPropagation(),
                      children: [
                        /* @__PURE__ */ jsxs(
                          "video",
                          {
                            ref: (el) => {
                              cardVideoRefs.current[`mobile-${item.id}`] = el;
                            },
                            className: "w-full h-full object-cover",
                            controls: playingVideos[`mobile-${item.id}`],
                            preload: "metadata",
                            playsInline: true,
                            disablePictureInPicture: true,
                            controlsList: "nodownload nofullscreen noremoteplayback",
                            onClick: !playingVideos[`mobile-${item.id}`] ? (e) => {
                              e.stopPropagation();
                              handlePlayCardVideo(`mobile-${item.id}`);
                            } : void 0,
                            poster: item.thumbnail.src,
                            onPlay: () => setPlayingVideos((prev) => ({ ...prev, [`mobile-${item.id}`]: true })),
                            onPause: () => setPlayingVideos((prev) => ({ ...prev, [`mobile-${item.id}`]: false })),
                            crossOrigin: "anonymous",
                            children: [
                              /* @__PURE__ */ jsx("source", { src: item.video, type: "video/mp4" }),
                              "Your browser does not support the video tag."
                            ]
                          }
                        ),
                        !playingVideos[`mobile-${item.id}`] && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: (e) => {
                              e.stopPropagation();
                              handlePlayCardVideo(`mobile-${item.id}`);
                            },
                            className: "group relative",
                            "aria-label": "Play video",
                            children: [
                              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300", children: /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  className: "w-5 h-5 text-primary ml-0.5",
                                  fill: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7L8 5z" })
                                }
                              ) }),
                              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-10 h-10 rounded-full border-2 border-white/50 animate-pulse" })
                            ]
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm", children: item.author }) }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-2", children: [...Array(5)].map((_, starIndex) => /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 text-yellow-400 fill-current",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
                    },
                    starIndex
                  )) }),
                  /* @__PURE__ */ jsx("div", { className: "text-white font-regular flex-grow text-xs leading-relaxed text-left overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-4", children: item.text }) })
                ] }) })
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
              className: "text-primary hover:text-tertiary transition-colors bg-white rounded-full h-10 w-10 flex justify-center items-center mr-5",
              "aria-label": "Previous slide",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: carouselItems.map((_, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-tertiary" : "bg-white bg-opacity-50"}`,
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
              className: "text-primary hover:text-tertiary transition-colors bg-white rounded-full h-10 w-10 flex justify-center items-center ml-1",
              "aria-label": "Next slide",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            }
          )
        ] })
      ] }),
      from != "thankyou" && /* @__PURE__ */ jsxs("div", { className: "text-center mt-8 md:mt-12", children: [
        /* @__PURE__ */ jsx("p", { className: `text-base md:text-lg  ${roundingClasses.text} mb-6`, children: "Ready to make your move stress-free?" }),
        /* @__PURE__ */ jsx(Link, { href: from, className: "bg-tertiary hover:bg-tertiary/90 font-bold text-white px-8 py-3 !rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg rainbow-button", children: "Get Your Free Quote Today" })
      ] })
    ] })
  ] });
}
export {
  VideoReview as default
};
