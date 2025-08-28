import { forwardRef } from "react";

interface YumiSignatureProps {
  className?: string;
}

export const YumiSignature = forwardRef<HTMLDivElement, YumiSignatureProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center w-full h-full ${className || ""}`}
      >
        <div
          style={{
            fontFamily: "var(--font-alex-brush)",
            fontSize: "288px",
            color: "rgba(68,158,203,0.8)",
            fontStyle: "normal",
            textAlign: "center",
          }}
        >
          Yumi
        </div>
      </div>
    );
  },
);

YumiSignature.displayName = "YumiSignature";
