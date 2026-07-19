import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReorderService, ReorderItem } from '../../core/services/reorder.service';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.scss']
})
export class ReorderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'sku',
    'productName',
    'warehouse',
    'currentStock',
    'minThreshold',
    'suggestedReorderQty',
    'unitCost',
    'totalCost',
    'preferredSupplier',
    'urgency',
    'actions'
  ];

  dataSource = new MatTableDataSource<ReorderItem>();
  searchQuery = '';
  selectedUrgency = 'All';

  urgencies = ['All', 'Critical', 'Low'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reorderService: ReorderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadItems(): void {
    const items = this.reorderService.getReorderItems();
    this.dataSource.data = items;
    this.dataSource.filterPredicate = (item: ReorderItem, filter: string) => {
      const search = this.searchQuery.toLowerCase();
      const matchesSearch =
        item.productName.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.preferredSupplier.toLowerCase().includes(search);

      const matchesUrgency =
        this.selectedUrgency === 'All' || item.urgency === this.selectedUrgency;

      return matchesSearch && matchesUrgency;
    };
  }

  applySearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Math.random().toString();
  }

  applyUrgencyFilter(): void {
    this.dataSource.filter = Math.random().toString();
  }

  get totalEstimatedCost(): number {
    return this.dataSource.filteredData.reduce(
      (sum, item) => sum + item.suggestedReorderQty * item.unitCost,
      0
    );
  }

  generatePO(item: ReorderItem): void {
    this.snackBar.open(
      `Purchase Order created for ${item.productName} (${item.suggestedReorderQty} units)!`,
      'Close',
      { duration: 3000 }
    );
  }

  generateBulkPO(): void {
    this.snackBar.open(
      `Bulk Purchase Orders created for ${this.dataSource.filteredData.length} items (Total: ₹${this.totalEstimatedCost.toLocaleString()})!`,
      'Close',
      { duration: 3000 }
    );
  }
}
