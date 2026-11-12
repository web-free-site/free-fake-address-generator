# Free Fake Address Generator

Live site: [free-fake-address-generator.web-free.site](https://free-fake-address-generator.web-free.site)

Random **test** mailing addresses by country (street, city, state/region, ZIP/postcode, phone, optional name). **Sample data only** — for development, QA, and demos. Client-side, no API keys.

## Upstream base projects

| Component | Repository | License | Role |
| --- | --- | --- | --- |
| Faker.js | [@faker-js/faker](https://github.com/faker-js/faker) | MIT | Address/name/phone generation |
| Demo UX | [ehalt/fake-address-generator](https://github.com/ehalt/fake-address-generator) | Open source | One-click generate pattern |
| Site shell | [web-free-site/free-invoice-generator](https://github.com/web-free-site/free-invoice-generator) | MIT | Adsterra slots, prerender, Workers |

## Features

- Countries: US, UK, Canada, Australia, EU, and more
- US state / UK region / Canadian province selectors
- Optional city filter, optional random name
- Copy, bulk generate (up to 500), CSV & JSON export
- SEO pages: `/us-address-generator/`, `/uk-address-generator/`, `/canada-address-generator/`, long-tail QA page, French landing
- JSON-LD WebApplication + FAQPage, sitemap, hreflang en/fr
- Adsterra (10 units) via `public/ads.json`

## Build & preview

```bash
npm install
npm run build
npm run preview
```

## Tests

```bash
npm test
```

## Deploy

Gentil deploys to Cloudflare Workers (`wrangler.toml`).

## Contact

Gentil M. — gentil@quevvy.com
