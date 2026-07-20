import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sku',
    'storeId',
    'productName',
    'currentPrice',
    'basePrice',
    'stock',
    'reorderThreshold',
    'lastUpdatedBy',
    'actions'
  ];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.dataSource.filterPredicate = (product: Product, filter: string): boolean => {
      const value = filter.trim().toLowerCase();
      return !!(
        (product.productName && product.productName.toLowerCase().includes(value)) ||
        (product.sku && product.sku.toLowerCase().includes(value)) ||
        (product.storeId && product.storeId.toLowerCase().includes(value)) ||
        (product.lastUpdatedBy && product.lastUpdatedBy.toLowerCase().includes(value))
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.dataSource.data = products || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.snackBar.open('Failed to connect to backend server.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (!result) {
        return;
      }

      this.productService.addProduct(result).subscribe({
        next: () => {
          this.loadProducts();
          this.snackBar.open(
            'Product added successfully!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        },
        error: (err) => {
          console.error('Error adding product', err);
          this.snackBar.open(
            'Failed to add product.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        }
      });
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '700px',
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (!result) {
        return;
      }

      this.productService.updateProduct(product.sku, product.storeId, result).subscribe({
        next: () => {
          this.loadProducts();
          this.snackBar.open(
            'Product updated successfully!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        },
        error: (err) => {
          console.error('Error updating product', err);
          this.snackBar.open(
            'Failed to update product.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        }
      });
    });
  }

  deleteProduct(product: Product): void {
    const confirmed = confirm(
      `Are you sure you want to delete "${product.productName}" (SKU: ${product.sku}, Store: ${product.storeId})?`
    );

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(product.sku, product.storeId).subscribe({
      next: () => {
        this.loadProducts();
        this.snackBar.open(
          'Product deleted successfully!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );
      },
      error: (err) => {
        console.error('Error deleting product', err);
        this.snackBar.open(
          'Failed to delete product.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );
      }
    });
  }

  viewProduct(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: product
    });
  }

  clearFilters(): void {
    this.dataSource.filter = '';
  }

}