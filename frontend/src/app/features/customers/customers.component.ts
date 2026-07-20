import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../shared/models/customer';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { CustomerDetailsDialogComponent } from './components/customer-details-dialog/customer-details-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'customerId',
    'customerName',
    'email',
    'phone',
    'customerType',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.dataSource.data = customers || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error fetching customers', err);
        this.snackBar.open('Failed to load customers from server.', 'Close', { duration: 3000 });
      }
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (customer: Customer, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      return !!(
        (customer.customerName && customer.customerName.toLowerCase().includes(search)) ||
        (customer.customerId && customer.customerId.toLowerCase().includes(search)) ||
        (customer.email && customer.email.toLowerCase().includes(search)) ||
        (customer.customerType && customer.customerType.toLowerCase().includes(search))
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '650px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Customer) => {
      if (!result) return;
      this.customerService.addCustomer(result).subscribe({
        next: () => {
          this.loadCustomers();
          this.snackBar.open('Customer added successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error adding customer', err);
          this.snackBar.open('Failed to add customer.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  editCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '650px',
      disableClose: true,
      data: customer
    });

    dialogRef.afterClosed().subscribe((result: Customer) => {
      if (!result) return;
      this.customerService.updateCustomer(customer.customerId, result).subscribe({
        next: () => {
          this.loadCustomers();
          this.snackBar.open('Customer updated successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error updating customer', err);
          this.snackBar.open('Failed to update customer.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete customer "${customer.customerName}" (${customer.customerId})?`)) {
      this.customerService.deleteCustomer(customer.customerId).subscribe({
        next: () => {
          this.loadCustomers();
          this.snackBar.open('Customer deleted successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting customer', err);
          this.snackBar.open('Failed to delete customer.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  viewCustomer(customer: Customer): void {
    this.dialog.open(CustomerDetailsDialogComponent, {
      width: '500px',
      data: customer
    });
  }
}
