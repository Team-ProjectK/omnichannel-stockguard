export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  totalOrders: number;
  lifetimeValue: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}
