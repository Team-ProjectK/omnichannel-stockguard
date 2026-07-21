import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isStandalonePage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentRoute(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkCurrentRoute(event.urlAfterRedirects || event.url);
      });
  }

  private checkCurrentRoute(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    this.isStandalonePage = cleanUrl === '/home' || cleanUrl === '/login' || cleanUrl === '/register' || cleanUrl === '/';
  }
}
