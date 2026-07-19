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
    'name',
    'category',
    'warehouse',
    'quantity',
    'reservedQuantity',
    'availableQuantity',
    'level',
    'status',
    'lastUpdated',
    'actions'
  ];

  dataSource = new MatTableDataSource<InventoryItem>();
  selectedWarehouse = 'All';
  selectedStatus = 'All';
  searchQuery = '';

  warehouses: string[] = [
    'All',
    'Central Warehouse (WH-A)',
    'West Coast Depot (WH-B)',
    'East Hub (WH-C)'
  ];

  statuses: string[] = [
    'All',
    'In Stock',
    'Low Stock',
    'Out of Stock',
    'Overstocked'
  ];

  // Summary Metrics
  totalItemsCount = 0;
  inStockCount = 0;
  lowStockCount = 0;
  outOfStockCount = 0;

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
    const items = this.inventoryService.getInventory();
    this.dataSource.data = items;
    this.calculateSummary(items);
    this.setupFilter();
  }

  calculateSummary(items: InventoryItem[]): void {
    this.totalItemsCount = items.length;
    this.inStockCount = items.filter(i => i.status === 'In Stock').length;
    this.lowStockCount = items.filter(i => i.status === 'Low Stock').length;
    this.outOfStockCount = items.filter(i => i.status === 'Out of Stock').length;
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (item: InventoryItem, filter: string) => {
      const search = this.searchQuery.trim().toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);

      const matchesWarehouse =
        this.selectedWarehouse === 'All' || item.warehouse === this.selectedWarehouse;

      const matchesStatus =
        this.selectedStatus === 'All' || item.status === this.selectedStatus;

      return matchesSearch && matchesWarehouse && matchesStatus;
    };
  }

  applySearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Math.random().toString();
  }

  applyFilters(): void {
    this.dataSource.filter = Math.random().toString();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedWarehouse = 'All';
    this.selectedStatus = 'All';
    this.dataSource.filter = '';
  }

  exportData(): void {
    this.snackBar.open('Exporting inventory data to CSV...', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  getRatio(item: InventoryItem): number {
    if (item.maxThreshold === 0) return 0;
    const pct = Math.round((item.quantity / item.maxThreshold) * 100);
    return Math.min(pct, 100);
  }
}
