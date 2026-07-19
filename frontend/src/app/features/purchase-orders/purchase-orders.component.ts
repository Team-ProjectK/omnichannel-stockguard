import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseOrderService } from '../../core/services/purchase-order.service';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { PoDialogComponent } from './components/po-dialog/po-dialog.component';
import { PoDetailsDialogComponent } from './components/po-details-dialog/po-details-dialog.component';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'poNumber',
    'supplierName',
    'orderDate',
    'expectedDelivery',
    'totalAmount',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<PurchaseOrder>();
  selectedStatus = 'All';
  searchQuery = '';

  statuses = ['All', 'Pending', 'Approved', 'Delivered', 'Cancelled'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private poService: PurchaseOrderService,
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
    this.dataSource.data = this.poService.getPurchaseOrders();
    this.dataSource.filterPredicate = (po: PurchaseOrder, filter: string) => {
      const search = this.searchQuery.toLowerCase();
      const matchesSearch =
        po.poNumber.toLowerCase().includes(search) ||
        po.supplierName.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' || po.status === this.selectedStatus;

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

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PoDialogComponent, {
      width: '650px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: PurchaseOrder) => {
      if (result) {
        result.id = this.dataSource.data.length + 1;
        this.dataSource.data = [result, ...this.dataSource.data];
        this.poService.savePurchaseOrders(this.dataSource.data);
        this.snackBar.open('Purchase order created successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  viewOrder(order: PurchaseOrder): void {
    this.dialog.open(PoDetailsDialogComponent, {
      width: '600px',
      data: order
    });
  }

  updateStatus(order: PurchaseOrder, newStatus: 'Pending' | 'Approved' | 'Delivered' | 'Cancelled'): void {
    order.status = newStatus;
    this.poService.savePurchaseOrders(this.dataSource.data);
    this.snackBar.open(`PO status updated to ${newStatus}`, 'Close', { duration: 3000 });
  }
}
