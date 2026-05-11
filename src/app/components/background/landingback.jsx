import Image from "/src/components/Image.jsx";
import background from '/src/images/res+move.webp';

export default function BackgroundLanding({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px] rounded-4xl">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Warehouse Moving Background"
          fill
          priority
          quality={85}
          className="object-cover object-bottom"
          placeholder="blur"
        />
      </div>
      <div className="absolute inset-0" />
      <div className="relative h-full pt-15">
        {children}
      </div>
    </div>
  );
}