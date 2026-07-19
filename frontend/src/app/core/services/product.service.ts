import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storageKey = 'products';

  private defaultProducts: Product[] = [

    {
      id: 1,
      name: 'Laptop',
      sku: 'ELE001',
      category: 'Electronics',
      supplier: 'Dell',
      price: 65000,
      stock: 25,
      reorderLevel: 5,
      status: 'In Stock'
    },

    {
      id: 2,
      name: 'Wireless Mouse',
      sku: 'ACC001',
      category: 'Accessories',
      supplier: 'Logitech',
      price: 1200,
      stock: 8,
      reorderLevel: 5,
      status: 'Low Stock'
    }

  ];

  getProducts(): Product[] {

    const data = localStorage.getItem(this.storageKey);

    if (data) {
      return JSON.parse(data) as Product[];
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.defaultProducts)
    );

    return [...this.defaultProducts];

  }

  saveProducts(products: Product[]): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(products)
    );

  }

}