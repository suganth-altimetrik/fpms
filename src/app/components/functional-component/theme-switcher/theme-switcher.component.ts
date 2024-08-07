import { Component } from '@angular/core';
import { ThemeServiceService } from '../../../services/theme-service.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  isDarkTheme = false;

  constructor(private themeService: ThemeServiceService) {}

  toggleTheme(input: Event) {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'theme-dark' : 'theme-light';
    this.themeService.switchTheme(theme);
  }
}
