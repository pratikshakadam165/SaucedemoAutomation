# QA Engineer Assignment

Playwright + TypeScript tests for [Sauce Demo](https://www.saucedemo.com) (UI) and [Restful-Booker](https://restful-booker.herokuapp.com) (API).

## Setup

Requires Node.js 18 or newer.

```bash
npm ci
npx playwright install chromium
```

No configuration is needed. The site URLs have defaults in `config/env.ts`.

## Run the tests

```bash
npm test             # all tests
npm run test:ui      # UI tests only
npm run test:api     # API tests only
npm run report       # open the HTML report from the last run
```

## Documents

The test plan, bug reports and AI notes are in the `docs/` folder as PDF files.
