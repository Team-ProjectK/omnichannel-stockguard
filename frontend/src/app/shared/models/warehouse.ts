export interface Warehouse {
  id: number;
  code: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  totalCapacity: number;
  usedSpace: number;
  currentStock: number;
  itemTypesCount: number;
  status: 'Active' | 'Full' | 'Maintenance';
}
