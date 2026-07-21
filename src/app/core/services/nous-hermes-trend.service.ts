import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface PurchasingTrendAnalysis {
  sku: string;
  productName: string;
  salesVelocityMultiplier: number;
  trendSeverity: 'NORMAL' | 'ELEVATED' | 'HIGH_SPIKE' | 'CRITICAL_STOCKOUT';
  daysToStockout: number;
  demandInsightText: string;
  suggestedPriceAdjustmentPct: number;
  recommendedPrice: number;
  recommendedReorderQty: number;
  modelName: string;
  analyzedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NousHermesTrendService {
  private readonly modelName = 'Nous Hermes AI Purchasing Intelligence (v3.1-7B)';

  /**
   * Analyzes real-time consumer purchasing velocity, stock depletion rates,
   * competitor benchmarks, and generates purchasing trend insights.
   */
  analyzePurchasingTrends(
    product: Product,
    competitorPrices: { storeA: number; storeB: number; storeC: number }
  ): PurchasingTrendAnalysis {
    const avg7Days = product.avgSales7Days || 20;
    const todaySales = product.todaySalesUnits || avg7Days;
    const salesVelocityMultiplier = Math.round((todaySales / avg7Days) * 100) / 100;

    let trendSeverity: 'NORMAL' | 'ELEVATED' | 'HIGH_SPIKE' | 'CRITICAL_STOCKOUT' = 'NORMAL';
    if (product.stock <= product.reorderThreshold * 0.5) {
      trendSeverity = 'CRITICAL_STOCKOUT';
    } else if (salesVelocityMultiplier >= 2.0) {
      trendSeverity = 'HIGH_SPIKE';
    } else if (salesVelocityMultiplier >= 1.3) {
      trendSeverity = 'ELEVATED';
    }

    const currentDailyRate = todaySales > 0 ? todaySales : avg7Days;
    const daysToStockout = Math.max(0.1, Math.round((product.stock / currentDailyRate) * 10) / 10);

    const avgCompetitor = (competitorPrices.storeA + competitorPrices.storeB + competitorPrices.storeC) / 3;
    
    // Calculate optimal dynamic price recommendation
    let targetPrice = Math.round(((avgCompetitor - 0.50)) * 10) / 10;
    if (targetPrice < product.basePrice) {
      targetPrice = product.basePrice;
    }

    const priceDiffPct = Math.round(((targetPrice - product.currentPrice) / product.currentPrice) * 100);

    // Reorder quantity calculation based on trend spike velocity
    const targetBufferDays = 14;
    const recommendedReorderQty = Math.max(
      product.reorderThreshold,
      Math.round(currentDailyRate * targetBufferDays - product.stock)
    );

    let insight = `Nous Hermes Trend Analysis for ${product.productName}: Sales velocity is running at ${salesVelocityMultiplier}x normal average. `;
    if (trendSeverity === 'CRITICAL_STOCKOUT') {
      insight += `CRITICAL: Stock is at ${product.stock} units, projected to exhaust in ${daysToStockout} days. Automated reorder triggered.`;
    } else if (trendSeverity === 'HIGH_SPIKE') {
      insight += `HIGH DEMAND SPIKE detected (+${Math.round((salesVelocityMultiplier - 1) * 100)}%). Competitor market average is ₹${avgCompetitor.toFixed(1)}. Recommending dynamic price adjustment of ${priceDiffPct > 0 ? '+' : ''}${priceDiffPct}%.`;
    } else {
      insight += `Demand is stable. Stock coverage is projected for ${daysToStockout} days.`;
    }

    return {
      sku: product.sku,
      productName: product.productName,
      salesVelocityMultiplier,
      trendSeverity,
      daysToStockout,
      demandInsightText: insight,
      suggestedPriceAdjustmentPct: priceDiffPct,
      recommendedPrice: targetPrice,
      recommendedReorderQty,
      modelName: this.modelName,
      analyzedAt: new Date().toISOString()
    };
  }
}
