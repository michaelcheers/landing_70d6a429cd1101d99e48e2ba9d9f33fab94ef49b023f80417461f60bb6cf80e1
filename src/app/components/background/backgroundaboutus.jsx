import Image from "/src/components/Image.jsx";
import backgroundWarehouse from '/src/images/pexels-tima-miroshnichenko-6169185.webp';

export default function BackgroundAboutUs({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px] md:rounded-lg">
      <div className="absolute inset-0">
        <Image
          src={backgroundWarehouse}
          alt="Warehouse Moving Background"
          fill
          priority
          quality={85}
          className="object-cover"
          placeholder="blur"
          style={{ objectPosition: '50% 30%' }}
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}