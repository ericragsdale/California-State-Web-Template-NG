export interface NavItem {
  label: string;
  routerLink?: string;
  href?: string;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  srOnly?: string;
  routerLink?: string;
  href?: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
