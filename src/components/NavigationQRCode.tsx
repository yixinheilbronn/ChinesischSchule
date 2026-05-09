"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function NavigationQRCode() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [qrImageData, setQrImageData] = useState<string>("");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Generate the Base64 preview for the <img> tag
  useEffect(() => {
    if (currentUrl && svgRef.current) {
      const svgElement = svgRef.current;
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgElement);
      const base64Data = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(source)))}`;
      setQrImageData(base64Data);
    }
  }, [currentUrl]);

  /**
   * Handles the downloading of the QR code in different formats
   */
  const downloadQRCode = (format: "png" | "jpg" | "svg") => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgContent = serializer.serializeToString(svg);
    const fileName = `QR_Code_${new Date().getTime()}`;

    // 1. Handle SVG Download
    if (format === "svg") {
      const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${fileName}.svg`);
      return;
    }

    // 2. Handle Raster (PNG/JPG) Download via Canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set canvas dimensions (High Res)
    canvas.width = 1024;
    canvas.height = 1024;

    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (!ctx) return;
      
      // If JPG, draw a white background first (JPG doesn't support transparency)
      if (format === "jpg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg", 1.0);
      triggerDownload(dataUrl, `${fileName}.${format}`);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const triggerDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!currentUrl) {
    return <div className="w-full aspect-square bg-gray-800/50 animate-pulse rounded-lg" />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hidden engine */}
      <div className="hidden" aria-hidden="true">
        <QRCodeSVG ref={svgRef} value={currentUrl} size={1024} level="H" includeMargin={false} />
      </div>

      {/* Main Image Display */}
      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-[160px]">
        {qrImageData ? (
          <img
            src={qrImageData}
            alt="QR Code"
            className="w-full h-auto block"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-100 animate-pulse" />
        )}
      </div>
      
      {/* Download Options */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {(["png", "jpg", "svg"] as const).map((ext) => (
          <button
            key={ext}
            onClick={() => downloadQRCode(ext)}
            className="text-[9px] px-2 py-1 bg-gray-800 hover:bg-school-red text-white rounded transition-colors uppercase font-bold"
          >
            {ext}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-gray-500 mt-2 font-medium text-center uppercase tracking-wider">
        Download or Long Press
      </p>
    </div>
  );
}
