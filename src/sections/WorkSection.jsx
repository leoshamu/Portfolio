import { useRef, useState } from 'react'

import SectionHeading from '../components/SectionHeading'

function WorkSection({ featuredProjects }) {
  const projectTrackRef = useRef(null)
  const [expandedProject, setExpandedProject] = useState(null)

  const scrollProjects = (direction) => {
    const track = projectTrackRef.current
    if (!track) return

    const firstCard = track.querySelector('.project-card')
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 360
    track.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: 'smooth',
    })
  }

  const toggleProjectDetails = (title) => {
    setExpandedProject((currentTitle) => (currentTitle === title ? null : title))
  }

  return (
    <section className="section work" id="work">
      <div className="projects-intro-quote">
        <p className="quote-text">"I want my work to speak for itself."</p>
      </div>
      <SectionHeading
        eyebrow="Projects"
        title="Some of the projects I have worked on."
        description="These are the projects I want to highlight right now, and I will keep updating this section as I build more."
      />

      <div className="project-carousel-controls" aria-label="Project carousel controls">
        <button
          className="project-arrow"
          type="button"
          aria-label="Show previous projects"
          onClick={() => scrollProjects(-1)}
        >
          &larr;
        </button>
        <button
          className="project-arrow"
          type="button"
          aria-label="Show next projects"
          onClick={() => scrollProjects(1)}
        >
          &rarr;
        </button>
      </div>

      <div
        ref={projectTrackRef}
        className="project-grid"
        aria-label="Project showcase. Scroll horizontally to view more projects."
      >
        {featuredProjects.map((project) => {
          const isExpanded = expandedProject === project.title
          const hasMoreDetails = Boolean(project.detail || project.outcome)

          return (
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
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
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
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <p className="project-summary">{project.summary}</p>

              <ul className="project-stack-list">
                {project.stack.map((item) => (
                  <li key={item} className="project-stack-chip">
                    {item}
                  </li>
                ))}
              </ul>
              {project.website || project.github ? (
                <div className="project-links">
                  {project.website ? (
                    <a
                      className="project-link-button"
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Website
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      className="project-link-button"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub
                    </a>
                  ) : null}
                </div>
              ) : null}

              {hasMoreDetails ? (
                <div className="project-read-more-area">
                  <button
                    className="project-read-more"
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleProjectDetails(project.title)}
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>

                  {isExpanded ? (
                    <div className="project-extra-details">
                      {project.detail ? (
                        <p className="project-detail">{project.detail}</p>
                      ) : null}
                      {project.outcome ? (
                        <p className="project-outcome">{project.outcome}</p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default WorkSection
