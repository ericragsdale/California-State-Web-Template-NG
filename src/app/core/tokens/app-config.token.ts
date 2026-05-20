import { InjectionToken } from '@angular/core';
import { FooterColumn, NavItem } from '../models/nav-item.model';

export type ColorTheme =
  | 'oceanside'
  | 'delta'
  | 'eureka'
  | 'mono'
  | 'orangecounty'
  | 'pasorobles'
  | 'sacramento'
  | 'santabarbara'
  | 'santacruz'
  | 'shasta'
  | 'sierra'
  | 'trinity';

export interface AppConfig {
  /** Color theme — change this to switch the entire site palette. */
  theme: ColorTheme;
  /** GA4 Measurement ID (e.g. 'G-XXXXXXXXXX'). Update before going to production. */
  ga4MeasurementId: string;
  /** Top-level org name displayed in the site header and footer. */
  orgName: string;
  /** Department or program name displayed below orgName in the header. */
  siteName: string;
  /** Path to the header logo image (relative to src/assets or a URL). */
  logoSrc: string;
  /** Alt text for the header logo image. */
  logoAlt: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const NAV_ITEMS = new InjectionToken<NavItem[]>('NAV_ITEMS');
export const FOOTER_COLUMNS = new InjectionToken<FooterColumn[]>('FOOTER_COLUMNS');
