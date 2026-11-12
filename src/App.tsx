import { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { Locale } from './i18n/messages'
import { SEO_PAGES } from './seo/pages'
import { RouteMeta } from './seo/Helmet'

function localeFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

function App() {
  const location = useLocation()
  const locale = useMemo(() => localeFromPath(location.pathname), [location.pathname])

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem('freeFakeAddressLocale', l)
    } catch {
      /* ignore */
    }
  }

  const isHome =
    location.pathname === '/' ||
    location.pathname === '/fr' ||
    location.pathname === '/fr/generateur-adresse-factice'

  return (
    <Layout locale={locale} onLocale={setLocale} showHomeBanner={isHome}>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<HomePage locale="en" seoPath="/" />} />
        <Route path="/us-address-generator" element={<HomePage locale="en" seoPath="/us-address-generator" />} />
        <Route path="/uk-address-generator" element={<HomePage locale="en" seoPath="/uk-address-generator" />} />
        <Route path="/canada-address-generator" element={<HomePage locale="en" seoPath="/canada-address-generator" />} />
        <Route
          path="/random-mailing-address-for-testing"
          element={<HomePage locale="en" seoPath="/random-mailing-address-for-testing" />}
        />
        <Route path="/fr" element={<HomePage locale="fr" seoPath="/fr/generateur-adresse-factice" />} />
        <Route
          path="/fr/generateur-adresse-factice"
          element={<HomePage locale="fr" seoPath="/fr/generateur-adresse-factice" />}
        />
        <Route path="/privacy" element={<LegalPage locale={locale} kind="privacy" />} />
        <Route path="/terms" element={<LegalPage locale={locale} kind="terms" />} />
        <Route path="/about" element={<LegalPage locale={locale} kind="about" />} />
        <Route path="/contact" element={<LegalPage locale={locale} kind="contact" />} />
        <Route
          path="*"
          element={
            <HomePage
              locale={locale}
              seoPath={SEO_PAGES.some((p) => p.path === location.pathname) ? location.pathname : '/'}
            />
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
