import { useState } from 'react'

import ImageLightbox from '../components/ImageLightbox'

function ProjectDetailSection({ project }) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section className="section project-detail-page">
      <a className="project-back-link" href="/projects/">
        &larr; All projects
      </a>

      <div className="project-detail-heading">
        <div>
          <p className="project-badge">{project.badge}</p>
          <h1>{project.title}</h1>
        </div>
        <p>{project.summary}</p>
      </div>

      {project.images?.length ? (
        <div className="project-detail-gallery">
          {project.images.map((image, index) => (
            <button
              key={image.src}
              className={index === 0 ? 'project-detail-image project-detail-image-main' : 'project-detail-image'}
              type="button"
              aria-label={`Open ${project.title} screenshot`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={image.fit === 'contain' ? 'project-image-contain' : undefined}
                decoding="async"
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className="project-detail-content">
        <article className="project-detail-copy">
          <p className="eyebrow">Case study</p>
          <h2>What I built</h2>
          {project.role ? (
            <p className="project-role"><strong>Role:</strong> {project.role}</p>
          ) : null}
          <p>{project.detail || project.summary}</p>
          {project.keyFeatures?.length ? (
            <div className="project-feature-list">
              {project.keyFeatures.map((feature) => (
                <section key={feature.title} className="project-feature-item">
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </section>
              ))}
            </div>
          ) : null}
          {project.outcome ? (
            <>
              <h2>Implementation and outcome</h2>
              <p>{project.outcome}</p>
            </>
          ) : null}
        </article>

        <aside className="project-detail-aside">
          <p className="eyebrow">Technologies</p>
          {project.techGroups?.length ? (
            <div className="project-tech-groups">
              {project.techGroups.map((group) => (
                <section key={group.label} className="project-tech-group">
                  <h3>{group.label}</h3>
                  <ul className="project-stack-list">
                    {group.items.map((item) => (
                      <li key={item} className="project-stack-chip">{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <ul className="project-stack-list">
              {project.stack.map((item) => (
                <li key={item} className="project-stack-chip">{item}</li>
              ))}
            </ul>
          )}
          <div className="project-links">
            {project.website ? (
              <a className="project-link-button" href={project.website} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            ) : null}
            {project.github ? (
              <a className="project-link-button" href={project.github} target="_blank" rel="noreferrer">
                View GitHub
              </a>
            ) : null}
          </div>
        </aside>
      </div>
      <ImageLightbox
        image={selectedImage}
        projectTitle={project.title}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  )
}

export default ProjectDetailSection
