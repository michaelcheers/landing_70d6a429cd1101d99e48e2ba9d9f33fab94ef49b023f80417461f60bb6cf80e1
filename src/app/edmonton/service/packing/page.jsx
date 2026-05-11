
import GetQuote from "/src/app/components/getQuote.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";
import Review from "/src/app/components/review.jsx";
import Link from "/src/components/Link.jsx"
import BackgroundPacking from "/src/app/components/background/packing.jsx";
import CurvedStepsFlowFinal from "/src/app/components/curveStep.jsx";
import GetQuoteFooter from "/src/app/components/getQuotefooter.jsx";


export default function Packing(){
    const questions = [
        "What types of packing services do you offer?",
        "Do you provide packing materials or do I need to buy them?",
        "How far in advance should I book packing services?",
        "Can you pack specialty items like artwork, antiques, or electronics?",
        "What if something gets damaged during packing or moving?",
        "Can I pack some items myself and have you pack the rest?",
        "How long does professional packing typically take?"
    ]
    const answers = [
        "We offer comprehensive packing services including full-service packing (entire home/office), partial packing (specific rooms or items), specialty item packing (fragile/valuable items), and unpacking services at your destination. We can customize our services to meet your specific needs and budget.",
        "All packing materials are included in our service - premium boxes, bubble wrap, packing paper, tape, labels, and protective padding. We bring everything needed to properly secure your belongings. You don't need to purchase or provide any materials.",
        "We recommend booking packing services 1-2 weeks in advance, especially during peak moving seasons (summer months). However, we often accommodate last-minute requests based on availability. The earlier you book, the more flexible we can be with scheduling.",
        "Absolutely! Our team is specially trained to handle valuable and fragile items including artwork, antiques, electronics, pianos, chandeliers, and collectibles. We use custom crating, specialized padding, and proven techniques to ensure maximum protection for your precious items.",
        "We're fully protected and stand behind our work. In the rare event of damage, we have comprehensive insurance coverage and will work with you promptly to resolve any issues. Our careful packing techniques and quality materials minimize the risk of damage significantly.",
        "Certainly! Many customers choose a hybrid approach - packing personal items themselves while having us handle fragile, bulky, or valuable items. We're flexible and can work around items you've already packed or want to pack yourself.",
        "Packing time varies based on home size and items being packed. Typically: 1-2 bedroom home (4-6 hours), 3-4 bedroom home (6-10 hours), larger homes (1-2 days). Our experienced team works efficiently while maintaining careful attention to detail."
    ]
    return (
        <div className="bg-[#F8F5EC]">
            <div className="w-full flex justify-center relative mt-13 md:mt-20">
                <BackgroundPacking>
                    <div className="w-full flex justify-center">
                        <div className="w-full md:w-[1440px] md:h-[700px] relative z-10 flex items-center">
                            <div className="w-full pb-5 md:flex md:px-5 md:pt-10 ">
                                <div className="pb-0 mb-0 md:w-1/2 px-3 md:px-0">
                                    <div className="cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10">
                                        {/* Desktop */}
                                        <div className="text-white font-bold text-[32px] hidden md:flex">
                                        Packing Service <span className="text-tertiary">&nbsp;You Can Rely On</span>
                                        </div>
                                        {/* Mobile */}
                                        <div className="text-white font-bold text-2xl md:hidden pt-10">
                                        Packing Service <span className="text-tertiary"><br/>You Can Rely On</span>
                                        </div>

                                        <div className="text-white w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] pb-10">
                                        Expert hands, quality materials, and meticulous attention to detail ensure your belongings are properly secured for the journey ahead. We handle the packing so you don&apos;t have to.
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-0 mb-0 w-screen md:w-1/2">
                                <div className="cols-span-1 md:pr-2 mt-5 md:mt-10">
                                    <GetQuote from="edmonton-moving"/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </BackgroundPacking>

            </div>
            {/* Review */}
            <div className="flex justify-center my-4">
                <Review/>
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
                            Every packing job, every interaction, every promise we make is backed by our unwavering commitment to excellence.
                        </p>
                    </div>

                    {/* Trust Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Pillar 1 - Reliability */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Professional Packing Materials</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                We use only premium packing materials - quality boxes, bubble wrap, and protective padding
                                to ensure your belongings are secured with the highest standards.
                            </p>
                        </div>

                        {/* Pillar 2 - Protection */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Expert Packing Techniques</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                Our trained packers know how to properly wrap fragile items, maximize box space,
                                and label everything clearly for easy unpacking at your destination.
                            </p>
                        </div>

                        {/* Pillar 3 - Experience */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Completely Hassle-Free</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                We handle everything from materials to packing to organization. No stress, no coordination needed -
                                just let us take care of protecting your belongings professionally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advantage */}
            <div className="flex justify-center bg-white">
                <PapaAdv from="packing"/>
            </div>

            {/* Steps */}
            <CurvedStepsFlowFinal/>
            <div className="flex justify-center">
                <Link href="/edmonton/finalstep/residential" className="bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg">Get a Quote</Link>
            </div>
            {/* FAQ Section */}
            <div className="flex flex-col items-center py-10">
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
            <GetQuoteFooter section="edmonton-moving"/>
        </div>
    )
}
