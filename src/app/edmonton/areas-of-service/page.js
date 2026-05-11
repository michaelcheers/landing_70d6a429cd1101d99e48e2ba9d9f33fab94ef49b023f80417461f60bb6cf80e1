import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Link from "/src/components/Link.js";
const serviceAreas = {
  "local-moving": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "packing": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "storage": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "warehouse-moving": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "office-moving": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "special-equipment": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "art-moving": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ],
  "last-mile": [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Barrie",
    "Oshawa",
    "Mississauga",
    "Pickering",
    "Vaughan",
    "Scarborough",
    "Caledon",
    "Brampton",
    "Milton",
    "St. Catharines",
    "London",
    "Kingston",
    "Burlington",
    "Markham",
    "Richmond Hill",
    "Newmarket",
    "Aurora",
    "Kitchener",
    "Waterloo",
    "Bradford",
    "Etobicoke",
    "North York",
    "York",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "Kelowna",
    "Victoria",
    "Vancouver Island",
    "Ottawa",
    "Gatineau",
    "Saskatoon",
    "Halifax",
    "Regina",
    "Edmonton",
    "Edmonton",
    "New Brunswick"
  ]
};
const serviceTypeLabels = {
  "local-moving": "Local Moving",
  "packing": "Packing",
  "storage": "Storage",
  "warehouse-moving": "Warehouse Moving",
  "office-moving": "Office Moving",
  "special-equipment": "Special Equipment Moving",
  "art-moving": "Art Moving",
  "last-mile": "Last Mile"
};
const edmontonAreas = ["Edmonton"];
const generateServiceLink = (location, serviceType) => {
  const locationSlug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const serviceSlugMap = {
    "local-moving": "local-move",
    // Changed from 'residential' to 'local-move'
    "packing": "packing",
    // Keep as is
    "storage": "storage",
    // Keep as is
    "warehouse-moving": "warehouse-move",
    // Changed from 'warehouse' to 'warehouse-move'
    "office-moving": "office-move",
    // Changed from 'office' to 'office-move'
    "special-equipment": "special-equipment-move",
    // Changed from 'specialEquipment' to 'special-equipment-move'
    "art-moving": "art-move",
    // Changed from 'art' to 'art-move'
    "last-mile": "last-mile"
    // Changed from 'lastmile' to 'last-mile'
  };
  const serviceSlug = serviceSlugMap[serviceType];
  return `/service-areas/${serviceSlug}-${locationSlug}`;
};
const sortLocationsByRegion = (locations, prioritizeEdmonton = true) => {
  if (!prioritizeEdmonton) return locations;
  const edmontonLocs = locations.filter((loc) => edmontonAreas.includes(loc));
  const otherLocs = locations.filter((loc) => !edmontonAreas.includes(loc));
  return [...edmontonLocs, ...otherLocs];
};
const ServiceAreasPage = () => {
  const [selectedService, setSelectedService] = useState("local-moving");
  const [isAnimating, setIsAnimating] = useState(false);
  const handleServiceChange = (serviceType) => {
    if (serviceType !== selectedService) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedService(serviceType);
        setIsAnimating(false);
      }, 150);
    }
  };
  const getSortedLocations = (serviceType) => {
    const locations = serviceAreas[serviceType] || [];
    return sortLocationsByRegion(locations, true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen mt-13 md:mt-20", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full py-8 px-4 ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-primary mb-6 text-center", children: "Service Type:" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-8", children: Object.keys(serviceTypeLabels).map((serviceType) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleServiceChange(serviceType),
          className: `px-4 py-2 rounded-full font-medium transition-all duration-300 border-2 cursor-pointer ${selectedService === serviceType ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-primary border-primary hover:bg-primary hover:text-white"}`,
          children: serviceTypeLabels[serviceType]
        },
        serviceType
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`, children: getSortedLocations(selectedService).map((location, index) => {
        const serviceLink = generateServiceLink(location, selectedService);
        return /* @__PURE__ */ jsx(
          Link,
          {
            href: serviceLink,
            className: " border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-lg group cursor-pointer block h-full flex flex-col",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 flex-1 relative", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-primary p-3 rounded-full group-hover:bg-tertiary transition-colors duration-300 flex-shrink-0", children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-6 w-6 text-white",
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
                        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 ", children: /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-primary group-hover:text-tertiary transition-colors duration-300 leading-tight", children: [
                serviceTypeLabels[selectedService],
                " in ",
                location
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-x-8 md:group-hover:translate-x-0 md:opacity-0 md:group-hover:opacity-100 opacity-100 translate-x-0 transition-all duration-300 ease-out", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5 text-primary group-hover:text-tertiary transition-colors duration-300",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              ) })
            ] })
          },
          `${selectedService}-${index}`
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxs("div", { className: `bg-primary p-8 rounded-lg transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Ready to Get Started?" }),
        /* @__PURE__ */ jsxs("p", { className: "text-white mb-6", children: [
          "Get a free quote for ",
          serviceTypeLabels[selectedService].toLowerCase(),
          " services in your area"
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/quote",
            className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button inline-block !rounded-lg",
            children: "Get A Quote"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full py-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-primary mb-6", children: "Why Choose Moving Papa?" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-primary mb-2", children: "Fast Response" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Quick response times across all our service areas" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-primary mb-2", children: "Local Expertise" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Deep knowledge of local areas and regulations" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-primary mb-2", children: "24/7 Availability" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Round-the-clock service in major metropolitan areas" })
        ] })
      ] })
    ] }) })
  ] });
};
var page_default = ServiceAreasPage;
export {
  page_default as default
};
