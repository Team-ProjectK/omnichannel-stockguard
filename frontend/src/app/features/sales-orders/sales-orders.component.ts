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
    'salesOrderNo',
    'customerId',
    'sku',
    'storeId',
    'quantity',
    'sellingPrice',
    'totalAmount',
    'paymentMethod',
    'orderStatus',
    'actions'
  ];

  dataSource = new MatTableDataSource<SalesOrder>();

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
    this.soService.getSalesOrders().subscribe({
      next: (orders: SalesOrder[]) => {
        this.dataSource.data = orders || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error fetching sales orders', err);
        this.snackBar.open('Failed to load sales orders from server.', 'Close', { duration: 3000 });
      }
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (so: SalesOrder, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      return !!(
        (so.salesOrderNo && so.salesOrderNo.toLowerCase().includes(search)) ||
        (so.customerId && so.customerId.toLowerCase().includes(search)) ||
        (so.sku && so.sku.toLowerCase().includes(search)) ||
        (so.storeId && so.storeId.toLowerCase().includes(search)) ||
        (so.paymentMethod && so.paymentMethod.toLowerCase().includes(search)) ||
        (so.orderStatus && so.orderStatus.toLowerCase().includes(search))
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewOrder(order: SalesOrder): void {
    this.dialog.open(SoDetailsDialogComponent, {
      width: '600px',
      data: order
    });
  }

  deleteOrder(order: SalesOrder): void {
    if (confirm(`Are you sure you want to delete sales order "${order.salesOrderNo}"?`)) {
      this.soService.deleteSalesOrder(order.salesOrderNo).subscribe({
        next: () => {
          this.loadOrders();
          this.snackBar.open('Sales order deleted successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting sales order', err);
          this.snackBar.open('Failed to delete sales order.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
