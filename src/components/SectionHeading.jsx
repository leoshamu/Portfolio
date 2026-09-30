function SectionHeading({ eyebrow, title, description, headingLevel = 'h2' }) {
  const Heading = headingLevel

  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <Heading>{title}</Heading>
      </div>
      <p className="section-description">{description}</p>
    </div>
  )
}

export default SectionHeading
