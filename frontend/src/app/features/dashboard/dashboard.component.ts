import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

interface DashboardCard {
  title: string;
  value: string;
  description: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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

  // Inventory Trend Chart
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
// Product Category Pie Chart
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
}