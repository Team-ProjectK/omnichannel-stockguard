export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatarUrl?: string;
  emailNotifications: boolean;
  lowStockAlerts: boolean;
  orderUpdates: boolean;
  weeklySummary: boolean;
  theme: 'light' | 'dark';
  compactMode: boolean;
}
