import { Injectable } from '@angular/core';
import { InventoryItem } from '../../shared/models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private storageKey = 'stockguard_inventory';

  private defaultItems: InventoryItem[] = [
    {
      id: 1,
      sku: 'ELE-LAP-001',
      name: 'Dell XPS 15 Laptop',
      category: 'Electronics',
      warehouse: 'Central Warehouse (WH-A)',
      quantity: 120,
      reservedQuantity: 15,
      availableQuantity: 105,
      minThreshold: 20,
      maxThreshold: 200,
      unitCost: 65000,
      lastUpdated: '2026-07-19 14:30',
      status: 'In Stock'
    },
    {
      id: 2,
      sku: 'ACC-MOU-002',
      name: 'Logitech MX Master 3S',
      category: 'Accessories',
      warehouse: 'West Coast Depot (WH-B)',
      quantity: 18,
      reservedQuantity: 5,
      availableQuantity: 13,
      minThreshold: 25,
      maxThreshold: 150,
      unitCost: 8500,
      lastUpdated: '2026-07-18 09:15',
      status: 'Low Stock'
    },
    {
      id: 3,
      sku: 'ELE-MON-003',
      name: 'Samsung 27" 4K Monitor',
      category: 'Electronics',
      warehouse: 'Central Warehouse (WH-A)',
      quantity: 0,
      reservedQuantity: 0,
      availableQuantity: 0,
      minThreshold: 10,
      maxThreshold: 80,
      unitCost: 28000,
      lastUpdated: '2026-07-17 18:00',
      status: 'Out of Stock'
    },
    {
      id: 4,
      sku: 'ACC-KEY-004',
      name: 'Keychron K2 Mechanical Keyboard',
      category: 'Accessories',
      warehouse: 'East Hub (WH-C)',
      quantity: 240,
      reservedQuantity: 20,
      availableQuantity: 220,
      minThreshold: 30,
      maxThreshold: 200,
      unitCost: 7200,
      lastUpdated: '2026-07-19 11:00',
      status: 'Overstocked'
    },
    {
      id: 5,
      sku: 'FUR-DES-005',
      name: 'Ergonomic Standing Desk',
      category: 'Furniture',
      warehouse: 'Central Warehouse (WH-A)',
      quantity: 45,
      reservedQuantity: 10,
      availableQuantity: 35,
      minThreshold: 15,
      maxThreshold: 100,
      unitCost: 32000,
      lastUpdated: '2026-07-19 16:45',
      status: 'In Stock'
    }
  ];

  getInventory(): InventoryItem[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as InventoryItem[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultItems));
    return [...this.defaultItems];
  }

  saveInventory(items: InventoryItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
