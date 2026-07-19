export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  rating: number;
  status: 'Active' | 'Inactive';
}
