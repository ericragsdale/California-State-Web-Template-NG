# Angular CA State Web Template — Build Notes

This document captures how this project was built: the commands run, the files created, and the key decisions made along the way. It's intended as a reference or to follow along while making your own adaptations.

---

## Prerequisites

- Node.js 22+
- Angular CLI 21+: `npm install -g @angular/cli`
- A copy of the [California-State-Web-Template-HTML](https://github.com/Office-of-Digital-Services/California-State-Web-Template-HTML) repo (version 6.5.5)

---

## Angular scaffold

I generated a new Angular 21 project with routing and SCSS, no SSR, in the same parent directory as the HTML template repo:

```bash
ng new California-State-Web-Template-NG \
  --routing=true \
  --style=scss \
  --ssr=false
```


The working directory structure at this point:

```
../
├── California-State-Web-Template-HTML/
└── California-State-Web-Template-NG/
```

---

## CA template assets + angular.json wiring

### Assets copied from the HTML template repo

```bash
cd California-State-Web-Template-NG
mkdir -p src/assets
cp -r ../California-State-Web-Template-HTML/ca_state_template src/assets/ca_state_template
cp -r ../California-State-Web-Template-HTML/images src/assets/images
```

### [`angular.json`](angular.json)

Under `projects["California-State-Web-Template-NG"].architect.build.options`, the following changes were made:

**Add to `assets` array:**
```json
{
  "glob": "**/*",
  "input": "src/assets",
  "output": "assets"
}
```

**Add to `styles` array**:
```json
"styles": [
  "src/styles.scss",
  "src/assets/ca_state_template/css/cagov.core.min.css"
]
```

**Add `scripts` array**:
```json
"scripts": [
  "src/assets/ca_state_template/js/cagov.core.min.js"
]
```

**Increase production budgets** under
`configurations.production.budgets` — the CA core CSS is large enough to trigger warnings/errors with the default budgets:
```json
"budgets": [
  { "type": "initial", "maximumWarning": "1500kB", "maximumError": "3MB" },
  { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }
]
```
  
  > **local vs CDN:** Local assets were chosen over the CDN
  (`cdn.cdt.ca.gov`) for reliability. A CDN outage or network restriction cannot break
  the app. To switch to CDN in the future, remove the `scripts`/`styles` entries above
  and load the files via `<link>` / `<script>` tags in `src/index.html` instead.

---

## Core layer (models, tokens, ThemeService)

The following files were created:

### [`src/app/core/models/nav-item.model.ts`](src/app/core/models/nav-item.model.ts)
Defines `NavItem` (label, routerLink, href, children) and `FooterColumn` / `FooterLink`
interfaces used by the header and footer.

### [`src/app/core/tokens/app-config.token.ts`](src/app/core/tokens/app-config.token.ts)
Three `InjectionToken`s:
- `APP_CONFIG` — site-level config: theme, GA4 ID, org name, site name, logo
- `NAV_ITEMS` — top-level navigation array
- `FOOTER_COLUMNS` — footer link columns

Also exports the `ColorTheme` union type (12 CA template themes).

### [`src/app/core/services/theme.service.ts`](src/app/core/services/theme.service.ts)
- Injectable, `providedIn: 'root'`
- Reads `theme` from `APP_CONFIG` once in the constructor and appends a
  `<link id="ca-color-theme">` stylesheet to `document.head`

**To change the color theme:** update the `theme` value in `APP_CONFIG` inside
`src/app/app.config.ts`. 

Available themes:
`oceanside` (default) | `delta` | `eureka` | `mono` | `orangecounty` | `pasorobles` |
`sacramento` | `santabarbara` | `santacruz` | `shasta` | `sierra` | `trinity`

---

## Layout components (Header, Footer)

The following files were created:

### [`src/app/core/components/header/`](src/app/core/components/header/)
Standalone component. Injects `APP_CONFIG` and `NAV_ITEMS`. Renders:
- Skip-to-content link
- CA.gov utility bar (logo, "Official website of the State of California")
- Organization branding (logo image + org/site name from `APP_CONFIG`)
- Mobile hamburger toggle (the CA template JS handles the open/close behavior)
- Search bar (submits to `/search?q=`)
- Main navigation with `@for` loops and `routerLinkActive` for the active state;
  dropdown sub-menus rendered when `item.children` is present

### [`src/app/core/components/footer/`](src/app/core/components/footer/)
Standalone component. Injects `APP_CONFIG` and `FOOTER_COLUMNS`. Renders:
- Site-footer `<aside>` with configurable link columns (from `FOOTER_COLUMNS`)
- Global footer bar with CA.gov logo, legal links, social icon
- Dynamic copyright year
- Back-to-top button (CA template JS handles scroll behavior)

---

## App shell, routing, and index.html

The following files were created:

### [`src/index.html`](src/index.html)
Adds to `<head>`:
- Public Sans font (Google Fonts preconnect + stylesheet)
- Statewide alerts script (`https://alert.cdt.ca.gov`)
- Google Tag Manager bootstrap script — **update `yourGA4MeasurementId`** with your
  organization's GA4 property ID before going to production

### [`src/app/app.ts`](src/app/app.ts)
Root component. Imports `HeaderComponent`, `FooterComponent`, `RouterOutlet`. Injects
`ThemeService` to trigger theme initialization on app start.

### [`src/app/app.html`](src/app/app.html)
```html
<app-header />
<div id="main-content" class="main-content">
  <main class="main-primary" id="main">
    <router-outlet />
  </main>
</div>
<app-footer />
<div class="decoration-last">&nbsp;</div>
```

### [`src/app/app.config.ts`](src/app/app.config.ts)
Provides all three injection tokens (`APP_CONFIG`, `NAV_ITEMS`, `FOOTER_COLUMNS`).
**This is the main customization file** — update org name, site name, GA4 ID, theme,
navigation items, and footer columns here.

### [`src/app/app.routes.ts`](src/app/app.routes.ts)
Lazy-loads `HomeComponent` at `''`. Catch-all redirects to home.

---

## Home page

The following files were created:

### [`src/app/pages/home/home.component.ts`](src/app/pages/home/home.component.ts)
Standalone component, imports `RouterLink`.

### [`src/app/pages/home/home.component.html`](src/app/pages/home/home.component.html)
Full CA template homepage layout:
- Hero banner (text panel + feature image)
- Top user task link grid
- Marketing article cards
- News list card + sidebar card
- Executive profile figures

Replace placeholder content (hero text, news items, executive profiles) with real
department content.

---

## Customization

| What to change       | Where                                                           |
| -------------------- | --------------------------------------------------------------- |
| Color theme          | `theme` in `APP_CONFIG` inside `app.config.ts`                  |
| Org name / site name | `orgName` / `siteName` in `APP_CONFIG`                          |
| Navigation items     | `navItems` array in `app.config.ts`                             |
| Footer columns       | `footerColumns` array in `app.config.ts`                        |
| GA4 Measurement ID   | `ga4MeasurementId` in `APP_CONFIG` and in `index.html`          |
| Logo image           | Replace `src/assets/images/sample-logo.png`                     |
| CA template version  | Re-copy `ca_state_template/` from the new HTML template release |
