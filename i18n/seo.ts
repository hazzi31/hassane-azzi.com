import type {Metadata} from 'next';
import {routing} from './routing';

export const SITE_URL = 'https://www.hassane-azzi.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_LOCALE: Record<string, string> = {en: 'en_US', fr: 'fr_FR'};

export function localizedUrl(locale: string, path = ''): string {
  return `${SITE_URL}/${locale}${path}`;
}

// hreflang alternates derived from the published locales only, so a disabled
// locale (currently German) never appears and comes back automatically when
// it is re-added to routing.locales.
export function languageAlternates(path = ''): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(locale, path)])),
    'x-default': localizedUrl(routing.defaultLocale, path),
  };
}

// Page-specific title, description, canonical URL, hreflang, OpenGraph and
// Twitter tags (the locale layout provides the site-wide defaults).
export function pageMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: {canonical: url, languages: languageAlternates(path)},
    openGraph: {
      title,
      description,
      url,
      siteName: 'Hassane AZZI',
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [{url: OG_IMAGE, width: 1200, height: 630, alt: title}],
    },
    twitter: {card: 'summary_large_image', title, description, images: [OG_IMAGE]},
  };
}
