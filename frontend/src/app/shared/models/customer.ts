export interface Customer {
  id?: number;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  customerType: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerDto {
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  customerType: string;
  active: boolean;
}
