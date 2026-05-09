"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

/**
 * NavigationQRCode Component
 * Generates a responsive QR code that scales with its container.
 */
export default function NavigationQRCode() {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!currentUrl) {
    return <div className="w-full h-32 bg-transparent" />;
  }

  return (
    <div className="flex flex-col items-center">
      {/* 
        Container with responsive width: 
        w-24 (96px) on small mobile
        sm:w-32 (128px) on small screens
        md:w-40 (160px) on medium screens
      */}
      <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 w-24 sm:w-32 md:w-40">
        <QRCodeCanvas
          value={currentUrl}
          // We set a large base size (e.g., 256) to ensure the QR code is crisp,
          // then use CSS 'style' to make it fill the container width.
          size={256} 
          level="H"
          includeMargin={false}
          style={{ width: "100%", height: "auto" }} 
        />
      </div>
      <p className="text-[10px] text-gray-500 mt-2 font-bold text-center leading-none">
        Scan to share
      </p>
    </div>
  );
}
