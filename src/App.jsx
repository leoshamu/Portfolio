import { useEffect, useState } from 'react'

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

const routes = ['home', 'about', 'skills', 'work', 'contact']

function getRouteFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '') || 'home'
  return routes.includes(route) ? route : 'home'
}

function App() {
  const cvPath = `${import.meta.env.BASE_URL}Leo-Shamu-CV.pdf`
  const [activeRoute, setActiveRoute] = useState(getRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(getRouteFromHash())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const pageTitle = activeRoute === 'home'
    ? 'Home'
    : activeRoute.charAt(0).toUpperCase() + activeRoute.slice(1)

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header activeRoute={activeRoute} profile={profile} />

      <main className="site-main page-view" aria-label={`${pageTitle} page`}>
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

        {activeRoute === 'work' ? (
          <WorkSection featuredProjects={featuredProjects} />
        ) : null}

        {activeRoute === 'contact' ? (
          <ContactSection cvPath={cvPath} profile={profile} />
        ) : null}
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 {profile.name}</p>
        <p>{profile.role}</p>
      </footer>
    </div>
  )
}

export default App
