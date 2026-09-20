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

const certCategories = ['optimization', 'ml', 'python', 'cpp', 'java'] as const;

const certData: Record<string, {title: string; org: string; url: string}[]> = {
  optimization: [
    { title: "Discrete Optimization", org: "Georgia Institute of Technology", url: "https://www.coursera.org/account/accomplishments/records/VJ84RK6QKSAM" },
    { title: "Recherche opérationnelle : optimiser ses décisions", org: "University of Montreal", url: "https://courses.edx.org/certificates/b98ea9ee88fa470eaacd01e11c1485aa" },
    { title: "Introduction to Optimization Through the Lens of Data Science (Parts 1–4)", org: "Gurobi", url: "https://www.udemy.com/course/intro-to-optimization-pt1/?srsltid=AfmBOoreof0iSpvewmnWWe5dYaWg_9gej6t2KWkh-" },
    { title: "Operations Research: An Active Learning Approach", org: "The Hong Kong Polytechnic University", url: "https://courses.edx.org/certificates/fbf1e4ce6402455b985985ccd3dedda8" },
    { title: "Optimization: Principles and Algorithms – Linear Optimization", org: "EPFL", url: "https://courses.edx.org/certificates/d022b2b077c94b73b87f679cdf9d6361" },
    { title: "Optimization: Principles and Algorithms – Network and Discrete Optimization", org: "EPFL", url: "https://courses.edx.org/certificates/905e80bf03af40d2b72c8596e62f5a4e" },
    { title: "Optimization: Principles and Algorithms – Unconstrained Nonlinear Optimization", org: "EPFL", url: "https://courses.edx.org/certificates/35dcbfd5c860423f9ce239fe71c2342f" },
    { title: "Mathematical Optimization for Business Problems", org: "Cognitive Class", url: "https://courses.cognitiveclass.ai/certificates/9a7f9df6a4c14025a4bbb369736391c8" },
    { title: "Mathematical Optimization for Engineers", org: "edX", url: "https://courses.edx.org/certificates/d2ed75dc731e4b77887aa6f65a2b208f" },
    { title: "Artificial Intelligence: Optimization Algorithms in Python", org: "Udemy", url: "https://www.udemy.com/certificate/UC-bc018bd1-ed72-4634-912c-0d4e33ce67fd/" },
    { title: "Optimization with Python: Complete Pyomo Bootcamp A-Z", org: "Udemy", url: "https://www.udemy.com/certificate/UC-c1a5b14b-7a9c-49c5-bb2a-f891de7af8c3/" },
    { title: "Operations Research & Optimization Projects With Python", org: "Udemy", url: "https://www.udemy.com/certificate/UC-ff4626ff-60c2-4e85-9ed1-27bb6b63475c/" },
    { title: "Optimization with Python: Solve Operations Research Problems", org: "Udemy", url: "https://www.udemy.com/certificate/UC-6180b999-613c-4407-8367-a0d76cb363f4/" },
    { title: "Pyomo Bootcamp: Python Optimization from Beginner to Advance", org: "Udemy", url: "https://www.udemy.com/certificate/UC-2979b0a3-f16a-48a8-ae11-7ceba1854269/" },
  ],
  ml: [
    { title: "Mathematics for Machine Learning and Data Science", org: "DeepLearning.AI", url: "https://www.coursera.org/account/accomplishments/specialization/2HM0J7K2W3JL" },
    { title: "Mathematics for Machine Learning", org: "Imperial College London", url: "https://www.coursera.org/account/accomplishments/specialization/certificate/RGBZDC3I2176" },
    { title: "Machine Learning Specialization", org: "Stanford University", url: "https://www.coursera.org/account/accomplishments/specialization/K6GSASYL9U9A" },
    { title: "Advanced Learning Algorithms", org: "Stanford University", url: "https://www.coursera.org/account/accomplishments/records/VRE79P31PMSA" },
    { title: "Supervised Machine Learning: Regression and Classification", org: "Stanford University", url: "https://www.coursera.org/account/accomplishments/records/EB2TXSU46F4B" },
    { title: "Machine Learning", org: "Columbia University", url: "https://courses.edx.org/certificates/9834b6fac26945968d4a1bfe18de90bd" },
    { title: "Machine Learning with Python", org: "IBM", url: "https://courses.cognitiveclass.ai/certificates/f4aa315677a14e439feb5ed8add4f6ae" },
    { title: "Data Visualization with Python", org: "IBM", url: "https://courses.cognitiveclass.ai/certificates/44b4ec97aeba49818dadc178eeae2744" },
    { title: "Data Analysis with Python", org: "IBM", url: "https://courses.cognitiveclass.ai/certificates/e835a8f6e02e40a8a6b039da18dc60d7" },
  ],
  python: [
    { title: "Introduction to Computer Science and Programming Using Python", org: "MIT", url: "https://courses.edx.org/certificates/d5aa2a57d9914bf2948ff115260db99c" },
    { title: "Python for Data Science", org: "Cognitive Class", url: "https://courses.cognitiveclass.ai/certificates/b52da9e2c9634c28a22305ea75ad828a" },
    { title: "Advanced Python", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/3ccf0f4203dfd24593188ece2fc4147b75942aa1aa745f37fa5f47db9cbe5446" },
    { title: "Unit Testing and Test Driven Development in Python", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/a809e5d1ba81e543f17820df567659c895758b2786819b03da9b31957f00d29f" },
  ],
  cpp: [
    { title: "Coding for Everyone: C and C++ Specialization", org: "University of California, Santa Cruz", url: "https://www.coursera.org/account/accomplishments/specialization/BVDM7XVQR6KD" },
    { title: "C++20 Mastery: Pure and Unfiltered", org: "Packt", url: "https://coursera.org/share/6a9dd729727697cec28ce3778b465eb3" },
    { title: "Complete Modern C++ (C++11, C++14, C++17)", org: "Packt", url: "https://www.coursera.org/account/accomplishments/specialization/57AWDVIE8ZXO" },
    { title: "Devenir développeur C++", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/5f35e9f8a12256253ce00496ce05855208e027134a74915dd1748c6b1ba3ad95" },
    { title: "Modern C++: Advanced Techniques and Features", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/ad4504fef91ae82064bb52b782c65007838a25d110abfaab0a4930d0d81e55a6" },
    { title: "Initiation à la programmation (en C++)", org: "EPFL", url: "https://www.coursera.org/account/accomplishments/records/3WB4UVF7LKYM" },
    { title: "Introduction à la programmation orientée objet (en C++)", org: "EPFL", url: "https://www.coursera.org/account/accomplishments/records/F56P0TRQ3DCJ" },
    { title: "Parallel and Concurrent Programming with C++ Part 1", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/f28a782b55463c2345be5fc4efe1844be4e891a53ea1e825aa64240ff10f57ea" },
    { title: "Parallel and Concurrent Programming with C++ Part 2", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/c51e50f838457791fb248e27808e2973a72595eebafd0b47115c62631f1faee4" },
    { title: "Test-Driven Development in C++", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/94c8a5e0632ac9f6449188b6e5311d535eb19878bf98ca9934433d117ffa1eaf" },
    { title: "C Essential Training", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/d6bb32a35ee5822cd21052b1de705fa6afa4383a96e8583a6623a1bb929ce009" },
  ],
  java: [
    { title: "Devenir développeur Java", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/a7a596a4bc35968cf2ad7dafa1c1ce5c9d472a0687bba81f4544ae5faf2f8161" },
    { title: "Practical Test-Driven Development for Java Programmers", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/cf0f3ef0799b8e23ea68fa836f80175129ce7942974bc15a28ce4f0343c62bde" },
    { title: "Software Architecture Foundations", org: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/2edbf154ef3a8d04b9183fc81c2293f89cc97b478039320d6ce1d2b622efec5a" },
    { title: "Linux Commands & Shell Scripting Basics", org: "edX", url: "https://courses.edx.org/certificates/f2381bdab2c540dabd50266ed746883d" },
  ],
};

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
        <nav>
          <a href="#about">{t('nav.about')}</a>
          <a href="#expertise">{t('nav.expertise')}</a>
          <a href="#projects">{t('nav.projects')}</a>
          <a href="#experience">{t('nav.experience')}</a>
          <a href="#education">{t('nav.education')}</a>
          <a href="#certs">{t('certs.label')}</a>
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

      <section className="section" id="certs">
        <div className="section-label">06 / {t('certs.label')}</div>
        <h2>{t('certs.titlePart1')}<em>{t('certs.titleEmphasis')}</em></h2>
        <div style={{marginTop: '65px'}}>
          {certCategories.map((cat) => (
            <div key={cat} className="certs-category">
              <p className="certs-category-title">{t(`certs.cat.${cat}`)}</p>
              <div className="certs-grid">
                {certData[cat].map((cert) => (
                  <div key={cert.url} className="cert-card">
                    <h4>{cert.title}</h4>
                    <p className="cert-org">{cert.org}</p>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-link"
                    >
                      {t('certs.viewCert')} <ArrowUpRight size={13}/>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-card">
          <div>
            <p className="eyebrow">07 / {t('contact.label')}</p>
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
