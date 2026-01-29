import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Unbody Lab",
  description:
    "Where we question, explore, experiment and build adaptive thinking tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} font-mono text-black antialiased overflow-x-hidden`}
      >
        {/* Fixed Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000&auto=format&fit=crop')`,
              filter: "blur(120px) saturate(0.05) brightness(1.1)",
              transform: "scale(1.2)",
            }}
          />
          {/* Ambient tint overlay */}
          <div className="absolute inset-0 bg-white/40" />
        </div>

        {/* Top & Bottom Fade Masks */}
        <div className="fixed top-0 left-0 w-full h-48 z-40 bg-gradient-to-b from-white/60 via-white/30 to-transparent pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-full h-48 z-40 bg-gradient-to-t from-white/60 via-white/30 to-transparent pointer-events-none" />

        <Header />

        {children}
      </body>
    </html>
  );
}
