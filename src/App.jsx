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
import CvSection from './sections/CvSection'
import HeroSection from './sections/HeroSection'
import PrinciplesSection from './sections/PrinciplesSection'
import ProjectDetailSection from './sections/ProjectDetailSection'
import RecruiterCta from './sections/RecruiterCta'
import SkillsSection from './sections/SkillsSection'
import WorkSection from './sections/WorkSection'
import { findSeoPage } from './seoPages'

const legacyRoutes = {
  about: '/about/',
  skills: '/skills/',
  work: '/projects/',
  projects: '/projects/',
  contact: '/contact/',
}

function App() {
  const cvPath = `${import.meta.env.BASE_URL}Leo-Shamu-CV.pdf`
  const legacyRoute = window.location.hash.replace(/^#\/?/, '')
  if (legacyRoutes[legacyRoute]) {
    window.location.replace(legacyRoutes[legacyRoute])
    return null
  }

  const currentPage = findSeoPage(window.location.pathname)
  const activeRoute = currentPage.route
  const selectedProject = activeRoute === 'project'
    ? featuredProjects.find((project) => project.slug === currentPage.slug)
    : null
  const pageLabel = currentPage.name ?? currentPage.title.split('|')[0].trim()

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header activeRoute={activeRoute} profile={profile} />

      <main className="site-main page-view" aria-label={`${pageLabel} page`}>
        {activeRoute === 'home' ? (
          <>
            <RecruiterCta cvPath={cvPath} />
            <HeroSection
              heroStats={heroStats}
              profile={profile}
              statusItems={statusItems}
            />
          </>
        ) : null}

        {activeRoute === 'about' ? (
          <>
            <AboutSection highlights={highlights} profile={profile} />
            <PrinciplesSection principles={principles} />
          </>
        ) : null}

        {activeRoute === 'skills' ? (
          <SkillsSection skillGroups={skillGroups} />
        ) : null}

        {activeRoute === 'projects' ? (
          <WorkSection featuredProjects={featuredProjects} />
        ) : null}

        {activeRoute === 'cv' ? (
          <CvSection cvPath={cvPath} profile={profile} />
        ) : null}

        {activeRoute === 'contact' ? (
          <ContactSection cvPath={cvPath} profile={profile} />
        ) : null}

        {activeRoute === 'project' && selectedProject ? (
          <ProjectDetailSection project={selectedProject} />
        ) : null}
      </main>

      <footer className="site-footer">
        <div>
          <p>&copy; 2026 {profile.name}</p>
          <p>{profile.role}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="/about/">About</a>
          <a href="/skills/">Skills</a>
          <a href="/projects/">Projects</a>
          <a href="/cv/">CV</a>
          <a href="/contact/">Contact</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
