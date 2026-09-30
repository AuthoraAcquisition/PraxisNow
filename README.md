# PraxisNow
Content Site

## How the site is served

The whole Praxis site is one self-contained file: `site/index.html` (styles, script, cherub images and the concept library are all inside it).
`app/route.js` serves that file at `/`. To update the site, replace `site/index.html`, commit to `main`, then in GoDaddy click **Update Preview** and **Publish to Live**.
