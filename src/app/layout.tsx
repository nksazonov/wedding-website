import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Infant, Inter, Marck_Script } from "next/font/google";
import GoogleMapsProvider from '@/components/GoogleMapsProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


const marckScript = Marck_Script({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Валерія & Нікіта - Весілля",
  description: "Запрошення на весілля Валерії та Нікіти. З нетерпінням чекаємо можливості розділити цей особливий день з вами.",
  icons: {
    icon: '/pictures/olive-branch-icon.png',
    shortcut: '/pictures/olive-branch-icon.png',
    apple: '/pictures/olive-branch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantInfant.variable} ${inter.variable} ${marckScript.variable} antialiased`}
      >
        <GoogleMapsProvider>
          {children}
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
