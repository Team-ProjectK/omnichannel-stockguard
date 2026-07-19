import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WarehouseService } from '../../core/services/warehouse.service';
import { Warehouse } from '../../shared/models/warehouse';
import { WarehouseDialogComponent } from './components/warehouse-dialog/warehouse-dialog.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  warehouses: Warehouse[] = [];

  // Overall KPI totals
  totalCapacity = 0;
  totalUsedSpace = 0;
  totalCurrentStock = 0;

  constructor(
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouses = this.warehouseService.getWarehouses();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalCapacity = this.warehouses.reduce((acc, w) => acc + w.totalCapacity, 0);
    this.totalUsedSpace = this.warehouses.reduce((acc, w) => acc + w.usedSpace, 0);
    this.totalCurrentStock = this.warehouses.reduce((acc, w) => acc + w.currentStock, 0);
  }

  getOccupancyPct(w: Warehouse): number {
    if (!w.totalCapacity) return 0;
    return Math.round((w.usedSpace / w.totalCapacity) * 100);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Warehouse) => {
      if (result) {
        result.id = this.warehouses.length + 1;
        this.warehouses = [...this.warehouses, result];
        this.warehouseService.saveWarehouses(this.warehouses);
        this.calculateTotals();
        this.snackBar.open('Warehouse added successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  editWarehouse(w: Warehouse): void {
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      width: '600px',
      disableClose: true,
      data: w
    });

    dialogRef.afterClosed().subscribe((result: Warehouse) => {
      if (result) {
        const index = this.warehouses.findIndex(item => item.id === w.id);
        if (index !== -1) {
          this.warehouses[index] = result;
          this.warehouses = [...this.warehouses];
          this.warehouseService.saveWarehouses(this.warehouses);
          this.calculateTotals();
          this.snackBar.open('Warehouse updated successfully!', 'Close', { duration: 3000 });
        }
      }
    });
  }
}
