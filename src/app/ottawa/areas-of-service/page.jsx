
import React, { useState } from 'react';
import Link from "/src/components/Link.jsx";

// Define the service type keys
type ServiceType =
  | 'local-moving'
  | 'packing'
  | 'storage'
  | 'warehouse-moving'
  | 'office-moving'
  | 'special-equipment'
  | 'art-moving'
  | 'last-mile';

// Service areas data organized by service type
const serviceAreas: Record<ServiceType, string[]> = {
  'local-moving': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'packing': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'storage': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'warehouse-moving': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'office-moving': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'special-equipment': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'art-moving': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ],
  'last-mile': [
    'Toronto', 'Hamilton', 'Oakville', 'Barrie', 'Oshawa', 'Mississauga', 'Pickering', 'Vaughan',
    'Scarborough', 'Caledon', 'Brampton', 'Milton', 'St. Catharines', 'London',
    'Kingston', 'Burlington', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora',
    'Kitchener', 'Waterloo', 'Bradford', 'Etobicoke', 'North York', 'York', 'Vancouver',
    'Burnaby', 'Richmond', 'Surrey', 'Kelowna', 'Victoria', 'Vancouver Island', 'Ottawa',
    'Gatineau', 'Saskatoon', 'Halifax', 'Regina', 'Calgary', 'Edmonton', 'New Brunswick'
  ]
};

const serviceTypeLabels: Record<ServiceType, string> = {
  'local-moving': 'Local Moving',
  'packing': 'Packing',
  'storage': 'Storage',
  'warehouse-moving': 'Warehouse Moving',
  'office-moving': 'Office Moving',
  'special-equipment': 'Special Equipment Moving',
  'art-moving': 'Art Moving',
  'last-mile': 'Last Mile'
};

// Ottawa area cities for routing
const ottawaAreas = ['Ottawa', 'Gatineau'];

// Function to generate the appropriate link based on location and service type
const generateServiceLink = (location: string, serviceType: ServiceType): string => {
  // Convert location to slug format (lowercase, spaces to hyphens)
  const locationSlug = location.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  // Convert service type to match your new format
  const serviceSlugMap: Record<ServiceType, string> = {
    'local-moving': 'local-move',        // Changed from 'residential' to 'local-move'
    'packing': 'packing',                // Keep as is
    'storage': 'storage',                // Keep as is
    'warehouse-moving': 'warehouse-move', // Changed from 'warehouse' to 'warehouse-move'
    'office-moving': 'office-move',      // Changed from 'office' to 'office-move'
    'special-equipment': 'special-equipment-move', // Changed from 'specialEquipment' to 'special-equipment-move'
    'art-moving': 'art-move',            // Changed from 'art' to 'art-move'
    'last-mile': 'last-mile'             // Changed from 'lastmile' to 'last-mile'
  };

  const serviceSlug = serviceSlugMap[serviceType];

  // Return the new format: /service-areas/[service-type-location]
  return `/service-areas/${serviceSlug}-${locationSlug}`;
};

// Function to sort locations with Ottawa areas first
const sortLocationsByRegion = (locations: string[], prioritizeOttawa = true) => {
  if (!prioritizeOttawa) return locations;

  const ottawaLocs = locations.filter(loc => ottawaAreas.includes(loc));
  const otherLocs = locations.filter(loc => !ottawaAreas.includes(loc));

  return [...ottawaLocs, ...otherLocs];
};

const ServiceAreasPage = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>('local-moving');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleServiceChange = (serviceType: ServiceType) => {
    if (serviceType !== selectedService) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedService(serviceType);
        setIsAnimating(false);
      }, 150); // Half of the transition duration for smooth effect
    }
  };

  // Get sorted locations - you can change this to true for Ottawa pages
  const getSortedLocations = (serviceType: ServiceType) => {
    const locations = serviceAreas[serviceType] || [];
    return sortLocationsByRegion(locations, true); // Set to true for Ottawa pages
  };

  return (
    <div className="w-full min-h-screen mt-13 md:mt-20">
      {/* Service Type Chips */}
      <div className="w-full py-8 px-4 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Service Type:
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(serviceTypeLabels) as ServiceType[]).map((serviceType) => (
              <button
                key={serviceType}
                onClick={() => handleServiceChange(serviceType)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border-2 cursor-pointer ${
                  selectedService === serviceType
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                }`}
              >
                {serviceTypeLabels[serviceType]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Areas Grid */}
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}>
            {getSortedLocations(selectedService).map((location, index) => {
              const serviceLink = generateServiceLink(location, selectedService);

              return (
                <Link
                  key={`${selectedService}-${index}`}
                  href={serviceLink}
                  className=" border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-lg group cursor-pointer block h-full flex flex-col"
                >
                  <div className="flex items-center space-x-4 flex-1 relative">
                    {/* Location Icon */}
                    <div className="bg-primary p-3 rounded-full group-hover:bg-tertiary transition-colors duration-300 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>

                    {/* Location Text */}
                    <div className="flex-1 min-h-0 ">
                      <h4 className="text-lg font-bold text-primary group-hover:text-tertiary transition-colors duration-300 leading-tight">
                        {serviceTypeLabels[selectedService]} in {location}
                      </h4>
                    </div>

                    {/* Arrow - appears on hover from right on desktop, always visible on mobile */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-x-8 md:group-hover:translate-x-0 md:opacity-0 md:group-hover:opacity-100 opacity-100 translate-x-0 transition-all duration-300 ease-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary group-hover:text-tertiary transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className={`bg-primary p-8 rounded-lg transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}>
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-white mb-6">
                Get a free quote for {serviceTypeLabels[selectedService].toLowerCase()} services in your area
              </p>
              <Link
                href="/quote"
                className="bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button inline-block !rounded-lg"
              >
                Get A Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="w-full py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary mb-6">
            Why Choose Moving Papa?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Fast Response</h4>
              <p className="text-gray-600">Quick response times across all our service areas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Local Expertise</h4>
              <p className="text-gray-600">Deep knowledge of local areas and regulations</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">24/7 Availability</h4>
              <p className="text-gray-600">Round-the-clock service in major metropolitan areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasPage;
