//import Link from "/src/components/Link.jsx";
import Img_1 from "/src/images/example-4.webp"
import GetQuote from '/src/app/components/getQuote.jsx';

// Add global type definition for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (element: HTMLElement | string, params: ReCaptchaParams) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoaded: () => void;
  }
}

// Define interface for reCAPTCHA parameters
interface ReCaptchaParams {
  sitekey: string;
  callback?: () => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: 'dark' | 'light';
  size?: 'compact' | 'normal';
}

// Define props interface for the component
interface ContactSectionProps {
  section?: 'moving' | 'commercial' | 'vancouver-moving' | 'vancouver-storage' | 'storage' | 'ottawa-moving' | 'ottawa-storage' | 'ottawa-commercial' | 'calgary-moving' | 'calgary-storage' | 'calgary-commercial' | 'edmonton-moving' | 'edmonton-storage' | 'edmonton-commercial';
}

export default function GetQuoteFooter({ section = 'moving' }: ContactSectionProps) {


  // Determine if we're using rounded corners based on section
  const isResidential = (section === 'moving' || section === 'vancouver-moving' || section === 'vancouver-storage' || section === 'storage' || section === 'ottawa-moving' || section === 'ottawa-storage' || section === 'calgary-moving' || section === 'calgary-storage' || section === 'edmonton-moving' || section === 'edmonton-storage');
  

  // Rounding classes based on section
  const roundingClasses = isResidential ? {
    leftSide: 'md:rounded-l-lg rounded-t-lg md:rounded-t-none',
    rightSide: 'md:rounded-r-lg rounded-b-lg md:rounded-bl-none'
  } : {
    leftSide: '',
    rightSide: ''
  };
  
  // Set timestamp when form is loaded to measure how quickly the form is filled

  // Apply rounded corners for buttons based on section

  // Set background and text colors based on section
  const rightSideBgColor = isResidential ? 'bg-primary text-black' : 'bg-[#F8F5EC] text-black';

  return (
    <>
      {/* Load reCAPTCHA v2 script with explicit rendering */}
      
      <div className="flex items-center justify-center py-10 gap-0">
        <section className="w-full max-w-[1250px] flex flex-col md:flex-row">
          {/* Left side with text */}
          <div className={`text-primary p-6 md:p-12 flex flex-col justify-center md:w-1/2 ${roundingClasses.leftSide} relative overflow-hidden`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${Img_1.src}")`,
            backgroundSize: 'cover',
            backgroundPosition: '0% 0%',
          }}>
            <h2 className="text-2xl md:text-4xl font-bold py-15 leading-tight text-white text-center ">Get Your Free Quote Now!</h2>
          
          </div>
          
          {/* Right side with contact form */}
          <div className={`${rightSideBgColor}  ${roundingClasses.rightSide}`}>
            <GetQuote from={section}/>
          </div>
        </section>
      </div>
    </>
  );
}