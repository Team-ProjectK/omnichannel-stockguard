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
    'storeId',
    'quantity',
    'supplier',
    'status',
    'timestamp',
    'actions'
  ];

  dataSource = new MatTableDataSource<ReorderItem>();

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
    this.reorderService.getReorderRequests().subscribe({
      next: (items: ReorderItem[]) => {
        this.dataSource.data = items || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupFilter();
      },
      error: (err) => {
        console.error('Error fetching reorder requests', err);
        this.snackBar.open('Failed to load reorder requests.', 'Close', { duration: 3000 });
      }
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (item: ReorderItem, filter: string): boolean => {
      const search = filter.trim().toLowerCase();
      return !!(
        (item.sku && item.sku.toLowerCase().includes(search)) ||
        (item.storeId && item.storeId.toLowerCase().includes(search)) ||
        (item.supplier && item.supplier.toLowerCase().includes(search)) ||
        (item.status && item.status.toLowerCase().includes(search))
      );
    };
  }

  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submitReorderRequest(sku: string, storeId: string, quantity: number, supplier: string): void {
    this.reorderService.createReorderRequest({
      sku,
      storeId,
      quantity,
      supplier,
      draftDocText: `Auto-generated reorder request for SKU ${sku} at Store ${storeId}`
    }).subscribe({
      next: () => {
        this.loadItems();
        this.snackBar.open(`Reorder request created for SKU ${sku}!`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error creating reorder request', err);
        this.snackBar.open('Failed to create reorder request.', 'Close', { duration: 3000 });
      }
    });
  }
}
