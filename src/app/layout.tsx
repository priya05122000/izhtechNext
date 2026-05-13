// src/app/layout.tsx

import "./globals.css";

import ClientLayout from "./ClientLayout";

import { DM_Sans } from "next/font/google";

import { Toaster } from "sonner";

import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${dmSans.variable}
          ${dmSans.className}
          antialiased
        `}
      >
        <ClientLayout>
          {children}
        </ClientLayout>

        <Toaster
          position="top-right"
          richColors
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SYDD14SZLN"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-SYDD14SZLN');
          `}
        </Script>
      </body>
    </html>
  );
}