"use client";
import { useEffect, useRef } from "react";
import { MomentieLogo } from "@/components/MomentieLogo";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { YumiSignature } from "@/components/YumiSignature";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const yumiRef = useRef<HTMLDivElement>(null);

  // Use the custom animation hook
  const { timelineRef } = useIntroAnimation({
    containerRef,
    svgRef,
    welcomeRef,
    yumiRef,
  });

  // Example external control
  useEffect(() => {
    timelineRef.current?.play();
  }, [timelineRef]);

  return (
    <main className="bg-[--color-momentie-bg] min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center w-full">
        <div
          ref={containerRef}
          className="relative w-full flex flex-col items-center justify-center"
          style={{ minHeight: "100vh" }}
        >
          <MomentieLogo ref={svgRef} className="w-full h-auto max-w-md" />

          <WelcomeMessage ref={welcomeRef} />

          <YumiSignature ref={yumiRef} />
        </div>
      </div>
    </main>
  );
}
