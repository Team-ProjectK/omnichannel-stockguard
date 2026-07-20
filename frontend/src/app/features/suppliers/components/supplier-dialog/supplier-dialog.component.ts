import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../../../shared/models/supplier';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styles: [`
    .dialog-content { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
    .form-row { display: flex; gap: 12px; }
    mat-form-field { width: 100%; }
  `]
})
export class SupplierDialogComponent implements OnInit {
  supplierForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supplier | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.supplierForm = this.fb.group({
      supplierCode: [this.data?.supplierCode || '', Validators.required],
      supplierName: [this.data?.supplierName || '', Validators.required],
      contactPerson: [this.data?.contactPerson || 'John Doe', Validators.required],
      email: [this.data?.email || 'supplier@example.com', [Validators.required, Validators.email]],
      phone: [this.data?.phone ? this.data.phone.replace(/[^0-9]/g, '') : '9876543210', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [this.data?.address || '100 Business Park', Validators.required],
      city: [this.data?.city || 'San Jose', Validators.required],
      state: [this.data?.state || 'CA', Validators.required],
      country: [this.data?.country || 'USA', Validators.required],
      status: [this.data?.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE', Validators.required]
    });

    if (this.isEdit) {
      this.supplierForm.get('supplierCode')?.disable();
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.dialogRef.close(this.supplierForm.getRawValue());
    } else {
      this.supplierForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
