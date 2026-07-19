import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  template: `
    <div class="summary-card" [ngClass]="color">
      <div class="card-content">
        <p class="title">{{ title }}</p>
        <h3 class="value">{{ value }}</h3>
        <span class="subtitle" *ngIf="subtitle">{{ subtitle }}</span>
      </div>
      <div class="card-icon" *ngIf="icon">
        <mat-icon>{{ icon }}</mat-icon>
      </div>
    </div>
  `,
  styles: [`
    .summary-card {
      background: #ffffff;
      border-radius: 8px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .summary-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .title {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 6px 0;
      font-weight: 500;
    }
    .value {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      color: #0f172a;
    }
    .subtitle {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
      display: block;
    }
    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      color: #2563eb;
    }
    .blue .card-icon { background: #dbeafe; color: #1d4ed8; }
    .green .card-icon { background: #dcfce7; color: #15803d; }
    .orange .card-icon { background: #ffedd5; color: #c2410c; }
    .red .card-icon { background: #fee2e2; color: #b91c1c; }
    .purple .card-icon { background: #f3e8ff; color: #7e22ce; }
  `]
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value: string | number | null = '';
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() color: string = 'blue';
}
