import {routing} from './routing';

export const SITE_URL = 'https://www.hassane-azzi.com';

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
