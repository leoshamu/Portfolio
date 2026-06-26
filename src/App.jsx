import './styles.css'
import {
  featuredProjects,
  heroStats,
  highlights,
  principles,
  profile,
  skillGroups,
  statusItems,
} from './content'
import Header from './components/Header'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'
import HeroSection from './sections/HeroSection'
import PrinciplesSection from './sections/PrinciplesSection'
import RecruiterCta from './sections/RecruiterCta'
import SkillsSection from './sections/SkillsSection'
import WorkSection from './sections/WorkSection'

function App() {
  const cvPath = `${import.meta.env.BASE_URL}Leo-Shamu-CV.pdf`

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header profile={profile} />

      <main id="top" className="site-main">
        <RecruiterCta cvPath={cvPath} />
        <HeroSection
          heroStats={heroStats}
          profile={profile}
          statusItems={statusItems}
        />
        <AboutSection highlights={highlights} profile={profile} />
        <SkillsSection skillGroups={skillGroups} />
        <WorkSection featuredProjects={featuredProjects} />
        <PrinciplesSection principles={principles} />
        <ContactSection cvPath={cvPath} profile={profile} />
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 {profile.name}</p>
        <p>{profile.role}</p>
      </footer>
    </div>
  )
}

export default App
