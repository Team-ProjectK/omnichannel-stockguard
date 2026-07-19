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
    'id',
    'name',
    'company',
    'email',
    'phone',
    'totalOrders',
    'lifetimeValue',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Customer>();
  searchQuery = '';

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
    this.dataSource.data = this.customerService.getCustomers();
    this.dataSource.filterPredicate = (customer: Customer, filter: string) => {
      const search = this.searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.company.toLowerCase().includes(search)
      );
    };
  }

  applySearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Math.random().toString();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Customer) => {
      if (result) {
        result.id = this.dataSource.data.length + 1;
        this.dataSource.data = [...this.dataSource.data, result];
        this.customerService.saveCustomers(this.dataSource.data);
        this.snackBar.open('Customer added successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  editCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      disableClose: true,
      data: customer
    });

    dialogRef.afterClosed().subscribe((result: Customer) => {
      if (result) {
        const index = this.dataSource.data.findIndex(c => c.id === customer.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
          this.customerService.saveCustomers(this.dataSource.data);
          this.snackBar.open('Customer updated successfully!', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete "${customer.name}"?`)) {
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== customer.id);
      this.customerService.saveCustomers(this.dataSource.data);
      this.snackBar.open('Customer deleted successfully!', 'Close', { duration: 3000 });
    }
  }

  viewCustomer(customer: Customer): void {
    this.dialog.open(CustomerDetailsDialogComponent, {
      width: '500px',
      data: customer
    });
  }
}
