export const siteUrl = 'https://leoshamu.co.zw'

export const corePages = [
  {
    route: 'home',
    path: '/',
    title: 'Leo Shamu | Software Engineer Portfolio',
    description:
      'Leo Shamu is a software engineer building modern full-stack web applications with React, Node.js, MongoDB, JavaScript, and AI integrations.',
    schemaType: 'WebSite',
  },
  {
    route: 'about',
    path: '/about/',
    title: 'About Leo Shamu | Software Engineer',
    description:
      'Learn about Leo Shamu, a software engineering student at the University of Zimbabwe focused on clear interfaces, useful features, and dependable backend logic.',
    schemaType: 'ProfilePage',
  },
  {
    route: 'skills',
    path: '/skills/',
    title: 'Skills & Technologies | Leo Shamu',
    description:
      'Explore Leo Shamu\'s skills in React, JavaScript, Node.js, MongoDB, Java, APIs, responsive design, SEO, hosting, and AI integrations.',
    schemaType: 'WebPage',
  },
  {
    route: 'projects',
    path: '/projects/',
    title: 'Software Projects | Leo Shamu',
    description:
      'View full-stack applications and business websites built by Leo Shamu, including Smart Campus Service System and Proxima Tyres Fitment Centre.',
    schemaType: 'CollectionPage',
  },
  {
    route: 'cv',
    path: '/cv/',
    title: 'CV | Leo Shamu, Software Engineer',
    description:
      'View and download Leo Shamu\'s software engineering CV, including education, technical skills, projects, and contact information.',
    schemaType: 'ProfilePage',
  },
  {
    route: 'contact',
    path: '/contact/',
    title: 'Contact Leo Shamu | Software Engineer',
    description:
      'Contact Leo Shamu about internships, junior software engineering roles, freelance projects, and professional opportunities.',
    schemaType: 'ContactPage',
  },
]

export const projectPages = [
  {
    slug: 'proxima-tyres-fitment-centre',
    title: 'Proxima Tyres Fitment Centre Case Study | Leo Shamu',
    name: 'Proxima Tyres Fitment Centre',
    description:
      'A responsive React business website designed, developed, optimized, and deployed by Leo Shamu for a tyre fitment centre in Harare, Zimbabwe.',
  },
  {
    slug: 'smart-campus-service-system',
    title: 'Smart Campus Service System Case Study | Leo Shamu',
    name: 'Smart Campus Service System',
    description:
      'A full-stack React, Node.js, MongoDB, and AI-assisted platform built by Leo Shamu for reporting, grouping, tracking, and resolving campus facility issues.',
  },
  {
    slug: 'telecom-support-ticket-dashboard',
    title: 'Telecom Support Ticket Dashboard Case Study | Leo Shamu',
    name: 'Telecom Support Ticket Dashboard',
    description:
      'A full-stack support ticket dashboard built by Leo Shamu with React, Node.js, JavaScript, and MongoDB.',
  },
  {
    slug: 'uz-off-campus-accommodation',
    title: 'UZ Off Campus Accommodation Case Study | Leo Shamu',
    name: 'UZ Off Campus Accommodation',
    description:
      'A full-stack accommodation platform built by Leo Shamu to help University of Zimbabwe students find off-campus housing more easily.',
  },
]

export const allSeoPages = [
  ...corePages,
  ...projectPages.map((project) => ({
    ...project,
    route: 'project',
    path: `/projects/${project.slug}/`,
    schemaType: 'SoftwareApplication',
  })),
]

export function normalizePath(pathname) {
  const path = pathname.replace(/\/index\.html$/, '/')
  return path === '/' ? path : `${path.replace(/^\/+|\/+$/g, '')}/`.replace(/^/, '/')
}

export function findSeoPage(pathname) {
  const path = normalizePath(pathname)
  return allSeoPages.find((page) => page.path === path) ?? corePages[0]
}
