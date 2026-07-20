import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrder } from '../../../../shared/models/purchase-order';

@Component({
  selector: 'app-po-dialog',
  templateUrl: './po-dialog.component.html',
  styles: [`
    .dialog-content { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
    .form-row { display: flex; gap: 12px; }
    mat-form-field { width: 100%; }
  `]
})
export class PoDialogComponent implements OnInit {
  poForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const futureDate = new Date(Date.now() + 7 * 86400000).toISOString();

    this.poForm = this.fb.group({
      purchaseOrderNo: [this.data?.purchaseOrderNo || `PO-${randomNum}`, Validators.required],
      supplierCode: [this.data?.supplierCode || 'SUP-001', Validators.required],
      sku: [this.data?.sku || 'ELEC-001', Validators.required],
      storeId: [this.data?.storeId || 'STORE-1', Validators.required],
      quantity: [this.data?.quantity || 10, [Validators.required, Validators.min(1)]],
      unitPrice: [this.data?.unitPrice || 100, [Validators.required, Validators.min(0.01)]],
      status: [this.data?.status || 'CREATED', [Validators.required, Validators.pattern(/^(CREATED|APPROVED|SHIPPED|RECEIVED|CANCELLED)$/)]],
      expectedDeliveryDate: [this.data?.expectedDeliveryDate || futureDate, Validators.required]
    });

    if (this.isEdit) {
      this.poForm.get('purchaseOrderNo')?.disable();
    }
  }

  onSubmit(): void {
    if (this.poForm.valid) {
      const val = this.poForm.getRawValue();
      val.totalAmount = val.quantity * val.unitPrice;
      if (!val.expectedDeliveryDate || new Date(val.expectedDeliveryDate) <= new Date()) {
        val.expectedDeliveryDate = new Date(Date.now() + 7 * 86400000).toISOString();
      }
      this.dialogRef.close(val);
    } else {
      this.poForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
