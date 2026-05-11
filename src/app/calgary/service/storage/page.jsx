
import GetQuote from "/src/app/components/getQuote.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";
import Review from "/src/app/components/review.jsx";
import BackgroundStorage from "/src/app/components/background/storage.jsx";
import CurvedStepsFlowFinal from "/src/app/components/curveStep.jsx";
import Link from "/src/components/Link.jsx";
import GetQuoteFooter from "/src/app/components/getQuotefooter.jsx";

export default function Storage(){
    const questions = [
        "What types of storage solutions do you offer?",
        "How secure are your storage facilities?",
        "Are your storage units climate-controlled?",
        "How does the pickup and delivery process work?",
        "What items can and cannot be stored?",
        "What happens if I need to access my items while in storage?",
        "How do you determine storage pricing and what's included?"
    ]
    const answers = [
        "We offer flexible storage solutions including short-term storage (days to months), long-term storage (months to years), climate-controlled units, and combined moving + storage services. Whether you need temporary storage between moves or long-term solutions, we have options to fit your timeline and budget.",
        "Our storage facilities feature 24/7 security monitoring, surveillance cameras, restricted access controls, and on-site security personnel. Each facility is fully fenced with controlled entry points, and only authorized Moving Papa staff have access to your stored belongings.",
        "Yes, all our storage units are climate-controlled to protect your belongings from temperature fluctuations, humidity, and environmental damage. This is especially important for furniture, electronics, documents, artwork, and other sensitive items that can be damaged by extreme temperatures or moisture.",
        "We handle everything! Our team will pick up your items from your location, carefully transport them to our secure storage facility, and organize them in your designated unit. When you're ready, simply give us notice and we'll deliver your items to your new location - no need for you to visit the storage facility.",
        "We can store most household and office items including furniture, electronics, documents, clothing, appliances, and personal belongings. We cannot store hazardous materials, perishable items, illegal substances, or items that pose safety risks. Our team will provide guidance on any questionable items.",
        "While direct customer access isn't available for security reasons, we can arrange retrieval of specific items with advance notice. Most customers find our delivery service more convenient - we can deliver individual items or everything at once, whatever works best for you.",
        "Storage pricing is based on the amount of space needed and length of storage time. Our rates include pickup, storage in climate-controlled facilities, security monitoring, and delivery when you're ready. We provide transparent pricing with no hidden fees - you'll know exactly what you're paying upfront."
    ]
    return (
        <div className="bg-[#F8F5EC]">
            <div className="w-full flex justify-center relative mt-13 md:mt-20">
                <BackgroundStorage>
                <div className="w-full flex justify-center">
                    <div className="w-full  md:w-[1440px] md:h-[700px] relative z-10 flex items-center">
                        <div className="w-full pb-5 md:flex md:px-5 md:pt-10">
                            <div className="pb-0 mb-0 md:w-1/2">
                            <div className="cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10 px-3 md:px-0">
                                {/* Desktop */}
                                <div className="text-white font-bold text-[32px] hidden md:flex">
                                Storage <span className="text-tertiary">&nbsp;You Can Rely On</span>
                                </div>
                                {/* Mobile */}
                                <div className="text-white font-bold text-2xl md:hidden pt-10">
                                Storage <span className="text-tertiary"><br/>You Can Rely On</span>
                                </div>
                                <div className="text-white w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] pb-10">
                                Secure, accessible, and well-maintained storage solutions when you need extra space. Your possessions remain protected until you&apos;re ready for them—whether that&apos;s days or years.
                                </div>
                            </div>
                            </div>
                            <div className="pb-0 mb-0 w-screen md:w-1/2">
                            <div className="cols-span-1  mt-5 md:mt-10">
                                <GetQuote from="calgary-storage"/>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </BackgroundStorage>

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
                            Every storage solution, every interaction, every promise we make is backed by our unwavering commitment to excellence.
                        </p>
                    </div>

                    {/* Trust Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Pillar 1 - Security */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Maximum Security</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                24/7 security monitoring, climate-controlled environments, and restricted access ensure
                                your belongings are safe and protected at all times.
                            </p>
                        </div>

                        {/* Pillar 2 - Climate Control */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Climate Protection</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                Temperature and humidity controlled facilities protect furniture, electronics, documents,
                                and other sensitive items from environmental damage.
                            </p>
                        </div>

                        {/* Pillar 3 - Hassle-Free Service */}
                        <div className="text-center group">
                            <div className="w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Completely Hassle-Free</h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                We handle everything from pickup to storage to delivery. No stress, no coordination needed on your part -
                                just let us know when you need your items back and we&apos;ll take care of the rest.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Advantage */}
            <div className="flex justify-center bg-white">
                <PapaAdv from="storage"/>
            </div>

            {/* Steps */}
            <CurvedStepsFlowFinal/>
            <div className="flex justify-center">
                <Link href="/calgary/finalstep/storage" className="bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg">Get a Quote</Link>
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

            <GetQuoteFooter section="calgary-storage"/>
        </div>
    )
}
