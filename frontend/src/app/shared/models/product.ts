export interface Product {

  id: number;

  name: string;

  sku: string;

  category: string;

  price: number;

  stock: number;

  reorderLevel: number;

  supplier: string;

  status: 'In Stock' | 'Low Stock' | 'Out of Stock';

}