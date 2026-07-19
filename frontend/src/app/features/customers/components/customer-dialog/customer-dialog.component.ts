import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styles: [`
    .dialog-content { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
    .form-row { display: flex; gap: 12px; }
    mat-form-field { width: 100%; }
  `]
})
export class CustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.customerForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      company: [this.data?.company || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', Validators.required],
      address: [this.data?.address || '', Validators.required],
      status: [this.data?.status || 'Active', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.customerForm.value,
        totalOrders: this.data?.totalOrders || 0,
        lifetimeValue: this.data?.lifetimeValue || 0,
        createdAt: this.data?.createdAt || new Date().toISOString().split('T')[0]
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
