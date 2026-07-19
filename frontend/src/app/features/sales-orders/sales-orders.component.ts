import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SalesOrderService } from '../../core/services/sales-order.service';
import { SalesOrder } from '../../shared/models/sales-order';
import { SoDetailsDialogComponent } from './components/so-details-dialog/so-details-dialog.component';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'soNumber',
    'customerName',
    'customerEmail',
    'orderDate',
    'totalItems',
    'totalAmount',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<SalesOrder>();
  selectedStatus = 'All';
  searchQuery = '';

  statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private soService: SalesOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders(): void {
    this.dataSource.data = this.soService.getSalesOrders();
    this.dataSource.filterPredicate = (so: SalesOrder, filter: string) => {
      const search = this.searchQuery.toLowerCase();
      const matchesSearch =
        so.soNumber.toLowerCase().includes(search) ||
        so.customerName.toLowerCase().includes(search) ||
        so.customerEmail.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' || so.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    };
  }

  applySearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Math.random().toString();
  }

  applyStatusFilter(): void {
    this.dataSource.filter = Math.random().toString();
  }

  viewOrder(order: SalesOrder): void {
    this.dialog.open(SoDetailsDialogComponent, {
      width: '600px',
      data: order
    });
  }

  updateStatus(order: SalesOrder, newStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'): void {
    order.status = newStatus;
    this.soService.saveSalesOrders(this.dataSource.data);
    this.snackBar.open(`Sales order status updated to ${newStatus}`, 'Close', { duration: 3000 });
  }
}
