import Image from "/src/components/Image.jsx";
import background from '/src/images/papa-adv.webp';

export default function BackgroundThankyou({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px] rounded-4xl">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Warehouse Moving Background"
          fill
          priority
          quality={85}
          className="object-cover"
          placeholder="blur"
          style={{ objectPosition: '50% 30%' }}
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full pt-15">
        {children}
      </div>
    </div>
  );
}