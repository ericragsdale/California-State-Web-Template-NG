import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { APP_CONFIG } from '../tokens/app-config.token';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly config = inject(APP_CONFIG);

  constructor() {
    const link = this.doc.createElement('link');
    link.id = 'ca-color-theme';
    link.rel = 'stylesheet';
    link.href = `assets/ca_state_template/css/colortheme-${this.config.theme}.min.css`;
    this.doc.head.appendChild(link);
  }
}
