import Image from "/src/components/Image.jsx";
import Link from "/src/components/Link.jsx";
import heart from '/src/images/example-3.webp'; // Default image path, replace with your image

const Schedule = ({ 
  title = "Virtual Estimates",
  image = heart, // Default image path, replace with your image
  description1 = "Our goal is to make moving as simple as possible. We offer free virtual estimates to give you an accurate quote without having to schedule an in-home visit.",
  description2 = "If you're ready to get started with your move, click the button below to request your free video estimate today.",
  buttonText = "Schedule Video Estimate",
  buttonLink = "https://calendly.com/hello-movingpapa/30min"
}) => {
  return (
    <div className="w-full flex justify-center md:py-8 px-5 mt-4 md:mt-0">
      <div className="w-full md:w-[1250px] flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[450px] rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="Moving professional"
            fill
            className="object-cover rounded-4xl"
            priority
            style={{ 
              // Move image much higher up for mobile (-2000%)
              objectPosition: '50% -1000%',  
              transform: 'scale(1.00)' 
            }}
          />
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-4">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-6 text-center md:text-start">
            {title}
          </h2>
          
          <p className="text-base md:text-base text-white mb-6">
            {description1}
          </p>
          
          <p className="text-base md:text-regular text-white mb-8">
            {description2}
          </p>
          
          <Link href={buttonLink}>
            <button className="rainbow-button text-white font-bold py-3 px-6 !rounded-lg w-full md:w-auto md:px-10 flex justify-center items-center">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Schedule;