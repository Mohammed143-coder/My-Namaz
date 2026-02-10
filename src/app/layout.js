// import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Providers from "./providers";
import Head from "next/head";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // regular → bold
});

export const metadata = {
  title: "My Namaz | Krishnagiri",
  description:
    "My-Namaz is a pwa application that helps you find nearby masjids and their prayer times in Krishnagiri.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "MyNamaz",
    "next14",
    "salah",
    "next-pwa",
    "krishnagiri",
    "masjid",
    "Masjid near me",
    "Namaz time",
  ],
  authors: [
    {
      name: "Mohammed Junaith",
      url: "https://www.linkedin.com/in/mohammed-junaith-software-developer/",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="My-Namaz" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={poppins.className}
      >
        <Providers>
          {children}
          <footer className=" text-black text-center">
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
