import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AdUnit } from "@/components/AdUnit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversor de Moedas Online | Taxas em Tempo Real",
  description: "Converta entre mais de 150 moedas com taxas atualizadas do mercado. Ferramenta gratuita para conversão instantânea de USD, EUR, GBP, JPY e mais.",
  keywords: ["conversor de moedas", "câmbio monetário", "taxa de câmbio", "conversor dólar real", "conversor euro", "conversor libra esterlina", "usd", "brl", "usd/brl"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-DTXECVXZT7`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTXECVXZT7');
          `}
        </Script>

        {/* Google AdSense */}
        <meta 
          name="google-adsense-account" 
          content="ca-pub-1090803132810319"
        />
        <Script
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1090803132810319`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50">
          <div className="container mx-auto px-4 py-2">
            <AdUnit slotId="SEU_SLOT_ID_HEADER" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="border-t">
          <div className="container mx-auto px-4 py-8">
            <AdUnit slotId="SEU_SLOT_ID_FOOTER" />
          </div>
        </footer>
      </body>
    </html>
  );
}