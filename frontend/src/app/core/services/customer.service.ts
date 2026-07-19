import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private storageKey = 'stockguard_customers';

  private defaultCustomers: Customer[] = [
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'procurement@acme.com',
      phone: '+1 (555) 111-2233',
      company: 'Acme Inc.',
      address: '742 Evergreen Terrace, Springfield, IL',
      totalOrders: 14,
      lifetimeValue: 1250000,
      status: 'Active',
      createdAt: '2025-01-15'
    },
    {
      id: 2,
      name: 'Wayne Enterprises',
      email: 'lucius@wayneent.com',
      phone: '+1 (555) 444-5566',
      company: 'Wayne Enterprises LLC',
      address: '100 Gotham Tower, Gotham City, NY',
      totalOrders: 28,
      lifetimeValue: 3420000,
      status: 'Active',
      createdAt: '2024-11-20'
    },
    {
      id: 3,
      name: 'Stark Industries',
      email: 'pepper@stark.com',
      phone: '+1 (555) 777-8899',
      company: 'Stark Tech',
      address: '10880 Wilshire Blvd, Los Angeles, CA',
      totalOrders: 9,
      lifetimeValue: 980000,
      status: 'Active',
      createdAt: '2025-03-10'
    },
    {
      id: 4,
      name: 'Cyberdyne Systems',
      email: 'orders@cyberdyne.io',
      phone: '+1 (555) 999-0011',
      company: 'Cyberdyne AI',
      address: '18144 El Camino Real, Sunnyvale, CA',
      totalOrders: 2,
      lifetimeValue: 140000,
      status: 'Inactive',
      createdAt: '2025-06-01'
    }
  ];

  getCustomers(): Customer[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as Customer[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultCustomers));
    return [...this.defaultCustomers];
  }

  saveCustomers(customers: Customer[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }
}
