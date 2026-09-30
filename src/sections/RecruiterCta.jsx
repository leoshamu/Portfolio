function RecruiterCta({ cvPath }) {
  return (
    <section className="recruiter-cta reveal" aria-label="Recruiter quick access">
      <div>
        <p className="eyebrow">Recruiters</p>
        <p className="recruiter-cta-copy">
          Need a quick overview? Download my CV and review my projects below.
        </p>
      </div>
      <div className="recruiter-cta-actions">
        <a className="button button-secondary" href="/cv/">
          View CV
        </a>
        <a className="button button-primary" href={cvPath} download>
          Download CV
        </a>
      </div>
    </section>
  )
}

export default RecruiterCta
