import './styles.css'
import {
  featuredProjects,
  heroStats,
  highlights,
  principles,
  profile,
  skillGroups,
  statusItems,
} from './content'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p className="section-description">{description}</p>
    </div>
  )
}

function App() {
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">{initials}</span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top" className="site-main">
        <section className="section hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">{profile.role}</p>
            <h1>{profile.headline}</h1>
            <p className="lead">{profile.intro}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View projects
              </a>
              <a className="button button-secondary" href="#skills">
                View skills
              </a>
            </div>

            <p className="hero-note">{profile.availability}</p>
          </div>

          <aside className="hero-panel reveal">
            <div className="panel-top">
              <p className="eyebrow">Current focus</p>
              <h2>{profile.currentFocus}</h2>
              <p className="panel-copy">{profile.panelIntro}</p>
            </div>

            <div className="metric-grid">
              {heroStats.map((item) => (
                <article key={item.label} className="metric-card">
                  <p className="card-label">{item.label}</p>
                  <p className="metric-value">{item.value}</p>
                </article>
              ))}
            </div>

            <div className="status-list">
              {statusItems.map((item) => (
                <div key={item.label} className="status-item">
                  <p className="card-label">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="section section-tight" id="about">
          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`highlight-card highlight-card-${index + 1}`}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section story">
          <SectionHeading
            eyebrow="About"
            title="A little about me."
            description="This section gives a quick idea of who I am, what I use, and the kind of work I enjoy doing."
          />

          <div className="story-layout">
            <div className="story-copy">
              {profile.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills" id="skills">
          <SectionHeading
            eyebrow="Skills"
            title="Tools and skills I work with."
            description="These are the main technologies and areas I have been learning and using in my projects."
          />

          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <li key={skill} className="skill-chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section work" id="work">
          <div className="projects-intro-quote">
            <p className="quote-text">"I want my work to speak for itself."</p>
          </div>
          <SectionHeading
            eyebrow="Projects"
            title="Some of the projects I have worked on."
            description="These are the projects I want to highlight right now, and I will keep updating this section as I build more."
          />

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="project-card">
                <p className="project-badge">{project.badge}</p>
                <h3>{project.title}</h3>
                {project.images?.length ? (
                  <div className="project-gallery">
                    <div className="project-gallery-main">
                      <a
                        href={project.images[0].src}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} main screenshot`}
                      >
                        <img src={project.images[0].src} alt={project.images[0].alt} />
                      </a>
                    </div>
                    <div className="project-gallery-strip">
                      {project.images.slice(1).map((image) => (
                        <div key={image.src} className="project-gallery-thumb">
                          <a
                            href={image.src}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open screenshot for ${project.title}`}
                          >
                            <img src={image.src} alt={image.alt} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <p className="project-summary">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>

                <ul className="project-stack-list">
                  {project.stack.map((item) => (
                    <li key={item} className="project-stack-chip">
                      {item}
                    </li>
                  ))}
                </ul>
                {project.github ? (
                  <div className="project-links">
                    <a
                      className="project-link-button"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub
                    </a>
                  </div>
                ) : null}
                {project.outcome ? (
                  <p className="project-outcome">{project.outcome}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section principles">
          <SectionHeading
            eyebrow="How I work"
            title="A few things that matter to me when I build."
            description="This is the kind of approach I try to bring into the projects I work on."
          />

          <div className="principles-grid">
            {principles.map((item) => (
              <article key={item.number} className="principle-card">
                <p className="principle-number">{item.number}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">About me</p>
              <h3 className="contact-about-title">Full Stack Software Engineer</h3>
              <p className="contact-about-text">
                I build full-stack web applications with a focus on clean
                interfaces, useful features, and solid backend logic.
              </p>

              <p className="eyebrow">Contact</p>
              <h2>I am open to opportunities and connections.</h2>
              <p>
                If you would like to reach out about an internship, junior role,
                or project, feel free to contact me.
              </p>

              {profile.image ? (
                <div className="about-profile-image contact-profile-image">
                  <img src={profile.image} alt="Leo Shamu portrait" />
                </div>
              ) : null}

              <div className="contact-actions">
                <a className="contact-link contact-link-primary" href={`mailto:${profile.email}`}>
                  Email me
                </a>
                <a
                  className="contact-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                {profile.github ? (
                  <a
                    className="contact-link"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub Profile
                  </a>
                ) : null}
              </div>
            </div>

            <div className="contact-panel" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 {profile.name}</p>
        <p>{profile.role}</p>
      </footer>
    </div>
  )
}

export default App
