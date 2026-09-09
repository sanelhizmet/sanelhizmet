import Image from "next/image";
import { siteConfig } from "@/lib/content";

type LogoProps = {
  className?: string;
  /** SH ikonu */
  showIcon?: boolean;
  /** SH ikonu yanında "Sanel Hizmet" yazısı */
  showWordmark?: boolean;
};

export default function Logo({
  className = "",
  showIcon = true,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showIcon && (
        <span className="relative h-11 w-14 shrink-0 overflow-hidden md:h-12 md:w-16">
          <Image
            src="/logo.png"
            alt=""
            width={160}
            height={160}
            className="absolute left-1/2 top-0 h-[170%] w-auto max-w-none -translate-x-1/2 object-cover object-top"
            priority
            aria-hidden
          />
        </span>
      )}

      {showWordmark && (
        <span className="text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
