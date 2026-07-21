import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { DashboardService, DashboardMetrics } from '../../core/services/dashboard.service';
import { AiService, DashboardSummary, InventoryInsight, ReorderSuggestion, PriceRecommendation, DemandForecast } from '../ai/services/ai.service';

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

  aiSummary: DashboardSummary | null = null;
  aiInsights: InventoryInsight | null = null;
  aiReorders: ReorderSuggestion | null = null;
  aiPricing: PriceRecommendation | null = null;
  aiForecast: DemandForecast | null = null;

  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Revenue',
      value: '₹4,820,500',
      description: 'Active Revenue',
      color: 'purple',
      icon: 'payments'
    },
    {
      title: 'Total Products',
      value: '0',
      description: 'Live Backend Count',
      color: 'blue',
      icon: 'inventory_2'
    },
    {
      title: 'Inventory SKU Items',
      value: '0',
      description: 'Stock Items',
      color: 'green',
      icon: 'warehouse'
    },
    {
      title: 'Low Stock Alerts',
      value: '0',
      description: 'Action Needed',
      color: 'orange',
      icon: 'warning'
    },
    {
      title: 'Total Available Stock',
      value: '0',
      description: 'Ready for Sales',
      color: 'red',
      icon: 'notification_important'
    }
  ];

  constructor(
    private dashboardService: DashboardService,
    private aiService: AiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setGreeting();
    this.loadMetrics();
    this.loadAiData();
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

  private loadMetrics(): void {
    this.dashboardService.getMetrics().subscribe({
      next: (m: DashboardMetrics) => {
        this.dashboardCards[1].value = (m.totalProducts || 0).toString();
        this.dashboardCards[2].value = (m.totalInventoryItems || 0).toString();
        this.dashboardCards[3].value = (m.lowStockCount || 0).toString();
        this.dashboardCards[4].value = (m.totalAvailableStock || 0).toString();
      },
      error: (err) => console.error('Error fetching dashboard metrics', err)
    });
  }

  private loadAiData(): void {
    this.aiService.getDashboardSummary().subscribe({
      next: (res) => this.aiSummary = res,
      error: (err) => console.error('AI Summary load error', err)
    });
    this.aiService.getInventoryInsights().subscribe({
      next: (res) => this.aiInsights = res,
      error: (err) => console.error('AI Insights load error', err)
    });
    this.aiService.getReorderSuggestions().subscribe({
      next: (res) => this.aiReorders = res,
      error: (err) => console.error('AI Reorders load error', err)
    });
    this.aiService.getPriceRecommendations().subscribe({
      next: (res) => this.aiPricing = res,
      error: (err) => console.error('AI Pricing load error', err)
    });
    this.aiService.getDemandForecast().subscribe({
      next: (res) => this.aiForecast = res,
      error: (err) => console.error('AI Forecast load error', err)
    });
  }


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

  lowStockProducts: LowStockProduct[] = [
    {
      name: 'Dell Laptop',
      sku: 'ELEC-001',
      stock: 8,
      reorderLevel: 20,
      status: 'Critical'
    },
    {
      name: 'Wireless Mouse',
      sku: 'ACC-001',
      stock: 15,
      reorderLevel: 30,
      status: 'Low'
    }
  ];

  recentOrders: RecentOrder[] = [
    { orderNo: 'SO-8821', customerOrSupplier: 'Acme Corporation', amount: 325000, status: 'Processing', date: 'Today' },
    { orderNo: 'PO-2026-001', customerOrSupplier: 'TechSupply Global', amount: 1300000, status: 'Pending', date: '19 Jul' }
  ];

  topSellingProducts: TopSellingProduct[] = [
    { name: 'Dell XPS 15 Laptop', sku: 'ELEC-001', salesCount: 142, revenue: 9230000 },
    { name: 'Logitech MX Master 3S', sku: 'ACC-001', salesCount: 310, revenue: 2635000 }
  ];

  recentActivities: ActivityItem[] = [
    { icon: 'shopping_bag', title: 'New Sales Order SO-8821 placed', time: '15 mins ago', type: 'order' },
    { icon: 'inventory_2', title: 'Stock updated for ELEC-001 (+20 units)', time: '2 hours ago', type: 'stock' }
  ];

  quickActions: QuickAction[] = [
    { title: 'Add Product', icon: 'add_box', color: 'primary', route: '/products' },
    { title: 'Create PO', icon: 'shopping_cart', color: 'accent', route: '/purchase-orders' },
    { title: 'View Alerts', icon: 'warning', color: 'primary', route: '/alerts' },
    { title: 'Manage Inventory', icon: 'inventory', color: 'accent', route: '/inventory' }
  ];

  handleAction(action: QuickAction): void {
    this.router.navigate([action.route]);
  }
}