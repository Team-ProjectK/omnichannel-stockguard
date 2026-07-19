import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customer-details-dialog',
  templateUrl: './customer-details-dialog.component.html',
  styles: [`
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
    .label { font-size: 12px; color: #64748b; font-weight: 500; }
    .value { font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px; }
  `]
})
export class CustomerDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
