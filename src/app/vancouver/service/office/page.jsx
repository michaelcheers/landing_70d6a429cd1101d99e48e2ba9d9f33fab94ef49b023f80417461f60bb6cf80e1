import CommGetQuote from "/src/app/components/commGetQuote.jsx";
import Review2 from "/src/app/components/commReview2.jsx";
import Image from "/src/components/Image.jsx";
import Img1 from '/src/images/office_img1.webp'
import "../../../landing.css";
import BackgroundOffice from "/src/app/components/background/office.jsx";
import ContactSection from "/src/app/components/contactForm.jsx";
import StepsComm from "/src/app/components/commSteps.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";

export default function Office(){
    const steps = [
        {
          number: 1,
          title: 'Start with a Quote',
          description: "Tell us about your office move, and we'll provide a fast, clear quote with no hidden fees.",
        },
        {
          number: 2,
          title: 'We Plan and Move',
          description: 'We coordinate the packing, logistics, and transportation to keep everything organized and on schedule — with optional onsite walkthroughs if needed.',
        },
        {
          number: 3,
          title: 'Settle Into Your New Office',
          description: 'We unload, help set up your workstations, and get your team ready to hit the ground running in your new space.',
        },
      ];

    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full bg-primary">
                <BackgroundOffice>
                    <div className="w-full flex justify-center relative">                    
                        <div className="w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30">
                                <div className="flex  flex-col text-white md:p-10">
                                    <div className="bg-primary m-5 p-5  md:my-20">
                                        <h1 className="text-3xl font-bold pb-5">Moving Your Office?</h1>
                                        <h2 className="text-regular">We Make It Simple, Organized, and Stress-Free.</h2>                                
                                    </div>

                                </div>
                                <div className="my-8 px-4 md:px-0">
                                    <CommGetQuote from="vancouver-moving"/>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </BackgroundOffice>

                <div className="flex flex-col justify-start items-center  w-full md:p-0 mb-4">
                    <Review2/>
                </div>
            </div>
            <div className="md:w-[1250px] md:h-[230px] flex justify-center my-4 md:mt-25 relative md:justify-end px-2 md:px-0">
                <div className="hidden md:flex justify-center items-center">
                    <Image
                        src={Img1} // Path to your SVG file
                        alt="Rectangle Photoroom"
                        width={610}
                        height={407}
                        style={{width:"500px", height:"auto"}}
                        className="absolute z-10 left-[0px] bottom-[0px]"
                    />
                </div>
                <div className="w-full md:w-6/10 px-4 md:pl-8">
                    <h1 className="text-xl md:text-3xl font-bold text-tertiary text-center md:text-start">We Make It Simple, Organized, and Stress-Free.</h1>
                    <p className=" my-4 ">
                    Office relocations take more than just moving desks and chairs. They take detailed planning, careful coordination, and a team that understands the importance of keeping your business running smoothly.
                    <br/> At Moving Papa, we specialize in office moves of all sizes — from small businesses to full corporate headquarters. Our goal is to relocate your office quickly, safely, and with minimal downtime, so you can get back to doing what you do best.
                    </p>
                </div>

            </div>
            <div className=" flex justify-center px-2 md:px-0">
              <PapaAdv from="office" variant="white"/>
            </div>
            <StepsComm steps={steps} variant="primary" quoteButtonLink="/vancouver/finalstep/commercial"/>
        </div>
        <div className="px-3">
          <ContactSection section="commercial"/>
        </div>
        </>
    )
}