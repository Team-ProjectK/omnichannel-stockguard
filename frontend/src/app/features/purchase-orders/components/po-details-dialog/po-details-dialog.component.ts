import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrder } from '../../../../shared/models/purchase-order';

@Component({
  selector: 'app-po-details-dialog',
  templateUrl: './po-details-dialog.component.html',
  styles: [`
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .label { font-size: 12px; color: #64748b; font-weight: 500; }
    .value { font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px; }
    .items-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .items-table th, .items-table td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
    .items-table th { background: #f8fafc; font-size: 12px; color: #475569; }
  `]
})
export class PoDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PoDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public po: PurchaseOrder
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
