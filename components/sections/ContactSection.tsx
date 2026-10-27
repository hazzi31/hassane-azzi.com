import {getTranslations} from 'next-intl/server';
import {Mail, MapPin, Languages} from 'lucide-react';
import {SectionTitle} from './SectionHeading';

export default async function ContactSection() {
  const t = await getTranslations();

  return (
    <section className="section contact page-section" id="contact">
      <div className="contact-card">
        <div>
          <p className="eyebrow">{t('contact.label')}</p>
          <SectionTitle part1={t('contact.titlePart1')} emphasis={t('contact.titleEmphasis')}/>
        </div>
        <div>
          <p>{t('contact.text')}</p>
          <a className="button primary" href="mailto:azzi.hassane@gmail.com">
            {t('contact.cta')} <Mail size={17}/>
          </a>
          <div className="contact-meta">
            <span><MapPin size={16}/> {t('contact.location')}</span>
            <span><Languages size={16}/> {t('contact.languages')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
