import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG, AppConfig, FOOTER_COLUMNS, NAV_ITEMS } from './core/tokens/app-config.token';
import { NavItem, FooterColumn } from './core/models/nav-item.model';

// ─── Navigation ────────────────────────────────────────────────────────────────
// Add, remove, or reorder items here. Items with a `children` array render as
// dropdown menus. Use `routerLink` for internal routes, `href` for external URLs.

const navItems: NavItem[] = [
  { label: 'Home', routerLink: '/' },
  { label: 'Top task 1', routerLink: '/top-task-1' },
  {
    label: 'Top task 2',
    children: [
      { label: 'Overview',   routerLink: '/top-task-2' },
      { label: 'Content 1',  routerLink: '/top-task-2/content-1' },
      { label: 'Content 2',  routerLink: '/top-task-2/content-2' },
    ],
  },
];

// ─── Footer columns ────────────────────────────────────────────────────────────
// Each column renders as a heading + list of links in the site-footer aside.

const footerColumns: FooterColumn[] = [
  {
    heading: 'About',
    links: [
      { label: 'About',      srOnly: 'our organization',   routerLink: '/about' },
      { label: 'News',       srOnly: 'from our organization', routerLink: '/about/news' },
      { label: 'Careers',    srOnly: 'and job openings',   routerLink: '/about/careers' },
      { label: 'Contact us',                               routerLink: '/contact' },
    ],
  },
  {
    heading: 'Heading',
    links: [
      { label: 'Link 1', href: '#' },
      { label: 'Link 2', href: '#' },
      { label: 'Link 3', href: '#' },
    ],
  },
  {
    heading: 'Heading',
    links: [
      { label: 'Link 1', srOnly: 'regarding this website', href: '#' },
      { label: 'Link 2', srOnly: 'regarding this website', href: '#' },
      { label: 'Link 3', srOnly: 'regarding this website', href: '#' },
    ],
  },
];

// ─── Application config ────────────────────────────────────────────────────────

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),

    // ── Site identity ──────────────────────────────────────────────────────────
    // This is the primary customization point. Update these values for your org.
    {
      provide: APP_CONFIG,
      useValue: {
        theme: 'oceanside',           // see ColorTheme type in app-config.token.ts
        ga4MeasurementId: 'G-XXXXXXXXXX', 
        orgName: 'State of California',
        siteName: 'Site name',
        logoSrc: 'assets/images/sample-logo.png',
        logoAlt: 'Organization logo',
      } satisfies AppConfig,
    },

    { provide: NAV_ITEMS,      useValue: navItems },
    { provide: FOOTER_COLUMNS, useValue: footerColumns },
  ],
};
