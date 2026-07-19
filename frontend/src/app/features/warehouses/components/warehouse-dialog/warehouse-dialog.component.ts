import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Warehouse } from '../../../../shared/models/warehouse';

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styles: [`
    .dialog-content { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
    .form-row { display: flex; gap: 12px; }
    mat-form-field { width: 100%; }
  `]
})
export class WarehouseDialogComponent implements OnInit {
  whForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.whForm = this.fb.group({
      code: [this.data?.code || 'WH-E', Validators.required],
      name: [this.data?.name || '', Validators.required],
      location: [this.data?.location || '', Validators.required],
      manager: [this.data?.manager || '', Validators.required],
      phone: [this.data?.phone || '', Validators.required],
      totalCapacity: [this.data?.totalCapacity || 5000, [Validators.required, Validators.min(100)]],
      usedSpace: [this.data?.usedSpace || 1000, [Validators.required, Validators.min(0)]],
      currentStock: [this.data?.currentStock || 800, [Validators.required, Validators.min(0)]],
      status: [this.data?.status || 'Active', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.whForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.whForm.value,
        itemTypesCount: this.data?.itemTypesCount || 120
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
