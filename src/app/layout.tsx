import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";
// Import the QR component from your sections folder
import NavigationQRCode from "@/components/sections/NavigationQRCode";

const siteUrl = "https://www.yixin-heilbronn.de";

export const metadata: Metadata = {
  // ... (Keep your existing metadata object)
};

const jsonLd = {
  // ... (Keep your existing jsonLd object)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="alternate" hrefLang="de" href={siteUrl} />
        <link rel="alternate" hrefLang="zh" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-school-red focus:text-white focus:rounded focus:text-sm focus:font-semibold"
        >
          Zum Inhalt springen / Skip to content / 跳到内容
        </a>

        {/* 
            The 'flex-grow' ensures this container fills all available space,
            effectively pushing the QR code component to the very bottom.
        */}
        <div id="main-content" className="flex-grow">
          <ClientProviders>{children}</ClientProviders>
        </div>

        {/* The QR code section acts as a natural footer at the bottom of the page */}
        <NavigationQRCode />
      </body>
    </html>
  );
}
