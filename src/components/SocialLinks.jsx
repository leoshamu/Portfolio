const icons = {
  github: <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.14-1.46 3.08-1.16 3.08-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />,
  linkedin: <path d="M20.5 2h-17C2.67 2 2 2.67 2 3.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5ZM8 19H5V9h3v10ZM6.5 7.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V19h-3V9h2.88v1.37h.04c.4-.76 1.38-1.57 2.84-1.57C18.2 8.8 19 10.8 19 13.4V19Z" />,
  email: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></g>,
}

function SocialLinks({ profile }) {
  const links = [
    { name: 'GitHub', href: profile.github, icon: 'github' },
    { name: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
    { name: 'Email Leo', href: `mailto:${profile.email}`, icon: 'email' },
  ]

  return (
    <nav className="home-socials" aria-label="Social profiles and email">
      {links.filter((link) => link.href).map((link) => (
        <a
          key={link.icon}
          href={link.href}
          aria-label={link.name}
          title={link.name}
          {...(link.icon !== 'email' ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icons[link.icon]}</svg>
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks
