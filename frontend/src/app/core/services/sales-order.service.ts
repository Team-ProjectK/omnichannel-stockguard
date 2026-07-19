import { Injectable } from '@angular/core';
import { SalesOrder } from '../../shared/models/sales-order';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private storageKey = 'stockguard_sales_orders';

  private defaultOrders: SalesOrder[] = [
    {
      id: 1,
      soNumber: 'SO-8821',
      customerName: 'Acme Corporation',
      customerEmail: 'procurement@acme.com',
      customerPhone: '+1 (555) 111-2233',
      orderDate: '2026-07-19',
      shippingAddress: '742 Evergreen Terrace, Springfield',
      totalItems: 5,
      totalAmount: 325000,
      status: 'Processing',
      items: [
        { productName: 'Dell XPS 15 Laptop', sku: 'ELE-LAP-001', quantity: 5, unitPrice: 65000, total: 325000 }
      ]
    },
    {
      id: 2,
      soNumber: 'SO-8822',
      customerName: 'Wayne Enterprises',
      customerEmail: 'lucius@wayneent.com',
      customerPhone: '+1 (555) 444-5566',
      orderDate: '2026-07-18',
      shippingAddress: '100 Gotham Tower, Gotham City',
      totalItems: 12,
      totalAmount: 102000,
      status: 'Shipped',
      items: [
        { productName: 'Logitech MX Master 3S', sku: 'ACC-MOU-002', quantity: 12, unitPrice: 8500, total: 102000 }
      ]
    },
    {
      id: 3,
      soNumber: 'SO-8823',
      customerName: 'Stark Industries',
      customerEmail: 'pepper@stark.com',
      customerPhone: '+1 (555) 777-8899',
      orderDate: '2026-07-15',
      shippingAddress: '10880 Wilshire Blvd, Los Angeles, CA',
      totalItems: 2,
      totalAmount: 64000,
      status: 'Delivered',
      items: [
        { productName: 'Ergonomic Standing Desk', sku: 'FUR-DES-005', quantity: 2, unitPrice: 32000, total: 64000 }
      ]
    },
    {
      id: 4,
      soNumber: 'SO-8824',
      customerName: 'Cyberdyne Systems',
      customerEmail: 'orders@cyberdyne.io',
      customerPhone: '+1 (555) 999-0011',
      orderDate: '2026-07-14',
      shippingAddress: '18144 El Camino Real, Sunnyvale, CA',
      totalItems: 1,
      totalAmount: 28000,
      status: 'Cancelled',
      items: [
        { productName: 'Samsung 27" 4K Monitor', sku: 'ELE-MON-003', quantity: 1, unitPrice: 28000, total: 28000 }
      ]
    }
  ];

  getSalesOrders(): SalesOrder[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as SalesOrder[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultOrders));
    return [...this.defaultOrders];
  }

  saveSalesOrders(orders: SalesOrder[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
}
