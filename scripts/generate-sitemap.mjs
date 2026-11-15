import fs from 'node:fs'
import path from 'node:path'

const HOST = 'https://free-fake-address-generator.web-free.site'
const paths = [
  "/how-to-generate-test-addresses-for-forms",
  "/fake-address-versus-real-address-for-testing",
  '/',
  '/us-address-generator',
  '/uk-address-generator',
  '/canada-address-generator',
  '/random-mailing-address-for-testing',
  '/fr/generateur-adresse-factice',
  '/privacy',
  '/terms',
  '/about',
  '/contact',
]

const urls = paths
  .map(
    (p) => `  <url>
    <loc>${HOST}${p === '/' ? '/' : p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.85'}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync(path.join('dist', 'sitemap.xml'), xml)
console.log('Wrote sitemap.xml')
