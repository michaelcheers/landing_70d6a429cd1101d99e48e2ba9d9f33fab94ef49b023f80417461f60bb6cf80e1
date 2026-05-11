// src/app/service-area/[city]/[service]/page.tsx
import { notFound } from "/src/router/Router.jsx";
import { Metadata } from "/src/shims/next.js";
import Header from "/src/app/components/header.jsx";
import VanHeader from "/src/app/components/vancouver/vanHeader.jsx";
import VanFooter from "/src/app/components/vancouver/vanFooter.jsx";
import GetQuote from "/src/app/components/getQuote.jsx";
// import PapaAdv from "/src/app/components/papaadv.jsx";
import GetQuoteFooter from "/src/app/components/getQuotefooter.jsx";
import { getServiceAreaBySlug } from "/src/app/utils/serviceAreas.js";
import dynamic from "/src/shims/dynamic.js";
import CommGetQuote from "/src/app/components/commGetQuote.jsx";

import BackgroundRes from "/src/app/components/background/residential.jsx";
const Footer = dynamic(() => import("/src/app/components/footer.jsx"));

// Define service types and their configurations
const SERVICE_CONFIGS = {
  'residential': {
    title: 'Local Moving',
    description: 'Professional residential moving services tailored to your needs. Our experienced team handles your household belongings with care, ensuring a smooth transition to your new home.',
    whyChooseUs: [
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
        description: "Moving doesn't have to come at the expense of the environment. We've investing in a green fleet and eco-friendly materials because we care about our planet just as much as you do."
      },
      {
        title: "Tracking Service",
        description: "Stay informed every step of the way with our real-time tracking. Our team is discreet, ensuring your move is smooth and respectful of you and your space."
      }
    ],
    section: 'residential' as const,
    finalstepUrl: '/finalstep/residential'
  },
  'packing': {
    title: 'Packing Services',
    description: 'Let us take care of the packing for you. Our team expertly packs your belongings with care, ensuring everything is secure and ready for the move.',
    whyChooseUs: [
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
    ],
    section: 'residential' as const,
    finalstepUrl: '/finalstep/residential'
  },
  'storage': {
    title: 'Storage Solutions',
    description: 'Need a place to store your belongings? We offer secure, climate-controlled storage options to keep your items safe until you\'re ready for them.',
    whyChooseUs: [
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
        description: "By bundling our services, you simplify your move. No more juggling multiple companies—everything is coordinated through one trusted team. Your belongings go from your old home to our secure storage, then directly to your new place when you're ready."
      }
    ],
    section: 'residential' as const,
    finalstepUrl: '/finalstep/storage'
  },
  'warehouse': {
    title: 'Warehouse Moving',
    description: 'Specialized warehouse relocation services for businesses. We handle heavy equipment, inventory, and complex logistics to minimize your downtime.',
    whyChooseUs: [
      {
        title: "Experience with Complex Moves",
        description: "We know warehouse moves require detailed planning, labeling, and logistics. Our team is trained to organize and execute every phase of your move, so you stay on schedule."
      },
      {
        title: "Specialized Equipment Handling",
        description: "Forklifts, heavy racks, fragile inventory, and oversized items — we have the equipment and skills to move everything safely."
      },
      {
        title: "Minimal Downtime",
        description: "We understand every hour matters. Our crews work quickly and carefully to get you back up and running without unnecessary delays."
      },
      {
        title: "All-in-One Moving Solution",
        description: "From offices to warehouses to racking and shelving, Moving Papa handles every part of your relocation. One team, one plan, no extra headaches."
      }
    ],
    section: 'commercial' as const,
    finalstepUrl: '/finalstep/commercial'
  },
  'office': {
    title: 'Office Moving',
    description: 'Professional office relocation services that minimize business disruption. We handle everything from desks to servers with precision and care.',
    whyChooseUs: [
      {
        title: "Detailed Office Moving Plans",
        description: "We create customized move plans, including floor layouts, IT relocation schedules, and employee move guides — tailored to fit your timeline and needs."
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
        description: "Desks, cubicles, tech equipment, artwork — we handle it all. One call, one team, a seamless office relocation experience."
      }
    ],
    section: 'commercial' as const,
    finalstepUrl: '/finalstep/commercial'
  },
  'specialEquipment': {
    title: 'Special Equipment Moving',
    description: 'Specialized moving services for heavy, delicate, or unique equipment. From medical devices to industrial machinery, we have the expertise.',
    whyChooseUs: [
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
        description: "We offer onsite inspections when needed to assess entrances, pathways, and installation points — reducing surprises on moving day."
      },
      {
        title: "Trained and Experienced Teams",
        description: "Our crews are trained in specialized moving protocols for medical, industrial, and IT equipment, ensuring maximum safety at every step."
      }
    ],
    section: 'commercial' as const,
    finalstepUrl: '/finalstep/commercial'
  },
  'art': {
    title: 'Art & Antique Moving',
    description: 'White-glove art and antique moving services. We specialize in handling valuable, fragile pieces with museum-quality care.',
    whyChooseUs: [
      {
        title: "Museum-Quality Care",
        description: "Our team is trained in fine art handling techniques, using specialized materials and methods to protect your valuable pieces."
      },
      {
        title: "Custom Crating & Packaging",
        description: "We create custom crates and use archival-quality materials to ensure your artwork and antiques are perfectly protected during transport."
      },
      {
        title: "Climate-Controlled Transport",
        description: "Our specialized vehicles maintain consistent temperature and humidity levels to protect sensitive materials and finishes."
      },
      {
        title: "Insurance & Documentation",
        description: "Full insurance coverage and detailed documentation of condition before and after the move gives you complete peace of mind."
      }
    ],
    section: 'commercial' as const,
    finalstepUrl: '/finalstep/commercial'
  },
  'lastmile': {
    title: 'Last Mile Delivery',
    description: 'Professional last mile delivery services for businesses. Fast, reliable delivery of your products to customers\' doors.',
    whyChooseUs: [
      {
        title: "Fast and Flexible Scheduling",
        description: "We move at your pace — same-day, next-day, scheduled deliveries — with flexibility built to fit your needs."
      },
      {
        title: "Experienced with Specialized Items",
        description: "From heavy furniture to delicate medical equipment, our team knows how to transport big, bulky, and fragile items with expert care."
      },
      {
        title: "Professional Customer Service",
        description: "Our delivery teams are trained to represent your business professionally, ensuring a positive experience for your customers."
      },
      {
        title: "Real-Time Tracking",
        description: "Track deliveries in real-time and get updates on delivery status, so you and your customers always know where packages are."
      }
    ],
    section: 'commercial' as const,
    finalstepUrl: '/finalstep/commercial'
  }
};

// Generate static params for all service area and service combinations


// Generate metadata for each service area and service combination
: { 
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const { city, service } = await params;
  const serviceArea = getServiceAreaBySlug(city);
  const serviceConfig = SERVICE_CONFIGS[service as keyof typeof SERVICE_CONFIGS];
  
  if (!serviceArea || !serviceConfig) {
    return {
      title: 'Service Not Found - Moving Papa',
      description: 'The requested service was not found.'
    };
  }

  const { city: cityName, province, region } = serviceArea;
  const { title: serviceTitle } = serviceConfig;
  
  return {
    title: `${serviceTitle} in ${cityName}, ${province} | Moving Papa`,
    description: `Professional ${serviceTitle.toLowerCase()} services in ${cityName}, ${province}. Expert movers serving ${region}. Licensed, insured, and trusted by hundreds. Get your free quote today!`,
    keywords: `${serviceTitle.toLowerCase()} ${cityName.toLowerCase()}, moving company ${cityName.toLowerCase()}, ${cityName.toLowerCase()} movers, ${serviceTitle.toLowerCase()} services ${province.toLowerCase()}, ${region.toLowerCase()} movers`,
    openGraph: {
      title: `${serviceTitle} in ${cityName}, ${province} | Moving Papa`,
      description: `Professional ${serviceTitle.toLowerCase()} services in ${cityName}, ${province}. Expert movers serving ${region}.`,
      type: 'website',
    },
  };
}



export default async function ServiceAreaServicePage({ 
  params 
}: { 
  params: Promise<{ city: string; service: string }>
}) {
  const { city, service } = await params;
  const serviceArea = getServiceAreaBySlug(city);
  const serviceConfig = SERVICE_CONFIGS[service as keyof typeof SERVICE_CONFIGS];
  
  if (!serviceArea || !serviceConfig) {
    notFound();
  }

  const { city: cityName, province, region, branch } = serviceArea;
  const { title, description, whyChooseUs, section, finalstepUrl } = serviceConfig;
  
  // Determine if this is a Vancouver area
  const isVancouverArea = branch === 'vancouver';
  
  // Adjust the finalstep URL for Vancouver
  const adjustedFinalstepUrl = isVancouverArea ? `/vancouver${finalstepUrl}` : finalstepUrl;
  
  // Select appropriate header and footer components
  const HeaderComponent = isVancouverArea ? VanHeader : Header;
  const FooterComponent = isVancouverArea ? VanFooter : Footer;

const getQuoteComponent = () => {
  // Only allow valid 'from' values for CommGetQuote
  const commFromProp = isVancouverArea
    ? (service === 'lastmile' ? 'lastmile' : 'vancouver-moving')
    : (service === 'lastmile' ? 'lastmile' : 'moving');

  const getQuoteFromProp = isVancouverArea
    ? (service === 'storage' ? 'vancouver-storage' : service === 'lastmile' ? 'lastmile' : 'vancouver-moving')
    : (service === 'storage' ? 'storage' : service === 'lastmile' ? 'lastmile' : 'moving');

  // Use CommGetQuote for lastmile, GetQuote for others
  if (service === 'lastmile') {
    return <CommGetQuote from={commFromProp} />;
  } else {
    return <GetQuote from={getQuoteFromProp} />;
  }
};
  return (
    <>          
    <div className="fixed top-0 left-0 w-full z-10000">
        <HeaderComponent section={section} />
    </div>

      {/* Hero Section */}
      <div className={`w-full flex justify-center pt-[60px] ${section === 'commercial' ? 'bg-primary' : 'bg-[#F8F5EC]'}`}>
        <BackgroundRes>      
        <div className="w-full flex justify-center pt-[60px]">

                <div className="w-full px-3 md:px-0 md:w-[1440px]">
                <div className="w-full pb-5 grid grid-cols-1 md:grid-cols-2 md:pl-5 md:pt-10">
                    <div className="pb-0 mb-0">
                    <div className="cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10">   
                        <div className={`font-bold text-2xl md:text-[32px] text-white`}>
                        {title} in <span className="text-tertiary">{cityName}, {province}</span>
                        </div>
                        <div className={`w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] text-white`}>
                        {description} Serving {region} with professional, reliable service you can trust.
                        </div>
                    </div>
                    </div>
                    
                    <div className="w-full">
                    {getQuoteComponent()}
                    </div>
                </div>
                </div>            
        </div>
    </BackgroundRes>        
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full py-16 bg-[#F8F5EC]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Moving Papa for {title} in {cityName}?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team brings years of experience and local expertise to every move in {region}. 
              Here&apos;s what sets us apart:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                <div className='flex items-center mb-3'>
                    <div className="flex flex-shrink-0 mr-2 ">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 7.5H18.5V19.5H7.5V7.5Z" fill="white"/>
                        <path d="M8.98182 26L6.73636 22.0381L2.48182 21.0476L2.89545 16.4667L0 13L2.89545 9.53333L2.48182 4.95238L6.73636 3.9619L8.98182 0L13 1.79524L17.0182 0L19.2636 3.9619L23.5182 4.95238L23.1045 9.53333L26 13L23.1045 16.4667L23.5182 21.0476L19.2636 22.0381L17.0182 26L13 24.2048L8.98182 26ZM11.7591 17.3952L18.4364 10.4L16.7818 8.60476L11.7591 13.8667L9.21818 11.2667L7.56364 13L11.7591 17.3952Z" fill="#f9130d"/>
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary ">
                    {advantage.title}
                    </h3>                    
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Areas We Cover Section */}
      <div className="w-full py-8  bg-[#F8F5EC]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Serving {region} and Surrounding Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Based in {cityName}, we provide {title.toLowerCase()} services throughout {region} and beyond. 
              Our local knowledge ensures efficient, timely service no matter where you&apos;re moving.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Fast Response</h4>
              <p className="text-gray-600">Quick response times across all our service areas in {region}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Local Expertise</h4>
              <p className="text-gray-600">Deep knowledge of {cityName} and {region} areas and regulations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600">Convenient scheduling options to fit your timeline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="w-full py-8 bg-[#F8F5EC]" >
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-6">
              Contact us today for your free {title.toLowerCase()} quote in {cityName}, {province}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`tel:${serviceArea.phone}`}
                className="bg-tertiary text-white px-8 py-3 font-bold hover:bg-opacity-90 transition-all duration-300 rainbow-button inline-block !rounded-lg"
              >
                Call {serviceArea.phone}
              </a>
              <a 
                href={adjustedFinalstepUrl}
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300"
              >
                Get Online Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Get Quote Footer */}
      <GetQuoteFooter section={isVancouverArea ? 'vancouver-moving' : 'moving'} />
      
      <FooterComponent />
    </>
  );
}