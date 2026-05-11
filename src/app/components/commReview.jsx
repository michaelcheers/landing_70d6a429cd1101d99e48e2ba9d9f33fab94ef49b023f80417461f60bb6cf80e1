import { useState, useEffect, useRef } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import Image from "/src/components/Image.jsx";

import caraImage from '/src/images/cara.webp';
import uniqueImage from '/src/images/unique.webp';
import karenImage from '/src/images/karen.webp';
import sulaimanImage from '/src/images/sulaiman.webp';
import annaImage from '/src/images/anna.webp'
import aarronImage from '/src/images/aaron.webp'
import libbyImage from '/src/images/libby.webp'
import josephImage from '/src/images/joseph.webp'
import riddhiImage from '/src/images/riddhi.webp'
import keaImage from '/src/images/kea.webp'
import gregoryImage from '/src/images/greg.webp'
import paulineImage from '/src/images/pauline.webp'
import elyseImage from '/src/images/elyse.webp'
import onurImage from '/src/images/onur.webp'
import aneesaImage from '/src/images/aneesa.webp'
import Link from "/src/components/Link.jsx";

interface ReviewProps {
    from?: string;
}

export default function Review({from="toronto"} : ReviewProps) {
    const carouselItems = [
    {
        id: 4,
        text: 'I am always hesitant when selecting a moving company but I was suggested Moving Papa a lot and oh I am very glad that I chose them.',
        author: "Unique Basnet",
        image: uniqueImage,
    },
    {
        id: 5,
        text: "Highly recommend! These guys made my move so smooth, even with the unexpected challenge of no elevator access from the back.",
        author: "Karen Padilla",
        image: karenImage,
    },
    {
        id: 3,
        text: "Sheldon & Kevin came to the rescue!! I will say, regardless of any ups and down. Moving Papa came through.",
        author: "Cara Dorion",
        image: caraImage
    },
    {
        id: 7,
        text: "Luis and Able and Adrian did. Great job moving my place. Highly recommended!",
        author: "Sulaiman Mangal",
        image: sulaimanImage,
    },
    {
        id: 8,
        text: "So, the move is a nervous thing in itself. In Toronto traffic on a Saturday evening is more so. But the guys were extremely efficient and helped wrap all the furniture and fragile stuff.....",
        author: "Anna Ermolaeva",
        image: annaImage
    },
    {
        id: 9,
        text: "Edwin, Kevin, Jackson, Mrefu, were a fantastic team that that assist us in what we thought would have been a nightmare. They were grateful enough to come up with a solution at every turn...",
        author: "Aaron Azur",
        image: aarronImage
    },
    {
        id: 10,
        text: "Kevin, Jordan, and Gurman were awesome with moving us to our new home. Thank you so much! We recommend Moving Papa to anyone looking for great caring service.",
        author: "Libby Hanna",
        image: libbyImage
    },
    {
        id: 11,
        text: "Hello, Toronto I would like to recommend Jackson and Moses for moving needs to use Moving Papa. These are professional movers they fast and efficient for handling your stuff. I will use them again for moving.",
        author: "Joseph Birikundavi",
        image: josephImage
    },
    {
        id: 12,
        text: "Joel and Joseph were very professional and helped us with the move. Thank you so much for a seamless move. I'd 100% recommend Moving Papa for your big move :)",
        author: "Riddhi Vaiude",
        image: riddhiImage
    },
    {
        id: 13,
        text: "We are so glad to have found Moving Papa for our recent move and couldn't be happier with the experience. Patrick and Edwin were fantastic, incredibly efficient, careful with our belongings ....",
        author: "Kea",
        image: keaImage
    },
    {
        id: 14,
        text: "Gurman and Patrick were great and efficient!",
        author: "Gregory Jackson",
        image: gregoryImage
    },
    {
        id: 15,
        text: "I had a smooth moving experience from this professional and effective team. I recommend them for your moving. Thumbs up Jackson, Lukean, Patrick and Shane!!!",
        author: "Pauline Firka",
        image: paulineImage
    },
    {
        id: 16,
        text: "Thank you so much Moving Papa. These 3 guys did a great job. Very professional and efficient. Definitely would recommend if you're moving! Paulo is great driver!",
        author: "Elyse Thomson",
        image: elyseImage
    },
    {
        id: 17,
        text: "Thanks to Kelly and Jagdeep. They are so professional.",
        author: "Onur YilMaz",
        image: onurImage
    },
    {
        id: 18,
        text: "If you're moving and looking for a company to help, I highly recommend Moving Papa. From start to finish this company made our moving process so much easier and stress free. I spoke to .... ",
        author: "Aneesa",
        image: aneesaImage
    },
    ];
    
    const [currentSlide, setCurrentSlide] = useState(2);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const mobileSliderRef = useRef<HTMLDivElement>(null);
    
    const link =  from === "toronto" ? "/finalstep/commercial" : "/vancouver/finalstep/commercial"
    const handleNext = () => {
        if (isAnimating) return;
        // Check if we're at the last possible slide
        if (currentSlide + 3 >= carouselItems.length) return;
        
        setIsAnimating(true);
        setCurrentSlide(prev => prev + 1);
    };
    
    const handlePrev = () => {
        if (isAnimating || currentSlide === 0) return;
        setIsAnimating(true);
        setCurrentSlide(prev => prev - 1);
    };

    // Mobile functions
    const handleNext2 = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    };

    const handlePrev2 = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => 
            prev === 0 ? carouselItems.length - 1 : prev - 1
        );
    };
    
    // Touch event handlers for swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
        if (!isAnimating) {
            if (touchStart - touchEnd > 75) {
                // Swipe left - go to next slide
                handleNext2();
            }
            
            if (touchEnd - touchStart > 75) {
                // Swipe right - go to previous slide
                handlePrev2();
            }
        }
        // Reset values
        setTouchStart(0);
        setTouchEnd(0);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Match this duration with CSS transition
        
        // Update mobile slider position with animation
        if (mobileSliderRef.current) {
            mobileSliderRef.current.style.transform = `translateX(-${currentSlide * 103}%)`;
        }
        
        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <>
            <div className="hidden md:flex justify-center flex-col w-full">
                {/* Green Video Container */}
                <div className="pb-10 w-[1250px] mx-auto max-w-[1250px]">
                    <div className="mt-3 flex flex-col justify-center items-center">
                        <div className="border-b-1 w-full border-black flex justify-center">
                            <div className="border-1 border-black w-1/4 h-1/3 m-6">
                                <div className="flex items-center justify-center gap-x-2 text-black font-reg p-2 border-b-1 border-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path d="M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z" fill="#4285F4"/>
                                        <path d="M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z" fill="#34A853"/>
                                        <path d="M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z" fill="#FBBC05"/>
                                        <path d="M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z" fill="#EA4335"/>
                                    </svg>
                                    <span className="text-xs font-bold">
                                        Google Top Rated Service
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2">
                                    <span className="font-bold text-black text-[11px]">4.9 Excellent</span>
                                    <div className="flex gap-x-1" >
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 33 32" fill="none">
                                            <path d="M32.4135 0.238281H0.857178V31.7946H32.4135V0.238281Z" fill="white"/>
                                            <path d="M16.6348 21.5058L21.434 20.2895L23.4392 26.4693L16.6348 21.5058ZM27.6795 13.5181H19.2316L16.6348 5.56323L14.038 13.5181H5.59009L12.4273 18.4487L9.83047 26.4036L16.6677 21.4729L20.8752 18.4487L27.6795 13.5181Z" fill="#FBBC05"/>
                                        </svg>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review Carousel */}
                        <div className="mx-5 flex justify-center mt-20 mb-10">
                            <div className="flex flex-col items-center justify-center p-0">
                                <div className="flex items-center w-full">
                                    {currentSlide > 0 ? (
                                        <button onClick={handlePrev} className="text-tertiary cursor-pointer flex-shrink-0">
                                            <ArrowLeftCircleIcon className="h-12 w-12" />
                                        </button>
                                    ) : (
                                        <div className="h-12 w-12 flex-shrink-0"></div>
                                    )}

                                    <div className="flex w-full gap-x-4 justify-center overflow-hidden">
                                        <div 
                                            className="flex transition-transform duration-500 ease-in-out max-w-[1200px]"
                                            style={{
                                                transform: `translateX(-${currentSlide * 25}%)`,
                                                width: `${carouselItems.length * 25}%`
                                            }}
                                        >
                                            {carouselItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="w-1/4 flex-shrink-0 px-2"
                                                >
                                                    <div className="border-1 border-black flex flex-col h-[400px]">
                                                        <div className="p-4 flex flex-col h-full">
                                                            <div>
                                                                <p className="text-black font-bold">{item.author}</p>
                                                            </div>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, starIndex) => (
                                                                    <Image
                                                                        key={starIndex}
                                                                        src="/star.svg"
                                                                        alt="Star Rating"
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <div className="text-black font-reg pt-4 flex-grow text-sm">
                                                                <p>{item.text}</p>
                                                            </div>
                                                            <div className="mt-4 w-full h-[200px] relative">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.author}
                                                                    fill
                                                                    sizes="100%" 
                                                                    style={{ objectFit: 'cover' }}
                                                                    className=""
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {currentSlide < carouselItems.length - 4 ? (
                                        <button onClick={handleNext} className="text-tertiary cursor-pointer flex-shrink-0">
                                            <ArrowRightCircleIcon className="h-12 w-12" />
                                        </button>
                                    ) : (
                                        <div className="h-12 w-12 flex-shrink-0"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center px-3 md:px-0 mt-6">
                        <Link href={link} className="rainbow-button w-15/20 flex justify-center items-center font-bold">
                            Get a Quote
                        </Link>        
                    </div>   
                </div>                
            </div>
            
            {/* Mobile */}
            <div className="sm:hidden w-full">
                <h1 className="text-primary font-bold text-xl mt-10 pl-4">
                    Moving Your Business <span className="text-tertiary">Forward</span>
                </h1>

                <div className=" pb-10 w-full mx-auto">
                    <div className="mt-10 flex flex-col items-center space-y-6">
                        {/* Google Rating Card */}
                        <div className="border border-black w-11/12 py-4 text-center">
                            <div className="flex items-center justify-center gap-x-2 text-black font-reg pb-2 border-b">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <path d="M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z" fill="#4285F4"/>
                                    <path d="M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z" fill="#34A853"/>
                                    <path d="M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z" fill="#FBBC05"/>
                                    <path d="M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z" fill="#EA4335"/>
                                </svg>
                                <span className="text-[16px]">Google Top Rated Service</span>
                            </div>
                            <div className="flex flex-col items-center pt-2">
                                <span className="font-bold text-black text-[14px]">
                                    4.9 Excellent
                                </span>
                                <div className="flex gap-x-1 mt-1">
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 33 32" fill="none">
                                            <path d="M32.4135 0.238281H0.857178V31.7946H32.4135V0.238281Z" fill="white"/>
                                            <path d="M16.6348 21.5058L21.434 20.2895L23.4392 26.4693L16.6348 21.5058ZM27.6795 13.5181H19.2316L16.6348 5.56323L14.038 13.5181H5.59009L12.4273 18.4487L9.83047 26.4036L16.6677 21.4729L20.8752 18.4487L27.6795 13.5181Z" fill="#FBBC05"/>
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Animated Review Slider */}
                        <div className="md:hidden w-full  rounded-4xl">
                            <div className="w-full text-center relative overflow-hidden mx-auto">
                                <div className="relative">
                                {/* This container controls the width */}
                                <div className="w-[280px] h-[400px] mx-auto">
                                    {/* This div slides horizontally based on currentSlide with ref to match review component */}
                                    <div 
                                    ref={mobileSliderRef}
                                    className="flex w-full transition-transform duration-500 ease-in-out gap-x-2"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    >
                                        {carouselItems.map((item, index) => (
                                                                <div 
                                                                    key={index} 
                                                                    className="min-w-full w-full flex-shrink-0"
                                                                >
                                                                    <div className="border-1 border-primary  p-4 flex flex-col h-[400px] bg-primary">
                                                                        <div className="mb-1">
                                                                            <p className="text-white font-bold text-base">
                                                                                {item.author}
                                                                            </p>
                                                                            <div className="flex justify-center mt-1">
                                                                                {[...Array(5)].map((_, index) => (
                                                                                    <Image
                                                                                        key={index}
                                                                                        src="/star.svg"
                                                                                        alt="Star Rating"
                                                                                        width={23}
                                                                                        height={23}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-white text-sm mb-4">
                                                                            {item.text}
                                                                        </p>
                                                                        <div className="relative w-full h-[200px] mt-auto">
                                                                            <Image
                                                                                src={item.image}
                                                                                alt={item.author}
                                                                                fill
                                                                                style={{ objectFit: 'cover' }}
                                                                                className=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                    </div>
                                </div>
                                </div>
                                
                                {/* Navigation controls: Arrows next to dots */}
                                <div className="flex items-center justify-center mt-4 space-x-3">
                                {/* Left arrow button */}
                                <button 
                                    onClick={handlePrev2} 
                                    className="text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center mr-5"
                                    aria-label="Previous slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                
                                {/* Slide indicators */}
                                                    <div className="flex justify-center space-x-2">
                                                        {carouselItems.map((_, index) => (
                                                            <div 
                                                                key={index}
                                                                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-tertiary' : 'bg-primary bg-opacity-50'}`}
                                                                onClick={() => {
                                                                    if (!isAnimating) {
                                                                        setIsAnimating(true);
                                                                        setCurrentSlide(index);
                                                                    }
                                                                }}
                                                            ></div>
                                                        ))}                                    
                                                    </div>
                                
                                {/* Right arrow button */}
                                <button 
                                    onClick={handleNext2} 
                                    className="text-white hover:text-tertiary transition-colors bg-primary rounded-full h-10 w-10 flex justify-center items-center ml-1"
                                    aria-label="Next slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center w-full">
                            <Link href={link}className="rainbow-button flex justify-center items-center w-9/10 font-bold">
                                Get a Quote
                            </Link>        
                        </div>       
                    </div>
                </div>
            </div>
    </>

    )
}