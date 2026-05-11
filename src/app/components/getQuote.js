import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import LocationAutocomplete from "/src/app/components/locationautocomplete.js";
import { useAddress } from "/src/app/contextValues.js";
import "/src/app/landing.css.js";
import reviewtagleft from "/src/images/reviewtagleft.png.js";
import reviewtagright from "/src/images/reviewtagright.png.js";
import Image from "/src/components/Image.js";
import { useRouter } from "/src/router/Router.js";
function GetQuote({ from }) {
  const { pickupAddress, destinationAddress, setPickupAddress, setDestinationAddress } = useAddress();
  const router = useRouter();
  const handlePickupPlaceSelected = (place) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";
    place.address_components?.forEach((component) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });
    setPickupAddress({ street, city, state, zipCode });
  };
  const handleDestinationPlaceSelected = (place) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";
    place.address_components?.forEach((component) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });
    setDestinationAddress({ street, city, state, zipCode });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupAddress && !destinationAddress) {
      alert("Please enter an address before getting a quote.");
      return;
    }
    if (from == "vancouver-moving") {
      router.push("/vancouver/finalstep/residential");
    } else if (from == "vancouver-storage") {
      router.push("/vancouver/finalstep/storage");
    } else if (from == "ottawa-moving") {
      router.push("/ottawa/finalstep/residential");
    } else if (from == "ottawa-storage") {
      router.push("/ottawa/finalstep/storage");
    } else if (from == "calgary-moving") {
      router.push("/calgary/finalstep/residential");
    } else if (from == "calgary-storage") {
      router.push("/calgary/finalstep/storage");
    } else if (from == "edmonton-moving") {
      router.push("/edmonton/finalstep/residential");
    } else if (from == "edmonton-storage") {
      router.push("/edmonton/finalstep/storage");
    } else if (from === "moving") {
      router.push("/finalstep/residential");
    } else if (from === "storage") {
      router.push("/finalstep/storage");
    } else {
      router.push("/finalstep/residential");
    }
  };
  const handleCallbackClick = () => {
    if (from == "vancouver-moving" || from == "vancouver-storage") {
      router.push("/vancouver/callback");
    } else if (from == "ottawa-moving" || from == "ottawa-storage") {
      router.push("/ottawa/callback");
    } else if (from == "calgary-moving" || from == "calgary-storage") {
      router.push("/calgary/callback");
    } else if (from == "edmonton-moving" || from == "edmonton-storage") {
      router.push("/edmonton/callback");
    } else {
      router.push("/callback");
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "md:w-[600px] bg-primary rounded-3xl shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-center py-4  gap-x-2 md:gap-x-5 border-b-1 text-[10px] md:text-[12px] gap-y-2 border-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center py-1 px-2 bg-primary text-white drop-shadow-lg/30 rounded-md", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 md:w-[18px] md:h-[18px]", viewBox: "0 0 10 11", fill: "none", children: [
          /* @__PURE__ */ jsx("circle", { cx: "5.02296", cy: "4.26725", r: "3.06172", stroke: "white", strokeWidth: "0.612417" }),
          /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.02307 5.03289L4.12324 5.50596L4.29509 4.50398L3.56711 3.79438L4.57315 3.6482L5.02307 2.73657L5.47298 3.6482L6.47902 3.79438L5.75104 4.50398L5.92289 5.50596L5.02307 5.03289Z", stroke: "white", strokeWidth: "0.612417", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M5.32959 7.32955L6.55429 9.16661L7.16664 7.9419H9.0037L7.77899 5.79868", stroke: "white", strokeWidth: "0.612417", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M4.71704 7.32955L3.49234 9.16661L2.87999 7.9419H1.04293L2.26764 5.79868", stroke: "white", strokeWidth: "0.612417", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        "Fully Protected"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center py-1 px-2 bg-primary text-white drop-shadow-lg/30 rounded-md", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 md:w-[18px] md:h-[18px] text-white", viewBox: "0 0 13 13", fill: "none", children: [
          /* @__PURE__ */ jsx("path", { d: "M5.01392 6.5652L6.20698 7.75827L8.44398 5.52127", stroke: "white", strokeWidth: "0.745665", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M5.61535 2.14432C6.12022 1.80774 6.77796 1.80774 7.28283 2.14432C8.11537 2.69935 9.05621 3.0714 10.0432 3.2359L10.5503 3.32041V4.31632C10.5503 7.27471 8.99025 10.0121 6.44909 11.5206C3.90793 10.0121 2.34793 7.27471 2.34793 4.31632V3.32041L2.855 3.2359C3.84197 3.0714 4.78281 2.69935 5.61535 2.14432Z", stroke: "white", strokeWidth: "0.745665" })
        ] }),
        "Background Checks"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center py-1 px-2 bg-primary text-white drop-shadow-lg/30 rounded-md", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 md:w-[18px] md:h-[18px]", viewBox: "0 0 10 10", fill: "none", children: [
          /* @__PURE__ */ jsx("path", { d: "M7.01999 7.02724C5.15742 8.51729 3.25525 7.70296 2.38646 7.02724C1.80727 6.15845 0.938481 3.55209 3.54484 3.26249C5.58007 3.03635 6.73039 2.10411 7.59918 1.23532C8.46797 3.26249 8.46797 5.86885 7.01999 7.02724Z", stroke: "white", strokeWidth: "0.579191", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M1.22803 8.18566C1.4597 7.7223 2.09681 7.22034 2.38641 7.02727C4.41358 7.02727 6.15115 6.15849 6.44075 4.13132", stroke: "white", strokeWidth: "0.579191", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        "Sustainable"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center py-3 md:py-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-white text-xl font-bold hidden md:block", children: "Where are you moving to?" }),
      /* @__PURE__ */ jsx("h2", { className: "md:hidden text-white text-xl font-bold", children: "Get a Free Quote Within Minutes" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full hidden md:flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full flex my-4 justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "relative h-20 aspect-[420/740] mr-2", children: /* @__PURE__ */ jsx(Image, { src: reviewtagleft, alt: "Review tag left", fill: true, priority: true, sizes: "" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative h-20", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-full h-full flex bg-white p-2 py-3 rounded-md border-t-1 border-primary pr-3",
          style: {
            borderTop: "4px solid #34A853",
            boxShadow: "-6.552px -3.276px 26.208px rgba(0, 0, 0, 0.08), 32.76px 22.932px 65.521px rgba(0, 0, 0, 0.08)"
          },
          children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "42", height: "42", viewBox: "0 0 34 34", fill: "none", children: [
              /* @__PURE__ */ jsx("path", { d: "M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z", fill: "#4285F4" }),
              /* @__PURE__ */ jsx("path", { d: "M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z", fill: "#34A853" }),
              /* @__PURE__ */ jsx("path", { d: "M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z", fill: "#FBBC05" }),
              /* @__PURE__ */ jsx("path", { d: "M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z", fill: "#EA4335" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-[14px] pl-3 font-bold", children: [
              /* @__PURE__ */ jsx("div", { className: "", children: "Google Top Rated Service" }),
              /* @__PURE__ */ jsxs("div", { className: "text-[#FEA500] text-lg flex font-bold", children: [
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
      /* @__PURE__ */ jsx("div", { className: "relative h-20 aspect-[420/740] ml-2", children: /* @__PURE__ */ jsx(Image, { src: reviewtagright, alt: "Review tag right", fill: true, priority: true, sizes: "100vw" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden w-9/10 md:flex justify-start relative", children: /* @__PURE__ */ jsx("div", { className: "absolute z-50 top-3 left-[27px]", children: /* @__PURE__ */ jsxs("svg", { width: "8", height: "80", viewBox: "0 0 8 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "paint0_linear_4_35", x1: "4", y1: "0", x2: "4", y2: "60", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsx("stop", { stopColor: "#012122" }),
            /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#F84734" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "line",
            {
              x1: "4",
              y1: "15",
              x2: "4",
              y2: "52",
              stroke: "url(#paint0_linear_4_35)",
              strokeWidth: "2",
              strokeDasharray: "5 5",
              strokeLinecap: "round"
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden w-[350px] flex justify-start relative z-40", children: /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-[27px] ", children: /* @__PURE__ */ jsxs("svg", { width: "8", height: "60", viewBox: "0 0 8 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "paint0_linear_4_35", x1: "4", y1: "0", x2: "4", y2: "60", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsx("stop", { stopColor: "#012122" }),
            /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#F84734" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "line",
            {
              x1: "4",
              y1: "6",
              x2: "4",
              y2: "45",
              stroke: "#F84734",
              strokeWidth: "2",
              strokeDasharray: "5 5",
              strokeLinecap: "round"
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative mb-5 md:mb-4 w-[350px] md:w-9/10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[#F8F5EC] rounded-full px-4 py-2 shadow-sm", children: [
          /* @__PURE__ */ jsxs("svg", { width: "30", height: "30", viewBox: "0 0 52 52", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ jsx("path", { d: "M51.0295 25.6806C51.0295 39.2766 40.0078 50.2983 26.4118 50.2983C12.8158 50.2983 1.79409 39.2766 1.79409 25.6806C1.79409 12.0846 12.8158 1.06284 26.4118 1.06284C40.0078 1.06284 51.0295 12.0846 51.0295 25.6806Z", fill: "white", stroke: "white", strokeWidth: "1.82353" }),
            /* @__PURE__ */ jsx("path", { d: "M26.4119 43.9159C36.483 43.9159 44.6472 35.7517 44.6472 25.6806C44.6472 15.6095 36.483 7.44524 26.4119 7.44524C16.3408 7.44524 8.17651 15.6095 8.17651 25.6806C8.17651 35.7517 16.3408 43.9159 26.4119 43.9159Z", stroke: "#00292A", strokeWidth: "14.5883" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            LocationAutocomplete,
            {
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
              onPlaceSelected: handlePickupPlaceSelected,
              placeholder: "Move Out Address",
              location: "!border-0 !bg-transparent !text-gray-700 placeholder-gray-500 focus:outline-none w-full ml-2 text-base md:text-base"
            }
          ) })
        ] }) }),
        (from == "landing" || from == "moving" || from == "vancouver-moving" || from == "ottawa-moving" || from == "calgary-moving" || from == "edmonton-moving") && /* @__PURE__ */ jsx("div", { className: "relative w-[350px] md:w-9/10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[#F8F5EC] rounded-full px-4 py-2 shadow-sm", children: [
          /* @__PURE__ */ jsx("svg", { width: "30", height: "30", viewBox: "0 0 41 52", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M20.4118 51.9162C18.3877 51.9162 8.77587 40.0341 6.42169 36.2101C2.90409 30.497 0.781494 27.0469 0.781494 20.4876C0.781494 15.2813 2.84969 10.2883 6.53109 6.60687C10.2125 2.92546 15.2056 0.857269 20.4118 0.857269C25.6181 0.857269 30.6112 2.92546 34.2926 6.60687C37.974 10.2883 40.0422 15.2813 40.0422 20.4876C40.0422 26.7825 37.9451 30.1834 34.4695 35.8181L34.2288 36.2101C31.8035 40.1417 22.3959 51.9162 20.4118 51.9162ZM20.4118 10.6734C18.4704 10.6734 16.5726 11.2491 14.9583 12.3277C13.3441 13.4063 12.0859 14.9393 11.343 16.733C10.6 18.5266 10.4056 20.5003 10.7844 22.4045C11.1631 24.3086 12.098 26.0577 13.4708 27.4305C14.8436 28.8033 16.5927 29.7382 18.4968 30.1169C20.401 30.4957 22.3746 30.3013 24.1683 29.5583C25.962 28.8154 27.495 27.5572 28.5736 25.943C29.6522 24.3287 30.2279 22.4309 30.2279 20.4894C30.225 17.8869 29.1899 15.3919 27.3497 13.5516C25.5094 11.7114 23.0143 10.6763 20.4118 10.6734Z", fill: "#F84734" }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            LocationAutocomplete,
            {
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
              onPlaceSelected: handleDestinationPlaceSelected,
              placeholder: "Move In Address",
              location: "!border-0 !bg-transparent !text-gray-700 placeholder-gray-500 focus:outline-none w-full ml-2 text-base md:text-base"
            }
          ) })
        ] }) }),
        (from == "storage" || from == "vancouver-storage" || from == "ottawa-storage" || from == "calgary-storage" || from == "edmonton-storage") && /* @__PURE__ */ jsx("div", { className: "relative w-[350px] md:w-9/10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[#F8F5EC] rounded-full px-4 py-2 shadow-sm", children: [
          /* @__PURE__ */ jsx("svg", { width: "30", height: "30", viewBox: "0 0 41 52", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M20.4118 51.9162C18.3877 51.9162 8.77587 40.0341 6.42169 36.2101C2.90409 30.497 0.781494 27.0469 0.781494 20.4876C0.781494 15.2813 2.84969 10.2883 6.53109 6.60687C10.2125 2.92546 15.2056 0.857269 20.4118 0.857269C25.6181 0.857269 30.6112 2.92546 34.2926 6.60687C37.974 10.2883 40.0422 15.2813 40.0422 20.4876C40.0422 26.7825 37.9451 30.1834 34.4695 35.8181L34.2288 36.2101C31.8035 40.1417 22.3959 51.9162 20.4118 51.9162ZM20.4118 10.6734C18.4704 10.6734 16.5726 11.2491 14.9583 12.3277C13.3441 13.4063 12.0859 14.9393 11.343 16.733C10.6 18.5266 10.4056 20.5003 10.7844 22.4045C11.1631 24.3086 12.098 26.0577 13.4708 27.4305C14.8436 28.8033 16.5927 29.7382 18.4968 30.1169C20.401 30.4957 22.3746 30.3013 24.1683 29.5583C25.962 28.8154 27.495 27.5572 28.5736 25.943C29.6522 24.3287 30.2279 22.4309 30.2279 20.4894C30.225 17.8869 29.1899 15.3919 27.3497 13.5516C25.5094 11.7114 23.0143 10.6763 20.4118 10.6734Z", fill: "#F84734" }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 font-bold pl-2 text-sm md:text-base", children: "Moving Papa Storage" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "py-6 flex flex-col items-center w-full gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            onClick: handleSubmit,
            className: "rainbow-button bg-red-500 hover:bg-red-600 w-[350px] md:w-9/10 text-white font-bold  !py-[8px] md:!py-[10px] !rounded-lg transition-colors duration-200 ",
            children: "Get a Quote"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center w-[350px] md:w-9/10", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/30" }),
          /* @__PURE__ */ jsx("span", { className: "px-3 text-white/70 text-sm font-medium", children: "OR" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/30" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleCallbackClick,
            className: "text-lg text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "#F84734", stroke: "#F84734", viewBox: "0 0 24 24", strokeWidth: 1, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" }) }),
              "Get a Call from Us"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  GetQuote as default
};
