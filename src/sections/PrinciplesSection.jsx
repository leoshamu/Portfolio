import SectionHeading from '../components/SectionHeading'

function PrinciplesSection({ principles }) {
  return (
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
  )
}

export default PrinciplesSection
