import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {SectionTitle} from './SectionHeading';

// Official page of the CNAM certificate CS10900A (started October 2026, in progress).
const cnamLink = "https://www.cnam.fr/formation/sciences/mathematiques/certificat-de-specialisation-intelligence-artificielle-et-calcul-scientifique-1";

// Official pages of the master's programme, in the order of education.master.links.
const masterLinks = [
  "https://www.utoulouse.fr/decouvrir-nos-diplomes/master-parcours-recherche-operationnelle-optimisation-ro",
  "https://m2rit-ro.recherche.enac.fr/",
] as const;

export default async function EducationSection() {
  const t = await getTranslations();

  return (
    <section className="section education page-section" id="education">
      <div className="section-label">{t('education.label')}</div>
      <div className="edu-grid">
        <div>
          <SectionTitle part1={t('education.titlePart1')} emphasis={t('education.titleEmphasis')}/>
        </div>
        <div className="edu-card">
          <div className="edu-head">
            <p className="kicker">{t('education.cnam.kicker')}</p>
            <span className="edu-status">{t('education.cnam.status')}</span>
          </div>
          <h3>{t('education.cnam.title')}</h3>
          <p>{t('education.cnam.institution')}</p>
          <p className="edu-meta">
            <time dateTime="2026-10">{t('education.cnam.period')}</time>
            {' · '}{t('education.cnam.mode')}{' · '}{t('education.cnam.code')}
          </p>
          <p className="edu-programme">{t('education.cnam.programme')}</p>
          <div className="tags" role="list" aria-label={t('education.cnam.tagsLabel')}>
            {(t.raw('education.cnam.tags') as string[]).map(tag => <span role="listitem" key={tag}>{tag}</span>)}
          </div>
          <ul className="edu-links" aria-label={t('education.cnam.linksLabel')}>
            <li>
              <a className="project-link" href={cnamLink} target="_blank" rel="noopener noreferrer">
                {t('education.cnam.linkLabel')} <ArrowUpRight size={16} aria-hidden="true"/>
                <span className="sr-only"> ({t('projects.newTab')})</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="edu-card">
          <p className="kicker">{t('education.master.kicker')}</p>
          <h3>{t('education.master.title')}</h3>
          <p>{t('education.master.institution')}</p>
          <div className="tags">
            <span>Mathematical Programming</span>
            <span>Combinatorial Optimization</span>
            <span>Graphs & Networks</span>
            <span>Air Traffic Management</span>
            <span>Machine Learning</span>
          </div>
          <ul className="edu-links" aria-label={t('education.master.linksLabel')}>
            {(t.raw('education.master.links') as string[]).map((label, i) => (
              <li key={masterLinks[i]}>
                <a
                  className="project-link"
                  href={masterLinks[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label} <ArrowUpRight size={16} aria-hidden="true"/>
                  <span className="sr-only"> ({t('projects.newTab')})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
