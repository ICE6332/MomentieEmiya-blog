import { forwardRef } from "react";
import localFont from "next/font/local";

// 直接在组件中加载Alex Brush字体
const alexBrush = localFont({
  src: "../app/fonts/AlexBrush-Regular.ttf",
  weight: "400",
  style: "normal",
});

interface YumiSignatureProps {
  className?: string;
}

export const YumiSignature = forwardRef<HTMLParagraphElement, YumiSignatureProps>(
  ({ className }, ref) => {
    return (
      <p 
        ref={ref} 
        className={`${alexBrush.className} ${className || ""}`}
      >
        Yumi
      </p>
    );
  },
);

YumiSignature.displayName = "YumiSignature";
