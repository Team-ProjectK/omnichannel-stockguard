import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'stockguard_theme';
  private darkTheme$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey);
    const isDark = savedTheme === 'dark';
    this.setDarkTheme(isDark);
  }

  isDarkTheme(): Observable<boolean> {
    return this.darkTheme$.asObservable();
  }

  get currentThemeValue(): boolean {
    return this.darkTheme$.value;
  }

  toggleTheme(): void {
    this.setDarkTheme(!this.darkTheme$.value);
  }

  setDarkTheme(isDark: boolean): void {
    this.darkTheme$.next(isDark);
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');

    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
