import {getTranslations} from 'next-intl/server';
import {Cpu, BrainCircuit, BarChart3, Code2, Database, Cloud} from 'lucide-react';
import {SectionTitle} from './SectionHeading';

const skillIcons = [Cpu, BrainCircuit, Code2, BarChart3, Cloud, Database] as const;
const skillKeys = ['optimization', 'ml', 'software', 'industrial', 'cloud', 'data'] as const;

export default async function ExpertiseSection() {
  const t = await getTranslations();

  return (
    <section className="section dark-section page-section" id="expertise">
      <div className="section-label">{t('expertise.label')}</div>
      <div className="dark-head">
        <SectionTitle part1={t('expertise.titlePart1')} emphasis={t('expertise.titleEmphasis')}/>
        <p>{t('expertise.subtitle')}</p>
      </div>
      <div className="skills-grid">
        {skillKeys.map((key, i) => {
          const Icon = skillIcons[i];
          return (
            <article className="skill" key={key}>
              <Icon size={24}/>
              <h3>{t(`expertise.skills.${key}.title`)}</h3>
              <p>{t(`expertise.skills.${key}.desc`)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
