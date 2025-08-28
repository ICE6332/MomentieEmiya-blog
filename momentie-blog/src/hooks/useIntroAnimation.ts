"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type RefObject, useEffect, useRef, useState } from "react";

interface UseIntroAnimationProps {
  containerRef: RefObject<HTMLDivElement>;
  svgRef: RefObject<SVGSVGElement>;
  welcomeRef: RefObject<HTMLDivElement>;
  yumiRef: RefObject<HTMLDivElement>;
}

export function useIntroAnimation({
  containerRef,
  svgRef,
  welcomeRef,
  yumiRef,
}: UseIntroAnimationProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before running animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(
    () => {
      // Only run animations on client side after hydration
      if (!isClient) return;

      const container = containerRef.current;
      const svg = svgRef.current;
      if (!container || !svg) return;

      // Initial container animation
      gsap.fromTo(
        container,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );

      // SVG fade in
      gsap.fromTo(
        svg,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2 },
      );

      // Initialize all paths to invisible state
      const paths = svg.querySelectorAll("path");
      paths.forEach((path: SVGPathElement) => {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          fill: "transparent", // Start with hollow letters
        });
      });

      // Create and start the complete animation sequence
      const masterTimeline = gsap.timeline({ delay: 1 });

      paths.forEach((path: SVGPathElement, index: number) => {
        // Phase 1: Stroke animation (drawing the letter outline)
        masterTimeline.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.16, // ~0.16s per letter to fit in ~2.1s total for stroke phase
            ease: "power2.inOut",
          },
          index * 0.23,
        ); // Stagger each letter by 0.23s (0.16s stroke + 0.07s gap)

        // Phase 2: Fill animation (solid color)
        masterTimeline.to(
          path,
          {
            fill: "var(--color-momentie-text)",
            stroke: "var(--color-momentie-text)",
            duration: 0.07, // Quick fill transition
            ease: "power2.out",
          },
          index * 0.23 + 0.18, // Start fill 0.18s after stroke starts (0.16s + 0.02s gap)
        );
      });

      // Phase 3: Transition to Figma layout
      // After all letters are drawn and filled, move the entire SVG to final position
      masterTimeline.to(
        svg,
        {
          duration: 1.2, // Total duration of transition
          scale: 0.6, // Scale down to match Figma design
          top: "60px", // Fixed position at top
          left: "50%", // Keep centered
          transform: "translateX(-50%)", // Center horizontally
          y: 0, // Reset y transform
          position: "absolute",
          ease: "power4.out", // Fast start, elegant slow stop
          onComplete: () => {
            if (process.env.NODE_ENV !== "production") {
              console.info(
                "Intro animation complete - SVG positioned per design",
              );
            }
            // Integrate monitoring or analytics here if needed
          },
        },
        "+=0.3", // Small delay after the last fill animation
      );

      // Phase 4: Typewriter effect for "Welcome to my Channel"
      const welcomeText = welcomeRef.current;
      if (welcomeText) {
        // Initially hide and position the welcome text (centered below MomentieEmiya)
        gsap.set(welcomeText, {
          opacity: 0,
          position: "absolute",
          top: "160px", // Fixed position below MomentieEmiya
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "140px", // Match Figma design height
        });

        // Fade in the container
        masterTimeline.to(
          welcomeText,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "+=0.3", // Delayed start - after SVG animation completes
        );

        // Typewriter effect using GSAP's text plugin
        const text = "Welcome to my Channel";
        const chars = text.split("");

        // Create spans for each character inside the nested p tag
        const pElement = welcomeText.querySelector("div p");
        if (pElement) {
          pElement.innerHTML = chars
            .map(
              (char) =>
                `<span class="inline-block opacity-0">${char === " " ? "&nbsp;" : char}</span>`,
            )
            .join("");

          const charElements = pElement.querySelectorAll("span");

          // Animate each character appearing
          masterTimeline.to(
            charElements,
            {
              opacity: 1,
              duration: 0.05,
              stagger: {
                each: 0.05,
                from: "center", // Start from center and expand outwards
                ease: "none",
              },
              ease: "none",
            },
            "+=0.2", // Small delay after container appears
          );
        }
      }

      // Phase 5: Water-ink fade-in effect for "Yumi"
      const yumiText = yumiRef.current;
      if (yumiText) {
        // Initially hide and position the Yumi text
        gsap.set(yumiText, {
          opacity: 0,
          position: "absolute",
          top: "70%", // Position at bottom area
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "265px", // Match Figma design height
        });

        // Fade in the container first
        masterTimeline.to(
          yumiText,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "+=0.5", // Start after Welcome animation completes
        );

        // Water-ink effect using GSAP's text plugin
        const yumiTextContent = "Yumi";
        const yumiChars = yumiTextContent.split("");

        // Create spans for each character inside the nested p tag
        const yumiPElement = yumiText.querySelector("div p");
        if (yumiPElement) {
          yumiPElement.innerHTML = yumiChars
            .map(
              (char) =>
                `<span class="inline-block opacity-0" style="filter: blur(10px);">${char}</span>`,
            )
            .join("");

          const yumiCharElements = yumiPElement.querySelectorAll("span");

          // Water-ink fade-in animation from center outwards
          masterTimeline.to(
            yumiCharElements,
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: {
                each: 0.15,
                from: "center", // Start from center and expand outwards
                ease: "power2.out",
              },
              ease: "power2.out",
            },
            "+=0.3", // Small delay after container appears
          );
        }
      }

      timelineRef.current = masterTimeline;
    },
    { scope: containerRef, dependencies: [isClient] },
  );

  return {
    isClient,
    timelineRef,
  };
}
