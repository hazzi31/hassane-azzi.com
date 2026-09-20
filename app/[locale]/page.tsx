import Image from "next/image";
import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  BrainCircuit,
  BarChart3,
  Code2,
  Database,
  Cloud,
  Languages,
  MapPin
} from "lucide-react";

const skillIcons = [Cpu, BrainCircuit, Code2, BarChart3, Cloud, Database] as const;
const skillKeys = ['optimization', 'ml', 'software', 'industrial', 'cloud', 'data'] as const;

const projectKeys = ['p01', 'p02', 'p03', 'p04'] as const;
const projectNumbers = {p01: "01", p02: "02", p03: "03", p04: "04"} as const;
const projectTags = {
  p01: ["MILP", "MINLP", "Python", "Pyomo", "ML", "SCADA"],
  p02: ["C++", "GLPK", "Optimization", "EMS", "MATLAB"],
  p03: ["C++", "Simulation", "Backend", "Testing", "Architecture"],
  p04: ["OR", "Metaheuristics", "ATM", "Algorithms"],
} as const;

const expKeys = ['e01', 'e02', 'e03', 'e04'] as const;

const localeDisplay = {
  en: {flag: '🇺🇸', code: 'EN'},
  fr: {flag: '🇫🇷', code: 'FR'},
  de: {flag: '🇩🇪', code: 'DE'},
};

export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const current = localeDisplay[locale as keyof typeof localeDisplay] ?? localeDisplay.en;

  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand">
          <Image
            src="/optim-decision-logo-header.png"
            alt="Optim & Decision"
            width={300}
            height={150}
            priority
          />
        </a>

        <nav>
          <a href="#about">{t('nav.about')}</a>
          <a href="#expertise">{t('nav.expertise')}</a>
          <a href="#projects">{t('nav.projects')}</a>
          <a href="#experience">{t('nav.experience')}</a>
          <a href="#education">{t('nav.education')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>

        <details className="language-selector">
          <summary>
            {current.flag} <span>{current.code}</span>{' '}
            <span className="language-arrow">▼</span>
          </summary>
          <div className="language-menu">
            <a href="/fr">🇫🇷 Français</a>
            <a href="/en">🇺🇸 English</a>
            <a href="/de">🇩🇪 Deutsch</a>
          </div>
        </details>

        <a className="nav-cta" href="mailto:hazzi.enac@gmail.com">
          {t('nav.letsTalk')} <ArrowUpRight size={16}/>
        </a>
      </header>

      <section className="hero section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <Image
              src="/optim-decision-logo.png"
              alt="Optim & Decision"
              width={210}
              height={140}
              className="hero-brand"
              priority
            />
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>
              {t('hero.titlePart1')}<em>{t('hero.titleEmphasis')}</em>
            </h1>
            <p className="lead">{t('hero.description')}</p>
            <div className="actions">
              <a className="button primary" href="#projects">
                {t('hero.exploreWork')} <ArrowUpRight size={18}/>
              </a>
              <a
                className="button secondary"
                href="https://www.hassane-azzi.fr/"
                target="_blank"
                rel="noreferrer"
              >
                {t('hero.viewFullProfile')} <ExternalLink size={16}/>
              </a>
            </div>
            <div className="socials">
              <a href="https://github.com/hazzi31" target="_blank" rel="noreferrer">
                <Github size={18}/> GitHub
              </a>
              <a
                href="https://fr.linkedin.com/in/hassane-azzi-312a8024"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18}/> LinkedIn
              </a>
              <a href="mailto:hazzi.enac@gmail.com"><Mail size={18}/> Email</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orb orb-a"/>
            <div className="orb orb-b"/>
            <div className="portrait-card">
              <div className="portrait-top">
                <span>HASSANE AZZI</span><span>01 / 01</span>
              </div>
              <Image
                src="https://avatars.githubusercontent.com/u/35087369?v=4"
                alt="Hassane AZZI"
                width={400}
                height={400}
              />
              <div className="portrait-bottom">
                <span>ENGINEER · RESEARCHER</span>
                <span>TOULOUSE / FRANCE</span>
              </div>
            </div>
            <div className="math-card">
              <span>OPTIMIZE</span>
              <b>min&nbsp; f(x)</b>
              <small>s.t. Ax ≤ b</small>
            </div>
          </div>
        </div>
        <div className="scroll-note"><span/> {t('hero.scrollNote')}</div>
      </section>

      <section className="marquee">
        <div>{t('marquee')}</div>
      </section>

      <section className="section about" id="about">
        <div className="section-label">01 / {t('about.label')}</div>
        <div className="about-grid">
          <div>
            <h2>
              {t('about.titlePart1')}<em>{t('about.titleEmphasis')}</em>
            </h2>
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
            <p>{t('about.text')}</p>
            <div className="facts">
              <div><b>MSc</b><span>{t('about.factMsc')}</span></div>
              <div><b>ENAC</b><span>{t('about.factEnac')}</span></div>
              <div><b>3</b><span>{t('about.factLanguages')}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section" id="expertise">
        <div className="section-label">02 / {t('expertise.label')}</div>
        <div className="dark-head">
          <h2>
            {t('expertise.titlePart1')}<em>{t('expertise.titleEmphasis')}</em>
          </h2>
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

      <section className="section projects" id="projects">
        <div className="section-label">03 / {t('projects.label')}</div>
        <div className="project-head">
          <h2>
            {t('projects.titlePart1')}<em>{t('projects.titleEmphasis')}</em>
          </h2>
          <p>{t('projects.subtitle')}</p>
        </div>
        <div className="project-list">
          {projectKeys.map((key) => (
            <article className="project" key={key}>
              <div className="project-number">{projectNumbers[key]}</div>
              <div className="project-main">
                <p className="kicker">{t(`projects.items.${key}.category`)}</p>
                <h3>{t(`projects.items.${key}.title`)}</h3>
                <p>{t(`projects.items.${key}.text`)}</p>
                <div className="tags">
                  {projectTags[key].map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <ArrowUpRight className="project-arrow" size={30}/>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="section-label">04 / {t('experience.label')}</div>
        <h2>
          {t('experience.titlePart1')}<em>{t('experience.titleEmphasis')}</em>
        </h2>
        <div className="timeline">
          {expKeys.map((key) => (
            <article className="timeline-item" key={key}>
              <div className="date">{t(`experience.items.${key}.date`)}</div>
              <div>
                <h3>{t(`experience.items.${key}.role`)}</h3>
                <p className="company">
                  {t(`experience.items.${key}.company`)} · {t(`experience.items.${key}.place`)}
                </p>
                <p>{t(`experience.items.${key}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section education" id="education">
        <div className="section-label">05 / {t('education.label')}</div>
        <div className="edu-grid">
          <div>
            <h2>
              {t('education.titlePart1')}<em>{t('education.titleEmphasis')}</em>
            </h2>
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
          </div>
          <div className="edu-card">
            <p className="kicker">{t('education.cert.kicker')}</p>
            <h3>{t('education.cert.title')}</h3>
            <p>{t('education.cert.institution')}</p>
            <div className="tags">
              <span>Python</span>
              <span>Data Science</span>
              <span>Machine Learning</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-card">
          <div>
            <p className="eyebrow">06 / {t('contact.label')}</p>
            <h2>
              {t('contact.titlePart1')}<em>{t('contact.titleEmphasis')}</em>
            </h2>
          </div>
          <div>
            <p>{t('contact.text')}</p>
            <a className="button primary" href="mailto:hazzi.enac@gmail.com">
              {t('contact.cta')} <Mail size={17}/>
            </a>
            <div className="contact-meta">
              <span><MapPin size={16}/> {t('contact.location')}</span>
              <span><Languages size={16}/> {t('contact.languages')}</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div><b>HA<span>.</span></b> {t('footer.copyright')}</div>
        <div className="footer-links">
          <a href="https://www.hassane-azzi.fr/" target="_blank" rel="noreferrer">CV</a>
          <a href="https://github.com/hazzi31" target="_blank" rel="noreferrer">GitHub</a>
          <a
            href="https://fr.linkedin.com/in/hassane-azzi-312a8024"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:hazzi.enac@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  );
}
