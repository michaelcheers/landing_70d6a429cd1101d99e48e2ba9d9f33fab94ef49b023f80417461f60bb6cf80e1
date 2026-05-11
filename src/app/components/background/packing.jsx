import Image from "/src/components/Image.jsx";
import background from '/src/images/packing.webp';

export default function BackgroundPacking({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px] rounded-lg">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Warehouse Moving Background"
          fill
          priority
          quality={85}
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}