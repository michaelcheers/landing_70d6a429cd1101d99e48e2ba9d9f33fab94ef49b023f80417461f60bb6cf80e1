import { useState, useEffect, useRef } from 'react';
import Script from "/src/shims/script.js";
import { usePathname } from "/src/router/Router.jsx";
import Img_1 from "/src/images/example-4.webp"

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
  section?: 'residential' | 'commercial';
}

export default function ContactSection({ section = 'residential' }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    optin: false,
  });
  
  // Anti-bot measures
  const [honeypot, setHoneypot] = useState('');
  const [formLoaded, setFormLoaded] = useState(0);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const pathname = usePathname();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Determine if we're using rounded corners based on section
  const isResidential = section === 'residential';
  
  // Rounding classes based on section
  const roundingClasses = isResidential ? {
    leftSide: 'md:rounded-l-lg rounded-t-lg md:rounded-t-none',
    rightSide: 'md:rounded-r-lg rounded-b-lg md:rounded-bl-none'
  } : {
    leftSide: '',
    rightSide: ''
  };
  
  // Set timestamp when form is loaded to measure how quickly the form is filled
  useEffect(() => {
    setFormLoaded(Date.now());
  }, []);

  // Check if all fields are filled to show reCAPTCHA
  useEffect(() => {
    const allFieldsFilled = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.phone.trim() !== '' && 
      formData.message.trim() !== '';
    
    setShowRecaptcha(allFieldsFilled);
  }, [formData]);

  // Check if Google reCAPTCHA is already loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      console.log("reCAPTCHA already available on window");
      setScriptLoaded(true);
      if (showRecaptcha) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          renderRecaptcha();
        }, 100);
      }
    }
  }, [showRecaptcha]);

  // Handle script load
  const handleScriptLoad = () => {
    console.log("reCAPTCHA script loaded successfully");
    setScriptLoaded(true);
    
    // Wait for reCAPTCHA to be ready
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log("reCAPTCHA is ready");
        if (showRecaptcha) {
          renderRecaptcha();
        }
      });
    }
  };

  // Handle script error
  const handleScriptError = () => {
    console.error("Failed to load reCAPTCHA script");
  };

  // Render reCAPTCHA when both script is loaded and form is filled
  useEffect(() => {
    if (scriptLoaded && showRecaptcha && typeof window !== 'undefined' && window.grecaptcha) {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          renderRecaptcha();
        });
      } else {
        // Fallback - try to render directly
        setTimeout(() => {
          renderRecaptcha();
        }, 500);
      }
    }
  }, [scriptLoaded, showRecaptcha]);

  // Track route changes to reinitialize reCAPTCHA
  useEffect(() => {
    // When pathname changes, reset the form timestamp
    setFormLoaded(Date.now());
    
    // Re-render reCAPTCHA on route change
    if (scriptLoaded && typeof window !== 'undefined' && window.grecaptcha && recaptchaRef.current) {
      // Check if widgetId exists (already rendered)
      if (widgetIdRef.current !== null) {
        // Just reset the existing widget instead of re-rendering
        try {
          window.grecaptcha.reset(widgetIdRef.current);
          console.log("Reset existing reCAPTCHA widget");
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
          // If reset fails, try re-rendering
          renderRecaptcha();
        }
      } else if (showRecaptcha) {
        // First time rendering
        renderRecaptcha();
      }
    }
  }, [pathname]);

  // Function to safely render reCAPTCHA
  const renderRecaptcha = () => {
    if (!recaptchaRef.current || typeof window === 'undefined' || 
        !window.grecaptcha || typeof window.grecaptcha.render !== 'function') {
      console.log("Cannot render reCAPTCHA yet - missing dependencies");
      return;
    }

    try {
      // Only render if we don't have a widget ID yet or the element is empty
      if (widgetIdRef.current === null || !recaptchaRef.current.hasChildNodes()) {
        console.log("Rendering new reCAPTCHA widget");
        
        // Clear any existing content just to be safe
        recaptchaRef.current.innerHTML = '';
        
        // Render and store the widget ID
        const params: ReCaptchaParams = {
          'sitekey': process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
          'callback': () => {
            console.log("reCAPTCHA verification completed");
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired, needs verification again");
          }
        };
        
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, params);
        setRecaptchaLoaded(true);
        console.log("reCAPTCHA widget rendered successfully with ID:", widgetIdRef.current);
      }
    } catch (error: unknown) {
      console.error("Error rendering reCAPTCHA:", error);
      
      // If we get the "already rendered" error, just mark it as loaded
      if (error?.toString().includes("already been rendered")) {
        console.log("reCAPTCHA was already rendered, marking as loaded");
        setRecaptchaLoaded(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionTime = Date.now() - formLoaded;
    
    // Bot detection: Check if form was filled too quickly (less than 4 seconds)
    // or if the honeypot field is filled
    const isBotSubmission = submissionTime < 4000 || honeypot !== '';
    
    if (isBotSubmission) {
      // Silently accept the submission but don't actually process it
      console.log('Bot submission detected');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', optin: false });
      setTimeout(() => setSubmitSuccess(false), 5000);
      return;
    }
    
    try {
      // Check if grecaptcha is available in the window object
      if (!recaptchaLoaded || typeof window === 'undefined' || 
          !window.grecaptcha || typeof window.grecaptcha.getResponse !== 'function') {
        console.error("reCAPTCHA not loaded properly");
        alert('reCAPTCHA could not be loaded. Please refresh the page and try again.');
        return;
      }
      
      // Execute reCAPTCHA verification
      const recaptchaValue = window.grecaptcha.getResponse(widgetIdRef.current ?? undefined);
      
      if (!recaptchaValue) {
        alert('Please complete the reCAPTCHA verification');
        return;
      }
      
      setIsSubmitting(true);
      
      // Vercel is gone — POST directly to Service1 as a Contact lead.
      const { postBooking } = await import('/src/api/endpoints.js');
      const result = await postBooking({
        FullName: formData.name,
        Email: formData.email,
        PhoneNumber: formData.phone,
        Message: formData.message,
        ServiceType: 'Contact',
      });
      if (!result.success) {
        throw new Error(result.message || 'Failed to send contact form');
      }
      
      // Reset reCAPTCHA
      if (widgetIdRef.current !== null && typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', optin: false });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending lead data:', error);
      alert('There was an error submitting your contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Apply rounded corners for buttons based on section
  const buttonRounding = isResidential ? '!rounded-lg' : '';

  // Set background and text colors based on section
  const rightSideBgColor = isResidential ? 'bg-primary text-white' : 'bg-[#F8F5EC] text-black';
  const successMessageClasses = isResidential ? 
    'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6' :
    'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6';

  return (
    <>
      {/* Load reCAPTCHA v2 script */}
      {showRecaptcha && !scriptLoaded && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=explicit`}
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      )}
      
      <div className="flex items-center justify-center p-4">
        <section className="w-full max-w-[1250px] flex flex-col md:flex-row">
          {/* Left side with text */}
          <div className={`text-primary p-6 md:p-12 flex flex-col justify-center md:w-1/2 ${roundingClasses.leftSide} relative overflow-hidden`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${Img_1.src}")`,
            backgroundSize: 'cover',
            backgroundPosition: '0% 0%',
          }}>
            <h2 className="text-xl md:text-4xl font-bold mb-6 leading-tight text-white">Got any Questions?</h2>
            <p className="text-base md:text-base mb-4 text-white">We&apos;re here to help! Fill out the form and our team will get back to you as soon as possible.</p>
            <p className="text-base md:text-base text-white">Whether you need information about our moving services, want a custom quote, or have questions about your upcoming move, we&apos;re ready to assist you every step of the way.</p>
          </div>
          
          {/* Right side with contact form */}
          <div className={`${rightSideBgColor} p-6 md:p-12 flex items-center justify-center md:w-1/2 ${roundingClasses.rightSide}`}>
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Contact Us</h3>
                <p className="text-base md:text-base">Please fill in the form below</p>
              </div>

              {submitSuccess ? (
                <div className={successMessageClasses}>
                  Thank you for your message! We will contact you soon.
                </div>
              ) : null}

              <form onSubmit={handleSubmit} id='contact-form'>
                {/* Honeypot field - hidden from users but bots will fill it */}
                <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden">
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block font-medium mb-2 text-base md:text-base">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? 'rounded-xl' : ''}`} 
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block font-medium mb-2 text-base md:text-base">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? 'rounded-xl' : ''}`} 
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block font-medium mb-2 text-base md:text-base">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? 'rounded-xl' : ''}`} 
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block font-medium mb-2 text-base md:text-base">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent resize-y text-base md:text-base ${isResidential ? 'rounded-xl' : ''}`} 
                    required
                  ></textarea>
                </div>
                
                {/* reCAPTCHA v2 element - using a div with a ref for explicit rendering */}
                <div className="mb-6">
                  {showRecaptcha ? (
                    <>
                      <div ref={recaptchaRef} id="recaptcha-container" className="g-recaptcha"></div>
                      {!recaptchaLoaded && scriptLoaded && (
                        <div className="flex items-center justify-center py-2">
                          <svg className="animate-spin h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-base text-gray-500">Loading reCAPTCHA...</span>
                        </div>
                      )}
                      {showRecaptcha && !scriptLoaded && (
                        <div className="flex items-center justify-center py-2">
                          <svg className="animate-spin h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-base text-gray-500">Loading script...</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || (showRecaptcha && !recaptchaLoaded)}
                  className={`rainbow-button ${buttonRounding} text-white font-bold py-3 px-6 w-full focus:outline-none disabled:opacity-70 flex justify-center items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}