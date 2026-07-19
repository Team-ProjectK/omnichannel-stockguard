import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../../../shared/models/supplier';

@Component({
  selector: 'app-supplier-details-dialog',
  templateUrl: './supplier-details-dialog.component.html',
  styles: [`
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 12px; }
    .label { font-size: 12px; color: #64748b; font-weight: 500; display: block; }
    .value { font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px; }
    .rating { display: flex; align-items: center; gap: 4px; color: #f59e0b; font-weight: 700; }
  `]
})
export class SupplierDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SupplierDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public supplier: Supplier
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
