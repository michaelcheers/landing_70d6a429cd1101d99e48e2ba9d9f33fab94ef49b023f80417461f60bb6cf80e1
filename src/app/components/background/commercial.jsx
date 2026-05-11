import Image from "/src/components/Image.jsx";
import background from '/src/images/comm_move.webp';

export default function BackgroundComm({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full md:max-w-[1400px]">
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}