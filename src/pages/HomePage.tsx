import { FC } from 'react'
import { Locale, t } from '../i18n/messages'
import { AdSlot } from '../components/ads/AdSlot'
import { SEO_PAGES, WEB_FREE_GUIDE_URL, WEB_FREE_HUB_URL } from '../seo/pages'
import { JsonLd } from '../components/JsonLd'
import { AddressTool } from '../components/AddressTool'
import { countryForSeoPath } from '../data/countries'

interface Props {
  locale: Locale
  seoPath?: string
}

export const HomePage: FC<Props> = ({ locale, seoPath = '/' }) => {
  const seo = SEO_PAGES.find((p) => p.path === seoPath) ?? SEO_PAGES[0]
  const presetCountry = countryForSeoPath(seoPath)

  return (
    <>
      <JsonLd page={seo} />
      <section className="hero">
        <h1>{seo.h1}</h1>
        <p className="hero__lead">{locale === 'fr' && seo.path.startsWith('/fr') ? seo.description : t(locale, 'tagline')}</p>
      </section>

      <AddressTool locale={locale} seoPath={seoPath} presetCountry={presetCountry} />

      <AdSlot slot="nativeBelowResult" className="ad-native" />
      <AdSlot slot="betweenToolContent728x90" className="ad-between" />

      <article className="content-article">
        {seo.sections
          ? seo.sections.map((section, si) => (
              <div key={si}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs?.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
                {section.orderedList ? (
                  <ol>
                    {section.orderedList.map((item, li) => (
                      <li key={li}>{item}</li>
                    ))}
                  </ol>
                ) : null}
              </div>
            ))
          : seo.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        {seo.path === '/' ? (
          <p>
            This tool is part of the{' '}
            <a href={WEB_FREE_HUB_URL} rel="noopener noreferrer">
              web-free.site
            </a>{' '}
            collection of free browser utilities. For a step-by-step walkthrough focused on QA, see the{' '}
            <a href={WEB_FREE_GUIDE_URL} rel="noopener noreferrer">
              fake address generator guide
            </a>{' '}
            on Web Free.
          </p>
        ) : null}
        <AdSlot slot="content468x60" className="ad-content" />
        <h2>{locale === 'fr' ? 'FAQ' : 'FAQ'}</h2>
        <dl className="faq">
          {seo.faq.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
        <AdSlot slot="content300x250" className="ad-content" />
      </article>
    </>
  )
}
