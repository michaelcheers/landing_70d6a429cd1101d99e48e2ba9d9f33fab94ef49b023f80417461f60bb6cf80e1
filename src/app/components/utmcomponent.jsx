// src/app/components/utmcomponent.tsx

import { useEffect } from 'react';
import { useSearchParams } from "/src/router/Router.jsx";
import { useAddress } from '/src/app/contextValues.jsx';

// Interface for UTM data
interface UTMData {
  [key: string]: string;
}

export default function UtmHandler(): null {
  const searchParams = useSearchParams();
  const { setUtmData } = useAddress();

  useEffect(() => {
    const utmFields = [
      'utm_medium',
      'utm_keyword',
      'utm_campaign',
      'utm_source',
      'utm_content',
      'campaign'
    ];

    const data: UTMData = {};

    utmFields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) data[field] = value;
    });

    // Custom handling for ad platform IDs
    if (searchParams.get('msclkid')) data.utm_source = 'Microsoft';
    if (searchParams.get('bingid')) data.utm_source = 'Microsoft';
    if (searchParams.get('gad_source')) data.utm_source = 'Google';
    if (searchParams.get('gclid')) data.utm_source = 'Google';
    if (searchParams.get('wbraid') || searchParams.get('gbraid')) data.utm_source = 'Google';
    if (searchParams.get('fbclid')) data.utm_source = 'Meta';

    if (Object.keys(data).length > 0) {
      setUtmData(data);
      
      // Push UTM data to dataLayer
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'utm_captured',
          ...data
        });
        
        // Store UTM data in localStorage with 30-day expiration
        localStorage.setItem('movingpapa_utm', JSON.stringify(data));
        localStorage.setItem('movingpapa_utm_timestamp', Date.now().toString());
      }
    } else {
      // Try to retrieve UTM data from localStorage if no UTM parameters in URL
      if (typeof window !== 'undefined') {
        const storedUtm = localStorage.getItem('movingpapa_utm');
        const timestamp = localStorage.getItem('movingpapa_utm_timestamp');
        
        // Only use stored UTM data if it's less than 30 days old
        if (storedUtm && timestamp) {
          const age = Date.now() - parseInt(timestamp);
          if (age < 30 * 24 * 60 * 60 * 1000) { // 30 days in milliseconds
            const parsedUtm = JSON.parse(storedUtm);
            setUtmData(parsedUtm);
          }
        }
      }
    }
  }, [searchParams, setUtmData]);

  return null;
}