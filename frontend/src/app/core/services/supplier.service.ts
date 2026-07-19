import { Injectable } from '@angular/core';
import { Supplier } from '../../shared/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private storageKey = 'stockguard_suppliers';

  private defaultSuppliers: Supplier[] = [
    {
      id: 1,
      name: 'TechSupply Global',
      contactPerson: 'Alex Rivera',
      email: 'alex@techsupply.com',
      phone: '+1 (555) 234-5678',
      category: 'Electronics',
      address: '100 Silicon Way, San Jose, CA',
      rating: 4.8,
      status: 'Active'
    },
    {
      id: 2,
      name: 'LogiAccessories Inc',
      contactPerson: 'Sarah Jenkins',
      email: 's.jenkins@logiacc.com',
      phone: '+1 (555) 987-6543',
      category: 'Accessories',
      address: '450 Innovation Blvd, Austin, TX',
      rating: 4.5,
      status: 'Active'
    },
    {
      id: 3,
      name: 'ErgoComfort Furniture',
      contactPerson: 'Marcus Vance',
      email: 'marcus@ergocomfort.io',
      phone: '+1 (555) 345-6789',
      category: 'Furniture',
      address: '88 Design Street, Seattle, WA',
      rating: 4.2,
      status: 'Active'
    },
    {
      id: 4,
      name: 'NextGen Cables & Power',
      contactPerson: 'Elena Rostova',
      email: 'elena@nextgenpower.com',
      phone: '+1 (555) 876-5432',
      category: 'Accessories',
      address: '12 Logistics Hub, Chicago, IL',
      rating: 3.9,
      status: 'Inactive'
    }
  ];

  getSuppliers(): Supplier[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as Supplier[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultSuppliers));
    return [...this.defaultSuppliers];
  }

  saveSuppliers(suppliers: Supplier[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(suppliers));
  }
}
