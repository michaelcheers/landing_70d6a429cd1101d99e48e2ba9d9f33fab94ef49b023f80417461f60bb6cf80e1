import React from 'react';
import Image from "/src/components/Image.jsx"
import bigimg from '/src/images/service-img.webp'
import smallimg from '/src/images/greg.webp'
import Link from "/src/components/Link.jsx";

interface MovingServicesGridProps {
  from?: string;
}

const MovingServicesGrid = ({ from = "toronto" }: MovingServicesGridProps) => {
  // Services data based on the second image content with slight rewording
  const services = [
    {
      title: "Packing & Unpacking",
      popular: true,
      icon: "box",
      description: "We carefully wrap, box, and secure your belongings, then help you unpack and organize once you reach your new location."
    },
    {
      title: "Assembling & Disassembling",
      popular: true,
      icon: "furniture",
      description: "Our expert team takes apart your furniture and reassembles it at your new location quickly and with precision."
    },
    {
      title: "Furniture Disposal",
      popular: true,
      icon: "recycle",
      description: "Need to get rid of unwanted furniture? We'll arrange eco-friendly recycling or proper disposal services."
    },
    {
      title: "Insurance Certification",
      popular: true,
      icon: "headset",
      description: "We provide comprehensive Certificate of Insurance (COI) documentation, ensuring your move is fully protected."
    }
  ];

  const link =  from === "toronto" ? "/finalstep/residential" : "/vancouver/finalstep/residential"
  // Icon components for each service
//   const getIcon = (iconName: string) => {
//     switch (iconName) {
//       case 'box':
//         return (
//           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
//             </svg>
//           </div>
//         );
//       case 'furniture':
//         return (
//           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M20 10V7a2 2 0 00-2-2H6a2 2 0 00-2 2v3"></path>
//               <path d="M20 14H4v4a2 2 0 002 2h12a2 2 0 002-2v-4z"></path>
//               <path d="M12 10v4M8 10v4M16 10v4"></path>
//             </svg>
//           </div>
//         );
//       case 'recycle':
//         return (
//           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"></path>
//               <path d="M16 6l-4-4-4 4"></path>
//               <path d="M12 2v13"></path>
//             </svg>
//           </div>
//         );
//       case 'headset':
//         return (
//           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//             </svg>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

  return (
    <div className="w-19/20 md:w-full pl-5 md:pl-0">
      <div className="max-w-7xl mx-auto md:flex justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 md:w-1/2 md:mr-4">
            {/* First empty card */}
            <div className="border col-span-1 border-black rounded-4xl p-6 bg-white relative h-70 overflow-hidden">
                <Image 
                    src={smallimg} 
                    alt='' 
                    fill 
                    sizes="100%" 
                    style={{ 
                        objectFit: 'cover', 
                        objectPosition: '0% 30%',
                        transform: 'scale(1.15)'  /* Add slight zoom to the image */
                    }} 
                    className='rounded-lg'
                />
            </div>
            
            {/* Light green card */}
            <div className="border col-span-1 border-black  rounded-lg p-6 bg-primary h-70">
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <span className="text-7xl font-bold text-white">99%</span>
                  </div>
                  
                  <div className="text-white text-lg uppercase mb-4 font-bold">
                    Customer Satisfaction
                  </div>
                  
                  <div className="w-24 h-1 bg-green-600 mb-4"></div>
                  
                  <div className="flex space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="text-xs text-white text-center font-light">
                    Based on hundreds of verified customer reviews
                  </div>
                </div>
              </div>
            </div>
            
            {/* Team image */}
            <div className="border border-black rounded-4xl col-span-1 md:col-span-2 relative h-85">
                <Image src={bigimg} alt='' fill sizes="100%" style={{ objectFit: 'cover', objectPosition: '70% 10%' }} className='rounded-4xl'/>
            </div>
            
            {/* Services card */}

            </div>
          <div className="border border-black rounded-lg p-6 bg-white md:w-1/2 mt-2 md:mt-0">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">Moving is a Craft we love</h2>
            <div className="space-y-4 mb-8 h-full">
              {services.map((service, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white mr-2">
                    {index + 1}
                  </span>
                  <p className="font-bold text-base md:text-base">{service.title}: <br/><span className="font-regular">{service.description}</span></p>
                </div>
              ))}
                <p className="font-bold text-base md:text-base">
                Beyond moving: our additional services for a seamless experience from start to finish.
                </p>
                
                <div className="h-1/5 flex items-end">
                  <div className='border-t border-gray-300 pt-6 w-full'>
                    <Link href={link} className="w-full bg-red-600 text-white py-3 !font-bold !rounded-lg font-medium rainbow-button">
                        Get a Quote
                    </Link>                    
                  </div>

                </div>              
            </div>
            

          </div>        

      </div>
    </div>
  );
};

export default MovingServicesGrid;