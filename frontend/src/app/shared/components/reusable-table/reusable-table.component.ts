import { Component, Input } from '@angular/core';

export interface ColumnDef {
  key: string;
  header: string;
  type?: 'text' | 'currency' | 'status' | 'date' | 'progress';
}

@Component({
  selector: 'app-reusable-table',
  template: `
    <div class="table-container">
      <table mat-table [dataSource]="data" class="mat-elevation-z0">
        <ng-container *ngFor="let col of columns" [matColumnDef]="col.key">
          <th mat-header-cell *matHeaderCellDef>{{ col.header }}</th>
          <td mat-cell *matCellDef="let element">
            <ng-container [ngSwitch]="col.type">
              <span *ngSwitchCase="'currency'" class="font-bold">{{ element[col.key] | currency:'INR':'symbol':'1.0-0' }}</span>
              <app-status-badge *ngSwitchCase="'status'" [status]="element[col.key]"></app-status-badge>
              <span *ngSwitchDefault>{{ element[col.key] }}</span>
            </ng-container>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumnKeys"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumnKeys;" class="table-row"></tr>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      width: 100%;
      overflow-x: auto;
      background: #FFFFFF;
      border-radius: var(--radius-lg, 12px);
      border: 1px solid var(--border-color, #E2E8F0);
      box-shadow: var(--shadow-sm);
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    th {
      font-size: 11.5px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #64748B !important;
      background-color: #F8FAFC !important;
      padding: 14px 18px !important;
      border-bottom: 1px solid #E2E8F0 !important;
    }
    td {
      padding: 14px 18px !important;
      font-size: 13.5px !important;
      color: #0F172A !important;
      border-bottom: 1px solid #F1F5F9 !important;
    }
    .table-row {
      transition: background-color 0.15s ease;
      &:hover {
        background-color: #EFF6FF !important;
      }
    }
  `]
})
export class ReusableTableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];

  get displayedColumnKeys(): string[] {
    return this.columns.map(c => c.key);
  }
}
