import { CheckCircleIcon, TruckIcon, ClockIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import BackgroundThankyou from '/src/app/components/background/thankyou.jsx';
import VideoSection from '/src/app/components/videoSection.jsx';


export default function ThankYou() {
    const movingFacts = [
        {
            icon: <TruckIcon className="h-8 w-8 text-white" />,
            title: "35 Million People Move Annually",
            description: "In North America, about 1 in 8 people relocate each year, making moving one of life's most common experiences."
        },
        {
            icon: <ClockIcon className="h-8 w-8 text-white" />,
            title: "Peak Moving Season",
            description: "60% of all moves happen between May and September, with July being the busiest moving month of the year."
        },
        {
            icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
            title: "Average Distance",
            description: "The average local move is about 40 miles, while long-distance moves average around 1,200 miles."
        }
    ];

    const movingTips = [
        "Start packing non-essential items 4-6 weeks before your move date",
        "Label boxes with both contents and destination room for easier unpacking",
        "Take photos of electronic setups before disconnecting for easy reassembly",
        "Pack a 'first day' box with essentials like toiletries, medications, and a change of clothes"
    ];

    const nextSteps = [
        {
            icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary700" />,
            title: "Quick Response",
            description: "Our team will contact you shortly during business hours (8 AM - 8 PM) to discuss your moving needs."
        },
        {
            icon: <DocumentTextIcon className="h-5 w-5 text-primary700" />,
            title: "Detailed Quote",
            description: "We'll provide a transparent, detailed quote with no hidden fees - what we quote is what you pay."
        },
        {
            icon: <CalendarDaysIcon className="h-5 w-5 text-primary700" />,
            title: "Book Your Move",
            description: "Once you're happy with the quote, we'll schedule your move and send you a confirmation with all the details."
        }
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className='mt-13 md:mt-20'>
              <BackgroundThankyou>
                  <div className="flex justify-center">
                      <div className="text-white p-6 md:p-10 md:pl-20 md:h-130 md:w-[1400px] flex flex-col justify-center text-center">
                          <div className="flex items-center justify-center mb-4 text-center">
                              <CheckCircleIcon className="h-12 w-12 text-green-400 mr-4" />
                              <h1 className="text-4xl font-bold">Thank You!</h1>
                          </div>
                          <p className="text-lg font-bold mb-4">
                              Your quote request has been successfully submitted.
                          </p>
                          <p className="text-base">
                              We&apos;ll be in touch shortly to provide your personalized moving quote.
                          </p>
                      </div>
                  </div>
              </BackgroundThankyou>
            </div>

            {/* Promo video — added so customers can watch after submitting a quote */}
            <div className="w-full">
              <VideoSection from="thankyou" />
            </div>

            {/* What Happens Next Section */}
            <div className="flex flex-wrap w-full md:w-[1250px] justify-center mb-10 md:my-10">
                <div className="md:w-2/3 md:pl-6">
                    <h2 className="text-primary font-bold text-3xl py-6 px-6">
                        What Happens Next?
                    </h2>
                    <div className="text-primary text-base px-2 space-y-4">
                        {nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start">
                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2 text-sm font-bold">{index + 1}</div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        {step.icon}
                                        <h3 className="font-bold ml-2">{step.title}</h3>
                                    </div>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/3 hidden md:flex items-center justify-center">
                    <div className="w-[300px] h-[300px] bg-gradient-to-br from-primary100 to-primary200 rounded-lg shadow-lg flex items-center justify-center">
                        <TruckIcon className="h-32 w-32 text-primary600" />
                    </div>
                </div>
            </div>

            {/* Moving Facts Section */}
            <div className="flex justify-center w-full bg-primary">
                <div className="flex flex-wrap w-full md:w-[1250px] justify-center my-10">
                    <div className="w-full px-6">
                        <h2 className="text-tertiary font-bold text-3xl py-6 text-center">
                            Interesting Moving Facts
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {movingFacts.map((fact, index) => (
                                <div key={index} className="text-center group">
                                    <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4 ">
                                        {fact.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-tertiary mb-3">{fact.title}</h3>
                                    <p className="text-white text-sm leading-relaxed">{fact.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Moving Tips Section */}
            <div className="flex flex-wrap w-full md:w-[1250px] px-6 md:px-0 mb-5 md:my-10">
                <div className="w-full md:w-3/5 mt-10">
                    <h2 className="text-primary text-2xl font-bold mb-6">Pro Moving Tips While You Wait</h2>
                    <div className="space-y-4">
                        {movingTips.map((tip, index) => (
                            <div key={index} className="flex items-start">
                                <CheckCircleIcon className="h-6 w-6 text-tertiary mr-3 flex-shrink-0" />
                                <p className="text-gray-700">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/5 hidden md:flex items-center justify-center">
                    <div className="w-[280px] h-[280px] bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <CheckCircleIcon className="h-20 w-20 text-primary mx-auto mb-4" />
                            <p className="text-primary font-bold text-lg">Moving Made Easy</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Bottom CTA Section */}
            <div className="md:w-[1300px] bg-primary rounded-lg p-6 mx-2 md:mx-0 mb-10">
                <h2 className="text-tertiary text-2xl font-bold mb-4">
                    Moving Papa - Your Trusted Moving Partner
                </h2>
                <p className="font-regular text-base text-white leading-relaxed">
                    From your first box to your final piece, we move with purpose. Our team is committed to making your moving experience 
                    smooth, stress-free, and reliable. Thank you for choosing Moving Papa - we look forward to taking care of your move!
                </p>
            </div>

            {/* Final Message */}
            <div className="md:w-[1250px] w-full my-5 px-6 md:px-0 text-center">
                <h2 className="text-primary700 text-xl font-bold mb-3">
                    Ready to Move With Confidence?
                </h2>
                <p className="text-gray-600 text-base">
                    At Moving Papa, every move is personal. We know behind every box is someone&apos;s hard work, memories, and future.
                </p>
            </div>
        </div>
    );
}