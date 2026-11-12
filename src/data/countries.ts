import { CA_PROVINCES, UK_REGIONS, US_STATES } from './regions'

export type CountryId = 'US' | 'GB' | 'CA' | 'AU' | 'DE' | 'FR' | 'IN' | 'IE' | 'NL' | 'ES' | 'IT' | 'MX' | 'BR'

export interface CountryOption {
  id: CountryId
  label: string
  fakerLocale: string
  hasRegions: boolean
  regions?: { value: string; label: string }[]
  defaultRegion?: string
}

export const COUNTRIES: CountryOption[] = [
  {
    id: 'US',
    label: 'United States',
    fakerLocale: 'en_US',
    hasRegions: true,
    regions: US_STATES.map((s) => ({ value: s.abbr, label: `${s.name} (${s.abbr})` })),
  },
  {
    id: 'GB',
    label: 'United Kingdom',
    fakerLocale: 'en_GB',
    hasRegions: true,
    regions: UK_REGIONS.map((r) => ({ value: r, label: r })),
  },
  {
    id: 'CA',
    label: 'Canada',
    fakerLocale: 'en_CA',
    hasRegions: true,
    regions: CA_PROVINCES.map((p) => ({ value: p.abbr, label: `${p.name} (${p.abbr})` })),
  },
  { id: 'AU', label: 'Australia', fakerLocale: 'en_AU', hasRegions: false },
  { id: 'DE', label: 'Germany', fakerLocale: 'de', hasRegions: false },
  { id: 'FR', label: 'France', fakerLocale: 'fr', hasRegions: false },
  { id: 'IN', label: 'India', fakerLocale: 'en_IN', hasRegions: false },
  { id: 'IE', label: 'Ireland', fakerLocale: 'en_IE', hasRegions: false },
  { id: 'NL', label: 'Netherlands', fakerLocale: 'nl', hasRegions: false },
  { id: 'ES', label: 'Spain', fakerLocale: 'es', hasRegions: false },
  { id: 'IT', label: 'Italy', fakerLocale: 'it', hasRegions: false },
  { id: 'MX', label: 'Mexico', fakerLocale: 'es_MX', hasRegions: false },
  { id: 'BR', label: 'Brazil', fakerLocale: 'pt_BR', hasRegions: false },
]

export const DEFAULT_COUNTRY: CountryId = 'US'

export function countryById(id: CountryId): CountryOption {
  return COUNTRIES.find((c) => c.id === id) ?? COUNTRIES[0]
}

export function countryForSeoPath(path: string): CountryId | undefined {
  if (path.startsWith('/us-address-generator')) return 'US'
  if (path.startsWith('/uk-address-generator')) return 'GB'
  if (path.startsWith('/canada-address-generator')) return 'CA'
  return undefined
}
