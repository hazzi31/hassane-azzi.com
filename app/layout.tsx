import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Hassane AZZI | Operations Research, Optimization & AI",
  description:
    "Hassane AZZI is an Operations Research engineer specialized in mathematical optimization, artificial intelligence, machine learning and software engineering for complex industrial systems.",
  keywords: [
    "Hassane AZZI",
    "Operations Research",
    "Recherche opérationnelle",
    "Mathematical Optimization",
    "Optimization",
    "Artificial Intelligence",
    "AI",
    "Machine Learning",
    "Software Engineering",
    "Decision Support Systems",
    "MILP",
    "MINLP",
    "Energy Systems",
    "Toulouse",
    "France",
  ],
  metadataBase: new URL("https://www.hassane-azzi.com"),
  alternates: {
    canonical: "https://www.hassane-azzi.com/",
  },
  authors: [
    {
      name: "Hassane AZZI",
      url: "https://www.hassane-azzi.com/",
    },
  ],
  creator: "Hassane AZZI",
  publisher: "Hassane AZZI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Hassane AZZI | Operations Research, Optimization & AI",
    description:
      "Operations Research engineer specialized in mathematical optimization, AI, machine learning and software engineering.",
    url: "https://www.hassane-azzi.com/",
    siteName: "Hassane AZZI",
    type: "website",
    locale: "en_US",
  },
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
