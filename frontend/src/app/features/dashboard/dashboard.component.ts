import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

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
}

interface LowStockProduct {
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  status: 'Critical' | 'Low' | 'Normal';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // =========================
  // Dashboard KPI Cards
  // =========================
  dashboardCards: DashboardCard[] = [

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

  ];quickActions: QuickAction[] = [
  {
    title: 'Add Product',
    icon: 'add_box',
    color: 'primary'
  },
  {
    title: 'Create Order',
    icon: 'shopping_cart',
    color: 'accent'
  },
  {
    title: 'Reports',
    icon: 'bar_chart',
    color: 'primary'
  },
  {
    title: 'Manage Inventory',
    icon: 'inventory',
    color: 'accent'
  }
];

}