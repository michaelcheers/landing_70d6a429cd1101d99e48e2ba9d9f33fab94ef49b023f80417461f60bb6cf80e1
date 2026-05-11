// Comprehensive Location Tracking System for Moving Papa
// This handles Toronto vs Vancouver user detection and location-specific ad tracking

interface LocationData {
  detectedLocation: 'toronto' | 'vancouver' | 'other';
  marketArea: 'GTA' | 'Greater Vancouver' | 'Other Ontario' | 'Other BC' | 'Other Canada';
  branchId: string;
  confidence: 'high' | 'medium' | 'low';
  detectionMethod: 'address' | 'postal' | 'utm' | 'ip' | 'browser' | 'default';
  specificCity?: string;
  province?: string;
}

interface UTMData {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
}

interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Market definitions
const MARKET_CONFIG = {
  TORONTO: {
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130", // Your actual Toronto branch ID
    name: "Toronto Branch",
    marketArea: 'GTA' as const,
    cities: [
      'toronto', 'north york', 'scarborough', 'etobicoke', 'york',
      'mississauga', 'brampton', 'markham', 'vaughan', 'richmond hill',
      'oakville', 'burlington', 'milton', 'ajax', 'pickering', 'whitby',
      'oshawa', 'newmarket', 'aurora', 'king city', 'concord', 'thornhill',
      'woodbridge', 'maple', 'kleinburg', 'caledon', 'halton hills'
    ],
    postalPrefixes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'L4', 'L5', 'L6', 'L7', 'L9', 'L0']
  },
  VANCOUVER: {
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e", // Your actual Vancouver branch ID
    name: "Vancouver Branch", 
    marketArea: 'Greater Vancouver' as const,
    cities: [
      'vancouver', 'burnaby', 'richmond', 'surrey', 'coquitlam', 'langley',
      'north vancouver', 'west vancouver', 'new westminster', 'port moody',
      'maple ridge', 'delta', 'white rock', 'port coquitlam', 'pitt meadows',
      'anmore', 'belcarra', 'lions bay', 'bowen island', 'tsawwassen',
      'ladner', 'cloverdale', 'newton', 'guildford', 'fleetwood'
    ],
    postalPrefixes: ['V5', 'V6', 'V7', 'V3', 'V4', 'V2', 'V1', 'V0']
  }
};

// Enhanced location detection function
export const detectUserLocation = async (
  pickupAddress?: Address | null,
  destinationAddress?: Address | null,
  utmData?: UTMData
): Promise<LocationData> => {
  
  // Method 1: Address-based detection (highest confidence)
  if (pickupAddress?.city) {
    const addressResult = detectFromAddress(pickupAddress);
    if (addressResult.detectedLocation !== 'other') {
      return { ...addressResult, confidence: 'high', detectionMethod: 'address' };
    }
  }

  // Method 2: Postal code detection (high confidence)
  if (pickupAddress?.zipCode) {
    const postalResult = detectFromPostalCode(pickupAddress.zipCode);
    if (postalResult.detectedLocation !== 'other') {
      return { ...postalResult, confidence: 'high', detectionMethod: 'postal' };
    }
  }

  // Method 3: UTM campaign detection (medium confidence)
  if (utmData) {
    const utmResult = detectFromUTM(utmData);
    if (utmResult.detectedLocation !== 'other') {
      return { ...utmResult, confidence: 'medium', detectionMethod: 'utm' };
    }
  }

  // Method 4: Browser geolocation (medium confidence)
//   const geoResult = await detectFromGeolocation();
//   if (geoResult.detectedLocation !== 'other') {
//     return { ...geoResult, confidence: 'medium', detectionMethod: 'browser' };
//   }

  // Method 5: IP-based detection (low confidence)
  const ipResult = await detectFromIP();
  if (ipResult.detectedLocation !== 'other') {
    return { ...ipResult, confidence: 'low', detectionMethod: 'ip' };
  }

  // Default fallback
  return {
    detectedLocation: 'other',
    marketArea: 'Other Canada',
    branchId: 'b8164028-c730-4fc4-912c-b1f4016f1130',
    confidence: 'low',
    detectionMethod: 'default'
  };
};

// Address-based detection
const detectFromAddress = (address: Address): Omit<LocationData, 'confidence' | 'detectionMethod'> => {
  const city = address.city?.toLowerCase().trim() || '';
  
  // Check Toronto area
  if (MARKET_CONFIG.TORONTO.cities.some(torontoCity => 
    city.includes(torontoCity) || torontoCity.includes(city))) {
    return {
      detectedLocation: 'toronto',
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId,
      specificCity: address.city,
      province: address.state
    };
  }

  // Check Vancouver area
  if (MARKET_CONFIG.VANCOUVER.cities.some(vancouverCity => 
    city.includes(vancouverCity) || vancouverCity.includes(city))) {
    return {
      detectedLocation: 'vancouver',
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId,
      specificCity: address.city,
      province: address.state
    };
  }

  return {
    detectedLocation: 'other',
    marketArea: 'Other Canada',
    branchId: 'DEFAULT_BRANCH',
    specificCity: address.city,
    province: address.state
  };
};

// Postal code detection
const detectFromPostalCode = (postalCode: string): Omit<LocationData, 'confidence' | 'detectionMethod'> => {
  const postal = postalCode.toUpperCase().replace(/\s/g, '');
  
  // Check Toronto area postal codes
  if (MARKET_CONFIG.TORONTO.postalPrefixes.some(prefix => postal.startsWith(prefix))) {
    return {
      detectedLocation: 'toronto',
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId
    };
  }

  // Check Vancouver area postal codes
  if (MARKET_CONFIG.VANCOUVER.postalPrefixes.some(prefix => postal.startsWith(prefix))) {
    return {
      detectedLocation: 'vancouver',
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId
    };
  }

  return {
    detectedLocation: 'other',
    marketArea: 'Other Canada',
    branchId: 'DEFAULT_BRANCH'
  };
};

// UTM campaign detection
const detectFromUTM = (utmData: UTMData): Omit<LocationData, 'confidence' | 'detectionMethod'> => {
  const campaign = (utmData.utm_campaign || '').toLowerCase();
  const content = (utmData.utm_content || '').toLowerCase();
  const term = (utmData.utm_term || '').toLowerCase();
  
  const allUtm = `${campaign} ${content} ${term}`;

  // Toronto indicators
  if (allUtm.includes('toronto') || allUtm.includes('gta') || 
      allUtm.includes('ontario') || allUtm.includes('mississauga') ||
      allUtm.includes('brampton') || allUtm.includes('markham')) {
    return {
      detectedLocation: 'toronto',
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId
    };
  }

  // Vancouver indicators
  if (allUtm.includes('vancouver') || allUtm.includes('burnaby') ||
      allUtm.includes('richmond') || allUtm.includes('surrey') ||
      allUtm.includes('bc') || allUtm.includes('lower_mainland')) {
    return {
      detectedLocation: 'vancouver',
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId
    };
  }

  return {
    detectedLocation: 'other',
    marketArea: 'Other Canada',
    branchId: 'DEFAULT_BRANCH'
  };
};

// Browser geolocation detection
// const detectFromGeolocation = async (): Promise<Omit<LocationData, 'confidence' | 'detectionMethod'>> => {
//   try {
//     if (!navigator.geolocation) {
//       throw new Error('Geolocation not supported');
//     }

//     const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject, {
//         timeout: 5000,
//         maximumAge: 300000 // 5 minutes
//       });
//     });

//     const { latitude, longitude } = position.coords;
    
//     // Toronto area coordinates (rough bounds)
//     if (latitude >= 43.5 && latitude <= 44.1 && 
//         longitude >= -79.9 && longitude <= -79.0) {
//       return {
//         detectedLocation: 'toronto',
//         marketArea: MARKET_CONFIG.TORONTO.marketArea,
//         branchId: MARKET_CONFIG.TORONTO.branchId
//       };
//     }

//     // Vancouver area coordinates (rough bounds)
//     if (latitude >= 49.0 && latitude <= 49.4 && 
//         longitude >= -123.3 && longitude <= -122.5) {
//       return {
//         detectedLocation: 'vancouver',
//         marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
//         branchId: MARKET_CONFIG.VANCOUVER.branchId
//       };
//     }

//     return {
//       detectedLocation: 'other',
//       marketArea: 'Other Canada',
//       branchId: 'DEFAULT_BRANCH'
//     };
//   } catch (error) {
//     console.log(error)    
//     return {
//       detectedLocation: 'other',
//       marketArea: 'Other Canada',
//       branchId: 'DEFAULT_BRANCH'
//     };
//   }
// };

// IP-based detection (using a free service)
const detectFromIP = async (): Promise<Omit<LocationData, 'confidence' | 'detectionMethod'>> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.country_code !== 'CA') {
      return {
        detectedLocation: 'other',
        marketArea: 'Other Canada',
        branchId: 'DEFAULT_BRANCH'
      };
    }

    const city = (data.city || '').toLowerCase();
    const region = (data.region || '').toLowerCase();

    // Check if in Toronto area
    if (region.includes('ontario') && (
        city.includes('toronto') || city.includes('mississauga') ||
        city.includes('brampton') || city.includes('markham'))) {
      return {
        detectedLocation: 'toronto',
        marketArea: MARKET_CONFIG.TORONTO.marketArea,
        branchId: MARKET_CONFIG.TORONTO.branchId,
        specificCity: data.city,
        province: data.region
      };
    }

    // Check if in Vancouver area
    if (region.includes('british columbia') && (
        city.includes('vancouver') || city.includes('burnaby') ||
        city.includes('richmond') || city.includes('surrey'))) {
      return {
        detectedLocation: 'vancouver',
        marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
        branchId: MARKET_CONFIG.VANCOUVER.branchId,
        specificCity: data.city,
        province: data.region
      };
    }

    return {
      detectedLocation: 'other',
      marketArea: region.includes('ontario') ? 'Other Ontario' : 
                  region.includes('british columbia') ? 'Other BC' : 'Other Canada',
      branchId: 'DEFAULT_BRANCH',
      specificCity: data.city,
      province: data.region
    };
  } catch (error) {
    console.log(error)
    return {
      detectedLocation: 'other',
      marketArea: 'Other Canada',
      branchId: 'DEFAULT_BRANCH'
    };
  }
};

// Enhanced analytics tracking
export const trackLocationEvent = (
  eventName: string,
  locationData: LocationData,
  additionalData: Record<string, unknown> = {}
) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      location_detected: locationData.detectedLocation,
      market_area: locationData.marketArea,
      branch_id: locationData.branchId,
      detection_confidence: locationData.confidence,
      detection_method: locationData.detectionMethod,
      specific_city: locationData.specificCity,
      province: locationData.province,
      ...additionalData
    });
  }

  // Also track in Facebook Pixel if available
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_type: 'location_detection',
      content_name: locationData.marketArea,
      custom_data: {
        detected_location: locationData.detectedLocation,
        market_area: locationData.marketArea,
        confidence: locationData.confidence
      }
    });
  }
};

// Function to create location-specific referral source
export const createLocationReferralSource = (
  utmData: UTMData,
  locationData: LocationData,
  serviceType: 'residential' | 'commercial' | 'storage' | 'lastmile'
): string => {
  const baseSource = getTrafficSource(utmData);
  const locationSuffix = locationData.detectedLocation === 'toronto' ? 'Toronto' :
                        locationData.detectedLocation === 'vancouver' ? 'Vancouver' : 'Other';
  
  return `${baseSource} - ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} - ${locationSuffix}`;
};

// Helper function to get traffic source
const getTrafficSource = (utmData: UTMData): string => {
  if (utmData.gclid || utmData.gbraid || utmData.wbraid) return 'Google Ads';
  if (utmData.fbclid) return 'Facebook Ads';
  if (utmData.msclkid) return 'Microsoft Ads';
  if (utmData.utm_source?.toLowerCase().includes('google')) return 'Google';
  if (utmData.utm_source?.toLowerCase().includes('facebook')) return 'Facebook';
  return 'Organic';
};

export { MARKET_CONFIG };