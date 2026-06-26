function ContactSection({ cvPath, profile }) {
  return (
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
              <img
                src={profile.image}
                alt="Leo Shamu portrait"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          ) : null}

          <div className="contact-actions">
            <a className="contact-link contact-link-primary" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a className="contact-link" href={cvPath} download>
              Download CV
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
  )
}

export default ContactSection
