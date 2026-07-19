import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../shared/models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private storageKey = 'stockguard_purchase_orders';

  private defaultOrders: PurchaseOrder[] = [
    {
      id: 1,
      poNumber: 'PO-2026-001',
      supplierName: 'TechSupply Global',
      orderDate: '2026-07-10',
      expectedDelivery: '2026-07-22',
      totalAmount: 1300000,
      status: 'Pending',
      items: [
        { productName: 'Dell XPS 15 Laptop', sku: 'ELE-LAP-001', quantity: 20, unitPrice: 65000, total: 1300000 }
      ],
      notes: 'Urgent order for Q3 inventory restock'
    },
    {
      id: 2,
      poNumber: 'PO-2026-002',
      supplierName: 'LogiAccessories Inc',
      orderDate: '2026-07-12',
      expectedDelivery: '2026-07-18',
      totalAmount: 425000,
      status: 'Approved',
      items: [
        { productName: 'Logitech MX Master 3S', sku: 'ACC-MOU-002', quantity: 50, unitPrice: 8500, total: 425000 }
      ]
    },
    {
      id: 3,
      poNumber: 'PO-2026-003',
      supplierName: 'ErgoComfort Furniture',
      orderDate: '2026-07-01',
      expectedDelivery: '2026-07-08',
      totalAmount: 480000,
      status: 'Delivered',
      items: [
        { productName: 'Ergonomic Standing Desk', sku: 'FUR-DES-005', quantity: 15, unitPrice: 32000, total: 480000 }
      ]
    },
    {
      id: 4,
      poNumber: 'PO-2026-004',
      supplierName: 'NextGen Cables & Power',
      orderDate: '2026-06-25',
      expectedDelivery: '2026-07-02',
      totalAmount: 150000,
      status: 'Cancelled',
      items: [
        { productName: 'USB-C Docking Station', sku: 'ACC-DOC-009', quantity: 30, unitPrice: 5000, total: 150000 }
      ],
      notes: 'Supplier out of stock'
    }
  ];

  getPurchaseOrders(): PurchaseOrder[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as PurchaseOrder[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultOrders));
    return [...this.defaultOrders];
  }

  savePurchaseOrders(orders: PurchaseOrder[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
}
