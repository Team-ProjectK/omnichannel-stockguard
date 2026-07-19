export interface PurchaseOrderItem {
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: number;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  totalAmount: number;
  status: 'Pending' | 'Approved' | 'Delivered' | 'Cancelled';
  items: PurchaseOrderItem[];
  notes?: string;
}
