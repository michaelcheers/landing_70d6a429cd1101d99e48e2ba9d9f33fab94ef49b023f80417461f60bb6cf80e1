import { useState, useEffect, useRef } from "react";
import Link from "/src/components/Link.jsx";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import jakeImage from '/src/images/jake.png'
import arezouImage from '/src/images/arezou.png'
import tiyamImage from '/src/images/tiyam.png'
import julieImage from '/src/images/julie.png'
import lyImage from '/src/images/ly.png'
import rajatImage from '/src/images/rajat.png'
import ilanaImage from '/src/images/ilana.png'
import riyaazImage from '/src/images/riyaaz.png'
import geraldineImage from '/src/images/geraldine.png'
import suharaImage from '/src/images/suhara.png'
import chelseyImage from '/src/images/chelsey.png'

interface ServiceProps {
  from : string
}

export default function VideoReview({from} : ServiceProps) {
 const carouselItems = [
        {
            id: 1,
            text: 'Ankush and Anmol were amazing, helpful, absolutely very quick in their work.! 5/5 would recommend',
            author: "Jake Jolliffe",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/jake.mp4',
            thumbnail: jakeImage
        },
        {
            id: 2,
            text: "Patrick, Gurman, Shane were absolutely amazing!!! They made our move so seamless and handled all our furniture with such care. I can't stress how wonderful they were so accommodating for last minute changes and were so professional and pleasant! Can't recommend them enough for all their help!! 1000/10!!",
            author: "Arezou A",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/arezou.mp4',
            thumbnail: arezouImage
        },        
        {
            id: 4,
            text: "Jackson,Shane and Kevin worked very hard today! They were very methodical, careful, neat and a very nice team!",
            author: "Julie Durante",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/julie.mp4',
            thumbnail: julieImage
        },
        {
            id: 5,
            text: "Kelli, Anmol, Saksham did a great job today with our big move! We had a lot of boxes and they managed everything well. Instructions were followed! Highly recommend moving papa for your next move!",
            author: "Ly Pham",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/ly.mp4',
            thumbnail: lyImage
        },
        {
            id: 6,
            text: "Great guys Aniket and Deepak, Great Company. Highly recommend. 5 stars :)",
            author: "Rajat Vindu Singh",
            video: 'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/rajat.mp4',
            thumbnail: rajatImage
        },

        {
            id: 3,
            text: "Patrick and Harjeet were amazing! Highly reccomend if you're in need of movers. 5 stars!",
            author: "Tiyam Shiribabadi",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/tiyam.mp4',
            thumbnail: tiyamImage
        },
        {
            id: 7,
            text: "Paulo, Jacob and Edwin did a fantastic job - worked super hard on a long hot day and took great care of our stuff. Thanks!",
            author: "Ilana Cohen",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/ilana.mp4',
            thumbnail: ilanaImage
        },
        {
            id: 8,
            text: "Gurman and Dave are superstars! Friendly, efficient and overall perfect service! Would definitely recommend and would use Moving Papa again!",
            author: "Riyaaz Dindar",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/riyaaz.mp4',
            thumbnail: riyaazImage
        },
        {
            id: 9,
            text: "Excellent service! Highly recommend! Had the service of Depanshu and Anik. They were very professional and efficient. Hard workers that drove 2.5 hours to reach me for a short move. Very appreciated.",
            author: "Geraldine Huynh",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/geraldine.mp4',
            thumbnail: geraldineImage
        },
        {
            id: 10,
            text: "Rohit, Jackson, Isaac and Deepak were such a great help! Thanks Moving Papa!! Highly recommend.",
            author: "Suhara Abd Hamid",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/suhara.mp4',
            thumbnail: suharaImage
        },
        {
            id: 11,
            text: "Joel, Jackson, Isaac, and Ambrose were all amazing helping us with our move! They were all very friendly, helpful, and careful with our belongings. We have a lot of heavy furniture but moving papa made it a breeze, highly recommend!",
            author: "Chelsey Sterling",
            video:'https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/chelsey.mp4',
            thumbnail: chelseyImage
        }
    ];

    const roundingClasses = from.includes("commercial") ? {
        round:"",
        bgcolor:"bg-primary",
        text:"text-white"
    } : {
        round:"rounded-2xl",
        bgcolor:"bg-primary",
        text:"text-white"
    };
    const [currentSlide, setCurrentSlide] = useState(2);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [playingVideos, setPlayingVideos] = useState<Record<string | number, boolean>>({});
    const mobileSliderRef = useRef<HTMLDivElement>(null);
    const cardVideoRefs = useRef<Record<string | number, HTMLVideoElement | null>>({});

    const handlePlayCardVideo = (cardId: string | number) => {
        setPlayingVideos(prev => ({ ...prev, [cardId]: true }));
        if (cardVideoRefs.current[cardId]) {
            cardVideoRefs.current[cardId].play();
        }
    };
    
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
            <div className="hidden md:flex justify-center flex-col w-full">
                {/* Video Section */}
                <div className="pb-10 w-[1250px] mx-auto max-w-[1250px] rounded-4xl">
                    <div className="flex flex-col justify-center items-center">
                        
                        {/* Review Carousel */}
                        <div className="flex justify-center mt-10 w-full">
                            <div className="flex items-center w-full max-w-[1150px]">
                                {
                                    currentSlide > 0 && (
                                        <button onClick={handlePrev} className="text-white cursor-pointer flex-shrink-0 mr-4">
                                            <ArrowLeftCircleIcon className="h-12 w-12" />
                                        </button>
                                    )
                                }
                                {
                                    currentSlide === 0 && (
                                        <div className="h-12 w-12 flex-shrink-0 mr-4"></div>
                                    )
                                }
                                
                                <div className="overflow-hidden flex-1 max-w-[1050px]">
                                    <div 
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `translateX(-${currentSlide * 33.333}%)`
                                        }}
                                    >
                                        {carouselItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0 px-2 max-w-[350px]"
                                                style={{ width: '33.333%' }}
                                            >
                                                <div className="border-1 border-primary rounded-4xl flex flex-col h-[550px] bg-[#06170e]">
                                                    <div className="flex flex-col h-full">
                                                        {/* Video Section with Fixed Height */}
                                                        <div className="relative w-full h-[350px] rounded-t-4xl overflow-hidden mb-3">
                                                            <video
                                                                ref={el => { cardVideoRefs.current[item.id] = el; }}
                                                                className="w-full h-full object-cover rounded-t-4xl"
                                                                controls={playingVideos[item.id]}
                                                                preload="metadata"
                                                                playsInline
                                                                onClick={!playingVideos[item.id] ? () => handlePlayCardVideo(item.id) : undefined}
                                                                poster={item.thumbnail.src}
                                                                onPlay={() => setPlayingVideos(prev => ({ ...prev, [item.id]: true }))}
                                                                onPause={() => setPlayingVideos(prev => ({ ...prev, [item.id]: false }))}
                                                                crossOrigin="anonymous"
                                                            >
                                                                <source src={item.video} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>

                                                            {/* Small Play Button for Cards */}
                                                            {!playingVideos[item.id] && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                                    <button
                                                                        onClick={() => handlePlayCardVideo(item.id)}
                                                                        className="group relative"
                                                                        aria-label="Play video"
                                                                    >
                                                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                                                                            <svg 
                                                                                className="w-6 h-6 text-primary ml-0.5" 
                                                                                fill="currentColor" 
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path d="M8 5v14l11-7L8 5z"/>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-white/50 animate-pulse"></div>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-3">
                                                            <div className="mb-2">
                                                                    <p className="text-white font-bold text-sm">{item.author}</p>
                                                                </div>
                                                                <div className="flex mb-2">
                                                                    {[...Array(5)].map((_, starIndex) => (
                                                                        <svg
                                                                            key={starIndex}
                                                                            className="w-4 h-4 text-yellow-400 fill-current"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                                <div className="text-white font-regular flex-grow text-xs leading-relaxed overflow-hidden">
                                                                    <p className="line-clamp-4">{item.text}</p>
                                                                </div>                                                              
                                                        </div>
                                                            
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {
                                    currentSlide < carouselItems.length-3 &&(
                                        <button onClick={handleNext} className="text-white cursor-pointer flex-shrink-0 ml-4">
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
                
                {
                    from != "thankyou" &&
                    <div className="text-center mt-8">
                    <p className={`text-base md:text-lg  ${roundingClasses.text} mb-6`}>
                        Ready to make your move stress-free?
                    </p>
                    <Link  href={from} className="bg-tertiary hover:bg-tertiary/90 font-bold text-white px-8 py-3 !rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg rainbow-button">
                        Get Your Free Quote Today
                    </Link>
                    </div>          
                }
                              
            </div>
            
            {/* Mobile */}
            <div className="md:hidden w-full pb-10 rounded-4xl">

                {/* Mobile Reviews */}
                <div className="w-full text-center relative overflow-hidden mx-auto">
                    <div className="relative">
                        <div className="w-[320px] mx-auto">
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
                                        <div className="border-1 border-primary rounded-4xl flex flex-col h-[500px] bg-[#06170e] p-6">
                                            <div className="flex flex-col h-full">
                                                {/* Mobile Video Section with Fixed Height */}
                                                <div 
                                                    className="relative w-full h-[300px] rounded-lg overflow-hidden mb-3"
                                                    onTouchStart={(e) => e.stopPropagation()}
                                                    onTouchMove={(e) => e.stopPropagation()}
                                                    onTouchEnd={(e) => e.stopPropagation()}
                                                >
                                                    <video
                                                        ref={el => { cardVideoRefs.current[`mobile-${item.id}`] = el; }}
                                                        className="w-full h-full object-cover"
                                                        controls={playingVideos[`mobile-${item.id}`]}
                                                        preload="metadata"
                                                        playsInline
                                                        disablePictureInPicture
                                                        controlsList="nodownload nofullscreen noremoteplayback"
                                                        onClick={!playingVideos[`mobile-${item.id}`] ? (e) => {
                                                            e.stopPropagation();
                                                            handlePlayCardVideo(`mobile-${item.id}`);
                                                        } : undefined}
                                                        poster={item.thumbnail.src}
                                                        onPlay={() => setPlayingVideos(prev => ({ ...prev, [`mobile-${item.id}`]: true }))}
                                                        onPause={() => setPlayingVideos(prev => ({ ...prev, [`mobile-${item.id}`]: false }))}
                                                        crossOrigin="anonymous"
                                                    >
                                                        <source src={item.video} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>

                                                    {/* Small Play Button for Mobile Cards */}
                                                    {!playingVideos[`mobile-${item.id}`] && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePlayCardVideo(`mobile-${item.id}`);
                                                                }}
                                                                className="group relative"
                                                                aria-label="Play video"
                                                            >
                                                                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300">
                                                                    <svg 
                                                                        className="w-5 h-5 text-primary ml-0.5" 
                                                                        fill="currentColor" 
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M8 5v14l11-7L8 5z"/>
                                                                    </svg>
                                                                </div>
                                                                <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-white/50 animate-pulse"></div>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-2">
                                                    <p className="text-white font-bold text-sm">{item.author}</p>
                                                </div>
                                                <div className="flex justify-center mb-2">
                                                    {[...Array(5)].map((_, starIndex) => (
                                                        <svg
                                                            key={starIndex}
                                                            className="w-4 h-4 text-yellow-400 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                        </svg>
                                                    ))}
                                                </div>
                                                <div className="text-white font-regular flex-grow text-xs leading-relaxed text-left overflow-hidden">
                                                    <p className="line-clamp-4">{item.text}</p>
                                                </div>                                                            
                                            </div>                                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation controls */}
                    <div className="flex items-center justify-center mt-4 space-x-3">
                        <button 
                            onClick={handlePrev2} 
                            className="text-primary hover:text-tertiary transition-colors bg-white rounded-full h-10 w-10 flex justify-center items-center mr-5"
                            aria-label="Previous slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        <div className="flex justify-center space-x-2">
                            {carouselItems.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? 'bg-tertiary' : 'bg-white bg-opacity-50'}`}
                                    onClick={() => {
                                        if (!isAnimating) {
                                            setIsAnimating(true);
                                            setCurrentSlide(index);
                                        }
                                    }}
                                ></div>
                            ))}                                    
                        </div>
                        
                        <button 
                            onClick={handleNext2} 
                            className="text-primary hover:text-tertiary transition-colors bg-white rounded-full h-10 w-10 flex justify-center items-center ml-1"
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {
                    from != "thankyou" &&
                    <div className="text-center mt-8 md:mt-12">
                    <p className={`text-base md:text-lg  ${roundingClasses.text} mb-6`}>
                        Ready to make your move stress-free?
                    </p>
                    <Link  href={from} className="bg-tertiary hover:bg-tertiary/90 font-bold text-white px-8 py-3 !rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg rainbow-button">
                        Get Your Free Quote Today
                    </Link>
                    </div>          
                }
                
            </div>
        </>
    )
}