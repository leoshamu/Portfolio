function ProjectDetailSection({ project }) {
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
            <a
              key={image.src}
              className={index === 0 ? 'project-detail-image project-detail-image-main' : 'project-detail-image'}
              href={image.src}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image.src} alt={image.alt} decoding="async" />
            </a>
          ))}
        </div>
      ) : null}

      <div className="project-detail-content">
        <article className="project-detail-copy">
          <p className="eyebrow">Case study</p>
          <h2>What I built</h2>
          <p>{project.detail || project.summary}</p>
          {project.outcome ? (
            <>
              <h2>Implementation and outcome</h2>
              <p>{project.outcome}</p>
            </>
          ) : null}
        </article>

        <aside className="project-detail-aside">
          <p className="eyebrow">Technologies</p>
          <ul className="project-stack-list">
            {project.stack.map((item) => (
              <li key={item} className="project-stack-chip">{item}</li>
            ))}
          </ul>
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
    </section>
  )
}

export default ProjectDetailSection
