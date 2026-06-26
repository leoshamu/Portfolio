import DeferredHeroBeams from '../components/DeferredHeroBeams'

function HeroSection({ heroStats, profile, statusItems }) {
  return (
    <section className="section hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">{profile.role}</p>
        <h1>{profile.headline}</h1>
        <p className="lead">{profile.intro}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View projects
          </a>
          <a className="button button-secondary" href="#skills">
            View skills
          </a>
        </div>

        <p className="hero-note">{profile.availability}</p>
      </div>

      <aside className="hero-panel reveal">
        <div className="hero-panel-beams" aria-hidden="true">
          <div className="hero-panel-fallback" />
          <DeferredHeroBeams />
        </div>
        <div className="panel-top">
          <p className="eyebrow">Current focus</p>
          <h2>{profile.currentFocus}</h2>
          <p className="panel-copy">{profile.panelIntro}</p>
        </div>

        <div className="metric-grid">
          {heroStats.map((item) => (
            <article key={item.label} className="metric-card">
              <p className="card-label">{item.label}</p>
              <p className="metric-value">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="status-list">
          {statusItems.map((item) => (
            <div key={item.label} className="status-item">
              <p className="card-label">{item.label}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}

export default HeroSection
