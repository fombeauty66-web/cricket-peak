import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CricketPeak Pro Analytics",
  description: "Ultimate ICC Player Rankings & Real-time Match Analysis",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-yellow-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}