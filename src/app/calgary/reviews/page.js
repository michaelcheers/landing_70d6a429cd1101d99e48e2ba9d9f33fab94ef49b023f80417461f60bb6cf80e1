import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import "/src/app/landing.css.js";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.js";
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
function Reviews() {
  const reviews = [
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
      text: "We are so glad to have found Moving Papa for our recent move and couldn't be happier with the experience. Patrick and Edwin were fantastic, incredibly efficient, careful with our belongings ....",
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-13 md:mt-20", children: [
    /* @__PURE__ */ jsx("div", { className: "w-screen flex flex-col items-center", children: /* @__PURE__ */ jsx(BackgroundAboutUs, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold py-8", children: "Our Customer Reviews" }),
      /* @__PURE__ */ jsx("p", { className: "text-regular font-bold", children: "See what our customers have to say about their moving experience with Moving Papa" })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1000px] py-10 px-4 md:px-0", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center items-center mb-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-xl border-t-4 border-[#34A853] shadow-lg flex items-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "60", height: "60", viewBox: "0 0 34 34", fill: "none", children: [
          /* @__PURE__ */ jsx("path", { d: "M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z", fill: "#4285F4" }),
          /* @__PURE__ */ jsx("path", { d: "M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z", fill: "#34A853" }),
          /* @__PURE__ */ jsx("path", { d: "M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z", fill: "#FBBC05" }),
          /* @__PURE__ */ jsx("path", { d: "M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z", fill: "#EA4335" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-primary font-bold text-xl", children: "Google Top Rated Service" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FEA500] text-2xl font-bold", children: "4.9" }),
            /* @__PURE__ */ jsx("div", { className: "flex ml-2", children: [...Array(5)].map((_, index) => /* @__PURE__ */ jsx(
              Image,
              {
                src: "/star.svg",
                alt: "Star Rating",
                width: 22,
                height: 22
              },
              index
            )) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: reviews.map((review) => /* @__PURE__ */ jsx("div", { className: "border-1 border-primary rounded-4xl flex flex-col h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col h-full", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-primary font-bold", children: review.author }) }),
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
        /* @__PURE__ */ jsx("div", { className: "text-primary font-reg pt-4 flex-grow text-sm", children: /* @__PURE__ */ jsx("p", { children: review.text }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 w-full h-[200px] relative", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: review.image,
            alt: review.author,
            fill: true,
            sizes: "100%",
            style: { objectFit: "cover" },
            className: "rounded-4xl",
            loading: "lazy"
          }
        ) })
      ] }) }, review.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: " bg-[#F8F5EC] text-primary p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-4", children: "Ready to experience our top-rated moving service?" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Join the hundreds of satisfied customers who trusted Moving Papa with their move" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center gap-4", children: [
        /* @__PURE__ */ jsx("a", { href: "/calgary/finalstep/residential", className: "bg-tertiary px-6 py-3 font-bold rainbow-button !rounded-xl text-center", children: "GET A FREE QUOTE" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:5878125952", className: "bg-tertiary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
          "CALL US NOW"
        ] })
      ] })
    ] })
  ] });
}
export {
  Reviews as default
};
