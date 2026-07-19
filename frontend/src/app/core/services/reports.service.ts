import { Injectable } from '@angular/core';
import { CategoryReportItem, ReportSummaryCard } from '../../shared/models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  getSummaryCards(): ReportSummaryCard[] {
    return [
      { title: 'Total Sales Revenue', value: '₹4,820,500', trend: '+14.2% vs last month', isPositive: true, icon: 'payments' },
      { title: 'Units Sold', value: '1,420 items', trend: '+8.5% vs last month', isPositive: true, icon: 'shopping_bag' },
      { title: 'Avg. Order Value', value: '₹33,947', trend: '+5.1% vs last month', isPositive: true, icon: 'trending_up' },
      { title: 'Inventory Valuation', value: '₹12,450,000', trend: '-2.4% vs last month', isPositive: false, icon: 'account_balance_wallet' }
    ];
  }

  getCategoryReportData(): CategoryReportItem[] {
    return [
      { category: 'Electronics', totalProducts: 42, totalStock: 850, totalRevenue: 2850000, sharePercentage: 59.1 },
      { category: 'Accessories', totalProducts: 68, totalStock: 2400, totalRevenue: 1120000, sharePercentage: 23.2 },
      { category: 'Furniture', totalProducts: 15, totalStock: 170, totalRevenue: 850000, sharePercentage: 17.6 }
    ];
  }
}
