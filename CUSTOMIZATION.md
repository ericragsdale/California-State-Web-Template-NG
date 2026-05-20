# Customization Guide

This guide covers how to adapt this Angular CA State Web Template for your department or agency. Most customization happens in a single file.

---

## The primary customization file

**`src/app/app.config.ts`** is where you configure your agency's identity, navigation, and footer. It is divided into three sections:

1. `navItems` - top navigation
2. `footerColumns` - footer link columns
3. `APP_CONFIG` - site identity, theme, analytics

Everything else in the codebase reads from these values via Angular injection tokens.

---

## Site identity

Inside the `APP_CONFIG` provider in `app.config.ts`:

```typescript
{
  provide: APP_CONFIG,
  useValue: {
    theme: 'oceanside',               // Color theme (see below)
    ga4MeasurementId: 'G-XXXXXXXXXX', // Your GA4 property ID
    orgName: 'State of California',   // Top line of the header logo area
    siteName: 'Department of X',      // Second line of the header logo area
    logoSrc: 'assets/images/sample-logo.png', // Path to your logo
    logoAlt: 'Department of X logo',  // Screen reader alt text
  }
}
```

### Logo image

Replace `src/assets/images/sample-logo.png` with your department's logo file, or point `logoSrc` at any path under `assets/`.

The template CSS sizes the logo at `80 × 70` logical pixels via `aspect-ratio: 80 / 70`. If your logo has a different ratio, override the inline style in `header.component.html`:

```html
<img [src]="config.logoSrc" class="logo-img" [alt]="config.logoAlt"
     style="aspect-ratio: 120 / 40" />
```

---

## Color themes

Set the `theme` key in `APP_CONFIG`. The change takes effect on the next build; no component code changes are needed.

| Theme name | Region / character |
|---|---|
| `oceanside` | Blues — default CA.gov palette |
| `delta` | Greens — Sacramento–San Joaquin Delta |
| `eureka` | Golds and ambers |
| `mono` | Monochrome / grayscale |
| `orangecounty` | Oranges and warm tones |
| `pasorobles` | Earth tones — Paso Robles wine country |
| `sacramento` | Deep greens and gold |
| `santabarbara` | Warm mission tones |
| `santacruz` | Teals and ocean blues |
| `shasta` | Reds and volcanic tones |
| `sierra` | Cool blues and slate grays |
| `trinity` | Forest greens |

Preview all themes side by side at:
https://template.webstandards.ca.gov/visual-design/color.html

---

## Navigation

Edit the `navItems` array in `app.config.ts`. Each item is a `NavItem`:

```typescript
interface NavItem {
  label: string;
  routerLink?: string; // Angular route (internal links)
  href?: string;       // Full URL (external links)
  children?: NavItem[]; // Adds a dropdown sub-menu
}
```

### Examples

Single link to an internal route:
```typescript
{ label: 'Programs', routerLink: '/programs' }
```

External link:
```typescript
{ label: 'Data Portal', href: 'https://data.ca.gov' }
```

Dropdown with child pages:
```typescript
{
  label: 'Services',
  children: [
    { label: 'Overview',   routerLink: '/services' },
    { label: 'Apply',      routerLink: '/services/apply' },
    { label: 'Check status', routerLink: '/services/status' },
  ]
}
```

> The mobile hamburger menu and dropdown behavior are handled by the CA template
> JavaScript (`cagov.core.min.js`). Keep the HTML structure in
> `header.component.html` consistent with the CA template's expected markup.

---

## Footer columns

Edit the `footerColumns` array in `app.config.ts`. Each column is a `FooterColumn`:

```typescript
interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  srOnly?: string;     // Screen-reader-only text appended to the label
  routerLink?: string; // Internal route
  href?: string;       // External URL
}
```

The template renders exactly as many columns as you provide (Bootstrap grid, `col-md-4` each). Three columns is the standard CA template layout; two or four also work.

The legal links in the bottom bar (Conditions of use, Privacy policy, Accessibility, etc.) are hardcoded in `footer.component.html`. Update them there directly if your agency has custom URLs for those pages.

---

## Adding pages and routes

### 1. Create a component

```bash
ng generate component pages/my-page
```

This creates `src/app/pages/my-page/` with `.ts`, `.html`, and `.scss` files.

### 2. Add a route

In `src/app/app.routes.ts`:

```typescript
{
  path: 'my-page',
  loadComponent: () =>
    import('./pages/my-page/my-page.component').then(m => m.MyPageComponent),
}
```

Lazy loading (`loadComponent`) keeps the initial bundle small. Only use `component:` (eager) for routes that are almost always visited immediately.

### 3. Add to navigation (optional)

In `app.config.ts`, add to `navItems`:

```typescript
{ label: 'My Page', routerLink: '/my-page' }
```

### Page layout

Each page component renders inside the `<main>` element in `app.html`. The CA template's container/grid classes are available globally:

```html
<div class="container p-a-md">
  <h1>Page title</h1>
  <div class="row">
    <div class="col-md-8"> ... </div>
    <div class="col-md-4"> ... </div>
  </div>
</div>
```

Browse the [components](https://template.webstandards.ca.gov/components.html) and [patterns](https://template.webstandards.ca.gov/patterns.html) references for ready-to-copy examples of every CA template component (accordions, cards, tables, alerts, etc.).

---

## Google Analytics / Tag Manager

Two places to update before going to production:

**`src/index.html`** — the GTM bootstrap script:
```js
var yourGA4MeasurementId = 'G-XXXXXXXXXX'; // replace this
```

**`src/app/app.config.ts`** — the `APP_CONFIG` value (used by any components
that need the ID at runtime):
```typescript
ga4MeasurementId: 'G-XXXXXXXXXX', // replace this
```

The `stateGTMAccount` value (`GTM-NJ6Q4MV`) is the statewide CA.gov container shared
by all state agencies. Leave it as-is unless your IT/analytics team instructs otherwise.

---

## Statewide Alerts

The line in `src/index.html`:

```html
<script defer src="https://alert.cdt.ca.gov" crossorigin="anonymous"></script>
```

loads a web component that displays emergency alerts issued by CDT for all CA.gov sites.
Leave this in place — it is a statewide standard and requires no configuration.

---

## Updating the CA template version

When CDT releases a new version of the CA State Web Template HTML:

1. Check the release notes at https://github.com/Office-of-Digital-Services/California-State-Web-Template-HTML/releases
2. Copy the updated assets into this project:
   ```bash
   # from the project root, assuming the HTML template is a sibling directory
   rm -rf src/assets/ca_state_template
   cp -r ../California-State-Web-Template-HTML/ca_state_template src/assets/ca_state_template
   ```
3. Update the version reference in this file and in `BUILD_NOTES.md`.
4. Run `ng build` and verify no new budget warnings or broken styles.

---

## Component library reference

The CA template ships with a large set of pre-styled components. Browse the online references to find what you need, then copy the relevant HTML into your Angular component templates — replacing `href="..."` with `routerLink="..."` for internal links. No additional CSS or JS is needed; everything is already loaded via `angular.json`.

- [Components](https://template.webstandards.ca.gov/components.html)
- [Patterns](https://template.webstandards.ca.gov/patterns.html)
