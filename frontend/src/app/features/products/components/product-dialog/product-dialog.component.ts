import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {

  productForm: FormGroup;

  categories = [
    'Electronics',
    'Furniture',
    'Accessories',
    'Clothing',
    'Books'
  ];

  statuses = [
    'In Stock',
    'Low Stock',
    'Out of Stock'
  ];

 constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<ProductDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {

  this.productForm = this.fb.group({
    name: ['', Validators.required],
    sku: ['', Validators.required],
    category: ['', Validators.required],
    supplier: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    reorderLevel: [10],
    status: ['In Stock']
  });

  if (this.data) {
    this.productForm.patchValue(this.data);
  }

}

  save(): void {

  if (this.productForm.invalid) {

    this.productForm.markAllAsTouched();
    return;

  }

  this.dialogRef.close(this.productForm.value);

}

}