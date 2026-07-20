export interface Product {
  id?: number;
  sku: string;
  storeId: string;
  productName: string;
  currentPrice: number;
  basePrice: number;
  stock: number;
  reorderThreshold: number;
  lastPriceUpdate?: string;
  lastUpdatedBy?: string;
}

export interface ProductDto {
  sku: string;
  storeId: string;
  productName: string;
  currentPrice: number;
  basePrice: number;
  stock: number;
  reorderThreshold: number;
  lastUpdatedBy?: string;
}