import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_CONFIG, NAV_ITEMS } from '../../tokens/app-config.token';
import { NavItem } from '../../models/nav-item.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly config = inject(APP_CONFIG);
  protected readonly navItems = inject(NAV_ITEMS);

  hasChildren(item: NavItem): boolean {
    return !!item.children?.length;
  }
}
