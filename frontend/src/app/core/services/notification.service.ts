import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationItem } from '../../shared/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private storageKey = 'stockguard_notifications';

  private defaultNotifications: NotificationItem[] = [
    {
      id: 1,
      title: 'Low Stock Alert',
      message: 'Logitech MX Master 3S has reached critical threshold (18 remaining).',
      type: 'stock',
      timestamp: '10 mins ago',
      read: false
    },
    {
      id: 2,
      title: 'New Purchase Order',
      message: 'PO-2026-001 for TechSupply Global created.',
      type: 'order',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Price Optimization Available',
      message: 'AI recommended 5.4% price adjustment on Dell XPS 15.',
      type: 'price',
      timestamp: '3 hours ago',
      read: false
    },
    {
      id: 4,
      title: 'Warehouse WH-B Near Capacity',
      message: 'West Coast Depot is at 99% space utilization.',
      type: 'system',
      timestamp: 'Yesterday',
      read: true
    }
  ];

  private notifications$ = new BehaviorSubject<NotificationItem[]>([]);

  constructor() {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.notifications$.next(JSON.parse(data));
    } else {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultNotifications));
      this.notifications$.next([...this.defaultNotifications]);
    }
  }

  getNotifications(): Observable<NotificationItem[]> {
    return this.notifications$.asObservable();
  }

  getUnreadCount(): number {
    return this.notifications$.value.filter(n => !n.read).length;
  }

  markAsRead(id: number): void {
    const list = this.notifications$.value.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    this.notifications$.next(list);
  }

  markAllAsRead(): void {
    const list = this.notifications$.value.map(n => ({ ...n, read: true }));
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    this.notifications$.next(list);
  }
}
