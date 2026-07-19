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
    @Inject(MAT_DIALOG_DATA) public data: Supplier
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.supplierForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      contactPerson: [this.data?.contactPerson || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', Validators.required],
      category: [this.data?.category || 'Electronics', Validators.required],
      address: [this.data?.address || '', Validators.required],
      rating: [this.data?.rating || 4.5, [Validators.required, Validators.min(1), Validators.max(5)]],
      status: [this.data?.status || 'Active', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.supplierForm.value
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
