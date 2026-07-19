import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <mat-icon class="icon">{{ icon }}</mat-icon>
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <button mat-raised-button color="primary" *ngIf="actionLabel" (click)="action.emit()">
        {{ actionLabel }}
      </button>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #64748b;
    }
    .icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #94a3b8;
      margin-bottom: 12px;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 6px 0;
    }
    .description {
      font-size: 13px;
      margin: 0 0 16px 0;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() title: string = 'No Data Available';
  @Input() description: string = 'There are currently no items to display.';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();
}
