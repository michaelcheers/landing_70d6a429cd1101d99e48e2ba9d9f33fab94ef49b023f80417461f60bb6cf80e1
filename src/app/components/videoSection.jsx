
import React, { useState, useRef } from 'react';

interface ServiceProps {
  from : string
}
const VideoSection = ({from} : ServiceProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Replace this with your actual Vercel Blob storage URL
  const VIDEO_URL ='https://cbpotjmvdg44vvzt.public.blob.vercel-storage.com/Moving%20Papa%20V5-nzp0kOVRvQmm1ZXx0yMo4t42Hk18nQ.mp4';

  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

    const roundingClasses = from.includes("commercial") ? {
        round:"",
        bgcolor:"bg-primary",
        text:"text-white"
    } : {
        round:"rounded-2xl",
        bgcolor:"bg-primary",
        text:"text-white"
    };
  return (
    <div className={`w-full flex justify-center py-5 md:py-10 ${roundingClasses.bgcolor}`}>
      <div className="w-full max-w-[1400px] mx-4 md:mx-0">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`text-2xl md:text-3xl flex justify-center font-bold ${roundingClasses.text} mb-4`}>
            See Moving Papa in <p className='text-tertiary'>&nbsp;Action</p>
          </h2>
          <p className={`text-base hidden md:flex md:text-lg font-regular ${roundingClasses.text} max-w-2xl mx-auto`}>
            Watch how our professional team handles your belongings with care and precision.
            Every move tells a story of trust and reliability.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className={`relative aspect-video ${roundingClasses.round} overflow-hidden shadow-2xl`}>
            {/* HTML5 Video Player */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={isPlaying}
              preload="metadata"
              onClick={!isPlaying ? handlePlayVideo : undefined}
              poster="/images/thumbnail.png"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              crossOrigin="anonymous"
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay (only show when not playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={handlePlayVideo}
                  className="group relative"
                  aria-label="Play video"
                >
                  {/* Play button background */}
                  <div className="w-15 h-15 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                    {/* Play icon */}
                    <svg
                      className="w-8 h-8 md:w-12 md:h-12 text-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7L8 5z"/>
                    </svg>
                  </div>

                  {/* Pulse animation ring */}
                  <div className="absolute inset-0 w-15 h-15 md:w-24 md:h-24 rounded-full border-2 border-white/50 animate-pulse"></div>
                </button>

                {/* Video Title Overlay */}
                <div className="absolute bottom-3 md:bottom-6 left-6 text-white">
                  <h3 className="text-xs md:text-xl font-bold mb-1">Professional Moving Services</h3>
                  <p className="text-[10px] md:text-base opacity-90">Experience the Moving Papa difference</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
