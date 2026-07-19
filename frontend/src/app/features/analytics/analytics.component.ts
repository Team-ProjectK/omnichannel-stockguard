import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AnalyticsService, AnalyticsSummary } from '../../core/services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  summary!: AnalyticsSummary;
  selectedPeriod = '30days';

  // 1. Sales Velocity Line Chart
  public velocityChartType: ChartType = 'line';
  public velocityChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        data: [28, 34, 38, 42, 45, 48],
        label: 'Sales Velocity (Units / Day)',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // 2. Inventory Turnover Bar Chart
  public turnoverChartType: ChartType = 'bar';
  public turnoverChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Central WH (WH-A)', 'West Coast (WH-B)', 'East Hub (WH-C)', 'South Facility (WH-D)'],
    datasets: [
      {
        data: [7.8, 8.4, 5.2, 3.6],
        label: 'Turnover Ratio (Annualized)',
        backgroundColor: '#7e22ce'
      }
    ]
  };

  // 3. Revenue vs Margin Growth Chart
  public marginChartType: ChartType = 'line';
  public marginChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [310, 380, 420, 490, 560, 680],
        label: 'Revenue (in ₹10k)',
        borderColor: '#16a34a',
        backgroundColor: 'transparent',
        tension: 0.4
      },
      {
        data: [95, 120, 138, 165, 190, 235],
        label: 'Gross Margin (in ₹10k)',
        borderColor: '#0284c7',
        backgroundColor: 'transparent',
        tension: 0.4
      }
    ]
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.summary = this.analyticsService.getSummaryMetrics();
  }
}
