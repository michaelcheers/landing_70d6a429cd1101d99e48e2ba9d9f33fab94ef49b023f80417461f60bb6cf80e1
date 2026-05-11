import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Link from "/src/components/Link.js";
import OttHeader from "/src/app/components/ottawa/ottHeader.js";
import OttFooter from "/src/app/components/ottawa/ottFooter.js";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.js";
import { getAllBlogPosts } from "/src/app/data/blogPosts.js";
import "/src/app/landing.css.js";
function OttawaBlogPage() {
  const blogPosts = getAllBlogPosts();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full z-10000", children: /* @__PURE__ */ jsx(OttHeader, { section: "residential" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-screen flex flex-col items-center pt-[60px] bg-[#F8F5EC]", children: /* @__PURE__ */ jsx(BackgroundAboutUs, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold py-8", children: "Moving Tips & Advice" }),
      /* @__PURE__ */ jsx("p", { className: "text-regular font-bold", children: "Expert insights and practical advice from Ottawa's trusted moving professionals" })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-grow w-full bg-[#F8F5EC] py-10 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: blogPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogPosts.map((post) => /* @__PURE__ */ jsx("article", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500 mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          post.readingTime && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "\u2022" }),
            /* @__PURE__ */ jsx("span", { children: post.readingTime })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-primary mb-3 leading-tight", children: /* @__PURE__ */ jsx(Link, { href: `/ottawa/blog/${post.slug}`, className: "hover:underline", children: post.title }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4 leading-relaxed", children: post.excerpt }),
      post.tags && post.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "bg-primary text-white text-xs px-2 py-1 rounded-full",
          children: tag
        },
        tag
      )) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/ottawa/blog/${post.slug}`,
          className: "inline-flex items-center text-tertiary font-bold hover:underline",
          children: [
            "Read More",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }) }, post.id)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-primary mb-4", children: "No blog posts yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Check back soon for expert moving tips and advice!" })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#F8F5EC] text-primary p-8 text-center w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-4", children: "Ready for your next move?" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Let Moving Papa make your Ottawa move stress-free and efficient" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/ottawa/finalstep/residential", className: "bg-tertiary px-6 py-3 font-bold rainbow-button !rounded-xl text-center", children: "GET A FREE QUOTE" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:3435000488", className: "bg-tertiary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
          "CALL US NOW"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(OttFooter, {})
  ] });
}
export {
  OttawaBlogPage as default
};
