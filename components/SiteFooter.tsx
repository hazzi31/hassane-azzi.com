import {getTranslations} from 'next-intl/server';

export default async function SiteFooter({locale}: {locale: string}) {
  const t = await getTranslations();

  return (
    <footer>
      <div><b>HA<span>.</span></b> {t('footer.copyright')}</div>
      <div className="footer-links">
        <a href={`/${locale}/certifications`}>{t('nav.certifications')}</a>
        <a href="https://www.hassane-azzi.fr/" target="_blank" rel="noreferrer">CV</a>
        <a href="https://github.com/hazzi31" target="_blank" rel="noreferrer">GitHub</a>
        <a
          href="https://www.linkedin.com/in/hassane-azzi-312a8024/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:hazzi.enac@gmail.com">Email</a>
      </div>
    </footer>
  );
}
