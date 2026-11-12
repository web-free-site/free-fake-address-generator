import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { saveAs } from 'file-saver'
import { CountryId, COUNTRIES, DEFAULT_COUNTRY, countryById, countryForSeoPath } from '../data/countries'
import {
  GeneratedAddress,
  addressesToCsv,
  addressesToJson,
  formatAddressBlock,
  generateFakeAddresses,
} from '../lib/address-generator'
import { Locale, t } from '../i18n/messages'

interface Props {
  locale: Locale
  seoPath?: string
  presetCountry?: CountryId
}

export const AddressTool: FC<Props> = ({ locale, seoPath = '/', presetCountry }) => {
  const pathCountry = countryForSeoPath(seoPath)
  const initialCountry = presetCountry ?? pathCountry ?? DEFAULT_COUNTRY
  const [country, setCountry] = useState<CountryId>(initialCountry)
  const [region, setRegion] = useState('')
  const [cityHint, setCityHint] = useState('')
  const [includeName, setIncludeName] = useState(true)
  const [bulkCount, setBulkCount] = useState(5)
  const [rows, setRows] = useState<GeneratedAddress[]>(() =>
    generateFakeAddresses({ country: initialCountry, includeName: true, count: 1 }),
  )
  const [copyMsg, setCopyMsg] = useState('')

  const regions = useMemo(() => countryById(country).regions ?? [], [country])

  useEffect(() => {
    if (pathCountry) setCountry(pathCountry)
  }, [pathCountry])

  const regenerate = useCallback(
    (count = 1) => {
      setRows(
        generateFakeAddresses({
          country,
          region: region || undefined,
          cityHint,
          includeName,
          count,
        }),
      )
    },
    [country, region, cityHint, includeName],
  )

  const onCopy = async () => {
    const text = rows.map(formatAddressBlock).join('\n\n---\n\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopyMsg(t(locale, 'copied'))
      setTimeout(() => setCopyMsg(''), 2000)
    } catch {
      setCopyMsg(t(locale, 'copyFailed'))
    }
  }

  const download = (kind: 'csv' | 'json') => {
    const blob =
      kind === 'csv'
        ? new Blob([addressesToCsv(rows)], { type: 'text/csv;charset=utf-8' })
        : new Blob([addressesToJson(rows)], { type: 'application/json;charset=utf-8' })
    saveAs(blob, `fake-addresses-${country.toLowerCase()}.${kind}`)
  }

  return (
    <section className="address-tool" aria-label={t(locale, 'toolLabel')}>
      <div className="disclaimer" role="note">
        <strong>{t(locale, 'disclaimerTitle')}</strong>
        <p>{t(locale, 'disclaimerBody')}</p>
      </div>

      <div className="tool-grid">
        <div className="tool-controls">
          <label className="field">
            <span>{t(locale, 'country')}</span>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value as CountryId)
                setRegion('')
              }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          {regions.length > 0 ? (
            <label className="field">
              <span>{t(locale, 'stateRegion')}</span>
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="">{t(locale, 'randomRegion')}</option>
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label className="field">
            <span>{t(locale, 'cityOptional')}</span>
            <input
              type="text"
              value={cityHint}
              onChange={(e) => setCityHint(e.target.value)}
              placeholder={t(locale, 'cityPlaceholder')}
              autoComplete="off"
            />
          </label>

          <label className="field field--check">
            <input
              type="checkbox"
              checked={includeName}
              onChange={(e) => setIncludeName(e.target.checked)}
            />
            <span>{t(locale, 'includeName')}</span>
          </label>

          <label className="field">
            <span>{t(locale, 'bulkCount')}</span>
            <input
              type="number"
              min={1}
              max={500}
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value) || 1)}
            />
          </label>

          <div className="btn-row">
            <button type="button" className="btn btn--primary" onClick={() => regenerate(1)}>
              {t(locale, 'generateOne')}
            </button>
            <button type="button" className="btn" onClick={() => regenerate(bulkCount)}>
              {t(locale, 'generateBulk')}
            </button>
          </div>
        </div>

        <div className="tool-results">
          <div className="result-actions">
            <button type="button" className="btn btn--ghost" onClick={onCopy}>
              {t(locale, 'copy')}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => download('csv')}>
              {t(locale, 'exportCsv')}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => download('json')}>
              {t(locale, 'exportJson')}
            </button>
            {copyMsg ? <span className="copy-msg">{copyMsg}</span> : null}
          </div>

          <ul className="address-cards">
            {rows.map((row, idx) => (
              <li key={`${row.street}-${idx}`} className="address-card">
                {row.name ? <p className="address-card__name">{row.name}</p> : null}
                <p>{row.street}</p>
                <p>
                  {row.city}, {row.state} {row.zip}
                </p>
                <p>{row.country}</p>
                <p className="muted">{row.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
