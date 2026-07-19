import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  getProducts(): Product[] {

    return [

      {
        id: 1,
        name: 'Dell Laptop',
        sku: 'LP001',
        category: 'Electronics',
        price: 65000,
        stock: 8,
        reorderLevel: 20,
        supplier: 'Dell',
        status: 'Low Stock'
      },

      {
        id: 2,
        name: 'Mechanical Keyboard',
        sku: 'KB102',
        category: 'Accessories',
        price: 4500,
        stock: 45,
        reorderLevel: 20,
        supplier: 'Logitech',
        status: 'In Stock'
      },

      {
        id: 3,
        name: 'Wireless Mouse',
        sku: 'MS220',
        category: 'Accessories',
        price: 1200,
        stock: 0,
        reorderLevel: 15,
        supplier: 'HP',
        status: 'Out of Stock'
      }

    ];

  }

}