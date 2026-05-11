
interface SEOConfig {
  city: string;
  province: string;
  phoneNumber: string;
  serviceAreas: string[];
  businessName: string;
  address: string;
}

export const TORONTO_CONFIG: SEOConfig = {
  city: 'Toronto',
  province: 'Ontario',
  phoneNumber: '647-251-8188',
  serviceAreas: ['Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill'],
  businessName: 'Moving Papa Toronto',
  address: '200 Fairbank Ave, York, ON M6B 1G1'
};

export const VANCOUVER_CONFIG: SEOConfig = {
  city: 'Vancouver',
  province: 'British Columbia',
  phoneNumber: '604-373-5582',
  serviceAreas: ['Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'North Vancouver'],
  businessName: 'Moving Papa Vancouver',
  address: '33 Commercial Drive, Vancouver, BC V5L 0A2'
};

export const OTTAWA_CONFIG: SEOConfig = {
  city: 'Ottawa',
  province: 'Ontario',
  phoneNumber: '343-500-0488',
  serviceAreas: ['Ottawa', 'Gatineau', 'Nepean', 'Kanata', 'Orleans', 'Barrhaven'],
  businessName: 'Moving Papa Ottawa',
  address: '123 Wellington Street, Ottawa, ON K1A 0A9'
};

export const CALGARY_CONFIG: SEOConfig = {
  city: 'Calgary',
  province: 'Alberta',
  phoneNumber: '587-812-5952',
  serviceAreas: ['Calgary', 'Airdrie', 'Chestermere', 'Okotoks', 'Cochrane', 'Canmore'],
  businessName: 'Moving Papa Calgary',
  address: '123 17th Avenue SW, Calgary, AB T2S 0A1'
};

export const EDMONTON_CONFIG: SEOConfig = {
  city: 'Edmonton',
  province: 'Alberta',
  phoneNumber: '368-210-0125',
  serviceAreas: ['Edmonton', 'St. Albert', 'Sherwood Park', 'Spruce Grove', 'Leduc', 'Fort Saskatchewan'],
  businessName: 'Moving Papa Edmonton',
  address: '123 Jasper Avenue, Edmonton, AB T5J 1S9'
};

export function generateSEOMetadata(
  config: SEOConfig,
  pageType: 'home' | 'residential' | 'commercial' | 'storage' | 'packing' | 'reviews' | 'about',
  customTitle?: string,
  customDescription?: string
): Metadata {
  const { city, province, serviceAreas, businessName } = config;
  
  const pageMetadata = {
    home: {
      title: `${customTitle || `Professional Movers ${city} | ${businessName}`}`,
      description: `${customDescription || `Professional moving services in ${city}, ${province}. Serving ${serviceAreas.join(', ')}. Licensed, insured, and trusted by thousands. Get your free quote today!`}`,
      keywords: `movers ${city.toLowerCase()}, moving company ${city.toLowerCase()}, ${city.toLowerCase()} movers, moving services ${province.toLowerCase()}`
    },
    residential: {
      title: `Residential Moving ${city} | Local Home Movers | ${businessName}`,
      description: `Expert residential moving services in ${city}. Professional home movers serving ${serviceAreas.join(', ')}. Licensed, insured, and affordable. Book your move today!`,
      keywords: `residential movers ${city.toLowerCase()}, home movers ${city.toLowerCase()}, house moving ${city.toLowerCase()}, local movers ${province.toLowerCase()}`
    },
    commercial: {
      title: `Commercial Movers ${city} | Office Moving Services | ${businessName}`,
      description: `Professional commercial moving services in ${city}. Office relocations, warehouse moves, and business moving throughout ${serviceAreas.join(', ')}.`,
      keywords: `commercial movers ${city.toLowerCase()}, office movers ${city.toLowerCase()}, business moving ${city.toLowerCase()}, ${province.toLowerCase()} commercial moving`
    },
    storage: {
      title: `Storage Solutions ${city} | Secure Storage Services | ${businessName}`,
      description: `Climate-controlled storage solutions in ${city}. Short-term and long-term storage options serving ${serviceAreas.join(', ')}.`,
      keywords: `storage ${city.toLowerCase()}, storage solutions ${province.toLowerCase()}, climate controlled storage ${city.toLowerCase()}`
    },
    packing: {
      title: `Packing Services ${city} | Professional Packers | ${businessName}`,
      description: `Expert packing services in ${city}. Professional packers and unpacking services throughout ${serviceAreas.join(', ')}.`,
      keywords: `packing services ${city.toLowerCase()}, professional packers ${province.toLowerCase()}, packing and unpacking ${city.toLowerCase()}`
    },
    about: {
      title: `About ${businessName} | Trusted Movers in ${city}`,
      description: `Learn about ${businessName}, your trusted moving company in ${city}, ${province}. Our story, values, and commitment to excellent service.`,
      keywords: `about ${businessName.toLowerCase()}, ${city.toLowerCase()} moving company, trusted movers ${province.toLowerCase()}`
    },
    reviews: {
      title: `Customer Reviews | ${businessName} | ${city} Moving Company`,
      description: `Read real customer reviews of ${businessName}. See why we're the top-rated moving company in ${city} and ${serviceAreas.join(', ')}.`,
      keywords: `${businessName.toLowerCase()} reviews, ${city.toLowerCase()} movers reviews, moving company testimonials ${province.toLowerCase()}`
    }
  };

  const meta = pageMetadata[pageType];
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: 'en_CA',
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: pageType === 'home'
        ? (city === 'Vancouver' ? '/vancouver' : city === 'Ottawa' ? '/ottawa' : city === 'Calgary' ? '/calgary' : city === 'Edmonton' ? '/edmonton' : '/')
        : (city === 'Vancouver' ? `/vancouver/${pageType}` : city === 'Ottawa' ? `/ottawa/${pageType}` : city === 'Calgary' ? `/calgary/${pageType}` : city === 'Edmonton' ? `/edmonton/${pageType}` : `/${pageType}`)
    },
    other: {
      'geo.region': province === 'Ontario' ? 'CA-ON' : province === 'British Columbia' ? 'CA-BC' : province === 'Alberta' ? 'CA-AB' : 'CA-ON',
      'geo.placename': city,
      'business.contact_data.street_address': city === 'Vancouver' ? '33 Commercial Drive' : city === 'Ottawa' ? '123 Wellington Street' : city === 'Calgary' ? '123 17th Avenue SW' : city === 'Edmonton' ? '123 Jasper Avenue' : '200 Fairbank Ave',
      'business.contact_data.locality': city,
      'business.contact_data.region': province === 'Ontario' ? 'ON' : province === 'British Columbia' ? 'BC' : province === 'Alberta' ? 'AB' : 'ON',
      'business.contact_data.postal_code': city === 'Vancouver' ? 'V5L 0A2' : city === 'Ottawa' ? 'K1A 0A9' : city === 'Calgary' ? 'T2S 0A1' : city === 'Edmonton' ? 'T5J 1S9' : 'M6B 1G1',
      'business.contact_data.country_name': 'Canada',
      'business.contact_data.phone_number': config.phoneNumber,
    }
  };
}