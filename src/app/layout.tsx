import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";
// Import the QR component using the corrected path
import NavigationQRCode from "@/components/NavigationQRCode";

/**
 * Site URL configuration
 * Using Environment Variables allows for automatic domain switching in Vercel.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` 
  : "https://www.yixin-heilbronn.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yi Xin Chinesische Sprachschule Heilbronn",
    template: "%s | Yi Xin Chinesische Sprachschule Heilbronn",
  },
  // ... (Rest of your metadata remains the same)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        {/* Dynamic JSON-LD and Alternative Links */}
        <link rel="alternate" hrefLang="de" href={siteUrl} />
        <link rel="alternate" hrefLang="zh" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Accessibility: Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-school-red focus:text-white focus:rounded focus:text-sm focus:font-semibold"
        >
          Zum Inhalt springen / Skip to content / 跳到内容
        </a>

        {/* 
          The main content area uses flex-grow to push the QR code 
          to the bottom of the viewport on short pages.
        */}
        <div id="main-content" className="flex-grow">
          <ClientProviders>{children}</ClientProviders>
        </div>

        {/* Renders at the very end of the page content */}
        <NavigationQRCode />
      </body>
    </html>
  );
}
