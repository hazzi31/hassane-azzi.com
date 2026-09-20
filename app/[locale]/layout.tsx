import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '../../i18n/routing';
import '../globals.css';

const metaByLocale = {
  en: {
    title: "Hassane AZZI | Operations Research, Optimization & AI",
    description:
      "Hassane AZZI is an Operations Research engineer specialized in mathematical optimization, artificial intelligence, machine learning and software engineering for complex industrial systems.",
    ogLocale: "en_US",
    imageAlt: "Hassane AZZI — Operations Research, Optimization & AI",
  },
  fr: {
    title: "Hassane AZZI | Recherche opérationnelle, Optimisation & IA",
    description:
      "Hassane AZZI est un ingénieur en recherche opérationnelle spécialisé en optimisation mathématique, intelligence artificielle, machine learning et ingénierie logicielle pour les systèmes industriels complexes.",
    ogLocale: "fr_FR",
    imageAlt: "Hassane AZZI — Recherche opérationnelle, Optimisation & IA",
  },
  de: {
    title: "Hassane AZZI | Operations Research, Optimierung & KI",
    description:
      "Hassane AZZI ist ein Operations-Research-Ingenieur mit Schwerpunkt auf mathematischer Optimierung, künstlicher Intelligenz, Machine Learning und Software Engineering für komplexe Industriesysteme.",
    ogLocale: "de_DE",
    imageAlt: "Hassane AZZI — Operations Research, Optimierung & KI",
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const meta = metaByLocale[locale as keyof typeof metaByLocale] ?? metaByLocale.en;

  return {
    title: meta.title,
    description: meta.description,
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
      canonical: `https://www.hassane-azzi.com/${locale}`,
      languages: {
        en: "https://www.hassane-azzi.com/en",
        fr: "https://www.hassane-azzi.com/fr",
        de: "https://www.hassane-azzi.com/de",
        "x-default": "https://www.hassane-azzi.com/en",
      },
    },
    authors: [{name: "Hassane AZZI", url: "https://www.hassane-azzi.com/"}],
    creator: "Hassane AZZI",
    publisher: "Hassane AZZI",
    robots: {
      index: true,
      follow: true,
      googleBot: {index: true, follow: true},
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.hassane-azzi.com/${locale}`,
      siteName: "Hassane AZZI",
      type: "website",
      locale: meta.ogLocale,
      images: [
        {
          url: "https://www.hassane-azzi.com/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://www.hassane-azzi.com/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
