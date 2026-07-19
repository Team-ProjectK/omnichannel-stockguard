export interface SalesOrderItem {
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SalesOrder {
  id: number;
  soNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  shippingAddress: string;
  totalItems: number;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: SalesOrderItem[];
}
