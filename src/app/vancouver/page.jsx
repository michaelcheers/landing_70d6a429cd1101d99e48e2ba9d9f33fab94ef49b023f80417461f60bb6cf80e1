import Header from "/src/app/components/vancouver/vanHeader.jsx";

import GetQuote from "/src/app/components/getQuote.jsx";
import Review from "/src/app/components/review.jsx";
import reviewtagleft from '/src/images/reviewtagleft.png'
import reviewtagright from '/src/images/reviewtagright.png'

import Link from "/src/components/Link.jsx"
import Image from "/src/components/Image.jsx";
import { Libre_Baskerville } from "/src/shims/font.js";


import Heart from  "/src/images/heart-res.webp"
import MovingServices from "/src/app/components/service.jsx";
import dynamic from "/src/shims/dynamic.js";
import LogoCarousel from "/src/app/components/logo.jsx";
import GetQuoteFooter from "/src/app/components/getQuotefooter.jsx";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
  display: 'swap'
});

// const ContactSection = dynamic(()=> import("./components/contactForm"))
const Footer = dynamic(()=>import("/src/app/components/vancouver/vanFooter.jsx"))
const PapaAdv = dynamic(()=>import("/src/app/components/papaadv.jsx"))
// const AreasOfService = dynamic(()=>import("./components/serviceArea"))
const MovingServicesGrid = dynamic(()=>import("/src/app/components/movingService.jsx"))
// const Schedule = dynamic(()=>import("./components/schedule"))
const CurvedStepsFlowFinal = dynamic(()=>import("/src/app/components/curveStep.jsx"))
const VideoReview = dynamic(() => import("/src/app/components/videoReview.jsx"))

export default function Home() {
  const questions = [
    "Are you licensed and insured?",
    "When should I start planning for my move?",
    "Do you offer storage services?",
    "What if my moving date changes?"
  ]
  const answers =[
    "Yes, Moving Papa is fully licensed and insured to ensure your peace of mind. We follow all industry regulations and take extra care to protect your belongings and property throughout the entire moving process.",
    "It's best to start planning your move as early as possible, ideally 4-6 weeks in advance. This gives you plenty of time to organize, pack, and secure your preferred moving date. However, if you need a last-minute move, don't worry—Moving Papa can still help with short-notice relocations!",
    "Absolutely! We offer secure, climate-controlled storage options for both short-term and long-term needs. Whether you're between homes or need extra space, we’ve got you covered with flexible storage solutions tailored to your schedule.",
    "We understand plans can change. With Moving Papa, you can adjust your moving date hassle-free. Just give us a heads-up, and we’ll reschedule your move at no extra cost, subject to availability."
  ]

  return (
    <div className="bg-[#F8F5EC]" >
      <span style={{display:'none'}} id="deploy-check-abc123">deployed</span>
      <div className="fixed top-0 left-0 w-full z-10000">
        <Header/>
      </div>
      {/* Desktop top section */}
      <div className="w-full hidden md:flex flex-col items-center relative mt-20">
        <div className="w-full max-w-[1400px] rounded-4xl flex flex-col justify-center items-center py-10 md:pt-5 md:pb-20 mx-2">
          <div className=" font-bold flex flex-col items-center text-primary">
            {/* Desktop */}
            <div className="hidden md:flex flex-col">
              <h1 className="text-3xl md:text-4xl text-center ">
                There are lots of moving companies
              </h1>
              <div className="flex text-3xl md:text-4xl justify-center">
                But <p className="text-tertiary">&nbsp;only one Moving Papa</p>
              </div>    
              <div className="text-base md:text-lg font-regular mt-4 text-center">
                Moving Papa provides complete moving, packing, unpacking and storage services
              </div>                        
            </div>
          </div>
          <div className="w-10/11 max-w-[1200px] md:flex md:mt-5 justify-between">
            <div className="hidden md:flex items-center w-18/40">
                <div className="flex">
                  <Image src={Heart} alt="alt"/>
                </div>     
            </div>
            <div className="w-full md:w-20/40">
              <GetQuote from="vancouver-moving"/>
            </div>
          </div>

        </div>
      </div>
      {/* Mobile top section */}
      <div className="w-full md:hidden pt-20">
        <div className="text-center font-bold text-2xl">
          <div>
              <h1 className="text-xl text-center ">
                There are lots of moving companies
              </h1>
              <div className="flex text-xl  justify-center">
                But <p className="text-tertiary">&nbsp;only one Moving Papa</p>
              </div>    
          </div>
          <p className="text-base font-regular">
            Moving Papa provides complete moving, packing, unpacking and storage services
          </p>
        </div>              
        <div className="w-full flex justify-center my-8">
          {/* Left wing - increased size by 30% */}
          <div className="relative h-15 aspect-[420/740] mr-2">
            <Image src={reviewtagleft} alt="Review tag left" fill priority sizes="" />
          </div>

          {/* Review box - increased size proportionally */}
          <div className="relative h-15">
            <div className="w-full h-full flex bg-white px-2  pt-2  rounded-md border-t-1 border-primary pr-3"
                  style={{
                    borderTop: '4px solid #34A853',
                    boxShadow:
                      '-6.552px -3.276px 26.208px rgba(0, 0, 0, 0.08), 32.76px 22.932px 65.521px rgba(0, 0, 0, 0.08)',
                  }}>
                {/* Google logo - increased size */}
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 34 34" fill="none">
                      <path d="M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z" fill="#4285F4"/>
                      <path d="M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z" fill="#34A853"/>
                      <path d="M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z" fill="#FBBC05"/>
                      <path d="M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z" fill="#EA4335"/>
                  </svg>
                </div>
                {/* Text content - increased font sizes */}
                <div className="text-[12px] pl-3 font-bold">
                  <div className="">Google Top Rated Service</div>
                  <div className="text-[#FEA500] text-base flex font-bold">4.9
                      <div className="flex justify-center pl-2">
                          {[...Array(5)].map((_, index) => (
                              <Image
                                  key={index}
                                  src="/star.svg"
                                  alt="Star Rating"
                                  width={20}
                                  height={20}
                              />
                          ))}
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* Right wing - increased size by 30% */}
          <div className="relative h-15 aspect-[420/740] ml-2">
            <Image src={reviewtagright} alt="Review tag right" fill priority sizes="100vw"/>
          </div>
        </div>
        <div className="max-w-full">
            <GetQuote from="vancouver-moving"/>          
        </div>
      </div>

      <div className="w-full flex justify-center mt-6 md:mt-0">
          <div className="hidden md:block w-7xl">
              <div className=" pb-10">
                <div className="ml-2  pb-2 font-bold text-[16px] md:text-[22px] border-b-1 md:flex text-center">
                  <div className="text-xl md:text-3xl font-bold text-primary">
                    Hear from our Customers, &nbsp;
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-tertiary">
                    the heart of our Success.
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 mt-4 md:mt-8 gap-1 md:gap-x-4 font-bold  md:w-8/10 mx-2">
                  <div className="bg-white border-2 border-primary pl-2 flex items-center rounded-lg ">
                    <div className="flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg">
                      <Image src="/images/vcaCanada-w.png" alt="" fill sizes="100%" style={{ objectFit: "contain" }}/>
                    </div>
                    <div className="ml-3 md:ml-2 text-[14px] md:text-[18px] font-regular text-primary">
                      VCA Canada
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 pl-2 flex items-center  h-[60px] rounded-lg">
                    <div className="flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg">
                      <Image src="/images/costco-w.png" alt="" fill sizes="100%" style={{ objectFit: "contain" }}/>
                    </div>
                    <div className="ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]">
                      Costco Wholesale
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 pl-2 flex items-center h-[60px] rounded-lg">
                    <div className="flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg">
                      <Image src="/images/Loreal-w.png" alt="" fill sizes="100%" style={{ objectFit: "contain" }}/>
                    </div>
                    <div className="ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]">
                      L&apos;Oreal
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 pl-2 flex items-center  h-[60px]  rounded-lg">
                    <div className="flex justify-center items-center bg-primary w-[40px] h-[40px] relative rounded-lg">
                      <Image src="/images/theRirtz-w.png" alt="" fill sizes="100%" style={{ objectFit: "contain" }}/>
                    </div>
                    <div className="ml-3 md:ml-2 text-[14px] font-regular md:text-[18px]">
                      The Ritz-Carlton
                    </div>
                  </div>
                </div>
              </div>
          </div>        
          <div className="md:hidden">
                  <LogoCarousel/>
          </div>
      </div>
      


      {/* Review */}
      <div className="flex flex-col items-center py-5">
        <Review/>
      </div>
      <div className="flex flex-col items-center pt-5 md:pb-10 bg-primary">
        <VideoReview from="/vancouver/finalstep/residential"/>
      </div>
      {/* Trust Section - Enhanced */}
      <div className="w-full pt-8 ">
          <div className="max-w-[1200px] mx-auto px-4">
              {/* Main Title */}
              <div className="text-center mb-16">
                  <h2 className="text-xl md:text-3xl font-bold text-primary mb-6">
                      Trust. <span className="text-tertiary">That&apos;s Moving Papa</span>
                  </h2>
                  <div className="w-24 h-1 bg-tertiary mx-auto mb-8"></div>
                  <p className="text-base text-gray-700 max-w-4xl mx-auto leading-relaxed">
                      Moving Papa has built its reputation on one simple principle: earning and keeping your trust. 
                      Every move, every interaction, every promise we make is backed by our unwavering commitment to excellence.
                  </p>
              </div>

              {/* Trust Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                  {/* Pillar 1 - Reliability */}
                  <div className="text-center group">
                      <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Reliability You Can Count On</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                          When we say we&apos;ll be there at 9 AM, we&apos;re there at 9 AM. When we quote a price, that&apos;s what you pay. 
                          No surprises, no excuses, just dependable service every time.
                      </p>
                  </div>

                  {/* Pillar 2 - Protection */}
                  <div className="text-center group">
                      <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Your Belongings Protected</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                          Every item is treated like it&apos;s our own. Fully licensed, insured, and equipped with the best materials 
                          and techniques to ensure your precious belongings arrive exactly as they left.
                      </p>
                  </div>

                  {/* Pillar 3 - Experience */}
                  <div className="text-center group">
                      <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                      </div>
                      <h3 className="text-lg md:text-xl  font-bold text-primary mb-4">Proven Track Record</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                          Over 1,000 successful moves and a 4.9-star Google rating don&apos;t happen by accident. 
                          They&apos;re the result of consistently delivering excellence, one move at a time.
                      </p>
                  </div>
              </div>


          </div>
      </div>
      {/* Services  */}
      <div>
        <MovingServices from="vancouver"/>
      </div>

      {/* Advantage */}
      <div className="flex justify-center bg-white">
        <PapaAdv from="residential" />
      </div>      

      <div className="my-5 mb-15">
        <CurvedStepsFlowFinal/>
        <div className="flex justify-center">
          <Link href="/vancouver/finalstep/residential" className="bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg">Get a Quote</Link>
        </div>
      </div>      
      <div className="my-10 mt-8">
        <MovingServicesGrid from="vancouver"/>           
      </div>
   


      {/* Sustainability */}
      <div className="">
        <div className="flex justify-center py-10">
          <div
            className="flex justify-center bg-cover bg-center md:w-7xl h-[369px] relative rounded-lg mx-4 md:mx-0"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/Rectangle_4.webp')",
            }}
          >
            <div className="flex items-start text-white pt-10 pl-5 md:pl-10 md:w-[1254px]">
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-2xl md:text-4xl font-bold">Leave No Trace</h1>
                <h1 className={`${libreBaskerville.className} italic text-2xl md:text-4xl`}>Behind.</h1>
                <span className="text-base font-regular mt-4 text-start md:w-[490px] pr-6 md:pr-0">
                At Moving Papa, we believe every move should leave the smallest footprint possible. We use eco-friendly materials, efficient routes, and sustainable practices to reduce waste and emissions — without compromising service.
                </span>
              </div>
            </div>
          </div>
        </div>
        


        {/* FAQ */}
        <div className="flex flex-col items-center py-5">
          <div className="">
            <h1 className="text-xl md:text-3xl font-bold md:w-[1250px] pt-5 md:pt-10 text-primary text-center">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex justify-center py-5 md:py-10 w-9/10 md:w-7xl">
              <div className="w-full flex-col justify-start">
                {questions.map((question, index) => (
                  <div 
                    key={index}
                    className="mb-4 bg-primary text-white border border-black rounded-lg overflow-hidden"
                  >
                    <div className="accordion-item rounded-lg">
                      <input type="checkbox" id={`faq-${index}`} className="accordion-toggle hidden" />
                      <div className="accordion-content-wrapper">
                        <label htmlFor={`faq-${index}`} className="accordion-header font-bold">
                          <span className="accordion-icon plus text-tertiary">+</span>
                          <span className="accordion-icon minus text-tertiary">−</span>
                          <span className="font-regular">{question}</span>
                        </label>
                        <div className="accordion-content font-regular">
                          {answers[index]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>       
      </div>

      {/* <div className="bg-primary py-10">
        <Schedule/>
      </div> */}
      <GetQuoteFooter section="vancouver-moving"/>

      <div className="px-1 bg-[#06170e]">
            <Footer/>
      </div>


    </div>
  );
}
