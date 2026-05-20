import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG, FOOTER_COLUMNS } from '../../tokens/app-config.token';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly config = inject(APP_CONFIG);
  protected readonly columns = inject(FOOTER_COLUMNS);
  protected readonly year = new Date().getFullYear();
}
