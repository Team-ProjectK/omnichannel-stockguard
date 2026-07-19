import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationItem } from '../../shared/models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationItem[] = [];
  filterType = 'all';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(items => {
      this.notifications = items;
    });
  }

  get filteredNotifications(): NotificationItem[] {
    if (this.filterType === 'unread') {
      return this.notifications.filter(n => !n.read);
    }
    if (this.filterType !== 'all') {
      return this.notifications.filter(n => n.type === this.filterType);
    }
    return this.notifications;
  }

  markAsRead(item: NotificationItem): void {
    this.notificationService.markAsRead(item.id);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }
}
