export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: Role;
}
