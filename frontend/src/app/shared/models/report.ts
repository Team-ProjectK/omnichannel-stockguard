export interface ReportSummaryCard {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: string;
}

export interface CategoryReportItem {
  category: string;
  totalProducts: number;
  totalStock: number;
  totalRevenue: number;
  sharePercentage: number;
}
