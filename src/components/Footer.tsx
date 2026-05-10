"use client";

import { useState, useEffect } from "react";
import SchoolLogo from "@/components/SchoolLogo";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";
import { TOOLBAR_POS_KEY } from "@/lib/constants";
import NavigationQRCode from "@/components/NavigationQRCode";

export default function Footer() {
  const { getContent, isEnglishVisible } = useContent();
  const { isAdmin } = useAuth();
  
  // State to track if the admin toolbar is positioned at the bottom
  const [toolbarAtBottom, setToolbarAtBottom] = useState(() => {
    try {
      return sessionStorage.getItem(TOOLBAR_POS_KEY) !== "top";
    } catch { 
      return true; // Fallback for SSR or privacy mode 
    }
  });

  // Effect to listen for changes in the admin toolbar position
  useEffect(() => {
    if (!isAdmin) return;
    function handleChange(e: Event) {
      const pos = (e as CustomEvent).detail;
      setToolbarAtBottom(pos !== "top");
    }
    window.addEventListener("toolbar-position-change", handleChange);
    return () => window.removeEventListener("toolbar-position-change", handleChange);
  }, [isAdmin]);

  // Fetch localized content
  const de = getContent("de");
  const zh = getContent("zh");
  const en = getContent("en");
  const showEn = isEnglishVisible("footer");

  // Define navigation links for the footer
  const navLinks: [string, string, string, string][] = [
    [de.nav.home, zh.nav.home, en.nav.home, "/#home"],
    [de.nav.courses, zh.nav.courses, en.nav.courses, "/#courses"],
    [de.nav.news, zh.nav.news, en.nav.news, "/#news"],
    [de.nav.about, zh.nav.about, en.nav.about, "/#about"],
    [de.nav.contact, zh.nav.contact, en.nav.contact, "/#contact"],
  ];

  return (
    <footer className={`bg-school-dark text-white mt-auto${isAdmin && toolbarAtBottom ? " pb-28" : ""}`} data-testid="footer">
      {/* 
          OPTIMIZED GRID: 
          Uses 4 columns on laptop so Section 3 can span 2/4 (50% width).
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-10">
        
        {/* Section 1: Brand (Span 1) */}
        <div className="flex flex-col items-start gap-3">
          {/* Responsive logo - automatically adjusts size */}
          <div className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40">
            <SchoolLogo responsive={true} />
          </div>
          <p className="font-cn font-bold text-lg leading-tight">海尔布隆一心中文学校</p>
          <p className="text-xs text-gray-400">Yi Xin Chinesische Sprachschule Heilbronn</p>
        </div>

        {/* Section 2: Links (Span 1) */}
        <div className="sm:pl-4">
          <h3 className="font-bold text-school-red mb-4 tracking-wide uppercase text-sm">
            <span className="font-cn">{zh.footer.navigationTitle}</span> · {de.footer.navigationTitle}{showEn && ` · ${en.footer.navigationTitle}`}
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {navLinks.map(([deLabel, zhLabel, enLabel, href]) => (
              <li key={href}>
                <a href={href} className="hover:text-school-red transition-colors block">
                  <span className="font-cn">{zhLabel}</span> · {deLabel}{showEn && ` · ${enLabel}`}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 
            Section 3: Contact & QR Code (Span 2)
            This section now has 50% of the footer width on laptop.
        */}
        <div className="sm:col-span-2 flex flex-col md:flex-row gap-8 justify-between items-start border-t border-gray-800 pt-8 sm:border-t-0 sm:pt-0 sm:pl-8">
          <div className="flex-1">
            <h3 className="font-bold text-school-red mb-4 tracking-wide uppercase text-sm">
              <span className="font-cn">{zh.footer.contactTitle}</span> · {de.footer.contactTitle}{showEn && ` · ${en.footer.contactTitle}`}
            </h3>
            <address className="not-italic text-sm text-gray-300 space-y-2 leading-relaxed">
              {de.contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <div className="pt-2 space-y-1">
                <p>
                  <a href={`mailto:${de.contact.email}`} className="hover:text-school-red transition-colors">
                    {de.contact.email}
                  </a>
                </p>
                {de.contact.phone && (
                  <p>
                    <a href={`tel:${de.contact.phone.replace(/\s/g, "")}`} className="hover:text-school-red transition-colors">
                      {de.contact.phone}
                    </a>
                  </p>
                )}
              </div>
            </address>
          </div>

          {/* QR Code wrapper to prevent it from growing too large */}
          <div className="w-32 sm:w-40 shrink-0">
            <NavigationQRCode />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-6 text-[10px] sm:text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2">
            © {new Date().getFullYear()} 海尔布隆一心中文学校 · Yi Xin Chinesische Sprachschule Heilbronn
            {showEn && " · Yi Xin Chinese Language School"}
          </p>
          <div className="flex justify-center gap-2 items-center opacity-80">
            <a href="/impressum" className="hover:text-school-red transition-colors underline">
              法律声明 · Impressum{showEn && " · Legal Notice"}
            </a>
            <span className="text-gray-700">|</span>
            <a href="/privacy" className="hover:text-school-red transition-colors underline">
              隐私政策 · Datenschutz{showEn && " · Privacy Policy"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
