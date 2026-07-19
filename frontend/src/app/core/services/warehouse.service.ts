import { Injectable } from '@angular/core';
import { Warehouse } from '../../shared/models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private storageKey = 'stockguard_warehouses';

  private defaultWarehouses: Warehouse[] = [
    {
      id: 1,
      code: 'WH-A',
      name: 'Central Distribution Warehouse',
      location: 'Chicago, IL',
      manager: 'Robert Vance',
      phone: '+1 (555) 123-4455',
      totalCapacity: 10000,
      usedSpace: 7200,
      currentStock: 5420,
      itemTypesCount: 450,
      status: 'Active'
    },
    {
      id: 2,
      code: 'WH-B',
      name: 'West Coast Logistics Hub',
      location: 'Reno, NV',
      manager: 'Amanda Clark',
      phone: '+1 (555) 234-5566',
      totalCapacity: 5000,
      usedSpace: 4950,
      currentStock: 3100,
      itemTypesCount: 280,
      status: 'Full'
    },
    {
      id: 3,
      code: 'WH-C',
      name: 'East Coast Fulfillment Depot',
      location: 'Allentown, PA',
      manager: 'David Miller',
      phone: '+1 (555) 345-6677',
      totalCapacity: 8000,
      usedSpace: 3600,
      currentStock: 2400,
      itemTypesCount: 310,
      status: 'Active'
    },
    {
      id: 4,
      code: 'WH-D',
      name: 'Southern Express Facility',
      location: 'Atlanta, GA',
      manager: 'Sandra Bullock',
      phone: '+1 (555) 456-7788',
      totalCapacity: 6000,
      usedSpace: 1200,
      currentStock: 800,
      itemTypesCount: 95,
      status: 'Maintenance'
    }
  ];

  getWarehouses(): Warehouse[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as Warehouse[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultWarehouses));
    return [...this.defaultWarehouses];
  }

  saveWarehouses(warehouses: Warehouse[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(warehouses));
  }
}
