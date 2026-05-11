import CommGetQuote from "/src/app/components/commGetQuote.jsx";
import Review2 from "/src/app/components/commReview2.jsx";
import "../../../landing.css";
import BackgroundWarehouse from "/src/app/components/background/warehouse.jsx";
import ContactSection from "/src/app/components/contactForm.jsx";
import StepsComm from "/src/app/components/commSteps.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";

export default function specialEquipment(){
    const steps = [
        {
          number: 1,
          title: 'Request a Quote',
          description: "Tell us what needs to be moved, and we'll provide a detailed quote tailored to your specific equipment and move requirements.",
        },
        {
          number: 2,
          title: 'Plan and Prepare',
          description: 'We assess your equipment, plan the safest route, prepare the right tools, and if needed, visit onsite ahead of time.',
        },
        {
          number: 3,
          title: 'Move with Care',
          description: 'Our trained team arrives fully prepared to move your equipment safely, protecting your assets every step of the way.',
        },
      ];

    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full bg-primary">
                <BackgroundWarehouse>
                    <div className="w-full flex justify-center relative">
                            <div className="w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10">
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30">
                                    <div className="flex md:mt-20 items-center flex-col text-white md:p-10">
                                    <div className="bg-primary m-5 p-5  md:mb-20">
                                            <h1 className="text-3xl font-bold pb-5">Moving Special Equipment?</h1>
                                            <h2 className="text-regular">We Handle It With Precision and Care.</h2>                                
                                        </div>
                                    </div>
                                    <div className="my-8 px-4 md:px-0">
                                        <CommGetQuote from="vancouver-moving"/>
                                    </div>
                                </div>
                            </div>                    
                    </div>
                </BackgroundWarehouse>
                <div className="flex flex-col justify-start items-center w-full px-4 md:px-0 mb-4">
                    <Review2/>
                </div>
            </div>
            <div className="md:w-[1250px] flex justify-center mt-5 md:mt-10 px-4 md:px-0">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-tertiary mx-4 md:text-start">We Handle It With Precision and Care.</h1>
                    <p className="text-regular my-4 mx-4 md:px-0">
                    Moving special equipment is not like moving regular office furniture. It takes the right tools, experienced hands, and a clear plan to get it done safely. At Moving Papa, we specialize in transporting delicate, oversized, and high-value equipment for businesses across industries. Whether it&apos;s medical machines, servers, manufacturing tools, or specialty displays, we make sure your investment is protected from start to finish.
                    </p>
                </div>
            </div>
            <div className="md:w-[1400px] flex justify-center text-white md:my-4">
                <PapaAdv from="specialEquipment" />
            </div>

            {/* Steps */}
            <StepsComm steps={steps} variant="white" quoteButtonLink="/vancouver/finalstep/commercial"/>
        </div>
        <div className="px-3">
            <ContactSection section="commercial"/>
        </div>
        </>
    )
}