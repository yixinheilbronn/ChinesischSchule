"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

/**
 * NavigationQRCode Component
 * Uses a hidden SVG engine to generate a Base64 Data URL, 
 * then displays it via a standard <img> tag for full mobile compatibility.
 */
export default function NavigationQRCode() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [qrImageData, setQrImageData] = useState<string>("");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Effect to convert SVG to a Base64 Image string whenever the URL changes
  useEffect(() => {
    if (currentUrl && svgRef.current) {
      const svgElement = svgRef.current;
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgElement);
      
      // Create a Base64 Data URL
      const base64Data = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(source)))}`;
      setQrImageData(base64Data);
    }
  }, [currentUrl]);

  // Loading state placeholder
  if (!currentUrl) {
    return <div className="w-full aspect-square bg-gray-800/50 animate-pulse rounded-lg" />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hidden SVG engine used to generate the image data */}
      <div className="hidden" aria-hidden="true">
        <QRCodeSVG
          ref={svgRef}
          value={currentUrl}
          size={512} // High internal resolution for crisp scaling
          level="H"
          includeMargin={false}
        />
      </div>

      {/* 
        Responsive Image Container:
        The 'w-full' class makes the QR code automatically adjust 
        to the width of its parent element.
      */}
      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-[160px]">
        {qrImageData ? (
          <img
            src={qrImageData}
            alt="QR Code for sharing"
            className="w-full h-auto block" // Automatically adjustable size
            style={{ imageRendering: "pixelated" }} 
          />
        ) : (
          <div className="w-full aspect-square bg-gray-100 animate-pulse" />
        )}
      </div>
      
      <p className="text-[10px] text-gray-400 mt-2 font-bold text-center uppercase tracking-tighter">
        Save or Share
      </p>
    </div>
  );
}
