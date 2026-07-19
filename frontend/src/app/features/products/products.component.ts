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
    'name',
    'sku',
    'category',
    'price',
    'stock',
    'status',
    'actions'
  ];

  selectedCategory = 'All';
  selectedStatus = 'All';

  categories = [
    'All',
    'Electronics',
    'Accessories'
  ];

  statuses = [
    'All',
    'In Stock',
    'Low Stock',
    'Out of Stock'
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

    this.dataSource.data = this.productService.getProducts();

    this.dataSource.filterPredicate = (product: Product, filter: string) => {

      const value = filter.trim().toLowerCase();

      return (
        product.name.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value)
      );

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  applyAdvancedFilters(): void {

    this.dataSource.filterPredicate = (product, filter) => {

      const search = filter.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      const matchesStatus =
        this.selectedStatus === 'All' ||
        product.status === this.selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );

    };

    this.dataSource.filter = this.dataSource.filter;

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

      this.dataSource.data = [
        ...this.dataSource.data,
        result
      ];

      this.productService.saveProducts(this.dataSource.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.snackBar.open(
        'Product added successfully!',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      );

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

      const index = this.dataSource.data.findIndex(
        p => p.sku === product.sku
      );

      if (index !== -1) {

        this.dataSource.data[index] = result;

        // Refresh Material Table
        this.dataSource.data = [...this.dataSource.data];

        this.productService.saveProducts(this.dataSource.data);

        this.snackBar.open(
          'Product updated successfully!',
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

  deleteProduct(product: Product): void {

    const confirmed = confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.dataSource.data = this.dataSource.data.filter(
      p => p.sku !== product.sku
    );

    this.productService.saveProducts(this.dataSource.data);

    this.snackBar.open(
      'Product deleted successfully!',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );

  }

  viewProduct(product: Product): void {

    this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: product
    });

  }

  clearFilters(): void {

    this.selectedCategory = 'All';
    this.selectedStatus = 'All';

    this.dataSource.filter = '';

  }

}