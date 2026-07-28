import type { Metadata } from "next";
import { Nunito, Dancing_Script, Pacifico } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kerala e-Services Portal",
  description: "KSRTC Route Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${dancing.variable} ${pacifico.variable}`}>
      <body className="antialiased h-full w-full overflow-hidden m-0 p-0 bg-rose-50">
        {children}
      </body>
    </html>
  );
}
