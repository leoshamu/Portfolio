import SectionHeading from '../components/SectionHeading'

function SkillsSection({ skillGroups }) {
  return (
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
  )
}

export default SkillsSection
