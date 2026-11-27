import { SITE } from '../site'

export interface SeoContentSection {
  heading?: string
  paragraphs?: string[]
  orderedList?: string[]
}

export interface SeoPage {
  path: string
  locale: 'en' | 'fr'
  title: string
  description: string
  h1: string
  keywords: string
  paragraphs: string[]
  sections?: SeoContentSection[]
  faq: { q: string; a: string }[]
}

/** Homepage hub attribution (do not use for wf-more-tools block). */
export const WEB_FREE_HUB_URL = 'https://web-free.site/?ref=free-fake-address-generator'
export const WEB_FREE_GUIDE_URL =
  'https://web-free.site/guides/fake-address-generator-testing-only/?ref=free-fake-address-generator'

const homeFaqEn = [
  {
    q: 'Are these real addresses?',
    a: 'No. Every street, city, and postal code is randomly generated sample data for software testing. Do not assume mail can be delivered or that a residence exists at that location.',
  },
  {
    q: 'Is my data sent to a server?',
    a: 'No. Generation runs entirely in your browser using the open-source Faker library. We do not store or log the addresses you create.',
  },
  {
    q: 'Can I export many addresses at once?',
    a: 'Yes. Set a bulk quantity (up to 500), generate a batch, then download CSV or JSON for fixtures, seed scripts, and QA datasets.',
  },
  {
    q: 'Which countries are supported?',
    a: 'You can generate United States, United Kingdom, and Canada-style addresses, with state, province, or region pickers so postal codes match common validation rules.',
  },
  {
    q: 'Is it legal to use fake addresses for testing?',
    a: 'Using fictional addresses for development, demos, staging, and form QA is standard practice. Do not use generated data for fraud, impersonation, KYC bypass, or ordering goods to be delivered.',
  },
]

export function canonicalFor(path: string): string {
  const p = path === '/fr' ? '/fr/generateur-adresse-factice' : path
  const normalized = p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p
  return `${SITE.canonicalHost}${normalized === '/' ? '/' : normalized}`
}

const sharedFaqEn = [
  {
    q: 'Are these real addresses?',
    a: 'No. Every street, city, and postal code is randomly generated sample data for software testing. Do not assume mail can be delivered.',
  },
  {
    q: 'Is my data sent to a server?',
    a: 'No. Generation runs entirely in your browser with the open-source Faker library. We do not store addresses you generate.',
  },
  {
    q: 'Can I export many addresses at once?',
    a: 'Yes. Choose a bulk quantity (up to 500), generate, then download CSV or JSON for fixtures and QA datasets.',
  },
  {
    q: 'Is this legal to use?',
    a: 'Using fake data for development, demos, and form testing is common and fine. Do not use generated identities for fraud or to impersonate real people.',
  },
]

const sharedFaqFr = [
  {
    q: 'S’agit-il de vraies adresses ?',
    a: 'Non. Chaque adresse est une donnée fictive générée pour les tests logiciels.',
  },
  {
    q: 'Mes données sont-elles envoyées sur un serveur ?',
    a: 'Non. La génération se fait dans votre navigateur avec la bibliothèque Faker.',
  },
  {
    q: 'Puis-je exporter en masse ?',
    a: 'Oui, jusqu’à 500 adresses en CSV ou JSON.',
  },
  {
    q: 'Usage légal ?',
    a: 'Oui pour le développement et les démos. Interdit pour la fraude ou l’usurpation.',
  },
]

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    locale: 'en',
    title: 'Free Fake Address Generator — Random Test Addresses by Country',
    description:
      'Free Fake Address Generator creates random US, UK, and Canada mailing addresses for software testing. Street, city, postal code, phone. In your browser—no sign-up.',
    h1: 'Free Fake Address Generator',
    keywords: 'fake address generator, random address, test data, fakexy alternative',
    paragraphs: [],
    sections: [
      {
        paragraphs: [
          'Free Fake Address Generator creates realistic-looking but fictional mailing addresses you can paste into checkout forms, CRM imports, and API tests. Each record includes street lines, city, state or region, postal codes, and optional phone numbers and names—enough detail for validation rules without pointing at a real household.',
          'The tool is built for software testing and prototyping, not for deliveries or account fraud. If you need plausible strings for screenshots, demo videos, or staging databases, you can generate one address or hundreds without signing up or requesting an API key.',
        ],
      },
      {
        heading: 'How to use the fake address generator',
        orderedList: [
          'Open the generator above and choose a country (United States, United Kingdom, or Canada). Country-specific pages in the header preset the same tool for one locale.',
          'Optionally pick a state, province, or region, or leave the selector on random so each click varies the location.',
          'Add an optional city name if your test needs a fixed locality, or leave the field blank for a random city from the Faker locale data.',
          'Toggle “Include random name” when your form expects a full persona, set bulk quantity if you need many rows, then click generate.',
          'Copy fields to the clipboard or download CSV or JSON when you want fixtures for automated tests, Postman collections, or database seeds.',
        ],
      },
      {
        heading: 'Privacy: everything runs in your browser',
        paragraphs: [
          'Address generation uses the MIT-licensed @faker-js/faker library loaded into the page. Values are computed on your device; they are not uploaded to our servers for processing or storage. That local-only model suits security reviews, air-gapped VMs, and teams that avoid sending PII-shaped test data through third-party APIs.',
          'We still show ads and use standard site analytics like other pages on this domain, but the random addresses themselves never leave your tab unless you copy or export them. Clear your browser tab when you are done on a shared computer.',
        ],
      },
      {
        heading: 'Common use cases for random test addresses',
        paragraphs: [
          'Quality assurance engineers use bulk export to fill regression suites that hit address validation, tax calculators, and shipping-rate APIs. Product designers drop sample addresses into Figma-linked prototypes and marketing landing pages. Backend developers seed staging tables before user-acceptance testing so reviewers see varied postal formats instead of repeated placeholders.',
          'Educational projects and hackathon demos benefit from believable data without scraping public directories or reusing a teammate’s home address. When a validator rejects a postal code, regenerate once or lock the region that matches your form’s rule set—US pages emphasize ZIP-by-state patterns, UK pages use postcode shapes, and Canada pages respect province codes.',
          'Compare this approach with reserved documentation examples (such as example.com-style placeholders): fictional Faker output rotates on demand, which helps load tests and uniqueness constraints. Pair addresses with the site’s fake name generator when you need matching personas for the same sprint.',
          'For a deeper walkthrough of responsible usage, read the companion articles linked in the site footer and the Web Free how-to guide below.',
        ],
      },
    ],
    faq: homeFaqEn,
  },
  {
    path: '/us-address-generator',
    locale: 'en',
    title: 'US Address Generator — Fake American Mailing Addresses',
    description:
      'Free US fake address generator with state picker, ZIP codes, and optional names. Random test addresses for American forms and APIs.',
    h1: 'US address generator (fake mailing addresses)',
    keywords: 'us address generator, fake us address, random american address',
    paragraphs: [
      'Need a California billing address for your checkout test or a Texas shipping label mockup? This US address generator produces random street addresses with state-aware ZIP codes. Select any US state or let the tool pick one at random.',
      'Phone numbers follow US-style formatting from Faker’s locale data. Toggle an optional random name when your test case needs a full persona. Export dozens of rows to CSV when loading address validation suites.',
      'Remember: these are synthetic records. They must not be used to bypass KYC, open financial accounts, or harass real residents.',
    ],
    faq: sharedFaqEn,
  },
  {
    path: '/uk-address-generator',
    locale: 'en',
    title: 'UK Address Generator — Fake British Addresses & Postcodes',
    description:
      'Generate fake UK addresses with postcodes, counties, and phone numbers. Free client-side tool for British form testing.',
    h1: 'UK address generator (fake postcodes)',
    keywords: 'uk address generator, fake uk address, postcode generator test',
    paragraphs: [
      'British forms often ask for county or nation alongside a postcode. This UK page uses the en_GB Faker locale so city names, streets, and postcodes look familiar in demos for HMRC-style flows, marketplaces, and SaaS billing screens.',
      'Choose England, Scotland, Wales, or Northern Ireland—or leave the selector on random. Copy results to your clipboard or download JSON for integration tests that expect UK-shaped payloads.',
      'All output is fictional sample data suitable for QA and prototyping.',
    ],
    faq: sharedFaqEn,
  },
  {
    path: '/canada-address-generator',
    locale: 'en',
    title: 'Canada Address Generator — Fake Canadian Addresses by Province',
    description:
      'Free fake Canadian address generator with province picker, postal codes, and bulk CSV export for testing.',
    h1: 'Canada address generator (provinces & postal codes)',
    keywords: 'canada address generator, fake canadian address, province test data',
    paragraphs: [
      'Canadian e-commerce and government portals validate province codes and postal formatting. Generate random Ontario, Quebec, or BC-style addresses with a single click, or filter by province for repeatable test scenarios.',
      'Bulk mode helps you seed databases before UAT. Phone numbers and optional names round out persona-style fixtures without calling paid APIs.',
      'Use responsibly: these addresses do not belong to real households.',
    ],
    faq: sharedFaqEn,
  },
  {
    path: '/random-mailing-address-for-testing',
    locale: 'en',
    title: 'Random Mailing Address for Testing — Bulk Fake Addresses',
    description:
      'Create random mailing addresses for QA, staging, and demos. Copy, CSV, or JSON export. No API key.',
    h1: 'Random mailing address for software testing',
    keywords: 'random mailing address testing, fake address bulk, qa address data',
    paragraphs: [
      'Long-tail searches like “random mailing address for testing” usually mean you need plausible strings—not deliverable locations. This page highlights bulk generation: set quantity, hit generate, and pipe CSV into your test runner.',
      'Pair addresses with optional random names when validating profile imports. Because processing is client-side, you can air-gap-friendly workflows in security-conscious teams.',
      'For country-specific rules (US ZIP by state, UK postcode patterns), use the dedicated US, UK, or Canada SEO pages linked in the header.',
    ],
    faq: sharedFaqEn,
  },
  {
    path: '/fr/generateur-adresse-factice',
    locale: 'fr',
    title: 'Générateur d’adresse factice gratuit — Données de test',
    description:
      'Adresses aléatoires pour tests : rue, ville, code postal, téléphone. États-Unis, UK, Canada. 100 % navigateur.',
    h1: 'Générateur d’adresse factice pour développement',
    keywords: 'adresse factice, générateur adresse test, données fictives',
    paragraphs: [
      'Ce générateur crée des adresses postales fictives mais réalistes pour vos formulaires, maquettes et jeux de tests. Choisissez un pays, une région facultative, puis copiez ou exportez en CSV/JSON.',
      'Le moteur repose sur la bibliothèque open source Faker.js (licence MIT). Aucune donnée ne quitte votre appareil : idéal pour le QA sur des réseaux partagés.',
      'Alternative pratique aux sites du type fakexy : messages clairs sur l’usage réservé au développement.',
    ],
    faq: sharedFaqFr,
  },
]

export const LEGAL_PATHS = ['/privacy', '/terms', '/about', '/contact'] as const
