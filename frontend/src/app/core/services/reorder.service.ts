import { Injectable } from '@angular/core';

export interface ReorderItem {
  id: number;
  sku: string;
  productName: string;
  category: string;
  warehouse: string;
  currentStock: number;
  minThreshold: number;
  suggestedReorderQty: number;
  unitCost: number;
  preferredSupplier: string;
  urgency: 'Critical' | 'Low' | 'Normal';
}

@Injectable({
  providedIn: 'root'
})
export class ReorderService {
  private storageKey = 'stockguard_reorder_items';

  private defaultItems: ReorderItem[] = [
    {
      id: 1,
      sku: 'ELE-LAP-001',
      productName: 'Dell XPS 15 Laptop',
      category: 'Electronics',
      warehouse: 'Central Warehouse (WH-A)',
      currentStock: 8,
      minThreshold: 20,
      suggestedReorderQty: 30,
      unitCost: 65000,
      preferredSupplier: 'TechSupply Global',
      urgency: 'Critical'
    },
    {
      id: 2,
      sku: 'ACC-MOU-002',
      productName: 'Logitech MX Master 3S',
      category: 'Accessories',
      warehouse: 'West Coast Depot (WH-B)',
      currentStock: 15,
      minThreshold: 25,
      suggestedReorderQty: 25,
      unitCost: 8500,
      preferredSupplier: 'LogiAccessories Inc',
      urgency: 'Low'
    },
    {
      id: 3,
      sku: 'ELE-MON-003',
      productName: 'Samsung 27" 4K Monitor',
      category: 'Electronics',
      warehouse: 'Central Warehouse (WH-A)',
      currentStock: 0,
      minThreshold: 10,
      suggestedReorderQty: 20,
      unitCost: 28000,
      preferredSupplier: 'TechSupply Global',
      urgency: 'Critical'
    },
    {
      id: 4,
      sku: 'FUR-DES-005',
      productName: 'Ergonomic Standing Desk',
      category: 'Furniture',
      warehouse: 'Central Warehouse (WH-A)',
      currentStock: 12,
      minThreshold: 15,
      suggestedReorderQty: 15,
      unitCost: 32000,
      preferredSupplier: 'ErgoComfort Furniture',
      urgency: 'Low'
    }
  ];

  getReorderItems(): ReorderItem[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as ReorderItem[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultItems));
    return [...this.defaultItems];
  }

  saveReorderItems(items: ReorderItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
