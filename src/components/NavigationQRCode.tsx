"use client";

import { QRCodeCanvas } from "qrcode.react";

/**
 * NavigationQRCode Component
 * Displays a fixed QR code for the website's homepage with bilingual (Chinese & German) instructions.
 * Designed for the global footer to encourage sharing and mobile access.
 */
export default function NavigationQRCode() {
  // Hardcoded homepage URL to ensure consistency across all subpages
  const homeUrl = "https://your-domain.vercel.app"; 

  return (
    <footer className="w-full py-12 flex flex-col items-center bg-[#fbfbfb] border-t border-gray-200">
      <div className="flex flex-col items-center max-w-2xl px-4">
        
        {/* QR Code Container: Styled with a subtle shadow and hover effect */}
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 transition-transform hover:scale-105">
          <QRCodeCanvas
            value={homeUrl}
            size={160}
            level="H" // High error correction for better scannability
            includeMargin={false}
          />
        </div>
        
        {/* Bilingual Instruction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left border-t border-gray-100 pt-6 w-full">
          
          {/* Chinese Section */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-bold text-gray-800">官网导航</h3>
            <p className="text-xs text-gray-500 mt-1">扫码快速访问或长按保存图片</p>
          </div>

          {/* German Section */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
            <h3 className="text-sm font-bold text-gray-800">Navigation</h3>
            <p className="text-xs text-gray-500 mt-1">QR-Code scannen oder für später speichern</p>
          </div>
          
        </div>

        {/* Copyright & Footer Meta */}
        <div className="mt-10 text-[10px] uppercase tracking-widest text-gray-400">
          © {new Date().getFullYear()} Your Website · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  );
}
