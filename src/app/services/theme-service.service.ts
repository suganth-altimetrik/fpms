import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  private activeTheme: string = 'theme-light';

  switchTheme(theme: string) {
    document.body.classList.remove(this.activeTheme);
    document.body.classList.add(theme);
    this.activeTheme = theme;
  }
}
