"use client";

import { QRCodeCanvas } from "qrcode.react";

/**
 * NavigationQRCode Component
 * Standard block layout, sits at the very bottom of the page content.
 */
export default function NavigationQRCode() {
  const homeUrl = "https://www.yixin-heilbronn.de"; 

  return (
    // No 'fixed' or 'absolute' here. 
    // Just a normal footer-style block.
    <section className="w-full py-8 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col items-center">
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* QR Code */}
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <QRCodeCanvas
              value={homeUrl}
              size={120}
              level="H"
            />
          </div>

          {/* Bilingual Instructions */}
          <div className="text-center md:text-left">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-school-red">官网导航二维码</h3>
              <p className="text-xs text-gray-500">手机扫码快速访问，支持长按保存分享</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">Navigation QR-Code</h3>
              <p className="text-xs text-gray-500">Scannen Sie den Code oder halten Sie ihn zum Speichern gedrückt</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
