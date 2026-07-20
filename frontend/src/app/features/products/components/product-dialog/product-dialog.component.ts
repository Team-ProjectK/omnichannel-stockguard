import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  productForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required]],
      storeId: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      currentPrice: [0, [Validators.required, Validators.min(0)]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      reorderThreshold: [0, [Validators.required, Validators.min(0)]],
      lastUpdatedBy: ['Admin']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.productForm.patchValue(this.data);
      // Disable primary key fields in edit mode if needed
      this.productForm.get('sku')?.disable();
      this.productForm.get('storeId')?.disable();
    }
  }

  save(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    // getRawValue returns disabled controls too (sku & storeId)
    const formValue = this.productForm.getRawValue();
    this.dialogRef.close(formValue);
  }

}