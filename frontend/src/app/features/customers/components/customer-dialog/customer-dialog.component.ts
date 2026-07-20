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
    @Inject(MAT_DIALOG_DATA) public data: Customer | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.customerForm = this.fb.group({
      customerId: [this.data?.customerId || '', Validators.required],
      customerName: [this.data?.customerName || '', Validators.required],
      email: [this.data?.email || 'customer@example.com', [Validators.required, Validators.email]],
      phone: [this.data?.phone ? this.data.phone.replace(/[^0-9]/g, '') : '9876543210', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [this.data?.address || '100 Main Street', Validators.required],
      city: [this.data?.city || 'Springfield', Validators.required],
      state: [this.data?.state || 'IL', Validators.required],
      country: [this.data?.country || 'USA', Validators.required],
      customerType: [this.data?.customerType || 'REGULAR', [Validators.required, Validators.pattern(/^(REGULAR|PREMIUM|WHOLESALE)$/)]],
      active: [this.data?.active !== undefined ? this.data.active : true, Validators.required]
    });

    if (this.isEdit) {
      this.customerForm.get('customerId')?.disable();
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close(this.customerForm.getRawValue());
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
