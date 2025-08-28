"use client";
import { useRef } from "react";
import { MomentieLogo } from "@/components/MomentieLogo";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { YumiIllustration } from "@/components/YumiIllustration";
import { YumiSignature } from "@/components/YumiSignature";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const yumiRef = useRef<HTMLDivElement>(null);
  const yumiIllustrationRef = useRef<HTMLDivElement>(null);

  // Use the custom animation hook
  useIntroAnimation({
    containerRef,
    svgRef,
    welcomeRef,
    yumiRef,
    yumiIllustrationRef,
  });

  return (
    <main className="bg-[--color-momentie-bg] min-h-screen relative">
      <div ref={containerRef} className="relative w-full min-h-screen">
        {/* Top container for final layout (Frame 2 - 37:340) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1440px] p-[10px]">
          {/* Placeholder for MomentieEmiya (will move here) */}
          <div className="h-[140px] flex items-center justify-center">
            {/* MomentieEmiya will animate to this position */}
          </div>
          {/* Welcome message container */}
          <div className="h-[140px]  flex items-center justify-center">
            <WelcomeMessage ref={welcomeRef} className="opacity-0 w-full" />
          </div>
        </div>

        {/* MomentieEmiya - starts at center (Frame 1 - 37:34), moves to top */}
        <MomentieLogo
          ref={svgRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[82px]"
        />

        {/* Bottom section with Yumi text and illustration */}
        {/* Yumi illustration layer (37:191) - behind */}
        <YumiIllustration
          ref={yumiIllustrationRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[440px] h-[734px] opacity-0 z-10"
        />

        {/* Yumi text layer (Frame 3 - 37:322) - in front */}
        <div
          ref={yumiRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center z-20"
          style={{
            width: "1349px",
            height: "432px",
          }}
        >
          <YumiSignature className="" />
        </div>
      </div>
    </main>
  );
}
