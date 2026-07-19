import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchText = '';
  selectedCategory = 'All';
  selectedStatus = 'All';

  categories = [
    'All',
    'Electronics',
    'Accessories'
  ];

  statuses = [
    'All',
    'In Stock',
    'Low Stock',
    'Out of Stock'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  applyFilters(): void {

    this.filteredProducts = this.products.filter(product => {

      const matchesSearch =
        product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.sku.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      const matchesStatus =
        this.selectedStatus === 'All' ||
        product.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;

    });

  }

}