import { describe, expect, it } from 'vitest'
import { addressesToCsv, generateFakeAddresses } from './address-generator'

describe('generateFakeAddresses', () => {
  it('returns requested count with required fields', () => {
    const rows = generateFakeAddresses({ country: 'US', region: 'CA', count: 3, includeName: true })
    expect(rows).toHaveLength(3)
    for (const row of rows) {
      expect(row.street.length).toBeGreaterThan(3)
      expect(row.city.length).toBeGreaterThan(1)
      expect(row.state).toContain('California')
      expect(row.zip.length).toBeGreaterThan(3)
      expect(row.country).toBe('United States')
      expect(row.phone.length).toBeGreaterThan(5)
      expect(row.name?.length).toBeGreaterThan(2)
    }
  })

  it('exports CSV with header row', () => {
    const rows = generateFakeAddresses({ country: 'GB', count: 2 })
    const csv = addressesToCsv(rows)
    expect(csv.startsWith('name,street,city,state,zip,country,phone')).toBe(true)
    expect(csv.split('\n').length).toBe(3)
  })
})
