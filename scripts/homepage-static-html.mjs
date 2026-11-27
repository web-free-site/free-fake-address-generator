import homepageStatic from '../src/seo/homepage-static.json' with { type: 'json' }

const HUB_URL = 'https://web-free.site/?ref=free-fake-address-generator'
const GUIDE_URL =
  'https://web-free.site/guides/fake-address-generator-testing-only/?ref=free-fake-address-generator'

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildFaqPageJsonLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function buildHomepageStaticSection(data = homepageStatic) {
  let html =
    '<section id="seo-prerender" class="seo-prerender content-article" aria-label="Free Fake Address Generator overview">'
  html += `<h1>${escapeHtml(data.h1)}</h1>`
  html += `<p class="hero__lead">${escapeHtml(data.tagline)}</p>`

  for (const section of data.sections) {
    if (section.heading) {
      html += `<h2>${escapeHtml(section.heading)}</h2>`
    }
    for (const p of section.paragraphs ?? []) {
      html += `<p>${escapeHtml(p)}</p>`
    }
    if (section.orderedList?.length) {
      html += '<ol>'
      for (const item of section.orderedList) {
        html += `<li>${escapeHtml(item)}</li>`
      }
      html += '</ol>'
    }
  }

  html += `<p>This tool is part of the <a href="${HUB_URL}">web-free.site</a> collection of free browser utilities. For a step-by-step walkthrough focused on QA, see the <a href="${GUIDE_URL}">fake address generator guide</a> on Web Free.</p>`

  html += '<h2>FAQ</h2><dl class="faq">'
  for (const item of data.faq) {
    html += `<div><dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}</dd></div>`
  }
  html += '</dl></section>'
  return html
}

export function ensureHomepageFaqJsonLd(html) {
  if (html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"')) {
    return html
  }
  const script = `<script type="application/ld+json">${JSON.stringify(buildFaqPageJsonLd(homepageStatic.faq))}</script>`
  return html.replace(/<\/head>/i, `${script}\n</head>`)
}