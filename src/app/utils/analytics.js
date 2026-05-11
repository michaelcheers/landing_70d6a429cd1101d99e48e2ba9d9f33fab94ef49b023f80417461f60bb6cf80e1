// src/app/utils/analytics.ts

// Define TypeScript interfaces for analytics data
interface FormData {
    origin?: string;
    destination?: string;
    move_date?: string | null;
    [key: string]: unknown; // We'll keep this for flexibility, but limit its use
  }
  
  interface LocationData {
    origin?: string;
    destination?: string;
    [key: string]: unknown; // We'll keep this for flexibility, but limit its use
  }
  
  // Define interface for dataLayer events
  interface DataLayerEvent {
    event: string;
    [key: string]: string | number | boolean | undefined | null;
  }
  
  // Function to safely push to dataLayer
  const pushToDataLayer = (data: DataLayerEvent): void => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(data);
    }
  };
  
  // Track form submissions
  export const trackFormSubmission = (formType: string, formData: FormData = {}): void => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('Form submission tracking (dev only):', { formType, formData });
        return;
      }

    pushToDataLayer({
      event: 'form_submission',
      form_type: formType,
      origin_location: formData.origin || '',
      destination_location: formData.destination || '',
      move_date: formData.move_date || ''
    });
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_category: formType
      });
    }
  };
  
  // Track quote requests
  export const trackQuoteRequest = (serviceType: string, locations: LocationData = {}): void => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('Form submission tracking (dev only):', { serviceType, locations });
        return;
      }
    pushToDataLayer({
      event: 'quote_request',
      service_type: serviceType,
      origin_location: locations.origin || '',
      destination_location: locations.destination || ''
    });
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_type: 'service',
        content_name: serviceType
      });
    }
  };
  
  // Track phone calls
  export const trackPhoneCall = (): void => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('Phone submission tracking (dev only):');
        return;
      }

    pushToDataLayer({
      event: 'phone_call'
    });
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact');
    }
  };
  
  // Track email clicks
  export const trackEmailClick = (): void => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('email submission tracking (dev only):');
        return;
      }

    pushToDataLayer({
      event: 'email_click'
    });
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact');
    }
  };
  
  // Track successful conversions
  export const trackConversionComplete = (formType: string, additionalData: Record<string, string> = {}): void => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('Form submission tracking (dev only):', { formType, additionalData });
        return;
      }

    pushToDataLayer({
      event: 'conversion_complete',
      form_type: formType,
      ...additionalData
    });
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: formType
      });
    }
  };
  
  // Define window interface to include dataLayer and fbq for TypeScript
  declare global {
    interface Window {
      dataLayer: Array<Record<string, unknown>>;
      fbq: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    }
  }