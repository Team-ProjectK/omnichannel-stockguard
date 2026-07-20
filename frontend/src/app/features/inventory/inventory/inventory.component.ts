import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InventoryService } from '../../../core/services/inventory.service';
import { InventoryItem } from '../../../shared/models/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'sku',
    'storeId',
    'availableStock',
    'reservedStock',
    'damagedStock',
    'totalStock',
    'lastUpdated'
  ];

  dataSource = new MatTableDataSource<InventoryItem>();
  searchQuery = '';

  // Summary Metrics
  totalItemsCount = 0;
  totalAvailableStock = 0;
  totalReservedStock = 0;
  totalDamagedStock = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.inventoryService.getInventory().subscribe({
      next: (items: InventoryItem[]) => {
        const data = items || [];
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculateSummary(data);
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error fetching inventory', err);
        this.snackBar.open('Failed to load inventory from server.', 'Close', { duration: 3000 });
      }
    });
  }

  calculateSummary(items: InventoryItem[]): void {
    this.totalItemsCount = items.length;
    this.totalAvailableStock = items.reduce((acc, curr) => acc + (curr.availableStock || 0), 0);
    this.totalReservedStock = items.reduce((acc, curr) => acc + (curr.reservedStock || 0), 0);
    this.totalDamagedStock = items.reduce((acc, curr) => acc + (curr.damagedStock || 0), 0);
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (item: InventoryItem, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      return !!(
        (item.sku && item.sku.toLowerCase().includes(search)) ||
        (item.storeId && item.storeId.toLowerCase().includes(search))
      );
    };
  }

  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.dataSource.filter = '';
  }

  exportData(): void {
    this.snackBar.open('Exporting inventory data to CSV...', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  getTotalStock(item: InventoryItem): number {
    return (item.availableStock || 0) + (item.reservedStock || 0) + (item.damagedStock || 0);
  }
}
