import {MetadataRoute} from 'next';
import {routing} from '../i18n/routing';
import {languageAlternates, localizedUrl} from '../i18n/seo';
import {sectionPages} from '../i18n/sections';

const BASE = 'https://www.hassane-azzi.com';

// Fixed date — update when content changes significantly
const LAST_MODIFIED = new Date('2026-10-27');
const CERTS_LAST_MODIFIED = new Date('2026-10-19');
const SECTIONS_LAST_MODIFIED = new Date('2026-10-27');

const LANGUAGES = {
  en: `${BASE}/en`,
  fr: `${BASE}/fr`,
  // German temporarily disabled:
  // de: `${BASE}/de`,
  'x-default': `${BASE}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/en`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {languages: LANGUAGES},
    },
    {
      url: `${BASE}/fr`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {languages: LANGUAGES},
    },
    // German temporarily disabled:
    // {
    //   url: `${BASE}/de`,
    //   lastModified: LAST_MODIFIED,
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    //   alternates: {languages: LANGUAGES},
    // },
    // Certifications page: one entry per published locale (derived from
    // routing.locales, so German stays out while it is disabled).
    ...routing.locales.map((locale) => ({
      url: localizedUrl(locale, '/certifications'),
      lastModified: CERTS_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {languages: languageAlternates('/certifications')},
    })),
    // Section pages (/{locale}/about, /expertise…): one entry per published locale.
    ...sectionPages.flatMap((section) =>
      routing.locales.map((locale) => ({
        url: localizedUrl(locale, `/${section}`),
        lastModified: SECTIONS_LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {languages: languageAlternates(`/${section}`)},
      })),
    ),
  ];
}
