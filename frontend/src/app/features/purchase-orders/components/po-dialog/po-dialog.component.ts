import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  suppliers = ['TechSupply Global', 'LogiAccessories Inc', 'ErgoComfort Furniture', 'NextGen Cables & Power'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PoDialogComponent>
  ) {}

  ngOnInit(): void {
    const randomNum = Math.floor(100 + Math.random() * 900);
    this.poForm = this.fb.group({
      poNumber: [`PO-2026-${randomNum}`, Validators.required],
      supplierName: ['TechSupply Global', Validators.required],
      orderDate: [new Date().toISOString().split('T')[0], Validators.required],
      expectedDelivery: ['2026-07-30', Validators.required],
      productName: ['Dell XPS 15 Laptop', Validators.required],
      sku: ['ELE-LAP-001', Validators.required],
      quantity: [10, [Validators.required, Validators.min(1)]],
      unitPrice: [65000, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.poForm.valid) {
      const val = this.poForm.value;
      const totalAmount = val.quantity * val.unitPrice;
      const newPO: PurchaseOrder = {
        id: 0,
        poNumber: val.poNumber,
        supplierName: val.supplierName,
        orderDate: val.orderDate,
        expectedDelivery: val.expectedDelivery,
        totalAmount: totalAmount,
        status: 'Pending',
        items: [
          { productName: val.productName, sku: val.sku, quantity: val.quantity, unitPrice: val.unitPrice, total: totalAmount }
        ],
        notes: val.notes
      };
      this.dialogRef.close(newPO);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
