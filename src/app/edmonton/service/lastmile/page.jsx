
import CommGetQuote from "/src/app/components/commGetQuote.jsx";
import Review2 from "/src/app/components/commReview2.jsx";
import Image from "/src/components/Image.jsx";
import LastmileImg from "/src/images/lastmile_img1.webp"
import "../../../landingcomm.css";
import BackgroundWarehouse from "/src/app/components/background/warehouse.jsx";
import ContactSection from "/src/app/components/contactForm.jsx";
import StepsComm from "/src/app/components/commSteps.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";

export default function LastMile(){
  const steps = [
    {
      number: 1,
      title: 'Request a Quote',
      description: "Tell us what needs to be delivered, where, and when — we'll provide a clear, upfront quote you can trust.",
    },
    {
      number: 2,
      title: 'Schedule and Pick Up',
      description: 'We pick up your goods on time, inspect them carefully, and load them securely for transport.',
    },
    {
      number: 3,
      title: 'Deliver with Care',
      description: 'We deliver to your final destination exactly as promised — with care, respect, and professionalism every step of the way.',
    },
  ];
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full bg-primary">

              <BackgroundWarehouse>
                <div className="w-full flex justify-center relative">
                      <div className="w-full px-3 md:px-0 md:w-[1250px] mt-[80px] relative z-10">
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30">
                          <div className="flex items-center flex-col text-white p-10 md:mt-20">
                              <h1 className="text-2xl font-bold bg-primary p-5">Last Mile Delivery You Can Count On
                              </h1>
                          </div>
                          <div className="my-8 px-4 md:px-0">
                              <CommGetQuote from="edmonton-lastmile"/>
                          </div>
                      </div>
                      </div>
                </div>
              </BackgroundWarehouse>

                <div className="flex flex-col justify-start items-center w-full mb-4">
                  <Review2/>
                </div>
            </div>
            <div className="md:w-[1250px] flex justify-center  md:justify-start mt-8 md:my-20 relative px-4 md:px-0">
                <div className="w-full md:w-4/7">
                    <h1 className="text-xl md:text-3xl font-bold text-tertiary mx-4 md:text-start">Fast, Reliable, and Handled With Care</h1>
                    <p className="text-regular my-4 md:pr-10 mx-4 md:px-0">
                    When it comes to last mile delivery, every detail matters. Whether you are delivering products to customers, moving inventory between locations, or handling sensitive equipment, you need a partner who delivers on time, every time.
                    <br/><br/>
                    At Moving Papa, we specialize in last mile logistics that prioritize speed, precision, and customer satisfaction. We are the trusted link between your business and your final destination.
                    </p>
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <Image
                        src={LastmileImg} // Path to your SVG file
                        alt="Rectangle Photoroom"
                        width={560}
                        height={406}
                        className="absolute z-10 right-[0px]"
                    />
                </div>
            </div>
            <div className="flex justify-center">
              <PapaAdv from="lastmile" variant="white"/>
            </div>
            <StepsComm steps={steps} variant="primary" quoteButtonLink="/edmonton/finalstep/commercial"/>
        </div>
        <div className="px-3">
          <ContactSection section="commercial"/>
        </div>
      </>
    )
}
