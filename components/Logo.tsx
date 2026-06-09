import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/tbb-gold-logo.png"
      alt="The Black Basket logo"
      width={180}
      height={80}
      className="h-auto w-44 object-contain"
      priority
    />
  );
}

