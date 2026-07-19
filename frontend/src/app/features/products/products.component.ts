import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'name',
    'sku',
    'category',
    'price',
    'stock',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private productService: ProductService) {}

 ngOnInit(): void {

  this.dataSource.data = this.productService.getProducts();

  this.dataSource.filterPredicate = (product: Product, filter: string) => {

    const value = filter.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(value) ||
      product.sku.toLowerCase().includes(value)
    );

  };

}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event): void {

  const filterValue = (event.target as HTMLInputElement).value;

  this.dataSource.filter = filterValue.trim().toLowerCase();

}

}