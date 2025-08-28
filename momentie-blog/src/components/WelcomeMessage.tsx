import { forwardRef } from "react";

interface WelcomeMessageProps {
  className?: string;
}

export const WelcomeMessage = forwardRef<HTMLDivElement, WelcomeMessageProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col h-[140px] items-center justify-start overflow-clip relative shrink-0 w-full ${className || ""}`}
      >
        <div
          className="flex flex-col h-[140px] justify-center leading-[0] relative shrink-0 text-center w-full"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontStyle: "italic",
            fontSize: "48px",
            fontWeight: 400,
            color: "black",
          }}
        >
          <p className="leading-normal">Welcome to my Channel</p>
        </div>
      </div>
    );
  },
);

WelcomeMessage.displayName = "WelcomeMessage";
