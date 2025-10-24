import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/Logo1.png"        // Path in public folder
        alt="Haus of Meem Logo"
        width={40}            // adjust as needed
        height={40}
        priority               // ensures fast loading
      />
      <span className="text-xl font-headline font-bold text-primary tracking-wide">
      Haus of Meem
    </span>
    </div>
  );
}
