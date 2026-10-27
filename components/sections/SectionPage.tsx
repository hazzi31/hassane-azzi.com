import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {pageMetadata} from '../../i18n/seo';
import type {SectionPage as Section} from '../../i18n/sections';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import AboutSection from './AboutSection';
import ExpertiseSection from './ExpertiseSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection, {expKeys} from './ExperienceSection';
import EducationSection from './EducationSection';
import ContactSection from './ContactSection';

const sections = {
  about: AboutSection,
  expertise: ExpertiseSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  education: EducationSection,
  contact: ContactSection,
} as const;

// Standalone page of one section: shared header, the section, shared footer.
export default function SectionPage({locale, section}: {locale: string; section: Section}) {
  const Content = sections[section];
  return (
    <main className="page-main">
      <SiteHeader locale={locale} path={`/${section}`}/>
      <Content/>
      <SiteFooter locale={locale}/>
    </main>
  );
}

// Title "<menu label> | Hassane AZZI" and a description built from the
// section's existing texts (no text written only for SEO).
export async function sectionMetadata(locale: string, section: Section): Promise<Metadata> {
  const t = await getTranslations({locale});
  const heading = (s: string) => `${t(`${s}.titlePart1`)}${t(`${s}.titleEmphasis`)}`;
  const descriptions: Record<Section, () => string> = {
    about: () => t('about.profile1'),
    expertise: () => `${heading('expertise')} ${t('expertise.subtitle')}`,
    projects: () => t('projects.subtitle'),
    experience: () => `${heading('experience')} ${expKeys
      .map((k) => `${t(`experience.items.${k}.role`)} (${t(`experience.items.${k}.company`)})`)
      .join(', ')}.`,
    education: () => `${heading('education')} ${t('education.cnam.title')} (${t('education.cnam.institution')}, ${t('education.cnam.status').toLowerCase()}) · ${t('education.master.title')}.`,
    contact: () => t('contact.text'),
  };
  return pageMetadata(locale, `/${section}`, `${t(`nav.${section}`)} | Hassane AZZI`, descriptions[section]());
}
