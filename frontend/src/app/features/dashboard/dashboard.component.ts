import { Component } from '@angular/core';

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

}