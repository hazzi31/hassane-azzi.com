import Image from "next/image";
import Link from "next/link";
import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {ArrowUpRight, Mail} from "lucide-react";
import {certDomains, certifications, countByDomain} from '../../data/certifications';
import {sectionPages} from '../../i18n/sections';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ProfileLinks from '../../components/ProfileLinks';
import LegacyHashRedirect from '../../components/LegacyHashRedirect';

// Home: entry point of the site. Each section has its own page; the home page
// keeps the hero, the marquee, links to the section pages and the
// certifications preview.
export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const certCounts = countByDomain();

  return (
    <main>
      <LegacyHashRedirect locale={locale} sections={sectionPages}/>
      <SiteHeader locale={locale}/>

      <section className="hero section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>
              {t('hero.titlePart1')}<em>{t('hero.titleEmphasis')}</em>
            </h1>
            <p className="lead">{t('hero.description')}</p>
            <div className="actions">
              <Link className="button primary" href={`/${locale}/projects`}>
                {t('hero.exploreWork')} <ArrowUpRight size={18}/>
              </Link>
            </div>
            <div className="socials" role="group" aria-label={t('hero.profilesLabel')}>
              <ProfileLinks/>
              <a href="mailto:azzi.hassane@gmail.com"><Mail size={18}/> Email</a>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/logo-personnel-harmonized.png"
              alt="Hassane AZZI"
              width={500}
              height={500}
              className="hero-logo"
              priority
            />
          </div>
        </div>
        <div className="scroll-note"><span/> {t('hero.scrollNote')}</div>
      </section>

      <section className="marquee">
        <div>{t('marquee')}</div>
      </section>

      {/* Links to the section pages: menu label + the section's own title. */}
      <section className="section home-sections">
        <ul className="home-grid">
          {sectionPages.map((section) => (
            <li key={section}>
              <Link className="home-card" href={`/${locale}/${section}`}>
                <span className="home-card-label">{t(`nav.${section}`)}</span>
                <span className="home-card-title">
                  {t(`${section}.titlePart1`)}<em>{t(`${section}.titleEmphasis`)}</em>
                </span>
                <ArrowUpRight size={18} aria-hidden="true"/>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="certs">
        <div className="section-label">{t('certs.label')}</div>
        <div className="certs-preview-head">
          <h2>{t('certs.titlePart1')}<em>{t('certs.titleEmphasis')}</em></h2>
          <p>{t('certs.previewText', {count: certifications.length})}</p>
        </div>
        <ul className="certs-preview">
          {certDomains.map((domain) => (
            <li key={domain}>
              <Link href={`/${locale}/certifications?domain=${domain}`}>
                <span className="certs-preview-count">{certCounts[domain]}</span>
                <span className="certs-preview-label">{t(`certDomains.${domain}`)}</span>
                <ArrowUpRight size={18} aria-hidden="true"/>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="button primary certs-preview-cta" href={`/${locale}/certifications`}>
          {t('certs.viewAll', {count: certifications.length})} <ArrowUpRight size={18}/>
        </Link>
      </section>

      <SiteFooter locale={locale}/>
    </main>
  );
}
