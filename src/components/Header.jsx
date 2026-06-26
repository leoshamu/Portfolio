const navItems = [
  { label: 'About', href: '#/about', route: 'about' },
  { label: 'Skills', href: '#/skills', route: 'skills' },
  { label: 'Work', href: '#/work', route: 'work' },
  { label: 'Contact', href: '#/contact', route: 'contact' },
]

function Header({ activeRoute, profile }) {
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark">{initials}</span>
        <span className="brand-name">{profile.name}</span>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeRoute === item.route ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
