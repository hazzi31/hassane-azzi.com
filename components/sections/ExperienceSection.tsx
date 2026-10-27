import {getTranslations} from 'next-intl/server';
import {SectionTitle} from './SectionHeading';

export const expKeys = ['e01', 'e02', 'e03', 'e04'] as const;

export default async function ExperienceSection() {
  const t = await getTranslations();

  return (
    <section className="section experience page-section" id="experience">
      <div className="section-label">{t('experience.label')}</div>
      <SectionTitle part1={t('experience.titlePart1')} emphasis={t('experience.titleEmphasis')}/>
      <div className="timeline">
        {expKeys.map((key) => {
          const missions = t.raw(`experience.items.${key}.missions`) as string[];
          const techTags = String(t(`experience.items.${key}.tech`)).split(' · ');
          return (
            <article className="timeline-item" key={key}>
              <div className="date">
                <span>{t(`experience.items.${key}.date`)}</span>
                <span className="timeline-date-detail">{t(`experience.items.${key}.dateDetail`)}</span>
                <span className="timeline-type">{t(`experience.items.${key}.type`)}</span>
              </div>
              <div>
                <h3>{t(`experience.items.${key}.role`)}</h3>
                <p className="company">
                  {t(`experience.items.${key}.company`)} · {t(`experience.items.${key}.place`)}
                </p>
                <p>{t(`experience.items.${key}.text`)}</p>
                <ul className="timeline-missions">
                  {missions.map((mission, i) => (
                    <li key={i}>{mission}</li>
                  ))}
                </ul>
                <div className="tags timeline-tech">
                  {techTags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
