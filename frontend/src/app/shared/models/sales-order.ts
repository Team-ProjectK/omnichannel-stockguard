export interface SalesOrder {
  id?: number;
  salesOrderNo: string;
  customerId: string;
  sku: string;
  storeId: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  orderDate?: string;
  deliveryDate?: string;
}

export interface SalesOrderDto {
  salesOrderNo: string;
  customerId: string;
  sku: string;
  storeId: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  orderDate?: string;
  deliveryDate?: string;
}
