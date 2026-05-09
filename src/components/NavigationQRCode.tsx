"use client";

import { useState, useEffect } from "react";
// We use QRCodeSVG instead of Canvas because mobile browsers (Safari/Chrome/WeChat) 
// recognize SVG as an image, allowing users to "Long Press" to save or scan.
import { QRCodeSVG } from "qrcode.react"; 

/**
 * NavigationQRCode Component
 * 
 * This component generates a QR code that dynamically points to the current page URL.
 * It is designed to be responsive and mobile-friendly.
 */
export default function NavigationQRCode() {
  // Store the URL in state to prevent "Hydration Mismatch" 
  // (where server and client render different content).
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // window.location is only available in the browser. 
    // This effect ensures the URL is captured after the component mounts on the client.
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // While the URL is being fetched (SSR phase), render a loading placeholder
  // to maintain layout stability.
  if (!currentUrl) {
    return (
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-700/50 animate-pulse rounded-2xl" />
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* 
        Responsive Container:
        - w-24 (96px) on mobile
        - sm:w-32 (128px) on small tablets
        - md:w-40 (160px) on desktop
      */}
      <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 w-24 sm:w-32 md:w-40">
        <QRCodeSVG
          value={currentUrl}
          // size is the internal render resolution. 
          // 256 is high enough to stay sharp when scaled up.
          size={256} 
          level="H" // High error correction (allows for small damages/blockage)
          includeMargin={false}
          // CSS style '100%' makes the SVG fill the responsive container div above.
          style={{ width: "100%", height: "auto" }} 
        />
      </div>
      
      {/* Visual hint for users */}
      <p className="text-[10px] text-gray-400 mt-2 font-bold text-center leading-none uppercase tracking-wider">
        Long press to share
      </p>
    </div>
  );
}
