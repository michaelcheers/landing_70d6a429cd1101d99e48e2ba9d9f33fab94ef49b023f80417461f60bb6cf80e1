import React from 'react';
import Image from "/src/components/Image.jsx";
import img from '/src/images/example-6.webp'

const CurvedStepsFlowFinal = () => {

  const steps = [
  {
    number: "01",
    title: "Start with a Quote",
    description: "Tell us about your move, and we'll provide a clear, upfront quote based on your specific needs. No hidden fees, no surprises — just honest pricing you can count on."
  },
  {
    number: "02", 
    title: "Plan Every Detail",
    description: "We work closely with your team to plan the move from start to finish. That includes creating inventory maps, labeling, coordinating timelines, and making sure every piece is organized."
  },
  {
    number: "03",
    title: "Move and Settle In", 
    description: "On moving day, our trained crew handles all the heavy lifting. We pack, transport, unload, and help set up your new space — so you can get back to business with zero headaches."
  }
];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-16 px-4">
      {/* Header */}
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 md:flex justify-center"><p className='text-tertiary'>Moving made Easy,</p>&nbsp;Here&apos;s how we do it</h2>
      </div>
      {/* <div className='md:hidden flex justify-center w-full'>
        <div className="mb-8 md:mb-16 w-8/10 ">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 md:flex text-start">Moving made Easy,</h2>
          <p className='text-tertiary text-xl font-bold text-end'>&nbsp;Here&apos;s how we do it</p>
        </div>        
      </div> */}


      <div className='w-full h-[250px] relative mb-8 md:hidden'>
        <Image src={img} alt="alt" fill sizes="100%"                                                                        
          style={{ objectFit: 'cover', objectPosition:"100% center"}}
          className="rounded-4xl"
          loading="lazy"/>
      </div>

      {/* Main Container */}
      <div className="relative hidden md:block">
        {/* SVG Path */}


        {/* Step Boxes */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step */}
              <div className="flex-1 text-center px-4">
                <div className="bg-tertiary text-white inline-block px-4 py-2 rounded-full text-sm font-medium mb-4">
                  STEP - {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector - don't show after last step */}
              {index < steps.length - 1 && (
                <div className="flex items-center flex-shrink-0 px-4 h-full">
                  <div className="border-t-2 border-dashed border-gray-300 w-20 ab"></div>
                  <div 
                    className="w-0 h-0 ml-2"
                    style={{
                      borderLeft: '8px solid #9CA3AF',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent'
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

        {/* Mobile Version - Shown only on small screens */}
        <div className="md:hidden">
        <div className="relative">
          {/* Create numbered steps with green dots connected by a styled line */}
          <div className="flex flex-col">
            {/* Step 1 */}
            <div className="flex mb-8">
              {/* Left side with number and line */}
              <div className="relative mr-4 flex flex-col items-center">
                {/* Green dot */}
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                {/* Vertical line below dot */}
                <div className="w-1 bg-[#217552] absolute top-8 bottom-0 left-1/2 transform -translate-x-1/2 h-full"></div>
              </div>
              
              {/* Right side with content */}
              <div className="flex-1 pb-8">
                <div className="bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2">
                  STEP - 01
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Start with a Quote</h3>
                <p className="text-gray-600 text-base">
                Tell us about your move, and we’ll provide a clear, upfront quote based on your specific needs. No hidden fees, no surprises — just honest pricing you can count on.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex mb-8">
              {/* Left side with number and line */}
              <div className="relative mr-4 flex flex-col items-center">
                {/* Green dot */}
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                {/* Vertical line below dot */}
                <div className="w-1 bg-[#217552] absolute top-8 bottom-0 left-1/2 transform -translate-x-1/2 h-full"></div>
              </div>
              
              {/* Right side with content */}
              <div className="flex-1 pb-8">
                <div className="bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2">
                  STEP - 02
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Plan Every Detail</h3>
                <p className="text-gray-600 text-base">
                We work closely with your team to plan the move from start to finish. That includes creating inventory maps, labeling, coordinating timelines, and making sure every piece of the move is organized before moving day.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex">
              {/* Left side with number */}
              <div className="relative mr-4 flex flex-col items-center">
                {/* Green dot */}
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                {/* No vertical line needed for the last item */}
              </div>
              
              {/* Right side with content */}
              <div className="flex-1">
                <div className="bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2">
                  STEP - 03
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Move and Settle In</h3>
                <p className="text-gray-600 text-base">
                On moving day, our trained crew handles all the heavy lifting. We pack, transport, unload, and help set up your new space — so you can get back to business with zero headaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Indicator Dots */}
    </div>
    
  );
};

export default CurvedStepsFlowFinal;