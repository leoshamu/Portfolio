import SectionHeading from '../components/SectionHeading'

function AboutSection({ highlights, profile }) {
  return (
    <>
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
    </>
  )
}

export default AboutSection
