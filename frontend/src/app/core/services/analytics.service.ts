import { Injectable } from '@angular/core';

export interface AnalyticsSummary {
  salesVelocity: string;
  stockTurnoverRatio: number;
  grossMarginPct: number;
  fulfillmentAccuracyPct: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  getSummaryMetrics(): AnalyticsSummary {
    return {
      salesVelocity: '42.8 units/day',
      stockTurnoverRatio: 6.4,
      grossMarginPct: 34.2,
      fulfillmentAccuracyPct: 99.1
    };
  }
}
