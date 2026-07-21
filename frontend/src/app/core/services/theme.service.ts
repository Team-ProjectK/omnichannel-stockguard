import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppTheme = 'light' | 'dark' | 'warm';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'stockguard_theme';
  private theme$ = new BehaviorSubject<AppTheme>('light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = (localStorage.getItem(this.storageKey) as AppTheme) || 'light';
    this.setTheme(savedTheme);
  }

  getTheme(): Observable<AppTheme> {
    return this.theme$.asObservable();
  }

  get currentTheme(): AppTheme {
    return this.theme$.value;
  }

  isDarkTheme(): Observable<boolean> {
    const darkSubject = new BehaviorSubject<boolean>(this.currentTheme === 'dark');
    this.theme$.subscribe(t => darkSubject.next(t === 'dark'));
    return darkSubject.asObservable();
  }

  get currentThemeValue(): boolean {
    return this.currentTheme === 'dark';
  }

  cycleTheme(): void {
    const nextTheme: AppTheme =
      this.currentTheme === 'light' ? 'dark' : this.currentTheme === 'dark' ? 'warm' : 'light';
    this.setTheme(nextTheme);
  }

  toggleTheme(): void {
    this.cycleTheme();
  }

  setTheme(theme: AppTheme): void {
    this.theme$.next(theme);
    localStorage.setItem(this.storageKey, theme);

    document.body.classList.remove('light-theme', 'dark-theme', 'warm-theme', 'biscuit-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  setDarkTheme(isDark: boolean): void {
    this.setTheme(isDark ? 'dark' : 'light');
  }
}
