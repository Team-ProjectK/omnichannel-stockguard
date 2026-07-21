import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="status-badge" [ngClass]="getBadgeClass()">
      {{ status }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 700;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1;
      white-space: nowrap;

      &::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: currentColor;
      }
    }
    .status-in-stock, .status-active, .status-approved, .status-delivered, .status-healthy, .status-completed {
      background-color: #ECFDF5;
      color: #059669;
      border: 1px solid #A7F3D0;
    }
    .status-low-stock, .status-pending, .status-processing, .status-maintenance, .status-warning, .status-low {
      background-color: #FFFBEB;
      color: #D97706;
      border: 1px solid #FDE68A;
    }
    .status-out-of-stock, .status-critical, .status-cancelled, .status-full, .status-danger, .status-critical {
      background-color: #FEF2F2;
      color: #DC2626;
      border: 1px solid #FECACA;
    }
    .status-shipped, .status-overstocked, .status-info {
      background-color: #EFF6FF;
      color: #2563EB;
      border: 1px solid #BFDBFE;
    }
    .status-inactive {
      background-color: #F1F5F9;
      color: #64748B;
      border: 1px solid #E2E8F0;
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
