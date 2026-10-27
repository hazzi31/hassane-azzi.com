import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {routing} from '../i18n/routing';
import {sectionPages} from '../i18n/sections';
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
  const published = menuOrder.filter((l) => (routing.locales as readonly string[]).includes(l));

  // Same entries for the desktop nav and the mobile menu: one page per section,
  // Certifications in its usual place (before Contact).
  const menuPaths = [...sectionPages.slice(0, -1), 'certifications', 'contact'] as const;
  const links: MenuLink[] = menuPaths.map((section) => ({
    href: `/${locale}/${section}`,
    label: t(`nav.${section}`),
    current: path === `/${section}`,
  }));

  return (
    <header className="nav">
      <Link className="nav-home" href={`/${locale}`} aria-current={path === '' ? 'page' : undefined}>
        <b>HA<span>.</span></b>
        <span className="sr-only"> Hassane AZZI</span>
      </Link>

      <nav aria-label={t('nav.label')}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>
            {link.label}
          </Link>
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
