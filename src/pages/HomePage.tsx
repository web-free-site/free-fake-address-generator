import { FC } from 'react'
import { Locale, t } from '../i18n/messages'
import { AdSlot } from '../components/ads/AdSlot'
import { SEO_PAGES } from '../seo/pages'
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
        {seo.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
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
