export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  minThreshold: number;
  maxThreshold: number;
  unitCost: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
}
