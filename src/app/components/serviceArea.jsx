import Link from "/src/components/Link.jsx";

const AreasOfService = () => {
  // List of service areas in the Greater Toronto Area
  const serviceAreas = [
    { name: "City of Toronto, ON", slug: "toronto" },
    { name: "York Region, ON", slug: "york-region" },
    { name: "Peel Region, ON", slug: "peel-region" },
    { name: "Halton Region, ON", slug: "halton-region" },
    { name: "Durham Region, ON", slug: "durham-region" }
  ];

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row">
        {/* Left section - Heading and text */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center md:text-start">
            Areas of Service
          </h2>
          <p className="text-gray-700 mb-6">
            No matter where you are moving from or to, you can count on our
            experience to get you there so you can focus more on your
            destination and less on the move.
          </p>
          <Link href="/finalstep/residential">
            <button className="rainbow-button text-white font-bold py-3 px-8 !rounded-lg !w-full md:!w-5/10">
              Get a Quote
            </button>
          </Link>
        </div>

        {/* Right section - List of locations */}
        <div className="md:w-1/2">
          <div className="flex flex-col">
            {serviceAreas.map((area, index) => (
              <div
              
                key={index}
                className="flex items-center justify-between py-5 border-b border-gray-200 group hover:bg-gray-50 transition-colors px-2"
              >
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-lg">{area.name}</span>
                </div>
                {/* <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreasOfService;