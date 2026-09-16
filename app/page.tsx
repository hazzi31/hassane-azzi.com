import Image from "next/image";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Download,
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

const skills = [
  ["Optimization", "MILP · MINLP · CP · MPC · Metaheuristics", Cpu],
  ["Machine Learning", "Python · Scikit-learn · TensorFlow · MLflow", BrainCircuit],
  ["Software Engineering", "Modern C++ · Java · Python · Spring Boot", Code2],
  ["Industrial Systems", "Energy · EMS · SCADA · Simulation", BarChart3],
  ["Cloud & DevOps", "Docker · Kubernetes · Kafka · CI/CD", Cloud],
  ["Data & Scientific Computing", "NumPy · Pandas · Pyomo · Gurobi · CPLEX", Database]
] as const;

const projects = [
  {
    number: "01",
    title: "ENERBIRD / Hybrid Energy Management",
    category: "Optimization · Energy · Machine Learning",
    text:
      "Optimal control and energy management for hybrid renewable power plants combining solar/wind generation and battery storage. Optimization models are coupled with forecasting and real-time operational constraints.",
    tags: ["MILP", "MINLP", "Python", "Pyomo", "ML", "SCADA"]
  },
  {
    number: "02",
    title: "E3S — Energy Smart Sailing Ship",
    category: "Research & Innovation · Energy",
    text:
      "Hybrid intelligent energy-management system for a long-range sailing ship. The project combines renewable sources, diesel generation and battery storage with robust optimization under weather uncertainty.",
    tags: ["C++", "GLPK", "Optimization", "EMS", "MATLAB"]
  },
  {
    number: "03",
    title: "High-Voltage Substation Simulation",
    category: "Software Engineering · C++",
    text:
      "Backend software development for simulation of high-voltage substation cards, with a strong focus on reliability, architecture, testing and maintainable modern C++.",
    tags: ["C++", "Simulation", "Backend", "Testing", "Architecture"]
  },
  {
    number: "04",
    title: "Air Traffic Conflict Resolution",
    category: "Operations Research · Aeronautics",
    text:
      "Exact and approximate approaches for resolving aircraft conflicts, exploring mathematical modeling, combinatorial optimization and metaheuristics in an air-traffic-management context.",
    tags: ["OR", "Metaheuristics", "ATM", "Algorithms"]
  }
];

const experience = [
  {
    date: "2024 — present",
    role: "Optimization & Machine Learning Engineer",
    company: "Naldeo Digital for Climate",
    place: "Tarnos · France",
    text:
      "Optimization, forecasting and software solutions for hybrid renewable-energy systems and battery storage."
  },
  {
    date: "2022 — 2024",
    role: "Software Development Engineer · C++",
    company: "SCLE SFE",
    place: "Toulouse · France",
    text:
      "Backend development and simulation software for high-voltage electrical-substation systems."
  },
  {
    date: "2018 — 2022",
    role: "Software Engineer · C++ / Java",
    company: "SEGULA Technologies",
    place: "Brest · France",
    text:
      "Software engineering activities following the E3S research project, with C++ and Java development."
  },
  {
    date: "2018",
    role: "Research & Innovation Engineer",
    company: "SEGULA Technologies",
    place: "Cherbourg · France",
    text:
      "Research project on intelligent energy management, robust optimization and uncertainty in renewable-energy systems."
  }
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand">
  <Image
    src="/optim-decision-logo-header.png"
    alt="Optim & Decision"
    width={210}
    height={82}
    priority
  />
</a>

        <nav>
          <a href="#about">About</a>
          <a href="#expertise">Expertise</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="mailto:hazzi.enac@gmail.com">Let's talk <ArrowUpRight size={16}/></a>
      </header>

      <section className="hero section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">OPERATIONS RESEARCH · OPTIMIZATION · AI</p>
            <h1>I turn complex problems into <em>better decisions.</em></h1>
            <p className="lead">
              I&apos;m Hassane AZZI, an engineer specialized in mathematical
              optimization, machine learning and software engineering.
              I design intelligent decision-support solutions for demanding
              industrial systems.
            </p>
            <div className="actions">
              <a className="button primary" href="#projects">Explore my work <ArrowUpRight size={18}/></a>
              <a className="button secondary" href="https://www.hassane-azzi.fr/" target="_blank" rel="noreferrer">
                View full profile <ExternalLink size={16}/>
              </a>
            </div>
            <div className="socials">
              <a href="https://github.com/hazzi31" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>
              <a href="https://fr.linkedin.com/in/hassane-azzi-312a8024" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>
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
              <img
                src="https://avatars.githubusercontent.com/u/35087369?v=4"
                alt="Hassane AZZI"
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
        <div className="scroll-note"><span/> Scroll to explore</div>
      </section>

      <section className="marquee">
        <div>OPTIMIZATION <span>✦</span> MACHINE LEARNING <span>✦</span> MODERN C++ <span>✦</span> ENERGY SYSTEMS <span>✦</span> DECISION SUPPORT <span>✦</span> </div>
      </section>

      <section className="section about" id="about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-grid">
          <div>
            <h2>Mathematics, algorithms<br/>and <em>real-world impact.</em></h2>
          </div>
          <div>
            <p className="big-copy">
              My background sits at the intersection of <strong>operations research</strong>,
              <strong> software engineering</strong> and <strong>data science</strong>.
            </p>
            <p>
              I enjoy turning a messy industrial problem into a precise model,
              selecting the right algorithm, then turning the result into robust
              production software. My experience spans energy systems,
              aeronautics, simulation and decision-support applications.
            </p>
            <div className="facts">
              <div><b>MSc</b><span>Operations Research & Optimization</span></div>
              <div><b>ENAC</b><span>Toulouse engineering ecosystem</span></div>
              <div><b>3</b><span>Core languages: C++ · Java · Python</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section" id="expertise">
        <div className="section-label">02 / EXPERTISE</div>
        <div className="dark-head">
          <h2>From model<br/>to <em>production.</em></h2>
          <p>Scientific depth with a software engineer&apos;s mindset.</p>
        </div>
        <div className="skills-grid">
          {skills.map(([title, desc, Icon]) => (
            <article className="skill" key={title}>
              <Icon size={24}/>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-label">03 / SELECTED WORK</div>
        <div className="project-head">
          <h2>Problems worth <em>solving.</em></h2>
          <p>A selection of technical and research projects across energy, aeronautics and industrial software.</p>
        </div>
        <div className="project-list">
          {projects.map((p) => (
            <article className="project" key={p.number}>
              <div className="project-number">{p.number}</div>
              <div className="project-main">
                <p className="kicker">{p.category}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <ArrowUpRight className="project-arrow" size={30}/>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="section-label">04 / EXPERIENCE</div>
        <h2>A path built around <em>complex systems.</em></h2>
        <div className="timeline">
          {experience.map((e) => (
            <article className="timeline-item" key={e.date + e.company}>
              <div className="date">{e.date}</div>
              <div>
                <h3>{e.role}</h3>
                <p className="company">{e.company} · {e.place}</p>
                <p>{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section education" id="education">
        <div className="section-label">05 / EDUCATION</div>
        <div className="edu-grid">
          <div>
            <h2>Scientific<br/><em>foundations.</em></h2>
          </div>
          <div className="edu-card">
            <p className="kicker">MASTER&apos;S DEGREE · 2016 — 2018</p>
            <h3>Computer Science — Operations Research & Optimization</h3>
            <p>ENAC · ENSEEIHT · ISAE-SUPAERO · INSA · Université Toulouse III — Paul Sabatier</p>
            <div className="tags">
              <span>Mathematical Programming</span><span>Combinatorial Optimization</span>
              <span>Graphs & Networks</span><span>Air Traffic Management</span><span>Machine Learning</span>
            </div>
          </div>
          <div className="edu-card">
            <p className="kicker">CERTIFICATE · 2019</p>
            <h3>Applied Data Science & Machine Learning</h3>
            <p>Columbia Engineering & Emeritus Institute of Management</p>
            <div className="tags"><span>Python</span><span>Data Science</span><span>Machine Learning</span></div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-card">
          <div>
            <p className="eyebrow">06 / CONTACT</p>
            <h2>Let&apos;s solve something<br/><em>interesting.</em></h2>
          </div>
          <div>
            <p>Open to engineering opportunities and technically challenging projects around optimization, AI and software engineering.</p>
            <a className="button primary" href="mailto:hazzi.enac@gmail.com">Send me an email <Mail size={17}/></a>
            <div className="contact-meta">
              <span><MapPin size={16}/> Toulouse · France</span>
              <span><Languages size={16}/> FR · EN · DE</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div><b>HA<span>.</span></b> © 2026 Hassane AZZI</div>
        <div className="footer-links">
          <a href="https://www.hassane-azzi.fr/" target="_blank" rel="noreferrer">CV</a>
          <a href="https://github.com/hazzi31" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://fr.linkedin.com/in/hassane-azzi-312a8024" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hazzi.enac@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  );
}
