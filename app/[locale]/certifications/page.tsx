import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {
  certDomains,
  certifications,
  legacyCertDomains,
  type CertDomain,
  type Certification,
} from '../../../data/certifications';
import {languageAlternates, localizedUrl} from '../../../i18n/seo';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import CertificationsExplorer, {
  type CertView,
  type ExplorerLabels,
} from '../../../components/CertificationsExplorer';

const PATH = '/certifications';
const OG_IMAGE = 'https://www.hassane-azzi.com/og-image.png';
const OG_LOCALE: Record<string, string> = {en: 'en_US', fr: 'fr_FR'};

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'certsPage'});
  const title = t('metaTitle');
  const description = t('metaDescription', {count: certifications.length});

  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, PATH),
      siteName: 'Hassane AZZI',
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [{url: OG_IMAGE, width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase() + value.slice(1);
}

function toDate(yearMonth: string): Date {
  const [year, month] = yearMonth.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1));
}

// Localized month labels, e.g. "Sept. 2026" (fr) / "Sep 2026" (en),
// "Janv.–mai 2019" (fr) / "Jan–May 2019" (en).
function formatPeriod(locale: string, start: string, end?: string): string {
  const monthYear = new Intl.DateTimeFormat(locale, {month: 'short', year: 'numeric', timeZone: 'UTC'});
  if (!end) return capitalize(monthYear.format(toDate(start)));
  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  const first = sameYear
    ? new Intl.DateTimeFormat(locale, {month: 'short', timeZone: 'UTC'}).format(toDate(start))
    : monthYear.format(toDate(start));
  return capitalize(`${first}–${monthYear.format(toDate(end))}`);
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const linkLabels: Record<Certification['linkKind'], string> = {
    certificate: t('certsPage.links.certificate'),
    course: t('certsPage.links.course'),
    share: t('certsPage.links.share'),
    link: t('certsPage.links.link'),
  };

  const domainLabels = Object.fromEntries(
    certDomains.map((d) => [d, t(`certDomains.${d}`)]),
  ) as Record<CertDomain, string>;

  // Display-only view passed to the client component.
  const certs: CertView[] = certifications.map((c) => ({
    id: c.id,
    title: c.title,
    titleLang: c.titleLang,
    issuer: c.issuer,
    platform: c.platform,
    domains: c.domains,
    url: c.url,
    linkLabel: linkLabels[c.linkKind],
    dateLabel: c.date ? formatPeriod(locale, c.date, c.dateEnd) : undefined,
    dateTime: c.date ? (c.dateEnd ? `${c.date}/${c.dateEnd}` : c.date) : undefined,
    skills: c.skills,
    skillsLang: c.skillsLang ?? c.titleLang,
  }));

  const labels: ExplorerLabels = {
    searchLabel: t('certsPage.searchLabel'),
    searchPlaceholder: t('certsPage.searchPlaceholder'),
    filterLabel: t('certsPage.filterLabel'),
    all: t('certsPage.all'),
    resultsNone: t('certsPage.resultsNone'),
    resultsOne: t.raw('certsPage.resultsOne') as string,
    resultsOther: t.raw('certsPage.resultsOther') as string,
    noResults: t('certsPage.noResults'),
    reset: t('certsPage.reset'),
    via: t('certsPage.via'),
    domainsLabel: t('certsPage.domainsLabel'),
    skillsLabel: t('certsPage.skillsLabel'),
    moreSkillsAria: t('certsPage.moreSkillsAria'),
    newTab: t('certsPage.newTab'),
  };

  return (
    <main>
      <SiteHeader locale={locale} path={PATH}/>

      <section className="section certs-page" aria-labelledby="certs-page-title">
        <div className="section-label">{t('certs.label')}</div>
        <div className="certs-page-head">
          <h1 id="certs-page-title">
            {t('certsPage.titlePart1')}<em>{t('certsPage.titleEmphasis')}</em>
          </h1>
          <p>{t('certsPage.intro', {count: certifications.length})}</p>
        </div>

        <CertificationsExplorer
          certs={certs}
          domainOrder={[...certDomains]}
          domainAliases={legacyCertDomains}
          domainLabels={domainLabels}
          labels={labels}
          locale={locale}
        />

        <p className="certs-back">
          <a href={`/${locale}#certs`}>← {t('certsPage.backHome')}</a>
        </p>
      </section>

      <SiteFooter locale={locale}/>
    </main>
  );
}
