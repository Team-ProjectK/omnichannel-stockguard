import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  template: `
    <div class="skeleton-container">
      <div
        *ngFor="let row of rowsArray"
        class="skeleton-row"
        [style.height.px]="height">
      </div>
    </div>
  `,
  styles: [`
    .skeleton-container {
      width: 100%;
    }
    .skeleton-row {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() rows: number = 3;
  @Input() height: number = 24;

  get rowsArray(): number[] {
    return Array(this.rows).fill(0);
  }
}
