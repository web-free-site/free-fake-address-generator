import { FC } from 'react'
import { Locale } from '../i18n/messages'
import { SITE } from '../site'
import { AdSlot } from '../components/ads/AdSlot'

interface Props {
  locale: Locale
  kind: 'privacy' | 'terms' | 'about' | 'contact'
}

const copy: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy',
    body: [
      'Free Fake Address Generator does not collect or store the addresses you generate. Processing happens locally in your browser.',
      'We do not operate user accounts. Standard web logs may be kept by our host (Cloudflare) for security.',
      'Ad networks (Adsterra) may set cookies when ad codes are enabled; review their policy when ads are active.',
      `Contact: ${SITE.contactEmail} for privacy questions.`,
    ],
  },
  terms: {
    title: 'Terms of use',
    body: [
      'This tool provides randomly generated sample addresses for software testing and education. Output is not guaranteed unique, valid for delivery, or legally usable as a real identity.',
      'You must not use generated data for fraud, harassment, evading verification, or any unlawful purpose.',
      'The site is provided as-is without warranty. Gentil M. may update these terms.',
    ],
  },
  about: {
    title: 'About',
    body: [
      'Free Fake Address Generator is a lightweight alternative to fakexy.com-style utilities: country and region pickers, bulk export, and clear testing disclaimers.',
      'Address randomization is powered by the MIT-licensed @faker-js/faker library. UI patterns are inspired by the open-source ehalt/fake-address-generator demo and the web-free.site invoice generator shell.',
      `Operator: Gentil M., Kigali, Rwanda — ${SITE.gentilUrl}`,
    ],
  },
  contact: {
    title: 'Contact',
    body: [`Email ${SITE.contactEmail} for corrections, licensing, or partnership notes.`],
  },
}

export const LegalPage: FC<Props> = ({ kind }) => {
  const c = copy[kind]
  return (
    <article className="legal-page">
      <h1>{c.title}</h1>
      {c.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <AdSlot slot="content300x250" className="ad-content" />
    </article>
  )
}
