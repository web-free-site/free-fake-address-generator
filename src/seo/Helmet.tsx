import { FC, ReactNode, createContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO_PAGES, canonicalFor } from './pages'

const Ctx = createContext({})

export const HelmetProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Ctx.Provider value={{}}>{children}</Ctx.Provider>
)

export function usePageMeta() {
  const location = useLocation()
  const page =
    SEO_PAGES.find((p) => p.path === location.pathname) ??
    (location.pathname === '/fr' ? SEO_PAGES.find((p) => p.path === '/fr/generateur-adresse-factice') : undefined) ??
    SEO_PAGES[0]

  useEffect(() => {
    document.title = page.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', page.description)
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = page.description
      document.head.appendChild(m)
    }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalFor(page.path === '/fr' && location.pathname === '/fr' ? '/fr/generateur-adresse-factice' : page.path)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', page.title)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', page.description)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', canonical.href)

    const ensureMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null
      if (el) el.setAttribute('content', value)
      else {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        el.content = value
        document.head.appendChild(el)
      }
    }
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title)
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description)

    document.documentElement.lang = page.locale
  }, [location.pathname, page])
}

export const RouteMeta: FC = () => {
  usePageMeta()
  return null
}
