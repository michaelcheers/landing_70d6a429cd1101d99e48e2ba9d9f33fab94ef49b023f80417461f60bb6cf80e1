import Link from "/src/components/Link.jsx";
import React from 'react';

// Define the type for a single step
interface Step {
  number: number;
  title: string;
  description: string;
}

// Define the props interface for the component
interface WorkProcessProps {
  steps: Step[];
  title?: string;
  titleHighlight?: string;
  quoteButtonLink?: string;
  quoteButtonText?: string;
  variant?: 'primary' | 'white';
  from? :string;
}

const WorkProcess = ({
  steps = [], 
  title = "How we do it", 
  titleHighlight = "Moving made easy",
  quoteButtonLink = "/finalstep/commercial",
  quoteButtonText = "Get a Quote",
  variant = 'primary',
}: WorkProcessProps) => {
  
  // Determine styles based on the variant
  const isWhiteVariant = variant === 'white';
  const containerBg = isWhiteVariant ? 'bg-[#F8F5EC]' : 'bg-primary';
  const titleTextColor = isWhiteVariant ? 'text-black' : 'text-white';
  
  return (
    <div className={`w-full py-6 px-4 mb-10 ${containerBg}`}>
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <h2 className={`text-xl md:text-3xl font-bold md:text-center mb-5 md:mb-10 ${titleTextColor} flex pl-2 md:pl-0`}>
          <p className='text-tertiary'>{titleHighlight}&nbsp;</p>{title}
        </h2>
        
        {/* Responsive container for both the number line and content */}
        <div className="w-full max-w-[1000px]">
          {/* Step columns with numbers and content aligned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 relative">
            {/* Dotted connecting line between numbers */}
            <div className="absolute top-5 left-[14%] right-[14%] border-t-2 border-dashed border-tertiary hidden md:block"></div>
            
            {/* Steps with numbers and content aligned in columns */}
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Number circle */}
                <div className="hidden h-8 w-8 md:w-14 md:h-14 bg-tertiary md:rounded-xl md:flex items-center justify-center text-white font-bold text-base md:text-xl z-10 mb-2 md:mb-8">
                  {step.number}
                </div>
                
                {/* Content box - always green regardless of variant */}
                <div className="bg-primary p-6 w-full md:text-center h-full border-1 border-white">
                  <h3 className="font-bold text-lg mb-3 text-white flex md:justify-center"><span className='text-tertiary md:hidden'>{index+1}.&nbsp;</span>{step.title}</h3>
                  <p className="text-white text-base md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile-only vertical step indicators
        <div className="md:hidden w-full mt-4 px-4">
          <div className="flex justify-center space-x-4 mt-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`w-${index === 1 ? '12' : '4'} h-2 rounded-full ${
                  index === 1 ? 'bg-red-700' : 'bg-tertiary'
                }`}
              ></div>
            ))}
          </div>
        </div> */}
        
        {quoteButtonLink && (
          <div className='w-full text-center'>
            <Link 
              href={quoteButtonLink} 
              className="bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 mt-10 text-center rainbow-button"
            >
              {quoteButtonText}
            </Link>            
          </div>

        )}
      </div>
    </div>
  );
};

export default WorkProcess;