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

export default function Review() {
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
        text: "We are so glad to have found Moving Papa for our recent move and couldn’t be happier with the experience. Patrick and Edwin were fantastic, incredibly efficient, careful with our belongings ....",
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
    
    const handleNext = () => {
        if (isAnimating) return;
        // Check if we're at the last possible slide (showing 3 cards)
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
            <div className="hidden md:flex justify-center flex-col">

                {/* Green Video Container */}
                <div className="pb-10 w-[1250px] mx-auto rounded-4xl border-1">
                        <div className="flex flex-col justify-center items-center">
                            {/* Review Carousel */}
                            <div className="flex justify-center mt-10 w-full">
                                <div className="flex items-center w-full max-w-[1150px]">
                                    {
                                        currentSlide > 0 && (
                                            <button onClick={handlePrev} className="text-primary cursor-pointer flex-shrink-0 mr-4">
                                                <ArrowLeftCircleIcon className="h-12 w-12" />
                                            </button>
                                        )
                                    }
                                    {
                                        currentSlide === 0 && (
                                            <div className="h-12 w-12 flex-shrink-0 mr-4"></div>
                                        )
                                    }
                                    
                                    <div className="overflow-hidden flex-1">
                                        <div 
                                            className="flex transition-transform duration-500 ease-in-out"
                                            style={{
                                                transform: `translateX(-${currentSlide * 33.333}%)`
                                            }}
                                        >
                                            {carouselItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-shrink-0 px-2"
                                                    style={{ width: '33.333%' }}
                                                >
                                                    <div className="border-1 border-primary rounded-4xl flex flex-col h-[400px] bg-primary">
                                                        <div className="p-4 flex flex-col h-full">
                                                            <div>
                                                                <p className="text-white font-bold">{item.author}</p>
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
                                                            <div className="text-white font-reg pt-4 flex-grow text-sm">
                                                                <p>{item.text}</p>
                                                            </div>
                                                            <div className="mt-4 w-full h-[200px] relative">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.author}
                                                                    fill
                                                                    sizes="100%" 
                                                                    style={{ objectFit: 'cover' }}
                                                                    className="rounded-4xl"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {
                                        currentSlide < carouselItems.length-3 &&(
                                            <button onClick={handleNext} className="text-primary cursor-pointer flex-shrink-0 ml-4">
                                                <ArrowRightCircleIcon className="h-12 w-12" />
                                            </button>
                                        )
                                    }
                                    {
                                        currentSlide >= carouselItems.length-3 && (
                                            <div className="h-12 w-12 flex-shrink-0 ml-4"></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                </div>                


            </div>
            
            {/* Mobile */}

            <div className="md:hidden w-full pb-10 rounded-4xl">
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
                                                    <div className="border-1 border-primary rounded-4xl p-4 flex flex-col h-[400px] bg-primary">
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
                                                                className="rounded-4xl"
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
        </>

    )
}