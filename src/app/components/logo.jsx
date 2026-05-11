
import React from 'react';
import Image from "/src/components/Image.jsx";
import GreenStorageLogo from '/src/images/green_storage.png';

interface LogoCarouselProps {
  city?: string;
}

const LogoCarousel = ({ city }: LogoCarouselProps) => {
  // Base logos
  const baseLogos = [
    { src: "/images/vcaCanada-w.png", alt: "VCA Canada", name: "VCA Canada" },
    { src: "/images/costco-w.png", alt: "Costco Wholesale", name: "Costco Wholesale" },
    { src: "/images/Loreal-w.png", alt: "L'Oreal", name: "L'Oreal" },
    { src: "/images/theRirtz-w.png", alt: "The Ritz-Carlton", name: "The Ritz-Carlton" },
  ];

  // Add Green Storage logo for Hamilton
  const cityLogos = city === 'hamilton'
    ? [...baseLogos, { src: GreenStorageLogo, alt: "Green Storage", name: "Green Storage" }]
    : baseLogos;

  // Duplicate logos for seamless loop
  const logos = [...cityLogos, ...cityLogos];

  return (
    <>
      <div className="w-screen flex justify-center mt-3 overflow-hidden">
        <div className="w-full max-w-7xl ">
          <div className="pb-6 md:pb-10">
            <div className="pb-2 font-bold text-[16px] md:text-[22px] border-b-1 md:flex text-center mb-4">
                  <div className="text-xl md:text-3xl font-bold text-primary">
                    Hear from our Customers,
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-tertiary">
                    the heart of our Success.
                  </div>
                </div>
            {/* Carousel Container */}
            <div className="relative overflow-hidden pt-5">
              <div className="flex animate-slide">
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-none bg-primary rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 "
                    style={{ width: '150px', height: '80px' }}
                  >
                    <div className="w-full h-full  p-2 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          sizes="110px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
          width: max-content;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-slide {
            animation: slide 20s linear infinite;
          }
        }

        @media (max-width: 480px) {
          .animate-slide {
            animation: slide 15s linear infinite;
          }
        }
      `}</style>
    </>
  );
};

export default LogoCarousel;