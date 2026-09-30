import SectionHeading from '../components/SectionHeading'

function CvSection({ cvPath, profile }) {
  return (
    <section className="section cv-page">
      <SectionHeading
        eyebrow="Curriculum Vitae"
        title="A quick view of my experience and skills."
        description="Review my software engineering background, education, technical skills, and selected projects, or download the complete PDF version."
        headingLevel="h1"
      />

      <div className="cv-layout">
        <article className="cv-card">
          <p className="eyebrow">Profile</p>
          <h2>{profile.name}</h2>
          <p>{profile.intro}</p>

          <div className="cv-facts">
            <div>
              <p className="card-label">Education</p>
              <p>BSc Honours in Software Engineering, University of Zimbabwe</p>
            </div>
            <div>
              <p className="card-label">Technical focus</p>
              <p>React, JavaScript, Node.js, MongoDB, Java, APIs, and AI integrations</p>
            </div>
            <div>
              <p className="card-label">Availability</p>
              <p>{profile.availability}</p>
            </div>
          </div>
        </article>

        <aside className="cv-download-card">
          <p className="eyebrow">Recruiter copy</p>
          <h2>Download my CV</h2>
          <p>The PDF is formatted as a concise, recruiter-friendly one-page overview.</p>
          <a className="button button-primary" href={cvPath} download>
            Download CV PDF
          </a>
          <a className="button button-secondary" href="/projects/">
            View projects
          </a>
        </aside>
      </div>
    </section>
  )
}

export default CvSection
