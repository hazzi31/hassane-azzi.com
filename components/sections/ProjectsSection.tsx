import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {SectionTitle} from './SectionHeading';

const projectKeys = ['p01', 'p02', 'p03', 'p04'] as const;
const projectNumbers = {p01: "01", p02: "02", p03: "03", p04: "04"} as const;
const projectTags = {
  p01: ["MILP", "MINLP", "Python", "Pyomo", "ML", "SCADA"],
  p02: ["C++", "GLPK", "Optimization", "EMS", "MATLAB"],
  p03: ["C++", "Simulation", "Backend", "Testing", "Architecture"],
  p04: ["OR", "Metaheuristics", "ATM", "Algorithms"],
} as const;
// External pages related to each project (verified on 2026-10-20), in the
// order of projects.items.<key>.linkLabels.
const projectLinks = {
  p01: ["https://www.enerbird.com/produits/"],
  p02: ["https://www.segulatechnologies.com/en/news/e3s-an-intelligent-energy-management-tool-for-sailboats/"],
  p03: [
    "https://scle.fr/services/ingenierie-expertise/conception-hardware-et-software/",
    "https://scle.fr/services/ingenierie-expertise/",
  ],
  p04: ["https://optim.recherche.enac.fr/"],
} as const;

export default async function ProjectsSection() {
  const t = await getTranslations();

  return (
    <section className="section projects page-section" id="projects">
      <div className="section-label">{t('projects.label')}</div>
      <div className="project-head">
        <SectionTitle part1={t('projects.titlePart1')} emphasis={t('projects.titleEmphasis')}/>
        <p>{t('projects.subtitle')}</p>
      </div>
      <div className="project-list">
        {projectKeys.map((key) => {
          const linkLabels = t.raw(`projects.items.${key}.linkLabels`) as string[];
          return (
            <article className="project" key={key}>
              <div className="project-number">{projectNumbers[key]}</div>
              <div className="project-main">
                <p className="kicker">{t(`projects.items.${key}.category`)}</p>
                <h3>{t(`projects.items.${key}.title`)}</h3>
                <p>{t(`projects.items.${key}.text`)}</p>
                <div className="tags">
                  {projectTags[key].map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="project-links">
                  {projectLinks[key].map((href, i) => (
                    <a
                      key={href}
                      className="project-link"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkLabels[i]} <ArrowUpRight size={16} aria-hidden="true"/>
                      <span className="sr-only"> ({t('projects.newTab')})</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
