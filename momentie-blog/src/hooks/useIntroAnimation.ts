"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type RefObject, useEffect, useRef, useState } from "react";

interface UseIntroAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  svgRef: RefObject<SVGSVGElement | null>;
  yumiRef: RefObject<HTMLDivElement | null>;
  yumiIllustrationRef?: RefObject<HTMLDivElement | null>;
}

export function useIntroAnimation({
  containerRef,
  svgRef,
  yumiRef,
  yumiIllustrationRef,
}: UseIntroAnimationProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before running animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(
    (ctx) => {
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
      const paths = svg.querySelectorAll<SVGPathElement>("path");
      paths.forEach((path) => {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          fill: "transparent", // Start with hollow letters
        });
      });

      // Create and start the complete animation sequence
      const masterTimeline = gsap.timeline({ delay: 1 });

      paths.forEach((path, index) => {
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

      // Phase 3: Move MomentieEmiya from center to top
      // After all letters are drawn and filled, move the entire SVG to Frame 2 position
      masterTimeline.to(
        svg,
        {
          duration: 1.2, // Total duration of transition
          top: "120px", // Move to center of Frame 2 (30px padding + 59px to center in 237px title area)
          left: "50%", // Keep centered horizontally
          transform: "translateX(-50%)", // Only center horizontally, remove vertical centering
          y: 0, // Reset y transform
          ease: "power4.out", // Fast start, elegant slow stop
          onComplete: () => {
            if (process.env.NODE_ENV === "development") {
              console.log("Animation complete - SVG positioned at top");
            }
          },
        },
        "+=0.15", // Reduced delay for faster transition
      );

      // Phase 4: Simultaneous Yumi text and illustration animation (1 second total)
      const yumiText = yumiRef.current;
      const yumiIllustration = yumiIllustrationRef?.current;
      
      // Calculate the exact position after logo animation
      const logoEndPosition = masterTimeline.duration(); // Get current timeline duration

      // Yumi text water-ink effect
      if (yumiText) {
        // Initially hide the Yumi text
        gsap.set(yumiText, {
          opacity: 0,
        });

        // Water-ink effect using GSAP's text plugin
        const yumiTextContent = "Yumi";
        const yumiChars = yumiTextContent.split("");

        // Create spans for each character inside the nested p tag
        const yumiPElement = yumiText.querySelector("p");
        if (yumiPElement) {
          yumiPElement.innerHTML = yumiChars
            .map(
              (char) =>
                `<span class="inline-block opacity-0" style="filter: blur(15px); transform: scale(1.2);">${char}</span>`,
            )
            .join("");

          const yumiCharElements = yumiPElement.querySelectorAll("span");

          // Enhanced water-ink fade-in animation from center outwards
          masterTimeline.to(
            yumiCharElements,
            {
              opacity: 1,
              filter: "blur(0px)",
              transform: "scale(1)",
              duration: 1, // Total 1 second for the whole animation
              stagger: {
                each: 0.1, // Faster stagger for smoother center-to-edge effect
                from: "center", // Start from center and expand outwards
                ease: "power3.out",
              },
              ease: "power3.out",
            },
            logoEndPosition, // Start exactly when logo animation ends
          );
        }

        // Fade in the container simultaneously
        masterTimeline.to(
          yumiText,
          {
            opacity: 1,
            duration: 0.2, // Quick container fade-in
            ease: "power2.out",
          },
          logoEndPosition, // Same timing as character animation
        );
      }

      // Yumi illustration fade-in animation (simultaneous with text)
      if (yumiIllustration) {
        // Set initial state
        gsap.set(yumiIllustration, {
          opacity: 0,
          transform: "scale(0.95)", // Slightly smaller initial scale
          filter: "blur(3px)", // Initial blur for water-ink effect
        });

        // Water-ink style fade-in animation
        masterTimeline.to(
          yumiIllustration,
          {
            opacity: 1,
            transform: "scale(1)",
            filter: "blur(0px)",
            duration: 1, // Same 1 second duration as text
            ease: "power3.out", // Same easing as text for consistency
          },
          logoEndPosition, // Exact same timing as text animation
        );
      }

      timelineRef.current = masterTimeline;
      return () => {
        ctx.revert();
        timelineRef.current = null;
      };
    },
    { scope: containerRef, dependencies: [isClient] },
  );

  return {
    isClient,
    timeline: timelineRef.current,
  };
}
