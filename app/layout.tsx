import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import PulseBackground from "@/components/ui/pulse-background";
import Noise from "@/components/ui/noise";
import Providers from "@/providers";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

const laygrotesk = localFont({
  src: [
    {
      path: "./fonts/laygrotesk-trial-regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/laygrotesk-trial-semibold.otf",
      weight: "600",
    },
    {
      path: "./fonts/laygrotesk-trial-bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-laygrotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "AI Powered LMS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${laygrotesk.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Providers>
          <Noise />
          <PulseBackground />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
