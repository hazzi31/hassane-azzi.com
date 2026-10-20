import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {routing} from '../i18n/routing';
import MobileMenu, {type MenuLink} from './MobileMenu';

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

  // Same entries for the desktop nav and the mobile menu.
  const links: MenuLink[] = [
    {href: `${home}#about`, label: t('nav.about')},
    {href: `${home}#expertise`, label: t('nav.expertise')},
    {href: `${home}#projects`, label: t('nav.projects')},
    {href: `${home}#experience`, label: t('nav.experience')},
    {href: `${home}#education`, label: t('nav.education')},
    {href: certsHref, label: t('nav.certifications'), current: onCerts},
    {href: `${home}#contact`, label: t('nav.contact')},
  ];

  return (
    <header className="nav">
      <nav aria-label={t('nav.label')}>
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>

      {/* The main nav is hidden below 900px: the mobile menu gives access to every entry. */}
      <MobileMenu links={links} buttonLabel={t('nav.menu')} navLabel={t('nav.mobileLabel')}/>

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

      <a className="nav-cta" href="mailto:azzi.hassane@gmail.com">
        {t('nav.letsTalk')} <ArrowUpRight size={16}/>
      </a>
    </header>
  );
}
