import {getTranslations} from 'next-intl/server';
import {SectionTitle} from './SectionHeading';

export default async function AboutSection() {
  const t = await getTranslations();

  return (
    <section className="section about page-section" id="about">
      <div className="section-label">{t('about.label')}</div>
      <div className="about-grid">
        <div>
          <SectionTitle part1={t('about.titlePart1')} emphasis={t('about.titleEmphasis')}/>
        </div>
        <div>
          <p className="big-copy">
            {t('about.bigCopy1')}
            <strong>{t('about.bigCopyBold1')}</strong>
            {t('about.bigCopy2')}
            <strong>{t('about.bigCopyBold2')}</strong>
            {t('about.bigCopy3')}
            <strong>{t('about.bigCopyBold3')}</strong>
            {t('about.bigCopy4')}
          </p>
          <div className="profile-block">
            <h3>{t('about.profileTitle')}</h3>
            <p>{t('about.profile1')}</p>
            <p>{t('about.profile2')}</p>
            <p>{t('about.profile3')}</p>
          </div>
          <div className="facts">
            <div><b>MSc</b><span>{t('about.factMsc')}</span></div>
            <div><b>ENAC</b><span>{t('about.factEnac')}</span></div>
            <div><b>3</b><span>{t('about.factLanguages')}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
