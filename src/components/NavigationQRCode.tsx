"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

/**
 * NavigationQRCode Component
 * Dynamically generates a QR code based on the current browser URL.
 * Ideal for domain migrations and sharing specific sub-pages.
 */
export default function NavigationQRCode() {
  // We use a state to store the URL. 
  // Initialized as empty to prevent hydration mismatch between server and client.
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // This runs only on the client side after the component mounts
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // If the URL hasn't been captured yet (during SSR), we can return a placeholder 
  // or null to avoid rendering a broken/default QR code.
  if (!currentUrl) {
    return <footer className="w-full py-10 bg-[#f9f9f9] border-t border-gray-200" />;
  }

  return (
    <footer className="w-full py-12 flex flex-col items-center bg-[#f9f9f9] border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center p-5 bg-white rounded-3xl shadow-sm border border-gray-100">
          
          {/* QR Code Canvas - Automatically updates if the domain or path changes */}
          <QRCodeCanvas
            value={currentUrl}
            size={150}
            level="H" // High error correction to handle long URLs or domain names
            includeMargin={false}
          />
          
          <div className="mt-5 text-center space-y-3">
            {/* Chinese Instructions */}
            <div>
              <h3 className="text-sm font-bold text-gray-800">页面分享</h3>
              <p className="text-[11px] text-gray-500">扫码访问当前页面或长按保存</p>
            </div>
            
            {/* German Instructions */}
            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Seite teilen</h3>
              <p className="text-[11px] text-gray-500">QR-Code scannen oder für später speichern</p>
            </div>
          </div>
        </div>
        
        {/* Simple copyright or branding note */}
        <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
          Yi Xin Chinesische Sprachschule Heilbronn
        </p>
      </div>
    </footer>
  );
}
