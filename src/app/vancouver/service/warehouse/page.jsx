import CommGetQuote from "/src/app/components/commGetQuote.jsx";
import Image from "/src/components/Image.jsx";
import Review2 from "/src/app/components/commReview2.jsx";
import TruckImg from "/src/images/truck_img.webp"
import BackgroundWarehouse from "/src/app/components/background/warehouse.jsx";
import ContactSection from "/src/app/components/contactForm.jsx";
import StepsComm from "/src/app/components/commSteps.jsx";
import PapaAdv from "/src/app/components/papaadv.jsx";

export default function Warehouse(){
  const steps = [
    {
      number: 1,
      title: 'Start with a Quote',
      description: "Tell us about your move, and we'll provide an upfront, no-nonsense quote you can count on",
    },
    {
      number: 2,
      title: 'We handle the Move',
      description: 'We plan your move carefully, create inventory maps, and visit onsite if needed. Then our crew arrives fully equipped to pack, load, and transport everything safely.',
    },
    {
      number: 3,
      title: 'Settle In Your New Warehouse',
      description: 'We unload, organize, and help set up your space so you can get back to business faster.',
    },
  ];
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full bg-primary">

                <BackgroundWarehouse>
                  <div className="w-full flex justify-center relative">
                        <div className="w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10">
                            <div className="">
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30">
                                    <div className="flex flex-col text-white">
                                        <div className="bg-primary m-5 p-5  md:mt-20">
                                            <h1 className="text-3xl font-bold">Moving Warehouse?</h1>
                                            <p className="text-regular pt-4">
                                            Relocating a warehouse is a big job that takes more than just trucks and muscle. It takes real planning, speed, and a team you can count on.  
                                            </p>
                                        </div>

                                    </div>
                                    <div className="my-8 px-4 md:px-0">
                                        <CommGetQuote from="vancouver-moving"/>
                                    </div>
                                </div>                            
                            </div>

                        </div>                  
                  </div>                  
                </BackgroundWarehouse>

                <div className="flex flex-col justify-start w-full pb-5 items-center">
                  <Review2/>
                </div>
            </div>
            <div className="md:w-[1250px] flex justify-center md:justify-start mt-5 md:my-10 relative">
                <div className="w-8/10 md:w-3/5 md:pt-15">
                    <h1 className="text-xl md:text-3xl font-bold text-tertiary  md:text-start">We&apos;ve Got the Perfect Solution.</h1>
                    <p className=" my-4">
                    We specialize in warehouse moves of all sizes, from small distribution centers to large-scale facilities. Our expert crews, specialized equipment, and streamlined process ensure your inventory, equipment, and assets are moved carefully, efficiently, and with minimal disruption to your operations.
                    <br/><br/>Whether you&apos;re relocating across town or across the province, we move your business forward — one pallet, one shelf, one piece at a time.
                    </p>
                </div>
                <div className="hidden md:flex justify-center items-center ">
                    <Image
                        src={TruckImg}// Path to your SVG file
                        alt="Rectangle Photoroom"
                        width={655}
                        height={586}
                        className="absolute z-10 right-[0px]"
                    />
                </div>
            </div>
            <div className=" flex justify-center md:mt-15">
                <PapaAdv from="warehouse" variant="white"/>
            </div>
            <StepsComm steps={steps} variant="primary" quoteButtonLink="/vancouver/finalstep/commercial"/>
        </div>
        <div className="px-3">
          <ContactSection section="commercial"/>
        </div>
        </>
    )
}