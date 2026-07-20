export interface InventoryItem {
  id?: number;
  sku: string;
  storeId: string;
  availableStock: number;
  reservedStock: number;
  damagedStock: number;
  lastUpdated?: string;
}

export interface InventoryDto {
  sku: string;
  storeId: string;
  availableStock: number;
  reservedStock: number;
  damagedStock: number;
}
