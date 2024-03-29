import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Room } from "./Room";
import NextAuthProvider from "@/Providers/NextAuthProviders";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: '--font-work-sans',
  weight: ['400', '500', '700']
});

export const metadata: Metadata = {
  title: "DesignForge",
  description: "design software like figma using fabric and livblocks for realtime colaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-grey-200`}>
        <NextAuthProvider >
          <Room>
            {children}
          </Room>
        </NextAuthProvider>
      </body>
    </html>
  );
}
