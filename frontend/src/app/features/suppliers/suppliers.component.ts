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
    'supplierCode',
    'supplierName',
    'contactPerson',
    'email',
    'phone',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Supplier>();

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
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers: Supplier[]) => {
        this.dataSource.data = suppliers || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error fetching suppliers', err);
        this.snackBar.open('Failed to load suppliers from server.', 'Close', { duration: 3000 });
      }
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (supplier: Supplier, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      return !!(
        (supplier.supplierName && supplier.supplierName.toLowerCase().includes(search)) ||
        (supplier.supplierCode && supplier.supplierCode.toLowerCase().includes(search)) ||
        (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(search)) ||
        (supplier.email && supplier.email.toLowerCase().includes(search))
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Supplier) => {
      if (!result) return;
      this.supplierService.addSupplier(result).subscribe({
        next: () => {
          this.loadSuppliers();
          this.snackBar.open('Supplier added successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error adding supplier', err);
          this.snackBar.open('Failed to add supplier.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  editSupplier(supplier: Supplier): void {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '600px',
      disableClose: true,
      data: supplier
    });

    dialogRef.afterClosed().subscribe((result: Supplier) => {
      if (!result) return;
      this.supplierService.updateSupplier(supplier.supplierCode, result).subscribe({
        next: () => {
          this.loadSuppliers();
          this.snackBar.open('Supplier updated successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error updating supplier', err);
          this.snackBar.open('Failed to update supplier.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  deleteSupplier(supplier: Supplier): void {
    if (confirm(`Are you sure you want to delete supplier "${supplier.supplierName}" (${supplier.supplierCode})?`)) {
      this.supplierService.deleteSupplier(supplier.supplierCode).subscribe({
        next: () => {
          this.loadSuppliers();
          this.snackBar.open('Supplier deleted successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting supplier', err);
          this.snackBar.open('Failed to delete supplier.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  viewSupplier(supplier: Supplier): void {
    this.dialog.open(SupplierDetailsDialogComponent, {
      width: '500px',
      data: supplier
    });
  }
}
