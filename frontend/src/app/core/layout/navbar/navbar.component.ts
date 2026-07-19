import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  today: Date = new Date();
  unreadCount = 0;
  isDark = false;

  constructor(
    private notificationService: NotificationService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(items => {
      this.unreadCount = items.filter(n => !n.read).length;
    });

    this.themeService.isDarkTheme().subscribe(dark => {
      this.isDark = dark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}