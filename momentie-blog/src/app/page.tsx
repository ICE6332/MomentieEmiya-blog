"use client";
import { useRef } from "react";
import { MomentieLogo } from "@/components/MomentieLogo";
import { YumiIllustration } from "@/components/YumiIllustration";
import { YumiSignature } from "@/components/YumiSignature";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const yumiRef = useRef<HTMLDivElement>(null);
  const yumiIllustrationRef = useRef<HTMLDivElement>(null);

  // Use the custom animation hook
  useIntroAnimation({
    containerRef,
    svgRef,
    yumiRef,
    yumiIllustrationRef,
  });

  return (
    <main className="bg-[#f0eee6] size-full min-h-screen relative">
      <div ref={containerRef} className="relative size-full min-h-screen">
        {/* Frame 2 - Top section (37:340) */}
        <div className="absolute box-border content-stretch flex flex-col h-[297px] items-start justify-start left-1/2 pb-[60px] pt-[30px] px-5 top-0 translate-x-[-50%] w-[1400px]">
          <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-center justify-center mb-[-30px] min-h-px min-w-px overflow-clip relative shrink-0 w-[1351px]">
            {/* MomentieEmiya will animate to this position */}
          </div>
        </div>

        {/* MomentieEmiya - starts at center, moves to Frame 2 */}
        <MomentieLogo
          ref={svgRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[82px]"
        />

        {/* Frame 3 - Bottom section (37:322) */}
        <div className="absolute bottom-0 h-[727px] left-1/2 translate-x-[-50%] w-[1400px]">
          {/* Yumi illustration layer - behind */}
          <YumiIllustration
            ref={yumiIllustrationRef}
            className="absolute bg-center bg-cover bg-no-repeat h-[728px] left-[480px] opacity-0 rounded-[30px] top-[7px] w-[437px] z-10"
          />

          {/* Yumi text layer - in front */}
          <div
            ref={yumiRef}
            className="absolute bottom-[60px] flex flex-col h-[120px] justify-center leading-[0] not-italic text-[288px] text-[rgba(68,158,203,0.8)] text-center translate-x-[-50%] translate-y-[50%] w-[900px] z-20"
            style={{ 
              left: "calc(50% - 20px)"
            }}
          >
            <YumiSignature className="leading-[normal]" />
          </div>
        </div>
      </div>
    </main>
  );
}
