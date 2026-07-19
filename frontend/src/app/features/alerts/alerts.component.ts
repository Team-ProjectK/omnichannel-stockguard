import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  alerts: AlertItem[] = [
    {
      id: 1,
      title: 'Critical Stock Shortage',
      category: 'Stock',
      severity: 'Critical',
      message: 'Dell XPS 15 inventory in Central Warehouse (WH-A) has fallen below minimum safety threshold (8 units remaining).',
      timestamp: '15 minutes ago',
      affectedItem: 'SKU: ELE-LAP-001',
      actionLabel: 'Auto-Create Reorder'
    },
    {
      id: 2,
      title: 'Out of Stock Alert',
      category: 'Stock',
      severity: 'Critical',
      message: 'Samsung 27" 4K Monitor is currently out of stock. 12 backorders pending fulfillment.',
      timestamp: '1 hour ago',
      affectedItem: 'SKU: ELE-MON-003',
      actionLabel: 'Emergency Restock'
    },
    {
      id: 3,
      title: 'Dynamic Price Gap Detected',
      category: 'Pricing',
      severity: 'Warning',
      message: 'Competitor average price for Logitech MX Master 3S dropped by 4.2%. Dynamic price adjustment recommended.',
      timestamp: '3 hours ago',
      affectedItem: 'SKU: ACC-MOU-002',
      actionLabel: 'Review AI Price'
    },
    {
      id: 4,
      title: 'Warehouse Space Threshold Warning',
      category: 'System',
      severity: 'Warning',
      message: 'West Coast Depot (WH-B) space utilization reached 99%. Re-balancing recommended.',
      timestamp: '5 hours ago',
      affectedItem: 'Facility: WH-B',
      actionLabel: 'Rebalance Space'
    },
    {
      id: 5,
      title: 'Scheduled Audit Reminder',
      category: 'System',
      severity: 'Info',
      message: 'Quarterly inventory audit scheduled for Central Warehouse tomorrow at 09:00 AM.',
      timestamp: 'Yesterday',
      affectedItem: 'Facility: WH-A',
      actionLabel: 'View Schedule'
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

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
