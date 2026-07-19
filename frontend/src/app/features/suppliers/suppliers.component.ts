import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SupplierService } from '../../core/services/supplier.service';
import { Supplier } from '../../shared/models/supplier';
import { SupplierDialogComponent } from './components/supplier-dialog/supplier-dialog.component';
import { SupplierDetailsDialogComponent } from './components/supplier-details-dialog/supplier-details-dialog.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'contactPerson',
    'email',
    'phone',
    'category',
    'rating',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Supplier>();
  searchQuery = '';
  selectedCategory = 'All';

  categories: string[] = ['All', 'Electronics', 'Accessories', 'Furniture'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSuppliers(): void {
    this.dataSource.data = this.supplierService.getSuppliers();
    this.dataSource.filterPredicate = (supplier: Supplier, filter: string) => {
      const search = this.searchQuery.toLowerCase();
      const matchesSearch =
        supplier.name.toLowerCase().includes(search) ||
        supplier.contactPerson.toLowerCase().includes(search) ||
        supplier.email.toLowerCase().includes(search);

      const matchesCat =
        this.selectedCategory === 'All' || supplier.category === this.selectedCategory;

      return matchesSearch && matchesCat;
    };
  }

  applyFilter(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Math.random().toString();
  }

  applyCategoryFilter(): void {
    this.dataSource.filter = Math.random().toString();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Supplier) => {
      if (result) {
        result.id = this.dataSource.data.length + 1;
        this.dataSource.data = [...this.dataSource.data, result];
        this.supplierService.saveSuppliers(this.dataSource.data);
        this.snackBar.open('Supplier added successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  editSupplier(supplier: Supplier): void {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '600px',
      disableClose: true,
      data: supplier
    });

    dialogRef.afterClosed().subscribe((result: Supplier) => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === supplier.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
          this.supplierService.saveSuppliers(this.dataSource.data);
          this.snackBar.open('Supplier updated successfully!', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    if (confirm(`Are you sure you want to delete "${supplier.name}"?`)) {
      this.dataSource.data = this.dataSource.data.filter(s => s.id !== supplier.id);
      this.supplierService.saveSuppliers(this.dataSource.data);
      this.snackBar.open('Supplier deleted successfully!', 'Close', { duration: 3000 });
    }
  }

  viewSupplier(supplier: Supplier): void {
    this.dialog.open(SupplierDetailsDialogComponent, {
      width: '500px',
      data: supplier
    });
  }
}
