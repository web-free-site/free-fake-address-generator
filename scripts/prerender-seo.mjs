import fs from 'node:fs'
import path from 'node:path'

const HOST = 'https://free-fake-address-generator.web-free.site'
const dist = path.resolve('dist')
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const toolPages = [
  {
    path: '/us-address-generator',
    locale: 'en',
    title: 'US Address Generator — Fake American Mailing Addresses',
    description: 'Free US fake address generator with state picker, ZIP codes, and optional names.',
    h1: 'US address generator (fake mailing addresses)',
    snippet: '<p>Generate random US street addresses with state-aware ZIP codes. Export CSV for QA.</p>',
  },
  {
    path: '/uk-address-generator',
    locale: 'en',
    title: 'UK Address Generator — Fake British Addresses & Postcodes',
    description: 'Generate fake UK addresses with postcodes and counties for form testing.',
    h1: 'UK address generator (fake postcodes)',
    snippet: '<p>British-style streets, postcodes, and phone numbers. Client-side Faker.js.</p>',
  },
  {
    path: '/canada-address-generator',
    locale: 'en',
    title: 'Canada Address Generator — Fake Canadian Addresses by Province',
    description: 'Fake Canadian addresses with province picker and bulk CSV export.',
    h1: 'Canada address generator (provinces & postal codes)',
    snippet: '<p>Pick a province or randomize. Sample data for checkout and CRM tests.</p>',
  },
  {
    path: '/random-mailing-address-for-testing',
    locale: 'en',
    title: 'Random Mailing Address for Testing — Bulk Fake Addresses',
    description: 'Bulk random mailing addresses for QA with CSV and JSON export.',
    h1: 'Random mailing address for software testing',
    snippet: '<p>Generate up to 500 fake addresses in your browser. No API key.</p>',
  },
  {
    path: '/fr/generateur-adresse-factice',
    locale: 'fr',
    title: 'Générateur d’adresse factice gratuit — Données de test',
    description: 'Adresses fictives pour tests : rue, ville, code postal, téléphone.',
    h1: 'Générateur d’adresse factice pour développement',
    snippet: '<p>Données fictives générées dans le navigateur. Export CSV/JSON.</p>',
  },
]

const legalPages = [
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy — Free Fake Address Generator',
    description: 'Privacy policy for Free Fake Address Generator. Client-side only.',
    h1: 'Privacy',
    snippet: '<p>We do not store addresses you generate. Ads may use third-party cookies.</p>',
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms — Free Fake Address Generator',
    description: 'Terms of use for fake address test data.',
    h1: 'Terms of use',
    snippet: '<p>Sample data only. No fraud or unlawful use.</p>',
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About — Free Fake Address Generator',
    description: 'About this fakexy-style test address tool.',
    h1: 'About',
    snippet: '<p>Built on MIT Faker.js for Gentil M.</p>',
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free Fake Address Generator',
    description: 'Contact gentil@quevvy.com',
    h1: 'Contact',
    snippet: '<p>Email gentil@quevvy.com</p>',
  },
]

const pages = [...toolPages, ...legalPages]

function buildPage(page) {
  const url = HOST + page.path
  let html = baseHtml
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  )
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  )
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`)
  return html
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page))
}

console.log('Prerendered', pages.length, 'route shells')
