import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { allSeoPages, siteUrl } from '../src/seoPages.js'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, '..')
const distDirectory = path.join(projectRoot, 'dist')
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8')

const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#leo-shamu`,
  name: 'Leo Shamu',
  jobTitle: 'Software Engineer',
  url: `${siteUrl}/`,
  image: `${siteUrl}/images/leo-profile.jpeg`,
  email: 'mailto:leoshamu12@gmail.com',
  sameAs: [
    'https://github.com/leoshamu',
    'https://zw.linkedin.com/in/leo-shamu-6957182a6',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Zimbabwe',
  },
}

function replaceMeta(html, selector, value) {
  const attribute = selector.startsWith('og:') ? 'property' : 'name'
  const expression = new RegExp(
    `<meta\\s+${attribute}="${selector}"\\s+content="[^"]*"\\s*/?>`,
  )
  const tag = `<meta ${attribute}="${selector}" content="${value}" />`
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function schemaFor(page) {
  const breadcrumbs = page.path === '/'
    ? null
    : {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`,
          },
          ...(page.route === 'project'
            ? [{
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: `${siteUrl}/projects/`,
              }]
            : []),
          {
            '@type': 'ListItem',
            position: page.route === 'project' ? 3 : 2,
            name: page.name ?? page.title.split('|')[0].trim(),
            item: `${siteUrl}${page.path}`,
          },
        ],
      }

  let pageSchema
  if (page.route === 'home') {
    pageSchema = {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Leo Shamu',
      alternateName: ['Leo Shamu Portfolio', 'leoshamu.co.zw'],
      description: page.description,
      author: { '@id': person['@id'] },
    }
  } else if (page.route === 'about' || page.route === 'cv') {
    pageSchema = {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}${page.path}#profile`,
      url: `${siteUrl}${page.path}`,
      name: page.title,
      description: page.description,
      mainEntity: { '@id': person['@id'] },
    }
  } else if (page.route === 'project') {
    pageSchema = {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}${page.path}#project`,
      url: `${siteUrl}${page.path}`,
      name: page.name,
      description: page.description,
      applicationCategory: 'WebApplication',
      creator: { '@id': person['@id'] },
    }
  } else {
    pageSchema = {
      '@type': page.schemaType,
      '@id': `${siteUrl}${page.path}#page`,
      url: `${siteUrl}${page.path}`,
      name: page.title,
      description: page.description,
      author: { '@id': person['@id'] },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, pageSchema, ...(breadcrumbs ? [breadcrumbs] : [])],
  }
}

function renderPage(page) {
  const canonical = `${siteUrl}${page.path}`
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(schemaFor(page), null, 2)}\n    </script>`,
    )

  html = replaceMeta(html, 'description', page.description)
  html = replaceMeta(html, 'og:title', page.title)
  html = replaceMeta(html, 'og:description', page.description)
  html = replaceMeta(html, 'og:url', canonical)
  html = replaceMeta(html, 'twitter:title', page.title)
  html = replaceMeta(html, 'twitter:description', page.description)
  return html
}

for (const page of allSeoPages) {
  if (page.path === '/') continue
  const outputDirectory = path.join(distDirectory, page.path)
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(path.join(outputDirectory, 'index.html'), renderPage(page))
}

await writeFile(path.join(distDirectory, 'index.html'), renderPage(allSeoPages[0]))
await writeFile(path.join(distDirectory, '404.html'), renderPage(allSeoPages[0]))

console.log(`Generated ${allSeoPages.length} indexable pages.`)
