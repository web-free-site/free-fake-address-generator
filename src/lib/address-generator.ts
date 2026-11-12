import { Faker, allFakers, en_US, en_GB, en_CA, en_AU, de, fr, en_IN, en_IE, nl, es, it, es_MX, pt_BR } from '@faker-js/faker'
import { CA_PROVINCES, US_STATES } from '../data/regions'
import { CountryId, countryById } from '../data/countries'

export interface GeneratedAddress {
  name?: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export interface GenerateOptions {
  country: CountryId
  region?: string
  cityHint?: string
  includeName?: boolean
  count?: number
}

const LOCALE_FALLBACK: Record<string, typeof en_US> = {
  en_US,
  en_GB,
  en_CA,
  en_AU,
  de,
  fr,
  en_IN,
  en_IE,
  nl,
  es,
  it,
  es_MX,
  pt_BR,
}

function fakerForCountry(country: CountryId): Faker {
  const meta = countryById(country)
  const pool = allFakers as Record<string, Faker | undefined>
  if (pool[meta.fakerLocale]) {
    return pool[meta.fakerLocale]!
  }
  const locale = LOCALE_FALLBACK[meta.fakerLocale] ?? en_US
  return new Faker({ locale })
}

function stateLabelUS(abbr: string): string {
  return US_STATES.find((s) => s.abbr === abbr)?.name ?? abbr
}

function stateLabelCA(abbr: string): string {
  return CA_PROVINCES.find((s) => s.abbr === abbr)?.name ?? abbr
}

function pickRegion(country: CountryId, region?: string, faker?: Faker): string {
  const meta = countryById(country)
  if (region?.trim()) return region.trim()
  if (!meta.hasRegions || !meta.regions?.length) {
    return faker?.location.state() ?? ''
  }
  const pick = faker?.helpers.arrayElement(meta.regions)
  return pick?.value ?? meta.regions[0].value
}

/** Generate one or more fake mailing addresses (sample data for tests only). */
export function generateFakeAddresses(options: GenerateOptions): GeneratedAddress[] {
  const count = Math.min(Math.max(options.count ?? 1, 1), 500)
  const f = fakerForCountry(options.country)
  const meta = countryById(options.country)
  const out: GeneratedAddress[] = []

  for (let i = 0; i < count; i++) {
    const region = pickRegion(options.country, options.region, f)
    const street = f.location.streetAddress()
    let city = options.cityHint?.trim() || f.location.city()
    let state = region
    let zip = f.location.zipCode()

    if (options.country === 'US') {
      const abbr = US_STATES.some((s) => s.abbr === region) ? region : f.helpers.arrayElement(US_STATES).abbr
      state = stateLabelUS(abbr)
      try {
        zip = f.location.zipCode({ state: abbr })
      } catch {
        zip = f.location.zipCode()
      }
      if (!options.cityHint) city = f.location.city()
    } else if (options.country === 'CA') {
      const abbr = CA_PROVINCES.some((p) => p.abbr === region) ? region : f.helpers.arrayElement(CA_PROVINCES).abbr
      state = stateLabelCA(abbr)
      zip = f.location.zipCode()
    } else if (options.country === 'GB') {
      state = region || f.location.county()
      zip = f.location.zipCode()
    } else {
      state = f.location.state()
    }

    const row: GeneratedAddress = {
      street,
      city,
      state,
      zip,
      country: meta.label,
      phone: f.phone.number(),
    }
    if (options.includeName) {
      row.name = f.person.fullName()
    }
    out.push(row)
  }

  return out
}

export function formatAddressBlock(row: GeneratedAddress): string {
  const lines = [
    row.name,
    row.street,
    `${row.city}, ${row.state} ${row.zip}`,
    row.country,
    row.phone ? `Phone: ${row.phone}` : undefined,
  ].filter(Boolean)
  return lines.join('\n')
}

export function addressesToCsv(rows: GeneratedAddress[]): string {
  const headers = ['name', 'street', 'city', 'state', 'zip', 'country', 'phone'] as const
  const escape = (v: string) => {
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`
    return v
  }
  const body = rows
    .map((r) => headers.map((h) => escape(r[h] ?? '')).join(','))
    .join('\n')
  return `${headers.join(',')}\n${body}`
}

export function addressesToJson(rows: GeneratedAddress[]): string {
  return JSON.stringify(rows, null, 2)
}
