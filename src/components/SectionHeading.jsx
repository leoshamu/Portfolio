function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p className="section-description">{description}</p>
    </div>
  )
}

export default SectionHeading
