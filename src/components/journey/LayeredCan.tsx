import Image from "next/image";

const CAN_BASE = "/images/cans/can-base.png";

const LABEL = { width: 4.3221, top: 0.01731, height: 0.98269 };

type LayeredCanProps = {
  label: string;
  alt: string;
  labelX: number;
};

export default function LayeredCan({ label, alt, labelX }: LayeredCanProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full overflow-hidden"
      style={{
        maskImage: `url(${CAN_BASE})`,
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskImage: `url(${CAN_BASE})`,
        WebkitMaskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <Image
        src={CAN_BASE}
        alt=""
        fill
        preload
        unoptimized
        sizes="30vw"
        className="select-none object-cover"
        draggable={false}
      />
      <Image
        data-can-label
        src={label}
        alt=""
        width={1705}
        height={1017}
        preload
        unoptimized
        className="absolute max-w-none select-none mix-blend-color-burn"
        style={{
          left: `${labelX * 100}%`,
          top: `${LABEL.top * 100}%`,
          width: `${LABEL.width * 100}%`,
          height: `${LABEL.height * 100}%`,
        }}
        draggable={false}
      />
    </div>
  );
}
