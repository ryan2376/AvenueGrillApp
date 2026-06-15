import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avenue Grill & Restaurant — Gitimbine, Meru",
  description:
    "Good Food. Great Mood. Better Together. Grilled to perfection in Gitimbine, Meru — order online for delivery.",
  openGraph: {
    title: "Avenue Grill & Restaurant",
    description: "Good Food. Great Mood. Better Together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-cream text-brand-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
