import { useState } from 'react'

import ImageLightbox from '../components/ImageLightbox'
import SectionHeading from '../components/SectionHeading'

function ProjectActions({ project, compact = false }) {
  return (
    <div className={compact ? 'work-actions work-actions-compact' : 'work-actions'}>
      <a className="work-action work-action-primary" href={`/projects/${project.slug}/`}>
        View case study <span aria-hidden="true">&rarr;</span>
      </a>
      {project.website ? (
        <a className="work-action" href={project.website} target="_blank" rel="noreferrer">
          Visit website <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {project.github ? (
        <a className="work-action" href={project.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  )
}

function ScreenshotButton({ image, project, className, eager = false, onOpen }) {
  if (!image) return null

  return (
    <button
      className={className}
      type="button"
      aria-label={`Open ${project.title} screenshot`}
      onClick={() => onOpen({ image, projectTitle: project.title })}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={image.fit === 'contain' ? 'project-image-contain' : undefined}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
      />
    </button>
  )
}

function WorkSection({ featuredProjects }) {
  const [lightbox, setLightbox] = useState(null)
  const [leadProject, ...remainingProjects] = featuredProjects
  const spotlightProjects = remainingProjects.slice(0, 2)
  const otherProjects = remainingProjects.slice(2)
  const leadDesktopImage = leadProject?.images?.[1] ?? leadProject?.images?.[0]
  const leadMobileImage = leadProject?.images?.find((image) => image.fit === 'contain')

  return (
    <section className="section work" id="work">
      <div className="work-intro-note">
        <span>Selected work</span>
        <p>Products built with purpose, polished for real users, and shipped to the web.</p>
      </div>

      <SectionHeading
        eyebrow="Projects"
        title="Work that solves real problems."
        description="A focused selection of client platforms and full-stack applications—from business websites to secure, database-backed systems."
        headingLevel="h1"
      />

      {leadProject ? (
        <article className="work-feature">
          <div className="work-feature-copy">
            <div className="work-kicker-row">
              <span className="work-number">01</span>
              <span className="work-live-indicator"><i aria-hidden="true" /> Live client platform</span>
            </div>

            <div className="work-feature-heading">
              <p className="work-client-label">Featured case study</p>
              <h2>{leadProject.title}</h2>
              <p className="work-feature-summary">{leadProject.summary}</p>
            </div>

            <div className="work-feature-meta">
              <p className="work-meta-label">My role</p>
              <p>{leadProject.role}</p>
            </div>

            <ul className="work-tech-list" aria-label={`${leadProject.title} technologies`}>
              {leadProject.stack.slice(0, 6).map((item) => <li key={item}>{item}</li>)}
            </ul>

            <ProjectActions project={leadProject} />
          </div>

          <div className="work-feature-visual">
            <span className="work-visual-label">Responsive retail experience</span>
            <ScreenshotButton
              image={leadDesktopImage}
              project={leadProject}
              className="work-desktop-shot"
              eager
              onOpen={setLightbox}
            />
            <ScreenshotButton
              image={leadMobileImage}
              project={leadProject}
              className="work-mobile-shot"
              eager
              onOpen={setLightbox}
            />
            <span className="work-image-hint">Click either screen to enlarge</span>
          </div>
        </article>
      ) : null}

      <div className="work-section-label">
        <div>
          <p className="eyebrow">More selected work</p>
          <h2>Designed, developed and delivered.</h2>
        </div>
        <p>Each project represents a different real-world problem, technical challenge, and opportunity to build something useful.</p>
      </div>

      <div className="work-spotlight-grid">
        {spotlightProjects.map((project, index) => (
          <article key={project.title} className={`work-spotlight-card work-spotlight-card-${index + 1}`}>
            <div className="work-spotlight-media">
              <ScreenshotButton
                image={project.images?.[0]}
                project={project}
                className="work-spotlight-image"
                onOpen={setLightbox}
              />
              <span className="work-spotlight-number">0{index + 2}</span>
            </div>

            <div className="work-spotlight-copy">
              <div>
                <p className="project-badge">{project.badge}</p>
                <h3>{project.title}</h3>
              </div>
              <p className="work-spotlight-summary">{project.summary}</p>
              <ul className="work-tech-list work-tech-list-dark" aria-label={`${project.title} technologies`}>
                {project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ProjectActions project={project} compact />
            </div>
          </article>
        ))}
      </div>

      {otherProjects.length ? (
        <section className="work-archive" aria-labelledby="other-projects-title">
          <div className="work-archive-heading">
            <div>
              <p className="eyebrow">Other builds</p>
              <h2 id="other-projects-title">More problems explored through code.</h2>
            </div>
            <span>{String(otherProjects.length).padStart(2, '0')} projects</span>
          </div>

          <div className="work-archive-grid">
            {otherProjects.map((project, index) => (
              <article key={project.title} className="work-archive-card">
                <div className="work-archive-topline">
                  <span>0{index + 4}</span>
                  <span>{project.badge}</span>
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <ul className="work-archive-stack" aria-label={`${project.title} technologies`}>
                  {project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                </ul>
                <ProjectActions project={project} compact />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <ImageLightbox
        image={lightbox?.image}
        projectTitle={lightbox?.projectTitle}
        onClose={() => setLightbox(null)}
      />
    </section>
  )
}

export default WorkSection
