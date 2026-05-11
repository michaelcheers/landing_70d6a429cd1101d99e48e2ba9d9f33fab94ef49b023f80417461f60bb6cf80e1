import Image from "/src/components/Image.jsx";
import backgroundWarehouse from '/src/images/comm_move.webp';

export default function BackgroundWarehouse({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px]">
      <div className="absolute inset-0">
        <Image
          src={backgroundWarehouse}
          alt="Warehouse Moving Background"
          fill
          priority
          quality={85}
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}