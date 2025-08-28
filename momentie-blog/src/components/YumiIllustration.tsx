import Image from "next/image";
import type React from "react";
import { forwardRef } from "react";

export const YumiIllustration = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "" }, ref) => {
  return (
    <div ref={ref} className={`${className}`}>
      <Image
        src="/Yumi_web_3.png"
        alt="Yumi Illustration"
        width={440}
        height={734}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
});

YumiIllustration.displayName = "YumiIllustration";
