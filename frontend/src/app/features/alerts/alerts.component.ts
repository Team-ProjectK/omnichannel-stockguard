import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../../core/services/alert.service';
import { Product } from '../../shared/models/product';

export interface AlertItem {
  id: number;
  title: string;
  category: 'Stock' | 'Pricing' | 'System';
  severity: 'Critical' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  affectedItem: string;
  actionLabel: string;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  activeTab = 'All';
  alerts: AlertItem[] = [];

  constructor(
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getLowStockAlerts().subscribe({
      next: (products: Product[]) => {
        const liveAlerts: AlertItem[] = (products || []).map((p, idx) => ({
          id: p.id || idx + 1,
          title: `Low Stock: ${p.productName}`,
          category: 'Stock',
          severity: p.stock === 0 ? 'Critical' : 'Warning',
          message: `Item ${p.productName} (SKU: ${p.sku}, Store: ${p.storeId}) stock level (${p.stock}) is below safety threshold (${p.reorderThreshold}).`,
          timestamp: p.lastPriceUpdate ? new Date(p.lastPriceUpdate).toLocaleString() : 'Just now',
          affectedItem: `SKU: ${p.sku}`,
          actionLabel: 'Reorder Item'
        }));

        this.alerts = liveAlerts;
      },
      error: (err) => {
        console.error('Error fetching alerts', err);
        this.snackBar.open('Failed to load live alerts from server.', 'Close', { duration: 3000 });
      }
    });
  }

  get filteredAlerts(): AlertItem[] {
    if (this.activeTab === 'All') return this.alerts;
    return this.alerts.filter(a => a.category === this.activeTab || a.severity === this.activeTab);
  }

  get criticalCount(): number {
    return this.alerts.filter(a => a.severity === 'Critical').length;
  }

  get warningCount(): number {
    return this.alerts.filter(a => a.severity === 'Warning').length;
  }

  handleAlertAction(alert: AlertItem): void {
    this.snackBar.open(`Action initiated for ${alert.title}`, 'Close', { duration: 3000 });
  }

  dismissAlert(alert: AlertItem): void {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
    this.snackBar.open('Alert dismissed', 'Close', { duration: 3000 });
  }
}
