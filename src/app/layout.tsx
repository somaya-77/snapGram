import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/src/lib/utils";
import { ToastContainer } from "react-toastify";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Snapgram",
  description:
    "SnapGram is a dynamic social media platform designed for sharing moments, creativity, and inspiration with the world. Whether you're capturing daily highlights, sharing artistic visuals, or engaging with a vibrant community, SnapGram makes social networking fast, fun, and interactive..",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={cn("dark", fontSans.variable)}>
      <body
        className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}
      >
        {children}
        <ToastContainer theme='colored' position='top-right' />
      </body>
    </html>
  );
}
