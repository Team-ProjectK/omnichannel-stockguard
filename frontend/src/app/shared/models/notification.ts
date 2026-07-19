export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'stock' | 'order' | 'system' | 'price';
  timestamp: string;
  read: boolean;
}
