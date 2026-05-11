import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import Image from "/src/components/Image.js";
import catherineImage from "/src/images/papa-adv.webp.js";
const PapaAdv = ({
  from,
  variant = "primary"
  // Default to primary (green background)
}) => {
  const advantages_residential = [
    {
      title: "Clear, upfront Pricing",
      description: "We believe in transparency. That means the price we quote is the price you pay - no hidden fees, no unexpected charges."
    },
    {
      title: "Reliable, On-Time Service",
      description: "Your time is valuable, and we respect that. Our team is committed to being there when we say we will, fully prepared to make your move as seamless as possible."
    },
    {
      title: "Sustainable Moving",
      description: "Moving doesn\u2019t have to come at the expense of the environment. We\u2019ve investing in a green fleet and eco-friendly materials because we care about our planet just as much as you do."
    },
    {
      title: "Tracking Service",
      description: "Stay informed every step of the way with our real-time tracking. Our team is discreet, ensuring your move is smooth and respectful of you and your space."
    }
  ];
  const advantages_commercial = [
    {
      title: "Full Insurance and Compliant",
      description: "We're fully protected and WSIB-certified, giving you total protection and peace of mind throughout the entire moving process. Every step is handled with professionalism and care."
    },
    {
      title: "Flexible Scheduling",
      description: "We move on your schedule, not ours. Early mornings, late nights, weekends \u2014 we make it work around your business needs to keep everything running smoothly."
    },
    {
      title: "Professional Crews",
      description: "Our movers are trained, background-checked, and experienced in handling commercial moves of all sizes. We show up ready, prepared, and committed to getting the job done right."
    },
    {
      title: "Customized for Your Business",
      description: "No two moves are alike. We build a plan around your business, your equipment, and your schedule, making sure the process is smooth from start to finish."
    }
  ];
  const advantages_packing = [
    {
      title: "You relax, we pack",
      description: "Our team takes care of every detail, from wrapping fragile items to boxing up your entire home or office. You don't lift a finger, and we guarantee everything is packed securely and safely."
    },
    {
      title: "Extra Care for What Matters Most",
      description: "From artwork to antiques, our specialty packing services ensure your most precious items are wrapped, padded, and secured with the utmost care."
    },
    {
      title: "Customizable Packing Solution",
      description: "Whether you want full-service packing or just need help with the heavy lifting, Moving Papa offers flexible options to fit your needs. We can handle as much or as little as you like."
    },
    {
      title: "Unpacking & Organization",
      description: "Once you arrive at your new location, we can unpack your items, helping you settle in faster. Our team will handle the unpacking while you focus on making your new place feel like home."
    }
  ];
  const advantages_storage = [
    {
      title: "Short-Term or Long-Term Storage",
      description: "Whether you need storage for a week, a month, or longer, we provide flexible storage plans that fit your needs. Your belongings are accessible when you need them and protected when you don't."
    },
    {
      title: "Climate-Controlled Storage Units",
      description: "From electronics to furniture, our climate-controlled storage units ensure your belongings are kept safe from temperature changes, moisture, and dust, preserving them in the same condition as when they were stored."
    },
    {
      title: "Safe and Secure Storage",
      description: "With round-the-clock security, surveillance cameras, and secure access protocols, your belongings are fully protected. You can rest easy knowing everything is in a safe, secure environment."
    },
    {
      title: "7% Off Moving & Storage Bundle",
      description: "By bundling our services, you simplify your move. No more juggling multiple companies\u2014everything is coordinated through one trusted team. Your belongings go from your old home to our secure storage, then directly to your new place when you're ready."
    }
  ];
  const advantages_warehouse = [
    {
      title: "Experience with Complex Moves",
      description: "We know warehouse moves require detailed planning, labeling, and logistics. Our team is trained to organize and execute every phase of your move, so you stay on schedule. and care."
    },
    {
      title: "Specialized Equipment Handling",
      description: "Forklifts, heavy racks, fragile inventory, and oversized items \u2014 we have the equipment and skills to move everything safely."
    },
    {
      title: "Minimal Downtime",
      description: "We understand every hour matters. Our crews work quickly and carefully to get you back up and running without unnecessary delays."
    },
    {
      title: "All-in-One Moving Solution",
      description: "From offices to warehouses to racking and shelving, Moving Papa handles every part of your relocation. One team, one plan, no extra headaches."
    }
  ];
  const advantages_office = [
    {
      title: "Detailed Office Moving Plans",
      description: "We create customized move plans, including floor layouts, IT relocation schedules, and employee move guides \u2014 tailored to fit your timeline and needs."
    },
    {
      title: "Packing and Unpacking Services",
      description: "From filing cabinets to computers to breakroom supplies, we carefully pack and organize your office items for a smooth transition into your new space."
    },
    {
      title: "After-Hours and Weekend Moves",
      description: "Need to move without disrupting business hours? We offer flexible scheduling options to move your office when it's least disruptive to your team."
    },
    {
      title: "All-in-One Solution",
      description: "Desks, cubicles, tech equipment, artwork \u2014 we handle it all. One call, one team, a seamless office relocation experience."
    }
  ];
  const advantages_art = [
    {
      title: "Specialized Handling Techniques",
      description: "We use professional equipment, protective materials, and careful loading methods designed specifically for heavy, fragile, or sensitive items."
    },
    {
      title: "Tailored Moving Plans",
      description: "Every special equipment move is different. We create a custom plan based on your item type, size, destination, and handling needs."
    },
    {
      title: "Pre-Move Mapping",
      description: "We offer onsite inspections when needed to assess entrances, pathways, and installation points \u2014 reducing surprises on moving day."
    },
    {
      title: "Trained and Experienced Teams",
      description: "Our crews are trained in specialized moving protocols for medical, industrial, and IT equipment, ensuring maximum safety at every step."
    }
  ];
  const advantages_lastmile = [
    {
      title: "Fast and Flexible Scheduling",
      description: "We move at your pace \u2014 same-day, next-day, scheduled deliveries \u2014 with flexibility built to fit your needs."
    },
    {
      title: "Experienced with Specialized Items",
      description: "From heavy furniture to delicate medical equipment, our team knows how to transport big, bulky, and fragile items with expert care."
    },
    {
      title: "Real-Time Updates",
      description: "Stay in the loop from pickup to drop-off. We provide proactive communication so you know exactly where your deliveries stand"
    },
    {
      title: "Customized Solution",
      description: "We tailor our last mile services around your schedule, your delivery needs, and your customers \u2014 so you stay in control every step of the way."
    }
  ];
  const advantages_specialEquipment = [
    {
      title: "Specialized Handling Techniques",
      description: "We use professional equipment, protective materials, and careful loading methods designed specifically for heavy, fragile, or sensitive items."
    },
    {
      title: "Tailored Moving Plans",
      description: "Every special equipment move is different. We create a custom plan based on your item type, size, destination, and handling needs."
    },
    {
      title: "Pre-Move Mapping",
      description: "We offer onsite inspections when needed to assess entrances, pathways, and installation points \u2014 reducing surprises on moving day."
    },
    {
      title: "Trained and Experienced Teams",
      description: "Our crews are trained in specialized moving protocols for medical, industrial, and IT equipment, ensuring maximum safety at every step."
    }
  ];
  let advantages = [];
  switch (from) {
    case "residential":
      advantages = advantages_residential;
      break;
    case "commercial":
      advantages = advantages_commercial;
      break;
    case "packing":
      advantages = advantages_packing;
      break;
    case "storage":
      advantages = advantages_storage;
      break;
    case "warehouse":
      advantages = advantages_warehouse;
      break;
    case "office":
      advantages = advantages_office;
      break;
    case "art":
      advantages = advantages_art;
      break;
    case "lastmile":
      advantages = advantages_lastmile;
      break;
    case "specialEquipment":
      advantages = advantages_specialEquipment;
      break;
    default:
      advantages = advantages_residential;
  }
  const bgColor = variant === "primary" ? "bg-primary" : "bg-[#F8F5EC]";
  const textColor = variant === "primary" ? "text-white" : "text-primary";
  const headingColor = variant === "primary" ? "text-white" : "text-primary";
  const cardBg = variant === "primary" ? "hover:bg-[#F8F5EC]" : "hover:bg-primary";
  const cardText = variant === "primary" ? "text-white hover:text-primary" : "text-primary hover:text-white";
  const rounded = from === "commercial" || from === "specialEquipment" || from === "office" || from === "art" || from == "lastmile" || from === "warehouse" ? "rounded-none" : "rounded-lg";
  useEffect(() => {
    const firstCheckbox = document.getElementById("adv-0");
    if (firstCheckbox) {
      firstCheckbox.checked = true;
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `${bgColor} w-full ${textColor} p-8 md:py-10`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex md:flex-row flex-col md:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 flex flex-col justify-end", children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl md:text-3xl font-bold mb-1 md:w-2/3 ${headingColor}`, children: [
        "Our transparent service means ",
        /* @__PURE__ */ jsxs("span", { className: "text-tertiary", children: [
          "no surprises, ",
          /* @__PURE__ */ jsx("br", {}),
          "EVER!"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-gray-400 my-4" }),
      /* @__PURE__ */ jsx("p", { className: `mb-4 text-base md:text-lg ${textColor}`, children: "Actions speak louder than promises. We treat every move, big or small, with precision and care, making sure you get the 5-star experience you deserve." }),
      /* @__PURE__ */ jsx("p", { className: `mb-8 text-base md:text-lg ${textColor}`, children: "Here's how we do it." }),
      /* @__PURE__ */ jsx("div", { className: "hidden w-full h-55 md:h-100 bg-gray-300 mb-6 md:mb-0 md:flex items-center justify-center relative rounded-4xl", children: /* @__PURE__ */ jsx(Image, { src: catherineImage, alt: "Image", fill: true, sizes: "100%", style: { objectFit: "cover", objectPosition: "50% 35%" }, className: "rounded-4xl" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-8 md:w-9/20 hidden md:flex flex-col justify-end", children: advantages.map((advantage, index) => /* @__PURE__ */ jsx("div", { className: `flex border-1 ${rounded} p-4 ${cardBg} ${cardText}`, children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-shrink-0 mr-4 mt-1 ", children: /* @__PURE__ */ jsxs("svg", { width: "26", height: "26", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("path", { d: "M7.5 7.5H18.5V19.5H7.5V7.5Z", fill: "white" }),
        /* @__PURE__ */ jsx("path", { d: "M8.98182 26L6.73636 22.0381L2.48182 21.0476L2.89545 16.4667L0 13L2.89545 9.53333L2.48182 4.95238L6.73636 3.9619L8.98182 0L13 1.79524L17.0182 0L19.2636 3.9619L23.5182 4.95238L23.1045 9.53333L26 13L23.1045 16.4667L23.5182 21.0476L19.2636 22.0381L17.0182 26L13 24.2048L8.98182 26ZM11.7591 17.3952L18.4364 10.4L16.7818 8.60476L11.7591 13.8667L9.21818 11.2667L7.56364 13L11.7591 17.3952Z", fill: "#f9130d" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 `, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: advantage.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base", children: advantage.description })
      ] })
    ] }) }, index)) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-8 md:w-9/20 md:hidden flex flex-col justify-end", children: advantages.map((advantage, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `mb-4 bg-primary text-white border border-white overflow-hidden ${rounded}`,
        children: /* @__PURE__ */ jsxs("div", { className: "accordion-item rounded-lg", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: `adv-${index}`,
              className: "accordion-toggle hidden",
              defaultChecked: index === 0
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "accordion-content-wrapper", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: `adv-${index}`, className: "accordion-header font-bold flex justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsxs("svg", { width: "26", height: "26", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                  /* @__PURE__ */ jsx("path", { d: "M7.5 7.5H18.5V19.5H7.5V7.5Z", fill: "white" }),
                  /* @__PURE__ */ jsx("path", { d: "M8.98182 26L6.73636 22.0381L2.48182 21.0476L2.89545 16.4667L0 13L2.89545 9.53333L2.48182 4.95238L6.73636 3.9619L8.98182 0L13 1.79524L17.0182 0L19.2636 3.9619L23.5182 4.95238L23.1045 9.53333L26 13L23.1045 16.4667L23.5182 21.0476L19.2636 22.0381L17.0182 26L13 24.2048L8.98182 26ZM11.7591 17.3952L18.4364 10.4L16.7818 8.60476L11.7591 13.8667L9.21818 11.2667L7.56364 13L11.7591 17.3952Z", fill: "#f9130d" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-lg pl-1", children: advantage.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "", children: [
                /* @__PURE__ */ jsx("span", { className: "accordion-icon plus text-tertiary", children: "+" }),
                /* @__PURE__ */ jsx("span", { className: "accordion-icon minus text-tertiary", children: "\u2212" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "accordion-content font-regular text-base", children: advantage.description })
          ] })
        ] })
      },
      index
    )) })
  ] }) });
};
var papaadv_default = PapaAdv;
export {
  papaadv_default as default
};
