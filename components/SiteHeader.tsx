import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {routing} from '../i18n/routing';

const localeDisplay = {
  en: {flag: '🇺🇸', code: 'EN', label: 'English'},
  fr: {flag: '🇫🇷', code: 'FR', label: 'Français'},
  de: {flag: '🇩🇪', code: 'DE', label: 'Deutsch'},
};

// Menu order of the language selector. German temporarily disabled: it is
// filtered out because it is not in routing.locales.
const menuOrder = ['fr', 'en', 'de'] as const;

export default async function SiteHeader({
  locale,
  path = '',
}: {
  locale: string;
  /** Current path without the locale prefix, e.g. '' or '/certifications'. */
  path?: string;
}) {
  const t = await getTranslations();
  const current = localeDisplay[locale as keyof typeof localeDisplay] ?? localeDisplay.en;
  const home = path ? `/${locale}` : '';
  const certsHref = `/${locale}/certifications`;
  const onCerts = path === '/certifications';
  const published = menuOrder.filter((l) => (routing.locales as readonly string[]).includes(l));

  return (
    <header className="nav">
      <nav aria-label={t('nav.label')}>
        <a href={`${home}#about`}>{t('nav.about')}</a>
        <a href={`${home}#expertise`}>{t('nav.expertise')}</a>
        <a href={`${home}#projects`}>{t('nav.projects')}</a>
        <a href={`${home}#experience`}>{t('nav.experience')}</a>
        <a href={`${home}#education`}>{t('nav.education')}</a>
        <a href={certsHref} aria-current={onCerts ? 'page' : undefined}>
          {t('nav.certifications')}
        </a>
        <a href={`${home}#contact`}>{t('nav.contact')}</a>
      </nav>

      {/* The main nav is hidden on small screens: keep the certifications page reachable. */}
      <a className="nav-certs-mobile" href={certsHref} aria-current={onCerts ? 'page' : undefined}>
        {t('nav.certifications')}
      </a>

      <details className="language-selector">
        <summary>
          {current.flag} <span>{current.code}</span>{' '}
          <span className="language-arrow">▼</span>
        </summary>
        <div className="language-menu">
          {published.map((l) => (
            <a key={l} href={`/${l}${path}`} hrefLang={l} lang={l}>
              {localeDisplay[l].flag} {localeDisplay[l].label}
            </a>
          ))}
        </div>
      </details>

      <a className="nav-cta" href="mailto:hazzi.enac@gmail.com">
        {t('nav.letsTalk')} <ArrowUpRight size={16}/>
      </a>
    </header>
  );
}
