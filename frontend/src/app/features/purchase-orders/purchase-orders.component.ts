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
    'purchaseOrderNo',
    'supplierCode',
    'sku',
    'storeId',
    'quantity',
    'unitPrice',
    'totalAmount',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<PurchaseOrder>();
  selectedStatus = 'All';

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
    this.poService.getPurchaseOrders().subscribe({
      next: (orders: PurchaseOrder[]) => {
        this.dataSource.data = orders || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error loading purchase orders', err);
        this.snackBar.open('Failed to load purchase orders.', 'Close', { duration: 3000 });
      }
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (po: PurchaseOrder, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      const matchesSearch =
        (po.purchaseOrderNo && po.purchaseOrderNo.toLowerCase().includes(search)) ||
        (po.supplierCode && po.supplierCode.toLowerCase().includes(search)) ||
        (po.sku && po.sku.toLowerCase().includes(search)) ||
        (po.storeId && po.storeId.toLowerCase().includes(search));

      const matchesStatus =
        this.selectedStatus === 'All' || po.status === this.selectedStatus;

      return !!(matchesSearch && matchesStatus);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStatusFilter(): void {
    this.dataSource.filter = this.dataSource.filter || ' ';
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PoDialogComponent, {
      width: '650px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: PurchaseOrder) => {
      if (!result) return;
      this.poService.createPurchaseOrder(result).subscribe({
        next: () => {
          this.loadOrders();
          this.snackBar.open('Purchase order created successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error creating purchase order', err);
          this.snackBar.open('Failed to create purchase order.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  editOrder(order: PurchaseOrder): void {
    const dialogRef = this.dialog.open(PoDialogComponent, {
      width: '650px',
      disableClose: true,
      data: order
    });

    dialogRef.afterClosed().subscribe((result: PurchaseOrder) => {
      if (!result) return;
      this.poService.updatePurchaseOrder(order.purchaseOrderNo, result).subscribe({
        next: () => {
          this.loadOrders();
          this.snackBar.open('Purchase order updated successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error updating purchase order', err);
          this.snackBar.open('Failed to update purchase order.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  deleteOrder(order: PurchaseOrder): void {
    if (confirm(`Are you sure you want to delete purchase order "${order.purchaseOrderNo}"?`)) {
      this.poService.deletePurchaseOrder(order.purchaseOrderNo).subscribe({
        next: () => {
          this.loadOrders();
          this.snackBar.open('Purchase order deleted successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting purchase order', err);
          this.snackBar.open('Failed to delete purchase order.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  viewOrder(order: PurchaseOrder): void {
    this.dialog.open(PoDetailsDialogComponent, {
      width: '600px',
      data: order
    });
  }
}
