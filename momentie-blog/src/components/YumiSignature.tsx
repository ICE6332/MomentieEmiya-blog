import { forwardRef } from "react";

interface YumiSignatureProps {
  className?: string;
}

export const YumiSignature = forwardRef<HTMLDivElement, YumiSignatureProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute flex flex-col h-[265px] justify-center leading-[0] text-center w-[1440px] translate-x-[-50%] translate-y-[50%] ${className || ""}`}
        style={{
          fontFamily: "var(--font-alex-brush)",
          fontSize: "512px",
          color: "rgba(68,158,203,0.8)",
          left: "calc(50% - 25px)",
          bottom: "132.5px",
        }}
      >
        <div>
          <p className="leading-normal">Yumi</p>
        </div>
      </div>
    );
  },
);

YumiSignature.displayName = "YumiSignature";
