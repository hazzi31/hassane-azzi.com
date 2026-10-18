import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // German ('de') is temporarily disabled. To re-enable it, add 'de' back here
  // and see the related "German temporarily disabled" comments in the codebase.
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
