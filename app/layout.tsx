import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hassane AZZI — Operations Research · Optimization · AI",
  description:
    "Personal website of Hassane AZZI — Operations Research, mathematical optimization, machine learning and software engineering.",
  metadataBase: new URL("https://www.hassane-azzi.com"),
  openGraph: {
    title: "Hassane AZZI — Optimization · AI · Software",
    description:
      "I build intelligent, optimized solutions for complex industrial systems.",
    url: "https://www.hassane-azzi.com",
    siteName: "Hassane AZZI",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
