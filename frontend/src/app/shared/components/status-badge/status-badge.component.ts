import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="badge" [ngClass]="getBadgeClass()">
      {{ status }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 12px;
      text-transform: capitalize;
      line-height: 1.2;
    }
    .status-in-stock, .status-active, .status-approved, .status-delivered {
      background-color: #e6f4ea;
      color: #137333;
    }
    .status-low-stock, .status-pending, .status-processing, .status-maintenance {
      background-color: #fef7e0;
      color: #b06000;
    }
    .status-out-of-stock, .status-critical, .status-cancelled, .status-full {
      background-color: #fce8e6;
      color: #c5221f;
    }
    .status-shipped, .status-overstocked {
      background-color: #e8f0fe;
      color: #1a73e8;
    }
    .status-inactive {
      background-color: #f1f3f4;
      color: #5f6368;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  getBadgeClass(): string {
    if (!this.status) return 'status-inactive';
    const key = this.status.toLowerCase().replace(/\s+/g, '-');
    return `status-${key}`;
  }
}
