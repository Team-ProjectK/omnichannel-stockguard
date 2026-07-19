import { Component, Input, Output, EventEmitter } from '@angular/core';

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
              <span *ngSwitchCase="'currency'">{{ element[col.key] | currency:'INR':'symbol':'1.0-0' }}</span>
              <app-status-badge *ngSwitchCase="'status'" [status]="element[col.key]"></app-status-badge>
              <span *ngSwitchDefault>{{ element[col.key] }}</span>
            </ng-container>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumnKeys"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumnKeys;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      width: 100%;
      overflow-x: auto;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    table {
      width: 100%;
    }
    th {
      font-weight: 600;
      color: #475569;
      background-color: #f8fafc;
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
