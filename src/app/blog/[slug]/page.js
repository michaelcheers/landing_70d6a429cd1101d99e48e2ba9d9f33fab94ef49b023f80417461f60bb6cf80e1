import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { notFound } from "/src/router/Router.js";
import Link from "/src/components/Link.js";
import Image from "/src/components/Image.js";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.js";
import { getBlogPostBySlug } from "/src/app/data/blogPosts.js";
import residentialMovingImg from "/src/images/packingImg.jpg.js";
import packingImg from "/src/images/onur.webp.js";
import truckImg from "/src/images/elyse.webp.js";
import "/src/app/landing.css.js";
const imageMap = {
  "residentialMovingImg.jpg": residentialMovingImg,
  "packingImg.jpg": packingImg,
  "truck_img.webp": truckImg
};
async function BlogPost({
  params
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const formatContent = (content) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        const headerText = paragraph.replace("## ", "");
        return /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-primary mb-4 mt-8", children: headerText }, index);
      }
      return /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-6", children: paragraph }, index);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full z-10000" }),
    /* @__PURE__ */ jsx("div", { className: "w-screen flex flex-col items-center pt-[60px] bg-[#F8F5EC]", children: /* @__PURE__ */ jsx(BackgroundAboutUs, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/blog",
          className: "inline-flex items-center bg-tertiary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
            "Back to Blogs"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold py-4 leading-tight", children: post.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-200 text-sm", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "By ",
          post.author
        ] }),
        /* @__PURE__ */ jsx("span", { className: "mx-3", children: "\u2022" }),
        /* @__PURE__ */ jsx("span", { children: new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) }),
        post.readingTime && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "mx-3", children: "\u2022" }),
          /* @__PURE__ */ jsx("span", { children: post.readingTime })
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-grow w-full bg-[#F8F5EC] py-16 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("article", { className: "bg-white rounded-lg shadow-md p-8 md:p-12", children: [
      post.tags && post.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200", children: post.tags.map((tag) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "bg-primary text-white text-sm px-3 py-1 rounded-full",
          children: tag
        },
        tag
      )) }),
      post.image && /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(
        Image,
        {
          src: imageMap[post.image] || packingImg,
          alt: post.title,
          width: 800,
          height: 600,
          className: "w-full h-64 md:h-112 object-cover rounded-lg shadow-md"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none", children: formatContent(post.content) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-primary mb-2", children: "About the Author" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          /* @__PURE__ */ jsx("strong", { children: post.author }),
          " - Moving Papa's team of professional movers brings years of experience helping Toronto families and businesses with their relocation needs. We're committed to sharing our expertise to make your move as smooth as possible."
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/blog",
          className: "inline-flex items-center text-tertiary font-bold hover:underline",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
            "Back to All Blogs"
          ]
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#F8F5EC] text-primary p-8 text-center w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-4", children: "Ready to experience professional moving?" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Get your free quote from Toronto's trusted moving experts" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/finalstep/residential", className: "bg-tertiary px-6 py-3 font-bold rainbow-button !rounded-xl text-center", children: "GET A FREE QUOTE" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:6472518188", className: "bg-tertiary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
          "CALL US NOW"
        ] })
      ] })
    ] })
  ] });
}
export {
  BlogPost as default
};
