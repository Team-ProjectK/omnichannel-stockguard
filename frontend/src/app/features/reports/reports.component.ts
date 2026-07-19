import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReportsService } from '../../core/services/reports.service';
import { CategoryReportItem, ReportSummaryCard } from '../../shared/models/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  summaryCards: ReportSummaryCard[] = [];
  categoryData: CategoryReportItem[] = [];

  // Monthly Revenue Line Chart
  public revenueChartType: ChartType = 'line';
  public revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [420000, 580000, 610000, 750000, 890000, 940000, 1120000],
        label: 'Revenue (₹)',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Category Revenue Pie Chart
  public categoryChartType: ChartType = 'doughnut';
  public categoryChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Electronics', 'Accessories', 'Furniture'],
    datasets: [
      {
        data: [2850000, 1120000, 850000],
        backgroundColor: ['#2563eb', '#16a34a', '#f59e0b']
      }
    ]
  };

  constructor(
    private reportsService: ReportsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.summaryCards = this.reportsService.getSummaryCards();
    this.categoryData = this.reportsService.getCategoryReportData();
  }

  exportPdf(): void {
    this.snackBar.open('Generating PDF report package...', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  exportExcel(): void {
    this.snackBar.open('Exporting raw dataset to Excel (XLSX)...', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
