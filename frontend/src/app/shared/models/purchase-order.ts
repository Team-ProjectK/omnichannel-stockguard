export interface PurchaseOrder {
  id?: number;
  purchaseOrderNo: string;
  supplierCode: string;
  sku: string;
  storeId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  orderDate?: string;
  expectedDeliveryDate?: string;
  receivedDate?: string;
}

export interface PurchaseOrderDto {
  purchaseOrderNo: string;
  supplierCode: string;
  sku: string;
  storeId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  orderDate?: string;
  expectedDeliveryDate?: string;
  receivedDate?: string;
}
