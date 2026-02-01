import type { Metadata } from "next";
import { Cascadia_Code } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const cascadiaCode = Cascadia_Code({
  variable: "--font-cascadia-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beatriz Montes Gijón | Graphic Designer",
  description: "Portfolio of Beatriz Montes Gijón, Graphic Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vsu6xsa.css" />
      </head>
      <body
        className={`${cascadiaCode.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
