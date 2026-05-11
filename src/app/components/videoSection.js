import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
const VideoSection = ({ from }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const VIDEO_URL = "https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/Moving%20Papa%20V5-nzp0kOVRvQmm1ZXx0yMo4t42Hk18nQ.mp4";
  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const roundingClasses = from.includes("commercial") ? {
    round: "",
    bgcolor: "bg-primary",
    text: "text-white"
  } : {
    round: "rounded-2xl",
    bgcolor: "bg-primary",
    text: "text-white"
  };
  return /* @__PURE__ */ jsx("div", { className: `w-full flex justify-center py-5 md:py-10 ${roundingClasses.bgcolor}`, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1400px] mx-4 md:mx-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 md:mb-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-2xl md:text-3xl flex justify-center font-bold ${roundingClasses.text} mb-4`, children: [
        "See Moving Papa in ",
        /* @__PURE__ */ jsx("p", { className: "text-tertiary", children: "\xA0Action" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-base hidden md:flex md:text-lg font-regular ${roundingClasses.text} max-w-2xl mx-auto`, children: "Watch how our professional team handles your belongings with care and precision. Every move tells a story of trust and reliability." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: `relative aspect-video ${roundingClasses.round} overflow-hidden shadow-2xl`, children: [
      /* @__PURE__ */ jsxs(
        "video",
        {
          ref: videoRef,
          className: "w-full h-full object-cover",
          controls: isPlaying,
          preload: "metadata",
          onClick: !isPlaying ? handlePlayVideo : void 0,
          poster: "/images/thumbnail.png",
          onPlay: () => setIsPlaying(true),
          onPause: () => setIsPlaying(false),
          crossOrigin: "anonymous",
          children: [
            /* @__PURE__ */ jsx("source", { src: VIDEO_URL, type: "video/mp4" }),
            "Your browser does not support the video tag."
          ]
        }
      ),
      !isPlaying && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handlePlayVideo,
            className: "group relative",
            "aria-label": "Play video",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-15 h-15 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-8 h-8 md:w-12 md:h-12 text-primary ml-1",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7L8 5z" })
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-15 h-15 md:w-24 md:h-24 rounded-full border-2 border-white/50 animate-pulse" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 md:bottom-6 left-6 text-white", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs md:text-xl font-bold mb-1", children: "Professional Moving Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-base opacity-90", children: "Experience the Moving Papa difference" })
        ] })
      ] })
    ] }) })
  ] }) });
};
var videoSection_default = VideoSection;
export {
  videoSection_default as default
};
