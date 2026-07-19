import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Router } from '@angular/router';

interface DashboardCard {
  title: string;
  value: string;
  description: string;
  color: string;
  icon: string;
}
interface QuickAction {
  title: string;
  icon: string;
  color: string;
  route: string;
}

interface LowStockProduct {
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  status: 'Critical' | 'Low' | 'Normal';
}

interface RecentOrder {
  orderNo: string;
  customerOrSupplier: string;
  amount: number;
  status: string;
  date: string;
}

interface TopSellingProduct {
  name: string;
  sku: string;
  salesCount: number;
  revenue: number;
}

interface ActivityItem {
  icon: string;
  title: string;
  time: string;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  greetingMessage = 'Good Day';
  todayDate: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setGreeting();
  }

  private setGreeting(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greetingMessage = 'Good Morning';
    } else if (hours < 18) {
      this.greetingMessage = 'Good Afternoon';
    } else {
      this.greetingMessage = 'Good Evening';
    }
  }

  // =========================
  // Dashboard KPI Cards
  // =========================
  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Revenue',
      value: '₹4,820,500',
      description: '+14.2% this month',
      color: 'purple',
      icon: 'payments'
    },
    {
      title: 'Total Products',
      value: '125',
      description: '+12 this month',
      color: 'blue',
      icon: 'inventory_2'
    },
    {
      title: 'Inventory',
      value: '8420',
      description: 'Across Warehouses',
      color: 'green',
      icon: 'warehouse'
    },
    {
      title: 'Low Stock',
      value: '18',
      description: 'Need Reorder',
      color: 'orange',
      icon: 'warning'
    },
    {
      title: 'Critical Alerts',
      value: '6',
      description: 'Immediate Action',
      color: 'red',
      icon: 'notification_important'
    }
  ];

  // =========================
  // Inventory Trend Chart
  // =========================
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 145, 138, 170, 185, 210],
        label: 'Inventory',
        fill: true,
        tension: 0.4
      }
    ]
  };

  public lineChartType: ChartType = 'line';

  // =========================
  // Product Category Pie Chart
  // =========================
  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      'Electronics',
      'Furniture',
      'Groceries',
      'Clothing'
    ],
    datasets: [
      {
        data: [45, 25, 18, 12]
      }
    ]
  };

  // =========================
  // Low Stock Products
  // =========================
  lowStockProducts: LowStockProduct[] = [
    {
      name: 'Dell Laptop',
      sku: 'LP001',
      stock: 8,
      reorderLevel: 20,
      status: 'Critical'
    },
    {
      name: 'Wireless Mouse',
      sku: 'MS104',
      stock: 15,
      reorderLevel: 30,
      status: 'Low'
    },
    {
      name: 'Mechanical Keyboard',
      sku: 'KB222',
      stock: 60,
      reorderLevel: 40,
      status: 'Normal'
    },
    {
      name: 'Monitor',
      sku: 'MN501',
      stock: 12,
      reorderLevel: 25,
      status: 'Low'
    }
  ];

  // =========================
  // Recent Orders
  // =========================
  recentOrders: RecentOrder[] = [
    { orderNo: 'SO-8821', customerOrSupplier: 'Acme Corporation', amount: 325000, status: 'Processing', date: 'Today' },
    { orderNo: 'SO-8822', customerOrSupplier: 'Wayne Enterprises', amount: 102000, status: 'Shipped', date: 'Yesterday' },
    { orderNo: 'PO-2026-001', customerOrSupplier: 'TechSupply Global', amount: 1300000, status: 'Pending', date: '19 Jul' }
  ];

  // =========================
  // Top Selling Products
  // =========================
  topSellingProducts: TopSellingProduct[] = [
    { name: 'Dell XPS 15 Laptop', sku: 'ELE-LAP-001', salesCount: 142, revenue: 9230000 },
    { name: 'Logitech MX Master 3S', sku: 'ACC-MOU-002', salesCount: 310, revenue: 2635000 },
    { name: 'Keychron K2 Keyboard', sku: 'ACC-KEY-004', salesCount: 185, revenue: 1332000 }
  ];

  // =========================
  // Recent Activities
  // =========================
  recentActivities: ActivityItem[] = [
    { icon: 'shopping_bag', title: 'New Sales Order SO-8821 placed by Acme Corp', time: '15 mins ago', type: 'order' },
    { icon: 'inventory_2', title: 'Stock updated for Dell XPS 15 (+20 units)', time: '2 hours ago', type: 'stock' },
    { icon: 'task_alt', title: 'Purchase Order PO-2026-002 approved by Admin', time: '4 hours ago', type: 'po' }
  ];

  // =========================
  // Quick Actions
  // =========================
  quickActions: QuickAction[] = [
    { title: 'Add Product', icon: 'add_box', color: 'primary', route: '/products' },
    { title: 'Create PO', icon: 'shopping_cart', color: 'accent', route: '/purchase-orders' },
    { title: 'View Reports', icon: 'bar_chart', color: 'primary', route: '/reports' },
    { title: 'Manage Inventory', icon: 'inventory', color: 'accent', route: '/inventory' }
  ];

  handleAction(action: QuickAction): void {
    this.router.navigate([action.route]);
  }
}