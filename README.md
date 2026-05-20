# California State Web Template — Angular

An Angular 21 implementation of the [California State Web Template](https://template.webstandards.ca.gov/) (v6.5.5). 

## Prerequisites

- Node.js 22+
- Angular CLI 21+

```bash
npm install -g @angular/cli
```

## Quick start

```bash
git clone https://github.com/ericragsdale/California-State-Web-Template-NG
cd California-State-Web-Template-NG
npm install
ng serve
```

Open `http://localhost:4200`.

## Build

```bash
ng build          # production build → dist/
ng build --watch  # watch mode
```

## Project structure

```
src/
├── app/
│   ├── core/
│   │   ├── components/
│   │   │   ├── header/          # CA.gov utility bar, branding, nav, search
│   │   │   └── footer/          # Site-footer columns + global footer bar
│   │   ├── models/              # NavItem, FooterColumn interfaces
│   │   ├── services/
│   │   │   └── theme.service.ts # Loads color theme CSS at startup
│   │   └── tokens/              # APP_CONFIG, NAV_ITEMS, FOOTER_COLUMNS tokens
│   ├── pages/
│   │   └── home/                # Homepage (copy/extend for each new page)
│   ├── app.config.ts            # ← Primary customization file
│   ├── app.routes.ts
│   ├── app.html / app.ts
│   └── app.scss
├── assets/
│   ├── ca_state_template/       # CA template CSS, JS, fonts (v6.5.5)
│   └── images/                  # Logos, banners, icons
└── index.html                   # Font, GTM, statewide alerts
```

## Customization

**`src/app/app.config.ts` is the primary customization file.** Update your agency's name, theme, navigation, and footer links there before anything else.

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for a full guide covering themes, navigation, footer columns, adding pages, GA4 setup, and updating the template version.

## Build notes

See [BUILD_NOTES.md](BUILD_NOTES.md) for how this project was built.

## Resources

- [CA State Web Template documentation](https://template.webstandards.ca.gov/)
- [Color theme previews](https://template.webstandards.ca.gov/visual-design/color.html)
- [Component library reference](https://template.webstandards.ca.gov/components-patterns.html)
- [CA Web Standards](https://webstandards.ca.gov/)
- [HTML template source](https://github.com/Office-of-Digital-Services/California-State-Web-Template-HTML)
